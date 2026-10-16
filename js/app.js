// =========================================================
// app.js: 페이지의 모든 "동작"을 담당
// 흐름은 하나뿐: 이벤트 → STATE 변경 → render 함수가 화면 갱신
// 개념 설명: docs/concepts.md (구역 옆 [개념 N] = 문서의 N번)
//
// const: 다시 대입하지 않는 값 / let: 다시 대입하는 값 (var는 쓰지 않음)
// =========================================================

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
// 1. 상태(STATE): 화면을 결정하는 값을 한 객체에 모음 [개념 7]
//    규칙: 이벤트 핸들러는 STATE만 바꾸고 → render 함수가 STATE대로 화면을 그림
//    STATE를 보면 지금 화면이 왜 이렇게 보이는지 알 수 있음
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
// 2. DOM 요소 선택 [개념 6]
//    querySelector(CSS 선택자): DOM 트리에서 처음 맞는 요소 하나를 찾음
//    defer로 불러왔기 때문에 이 시점엔 HTML 요소가 모두 있음
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
// 3. 다크 모드: 클릭 → STATE.theme 변경 + 저장 → renderTheme [개념 3, 7]
// =========================================================
// render: STATE.theme을 화면에 반영
const renderTheme = () => {
  // <html data-theme="dark">가 되면 CSS의 [data-theme="dark"] 변수 값이 적용됨
  document.documentElement.dataset.theme = STATE.theme;
  themeButton.textContent = STATE.theme === "dark" ? "라이트 모드" : "다크 모드";
};

// addEventListener(이벤트 이름, 실행할 함수): "클릭되면 이 함수를 실행해"라고 등록
themeButton.addEventListener("click", () => {
  STATE.theme = STATE.theme === "dark" ? "light" : "dark"; // 상태 변경
  localStorage.setItem(THEME_KEY, STATE.theme); // 브라우저에 저장 → 새로고침해도 남음
  renderTheme(); // 화면 업데이트
});

// =========================================================
// 4. 햄버거 메뉴: 클릭 → STATE.menuOpen 변경 → renderMenu [개념 7]
// =========================================================
const renderMenu = () => {
  // classList.toggle("active", 조건): 조건이 true면 active를 붙이고, false면 뗌
  // (조건 없이 toggle("active")만 쓰면 있으면 빼고 없으면 붙임)
  navMenu.classList.toggle("active", STATE.menuOpen);
  menuButton.setAttribute("aria-label", STATE.menuOpen ? "메뉴 닫기" : "메뉴 열기"); // 화면 낭독기용 이름
};

menuButton.addEventListener("click", () => {
  STATE.menuOpen = !STATE.menuOpen; // 열림 ↔ 닫힘 뒤집기
  renderMenu();
});

// =========================================================
// 5. 부드러운 스크롤: href="#..."인 링크 클릭 → 기본 이동 막고 부드럽게 이동
// =========================================================
// querySelectorAll: 맞는 요소를 "모두" 찾음 → forEach로 하나씩 이벤트 연결
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // 브라우저 기본 동작(순간 이동) 막기
    const target = document.querySelector(link.getAttribute("href")); // "#projects" → 그 section
    target.scrollIntoView({ behavior: "smooth" });

    STATE.menuOpen = false; // 모바일에서 메뉴를 고르면 메뉴 닫기
    renderMenu();
  });
});

// =========================================================
// 6. 스크롤: 네비게이션 배경(60px), 맨 위로 버튼(300px)
//    한 줄짜리라 STATE를 거치지 않고 스크롤 위치로 바로 클래스를 정함
// =========================================================
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY >= NAV_SCROLL_Y); // scrollY = 위에서 내려온 거리(px)
  topButton.classList.toggle("show", window.scrollY >= TOP_BUTTON_Y);
});

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =========================================================
// 7. 스크롤 애니메이션: .reveal 요소가 화면에 20% 보이면 visible 붙이기 [개념 10]
//    IntersectionObserver = "이 요소가 화면에 들어오면 알려 줘" 하는 감시자
//    scroll 이벤트로 매번 위치를 계산하지 않아도 됨
// =========================================================
const observer = new IntersectionObserver(
  // 콜백: 감시 중인 요소의 보이는 정도가 threshold를 넘나들 때 실행
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible"); // CSS transition으로 나타남
        observer.unobserve(entry.target); // 한 번 나타나면 더 볼 필요 없음
      }
    });
  },
  { threshold: REVEAL_THRESHOLD },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

// =========================================================
// 8. GitHub 프로젝트: 요청 → STATE.projectStatus 변경 → renderProjects [개념 8, 9]
// =========================================================
// 상태별 안내 문구 (객체로 두면 if문 없이 MESSAGES[상태]로 꺼낼 수 있음)
const MESSAGES = {
  loading: "로딩 중...",
  success: "",
  empty: "표시할 프로젝트가 없습니다.",
  error: "프로젝트를 불러올 수 없습니다.",
};

// 저장소 객체 하나 → 카드 HTML 문자열 하나 (map에 넘겨 쓰는 함수)
const createCard = (repo) => {
  // 구조분해 할당: repo에서 필요한 값만 꺼내 변수로 만듦
  // stargazers_count: stars → "stargazers_count 값을 stars라는 이름으로"
  const { name, description, language, stargazers_count: stars, html_url: url } = repo;

  // 템플릿 리터럴(백틱 `): 여러 줄 문자열 안에 ${값}을 바로 넣음
  // 내 저장소 데이터라 그대로 넣음. 남이 입력한 글을 넣을 땐 textContent를 써야 안전함
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

// render: STATE.projectStatus에 맞춰 스피너, 메시지, 버튼, 카드를 보이거나 숨김
const renderProjects = () => {
  const { projectStatus, projects } = STATE; // 구조분해: STATE.projectStatus → projectStatus
  spinner.hidden = projectStatus !== "loading"; // loading일 때만 보임
  retryButton.hidden = projectStatus !== "error"; // error일 때만 보임
  projectMessage.textContent = MESSAGES[projectStatus]; // textContent: 글자만 바꿈
  // map: 저장소 객체 배열 → 카드 HTML 배열, join: 하나의 문자열로 이어 붙임
  // innerHTML: 문자열을 HTML로 해석해서 넣음 (태그가 진짜 요소가 됨)
  projectGrid.innerHTML = projectStatus === "success" ? projects.map(createCard).join("") : "";
};

// async 함수: 안에서 await를 쓸 수 있음. await = 결과가 올 때까지 이 함수 안에서만 기다림
const loadProjects = async () => {
  STATE.projectStatus = "loading"; // ① 요청 전에 로딩 상태로 그림
  renderProjects();

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated`);
    // fetch는 서버가 403(요청 횟수 초과)이나 404를 줘도 "응답은 받았으니" 에러를 던지지 않음
    // → response.ok(200번대인지)를 직접 확인해서 아니면 throw로 catch에 보냄
    if (!response.ok) {
      throw new Error(`GitHub 응답 오류: ${response.status}`);
    }
    const repos = await response.json(); // 응답 본문(JSON 글자) → 자바스크립트 배열

    STATE.projects = repos
      .filter((repo) => !repo.fork) // filter: 조건이 true인 것만 남긴 새 배열 (fork 제외)
      .slice(0, PROJECT_COUNT); // slice: 앞에서 6개 (sort=updated라 최근 순)
    STATE.projectStatus = STATE.projects.length > 0 ? "success" : "empty"; // ② 성공 또는 빈 상태
  } catch (error) {
    // 네트워크 끊김(fetch 실패), 위에서 throw한 HTTP 오류가 모두 여기로 옴
    console.error(error);
    STATE.projectStatus = "error"; // ③ 에러 상태
  }

  renderProjects(); // 어느 길이든 마지막에 한 번, 바뀐 상태대로 그림
};

retryButton.addEventListener("click", loadProjects); // 다시 시도 = 같은 함수를 다시 실행

// =========================================================
// 9. 문의 폼: 입력/제출 → STATE.formErrors 변경 → renderForm [개념 7]
// =========================================================
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 정규식: 글자@글자.글자 (공백, @ 제외)

// 검사 함수: 칸 이름과 값을 받아 오류 메시지를 돌려줌 ("" = 통과)
// 화면은 건드리지 않음 → 검사 규칙과 화면 그리기가 섞이지 않음
const validate = (name, value) => {
  if (value.trim() === "") return "필수 입력 항목입니다."; // trim: 앞뒤 공백 제거 → 공백만 입력해도 빈 칸
  if (name === "email" && !EMAIL_PATTERN.test(value)) return "이메일 형식이 아닙니다. 예: name@example.com";
  return "";
};

// render: STATE.formErrors를 보고 칸마다 오류 문구와 빨간 테두리를 표시
const renderForm = () => {
  // Object.entries: { name: "...", email: "..." } → [["name", "..."], ["email", "..."]]
  // ([name, message]): 배열 구조분해로 [키, 값]을 바로 꺼냄
  Object.entries(STATE.formErrors).forEach(([name, message]) => {
    const field = form.querySelector(`#${name}`).parentElement; // input을 감싼 .field
    field.querySelector(".error-message").textContent = message; // 입력칸 바로 아래에 표시
    if (message) {
      field.classList.add("error"); // 오류 있음 → 빨간 테두리
    } else {
      field.classList.remove("error"); // 오류 없음 → 원래대로
    }
  });
  formResult.textContent = STATE.formSent ? "메시지가 확인되었습니다. 감사합니다!" : "";
};

// input 이벤트: 글자를 칠 때마다 발생 → 그 칸만 바로 검사 (즉각 피드백)
form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("input", () => {
    STATE.formErrors[input.name] = validate(input.name, input.value); // input.name = HTML의 name 속성
    STATE.formSent = false;
    renderForm();
  });
});

// submit 이벤트: 보내기 버튼(또는 Enter) → 세 칸을 모두 검사
form.addEventListener("submit", (event) => {
  event.preventDefault(); // 기본 제출(서버로 보내고 페이지 새로고침) 막기

  form.querySelectorAll("input, textarea").forEach((input) => {
    STATE.formErrors[input.name] = validate(input.name, input.value);
  });
  // some: 하나라도 조건을 만족하면 true → 오류 메시지가 하나라도 있나?
  const hasError = Object.values(STATE.formErrors).some((message) => message !== "");

  STATE.formSent = !hasError;
  if (STATE.formSent) form.reset(); // 성공하면 입력칸 비우기
  renderForm();
});

// =========================================================
// 10. 시작: 저장된 테마 불러오기, 프로젝트 요청 [개념 3]
// =========================================================
// getItem: 저장된 값이 없으면 null → || 뒤의 "light"를 씀
STATE.theme = localStorage.getItem(THEME_KEY) || "light";
renderTheme();
loadProjects();
