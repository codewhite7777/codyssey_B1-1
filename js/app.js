"use strict";

// 동작 기준값은 README에도 같은 값으로 기록합니다.
const CONFIG = {
  githubUser: "codewhite7777",
  projectLimit: 6,
  themeKey: "codyssey-b1-1-theme",
  navScroll: 60,
  topScroll: 300,
  revealThreshold: 0.2,
  requestTimeout: 10000,
};

// 화면을 결정하는 값입니다. 값을 바꾼 뒤 해당 render 함수를 호출합니다.
const STATE = {
  theme: "light",
  menuOpen: false,
  scrolled: false,
  showBackToTop: false,
  projects: { status: "idle", items: [], errorMessage: "" },
  form: {
    values: { name: "", email: "", message: "" },
    errors: { name: "", email: "", message: "" },
    touched: { name: false, email: false, message: false },
    submitted: false,
    status: "idle",
  },
};

const DOM = {
  root: document.documentElement,
  header: document.querySelector("#site-header"),
  menu: document.querySelector("#nav-menu"),
  menuButton: document.querySelector("#menu-toggle"),
  themeButton: document.querySelector("#theme-toggle"),
  themeFeedback: document.querySelector("#theme-feedback"),
  topButton: document.querySelector("#back-to-top"),
  projectsPanel: document.querySelector("#projects-panel"),
  projectsGrid: document.querySelector("#projects-grid"),
  projectsMessage: document.querySelector("#projects-message"),
  projectsSpinner: document.querySelector("#projects-spinner"),
  retryButton: document.querySelector("#projects-retry"),
  form: document.querySelector("#contact-form"),
  formFeedback: document.querySelector("#form-feedback"),
};
const FORM_FIELDS = ["name", "email", "message"];
const desktopMedia = window.matchMedia("(min-width: 768px)");
const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

// 1. 테마: 저장값 읽기 → 상태 설정 → 화면 반영. 저장 실패와 화면 전환을 분리합니다.
const renderTheme = () => {
  DOM.root.dataset.theme = STATE.theme;
  DOM.themeButton.setAttribute("aria-pressed", String(STATE.theme === "dark"));
  DOM.themeButton.title = STATE.theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환";
};

const initTheme = () => {
  try {
    const savedTheme = window.localStorage.getItem(CONFIG.themeKey);
    if (savedTheme === "light" || savedTheme === "dark") STATE.theme = savedTheme;
  } catch {
    DOM.themeFeedback.textContent = "테마 저장소에 접근할 수 없습니다. 현재 페이지에서만 테마가 적용됩니다.";
  }
  renderTheme();
};

const toggleTheme = () => {
  STATE.theme = STATE.theme === "light" ? "dark" : "light";
  renderTheme();
  try {
    window.localStorage.setItem(CONFIG.themeKey, STATE.theme);
    DOM.themeFeedback.textContent = STATE.theme === "dark" ? "다크 모드로 변경했습니다." : "라이트 모드로 변경했습니다.";
  } catch {
    DOM.themeFeedback.textContent = "테마는 변경했지만 저장하지 못했습니다. 새로고침하면 초기화될 수 있습니다.";
  }
};

// 2. 메뉴: 클래스와 접근성 속성도 같은 상태에서 함께 갱신합니다.
const renderMenu = () => {
  DOM.menu.classList.toggle("active", STATE.menuOpen);
  DOM.menuButton.setAttribute("aria-expanded", String(STATE.menuOpen));
  DOM.menuButton.setAttribute("aria-label", STATE.menuOpen ? "메뉴 닫기" : "메뉴 열기");
};
const closeMenu = () => {
  STATE.menuOpen = false;
  renderMenu();
};
const toggleMenu = () => {
  STATE.menuOpen = !STATE.menuOpen;
  renderMenu();
};

const scrollBehavior = () => (motionMedia.matches ? "instant" : "smooth");
const renderScroll = () => {
  DOM.header.classList.toggle("scrolled", STATE.scrolled);
  DOM.topButton.hidden = !STATE.showBackToTop;
};
const updateScrollState = () => {
  STATE.scrolled = window.scrollY >= CONFIG.navScroll;
  STATE.showBackToTop = window.scrollY >= CONFIG.topScroll;
  renderScroll();
};
let scrollScheduled = false;
const handleScroll = () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  window.requestAnimationFrame(() => {
    updateScrollState();
    scrollScheduled = false;
  });
};

const initNavigation = () => {
  DOM.menuButton.addEventListener("click", toggleMenu);
  desktopMedia.addEventListener("change", closeMenu);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && STATE.menuOpen) {
      closeMenu();
      DOM.menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (STATE.menuOpen && !DOM.header.contains(event.target)) closeMenu();
  });
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      target.focus({ preventScroll: true });
    });
  });
  DOM.topButton.addEventListener("click", () => {
    document.querySelector("#hero-title").focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  });
  window.addEventListener("scroll", handleScroll, { passive: true });
  updateScrollState();
};

// 3. 외부 데이터는 HTML 문법이 아닌 텍스트로 표시되도록 이스케이프합니다.
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));

const safeRepositoryUrl = (value) => {
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && url.hostname === "github.com" && !url.username && !url.password) {
      return url.href;
    }
  } catch { /* 잘못된 주소 대신 검증된 프로필 주소를 사용합니다. */ }
  return `https://github.com/${CONFIG.githubUser}`;
};

const projectCard = (repository, index) => {
  const { name, description, language, stargazers_count: stars, html_url: url, updated_at: updatedAt } = repository;
  const date = new Date(updatedAt);
  const dateText = Number.isNaN(date.getTime()) ? "날짜 정보 없음" : date.toLocaleDateString("ko-KR");
  const starCount = Number.isSafeInteger(stars) && stars >= 0 ? stars : 0;
  return `
    <article class="project-card" aria-labelledby="project-title-${index}">
      <p class="project-index">REPOSITORY / ${String(index + 1).padStart(2, "0")}</p>
      <h3 id="project-title-${index}"><a href="${escapeHTML(safeRepositoryUrl(url))}" target="_blank" rel="noopener noreferrer">${escapeHTML(name)} <span aria-hidden="true">↗</span><span class="sr-only"> (새 탭)</span></a></h3>
      <p class="project-description">${escapeHTML(description || "아직 등록된 설명이 없습니다.")}</p>
      <div class="project-meta"><span>${escapeHTML(language || "언어 미지정")}</span><span aria-label="별 ${starCount}개">☆ ${starCount}</span></div>
      <p class="project-date">업데이트 ${escapeHTML(dateText)}</p>
    </article>`;
};

const renderProjects = () => {
  const { status, items, errorMessage } = STATE.projects;
  DOM.projectsPanel.dataset.status = status;
  DOM.projectsPanel.setAttribute("aria-busy", String(status === "loading"));
  DOM.projectsSpinner.hidden = status !== "loading";
  DOM.retryButton.hidden = status !== "error";
  DOM.retryButton.disabled = status === "loading";
  DOM.projectsGrid.innerHTML = status === "success" ? items.map(projectCard).join("") : "";
  const messages = {
    idle: "프로젝트를 준비하고 있습니다.",
    loading: "프로젝트를 불러오는 중입니다...",
    success: `${items.length}개의 공개 프로젝트를 불러왔습니다.`,
    empty: "표시할 프로젝트가 없습니다.",
    error: `프로젝트를 불러올 수 없습니다. ${errorMessage}`,
  };
  DOM.projectsMessage.textContent = messages[status];
};

const loadProjects = async () => {
  if (STATE.projects.status === "loading") return;
  STATE.projects = { status: "loading", items: [], errorMessage: "" };
  renderProjects();
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), CONFIG.requestTimeout);
  try {
    const endpoint = `https://api.github.com/users/${CONFIG.githubUser}/repos?sort=updated&direction=desc&per_page=${CONFIG.projectLimit}`;
    const response = await fetch(endpoint, {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal,
    });
    // fetch는 HTTP 오류 응답만으로 reject되지 않으므로 직접 검사합니다.
    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        throw new Error("GitHub 요청이 제한되었습니다. 잠시 후 다시 시도해 주세요.");
      }
      throw new Error(`GitHub 응답 오류 (${response.status})입니다. 다시 시도해 주세요.`);
    }
    const repositories = await response.json();
    if (!Array.isArray(repositories) || !repositories.every((repo) => repo && typeof repo.name === "string")) {
      throw new Error("GitHub 응답 형식을 확인할 수 없습니다.");
    }
    STATE.projects.items = repositories.slice(0, CONFIG.projectLimit);
    STATE.projects.status = STATE.projects.items.length > 0 ? "success" : "empty";
  } catch (error) {
    STATE.projects.status = "error";
    STATE.projects.items = [];
    STATE.projects.errorMessage = error.name === "AbortError"
      ? "요청 시간이 초과되었습니다. 연결을 확인한 후 다시 시도해 주세요."
      : error instanceof TypeError
        ? "네트워크 연결을 확인하고 다시 시도해 주세요."
        : error.message || "잠시 후 다시 시도해 주세요.";
  } finally {
    window.clearTimeout(timeout);
    renderProjects();
  }
};

// 4. 폼: 값 수집 / 검사 / 오류 표시를 구분합니다. 실제 전송은 하지 않습니다.
const validateField = (name, value) => {
  const trimmed = value.trim();
  const labels = { name: "이름", email: "이메일", message: "메시지" };
  if (!trimmed) return `${labels[name]} 항목을 입력해 주세요.`;
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "올바른 이메일 형식으로 입력해 주세요. 예: name@example.com";
  }
  return "";
};

const renderForm = () => {
  FORM_FIELDS.forEach((name) => {
    const showError = STATE.form.touched[name] || STATE.form.submitted;
    const message = showError ? STATE.form.errors[name] : "";
    document.querySelector(`#${name}-error`).textContent = message;
    document.querySelector(`#${name}-field`).classList.toggle("has-error", Boolean(message));
    document.querySelector(`#contact-${name}`).setAttribute("aria-invalid", String(Boolean(message)));
  });
  DOM.formFeedback.classList.toggle("success", STATE.form.status === "success");
  if (STATE.form.status === "success") {
    DOM.formFeedback.textContent = "입력 내용을 확인했습니다. 이 학습용 폼은 실제 메시지를 전송하지 않습니다.";
  } else if (STATE.form.status === "invalid") {
    DOM.formFeedback.textContent = "표시된 입력 항목을 확인해 주세요.";
  } else {
    DOM.formFeedback.textContent = "";
  }
};

const initForm = () => {
  document.querySelector("#contact-fields").disabled = false;
  FORM_FIELDS.forEach((name) => {
    const input = document.querySelector(`#contact-${name}`);
    input.addEventListener("input", () => {
      STATE.form.values[name] = input.value;
      STATE.form.touched[name] = true;
      STATE.form.errors[name] = validateField(name, input.value);
      STATE.form.status = "idle";
      renderForm();
    });
  });
  DOM.form.addEventListener("submit", (event) => {
    event.preventDefault();
    STATE.form.submitted = true;
    FORM_FIELDS.forEach((name) => {
      // 자동완성 등 input 이벤트 밖에서 바뀐 값도 제출 시 다시 읽습니다.
      const value = document.querySelector(`#contact-${name}`).value;
      STATE.form.values[name] = value;
      STATE.form.errors[name] = validateField(name, value);
    });
    const firstInvalid = FORM_FIELDS.find((name) => STATE.form.errors[name]);
    STATE.form.status = firstInvalid ? "invalid" : "success";
    renderForm();
    if (firstInvalid) document.querySelector(`#contact-${firstInvalid}`).focus();
  });
};

// 5. 스크롤 애니메이션은 작은 요소 단위로 관찰합니다.
const initReveal = () => {
  if (!("IntersectionObserver" in window) || motionMedia.matches) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= CONFIG.revealThreshold) {
        entry.target.classList.add("is-visible");
        entry.target.classList.remove("is-pending");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: CONFIG.revealThreshold });
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("is-pending");
    observer.observe(element);
  });
};

// defer 스크립트이므로 HTML 요소가 준비된 뒤 실행됩니다.
initTheme();
initNavigation();
initForm();
initReveal();
DOM.themeButton.addEventListener("click", toggleTheme);
DOM.retryButton.addEventListener("click", () => {
  document.querySelector("#projects-title").focus({ preventScroll: true });
  loadProjects();
});
document.querySelector("#copyright-year").textContent = String(new Date().getFullYear());
loadProjects();
