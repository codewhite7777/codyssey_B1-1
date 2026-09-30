// config.js — 바꿔 쓰는 값은 여기 한곳에 모은다.
// (README의 "기준값" 표와 같은 값이다. 값을 바꾸면 README도 같이 고칠 것)
const CONFIG = Object.freeze({
  // GitHub API: https://api.github.com/users/{githubUsername}/repos
  githubUsername: 'codewhite7777',
  reposPerPage: 30,
  requestTimeoutMs: 10000, // 이 시간 안에 응답이 없으면 에러 상태로 전환

  // 인터랙션 기준값
  navScrolledThreshold: 60, // 스크롤이 60px 이상이면 네비게이션 배경 변경
  scrollTopThreshold: 300, // 스크롤이 300px 이상이면 "맨 위로" 버튼 표시
  revealThreshold: 0.2, // 요소가 20% 이상 보이면 등장 애니메이션 시작

  // 로컬스토리지 키
  themeStorageKey: 'theme',

  // Hero 타자기 효과 문구
  typingPhrases: [
    'HTML, CSS, JavaScript로 웹을 만듭니다.',
    '이벤트 → 상태 → 화면의 흐름을 배웁니다.',
    '작은 기능부터 직접 만들며 성장합니다.',
  ],
});
