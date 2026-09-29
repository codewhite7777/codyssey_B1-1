// main.js — 진입점. 기능별 파일에서 만든 init 함수를 한곳에서 조립해 실행한다.
// (index.html 에서 이 파일이 가장 마지막에 defer 로 로드되므로, 위 함수들이 이미 정의되어 있다.)

initTheme(); // 다크 모드: 저장된 테마 복원 + 토글 버튼
initNavigation(); // 햄버거 메뉴 + 부드러운 스크롤
initScrollEffects(); // 스크롤 위치에 따른 네비 배경 / 맨 위로 버튼
initRevealOnScroll(); // 스크롤 등장 애니메이션 (Intersection Observer)
initContactForm(); // 폼 유효성 검사
initProjects(); // GitHub API → 프로젝트 카드
initTypingEffect(); // Hero 타자기 효과 (보너스)
initFooterYear(); // 푸터 연도
