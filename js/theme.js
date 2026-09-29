// theme.js — 다크 모드
// 흐름: 클릭(이벤트) → themeState.theme 변경(상태) → renderTheme()이 화면 갱신(렌더링)

// 상태: 지금 테마가 무엇인가 ('light' | 'dark')
const themeState = { theme: 'light' };

// 저장된 값이 있으면 그것을, 없으면 시스템(OS) 설정을 처음 값으로 쓴다.
function getInitialTheme() {
  const saved = readStorage(CONFIG.themeStorageKey);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// 렌더링: 상태를 화면에 반영한다. <html data-theme="dark">가 붙으면
// CSS의 [data-theme="dark"] 변수 값이 적용되어 페이지 전체 색이 바뀐다.
function renderTheme() {
  const { theme } = themeState;
  const toggle = document.querySelector('#theme-toggle');

  document.documentElement.dataset.theme = theme;
  toggle.setAttribute('aria-pressed', String(theme === 'dark'));
}

// 상태 변경 + (사용자가 직접 골랐다면) 저장 + 렌더링
function setTheme(theme, { persist = true } = {}) {
  themeState.theme = theme;
  if (persist) writeStorage(CONFIG.themeStorageKey, theme);
  renderTheme();
}

function initTheme() {
  const toggle = document.querySelector('#theme-toggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  setTheme(getInitialTheme(), { persist: false });

  toggle.addEventListener('click', () => {
    setTheme(themeState.theme === 'dark' ? 'light' : 'dark');
  });

  // 사용자가 직접 고른 적이 없다면 OS 다크 모드 변경을 따라간다.
  systemDark.addEventListener('change', (event) => {
    if (readStorage(CONFIG.themeStorageKey)) return;
    setTheme(event.matches ? 'dark' : 'light', { persist: false });
  });
}
