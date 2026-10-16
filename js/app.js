// =========================================================
// 0. 설정값 (README "동작 기준값" 표와 같은 값)
// =========================================================
const GITHUB_USER = "codewhite7777";
const PROJECT_COUNT = 6; // 카드로 보여줄 저장소 개수
const THEME_KEY = "theme"; // localStorage에 저장하는 이름
const NAV_SCROLL_Y = 60; // 이만큼 내리면 네비게이션 배경 변경
const TOP_BUTTON_Y = 300; // 이만큼 내리면 맨 위로 버튼 표시
const REVEAL_THRESHOLD = 0.2; // 요소가 20% 보이면 애니메이션

// =========================================================
// 1. 상태(STATE): 화면을 결정하는 값을 한 객체에 모음
//    규칙: 이벤트가 STATE를 바꾸고 → render 함수가 STATE대로 화면을 그림
// =========================================================
const STATE = {
  theme: "light", // "light" | "dark"
  menuOpen: false, // 모바일 메뉴가 열렸는지
  projectStatus: "loading", // "loading" | "success" | "empty" | "error"
  projects: [], // GitHub에서 받은 저장소 목록
  formErrors: { name: "", email: "", message: "" }, // 칸별 오류 메시지 ("" = 오류 없음)
  formSent: false, // 제출 성공 여부
};

// =========================================================
// 2. DOM 요소 선택
// =========================================================
const header = document.querySelector(".header");
const navMenu = document.querySelector(".nav-menu");
const menuButton = document.querySelector(".menu-button");
const themeButton = document.querySelector(".theme-button");
const topButton = document.querySelector(".top-button");
const spinner = document.querySelector(".spinner");
const projectMessage = document.querySelector(".project-message");
const retryButton = document.querySelector(".retry-button");
const projectGrid = document.querySelector(".project-grid");
const form = document.querySelector(".contact-form");
const formResult = document.querySelector(".form-result");

// =========================================================
// 3. 다크 모드: 클릭 → STATE.theme 변경 + 저장 → renderTheme
// =========================================================
const renderTheme = () => {
  document.documentElement.dataset.theme = STATE.theme; // <html data-theme="dark"> → CSS 변수가 바뀜
  themeButton.textContent = STATE.theme === "dark" ? "라이트 모드" : "다크 모드";
};

themeButton.addEventListener("click", () => {
  STATE.theme = STATE.theme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, STATE.theme); // 새로고침해도 유지
  renderTheme();
});

// =========================================================
// 4. 햄버거 메뉴: 클릭 → STATE.menuOpen 변경 → renderMenu
// =========================================================
const renderMenu = () => {
  navMenu.classList.toggle("active", STATE.menuOpen);
  menuButton.setAttribute("aria-label", STATE.menuOpen ? "메뉴 닫기" : "메뉴 열기");
};

menuButton.addEventListener("click", () => {
  STATE.menuOpen = !STATE.menuOpen;
  renderMenu();
});

// =========================================================
// 5. 부드러운 스크롤: 메뉴 링크 클릭 → 기본 이동 막고 부드럽게 이동
// =========================================================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // 순간 이동하는 기본 동작 막기
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });

    STATE.menuOpen = false; // 모바일에서 메뉴를 고르면 메뉴 닫기
    renderMenu();
  });
});

// =========================================================
// 6. 스크롤: 네비게이션 배경, 맨 위로 버튼
// =========================================================
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY >= NAV_SCROLL_Y);
  topButton.classList.toggle("show", window.scrollY >= TOP_BUTTON_Y);
});

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =========================================================
// 7. 스크롤 애니메이션: .reveal 요소가 화면에 20% 보이면 visible 붙이기
// =========================================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // 한 번 나타나면 더 볼 필요 없음
      }
    });
  },
  { threshold: REVEAL_THRESHOLD },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

// =========================================================
// 8. GitHub 프로젝트: 요청 → STATE.projectStatus 변경 → renderProjects
// =========================================================
const MESSAGES = {
  loading: "로딩 중...",
  success: "",
  empty: "표시할 프로젝트가 없습니다.",
  error: "프로젝트를 불러올 수 없습니다.",
};

// 저장소 객체 하나 → 카드 HTML 문자열 하나
const createCard = (repo) => {
  const { name, description, language, stargazers_count: stars, html_url: url } = repo; // 구조분해 할당
  return `
    <article class="project-card">
      <h3><a href="${url}" target="_blank" rel="noopener">${name}</a></h3>
      <p class="muted">${description || "설명이 없습니다."}</p>
      <p class="project-info">
        <span>${language || "언어 정보 없음"}</span>
        <span>★ ${stars}</span>
      </p>
    </article>
  `;
};

const renderProjects = () => {
  const { projectStatus, projects } = STATE;
  spinner.hidden = projectStatus !== "loading";
  retryButton.hidden = projectStatus !== "error";
  projectMessage.textContent = MESSAGES[projectStatus];
  projectGrid.innerHTML = projectStatus === "success" ? projects.map(createCard).join("") : "";
};

const loadProjects = async () => {
  STATE.projectStatus = "loading";
  renderProjects();

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated`);
    // fetch는 403(요청 횟수 초과)이나 404에도 에러를 던지지 않음 → 직접 확인
    if (!response.ok) {
      throw new Error(`GitHub 응답 오류: ${response.status}`);
    }
    const repos = await response.json();

    STATE.projects = repos
      .filter((repo) => !repo.fork) // 내가 만든 저장소만 (fork 제외)
      .slice(0, PROJECT_COUNT); // 최근 것 6개
    STATE.projectStatus = STATE.projects.length > 0 ? "success" : "empty";
  } catch (error) {
    console.error(error); // 네트워크 실패, 403 등
    STATE.projectStatus = "error";
  }

  renderProjects();
};

retryButton.addEventListener("click", loadProjects);

// =========================================================
// 9. 문의 폼: 입력/제출 → STATE.formErrors 변경 → renderForm
// =========================================================
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 글자@글자.글자

// 칸 이름과 값을 받아 오류 메시지를 돌려줌 ("" = 통과)
const validate = (name, value) => {
  if (value.trim() === "") return "필수 입력 항목입니다.";
  if (name === "email" && !EMAIL_PATTERN.test(value)) return "이메일 형식이 아닙니다. 예: name@example.com";
  return "";
};

const renderForm = () => {
  Object.entries(STATE.formErrors).forEach(([name, message]) => {
    const field = form.querySelector(`#${name}`).parentElement; // .field
    field.querySelector(".error-message").textContent = message;
    if (message) {
      field.classList.add("error");
    } else {
      field.classList.remove("error");
    }
  });
  formResult.textContent = STATE.formSent ? "메시지가 확인되었습니다. 감사합니다!" : "";
};

// 입력할 때마다 그 칸만 바로 검사
form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("input", () => {
    STATE.formErrors[input.name] = validate(input.name, input.value);
    STATE.formSent = false;
    renderForm();
  });
});

// 제출할 때는 세 칸을 모두 검사
form.addEventListener("submit", (event) => {
  event.preventDefault(); // 페이지 새로고침(기본 제출) 막기

  form.querySelectorAll("input, textarea").forEach((input) => {
    STATE.formErrors[input.name] = validate(input.name, input.value);
  });
  const hasError = Object.values(STATE.formErrors).some((message) => message !== "");

  STATE.formSent = !hasError;
  if (STATE.formSent) form.reset();
  renderForm();
});

// =========================================================
// 10. 시작: 저장된 테마 불러오기, 프로젝트 요청
// =========================================================
STATE.theme = localStorage.getItem(THEME_KEY) || "light";
renderTheme();
loadProjects();
