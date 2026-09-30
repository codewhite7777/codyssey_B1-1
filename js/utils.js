// utils.js — 여러 파일이 함께 쓰는 작은 도우미 함수들

// 문자열 안의 HTML 특수문자를 안전한 문자로 바꾼다.
// innerHTML에 "외부에서 온 문자열"을 넣을 때 반드시 거쳐야 한다. (XSS 방지)
// 예) <img src=x onerror=alert(1)>  →  &lt;img src=x onerror=alert(1)&gt;  (글자로만 보임)
const escapeHtml = (value = '') =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );

// 주소가 http(s)로 시작할 때만 통과시킨다. (javascript: 같은 위험한 주소 차단)
const toSafeUrl = (url = '') => (/^https?:\/\//i.test(url) ? url : '');

// ms 밀리초 뒤에 끝나는 Promise. `await sleep(500)`처럼 "기다리기"에 쓴다.
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 사용자가 OS에서 "동작 줄이기"를 켰는지
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// localStorage는 사생활 보호 모드/차단 설정에서 에러를 던질 수 있어서 try/catch로 감싼다.
const readStorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // 저장 실패해도 화면 동작에는 문제가 없으므로 무시한다.
  }
};
