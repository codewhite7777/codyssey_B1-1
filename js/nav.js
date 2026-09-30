// nav.js — 햄버거 메뉴 + 부드러운 스크롤

function initNavigation() {
  const header = document.querySelector('#site-header');
  const menu = document.querySelector('#nav-menu');
  const navToggle = document.querySelector('#nav-toggle');

  // 버튼 모양(X 아이콘)과 접근성 속성을 메뉴 상태에 맞춘다.
  const syncToggleButton = (isOpen) => {
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  };

  const closeMenu = () => {
    menu.classList.remove('active');
    syncToggleButton(false);
  };

  // 햄버거 버튼: 누를 때마다 active 클래스가 붙었다 떨어졌다 한다.
  // classList.toggle()은 "토글 후 클래스가 붙어 있는가"를 true/false로 돌려준다.
  navToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active');
    syncToggleButton(isOpen);
  });

  // 메뉴 밖을 누르거나 Esc를 누르면 닫는다.
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('active')) {
      closeMenu();
      navToggle.focus();
    }
  });

  // 화면이 태블릿 폭(768px) 이상으로 넓어지면 열린 상태를 정리한다.
  window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });

  initSmoothScroll(closeMenu);
}

// href="#섹션id" 링크를 누르면 해당 섹션까지 부드럽게 이동한다.
function initSmoothScroll(onNavigate) {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');
      const target = hash.length > 1 ? document.querySelector(hash) : null;
      if (!target) return;

      event.preventDefault(); // 브라우저의 "즉시 점프"를 막고 우리가 이동을 제어한다.
      target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

      // 주소창의 #hash도 갱신해 주면 링크 공유/뒤로 가기가 자연스럽다.
      if (location.hash !== hash) history.pushState(null, '', hash);

      // 키보드 사용자를 위해 이동한 섹션으로 포커스도 옮긴다.
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });

      onNavigate();
    });
  });
}
