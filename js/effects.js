// effects.js — 스크롤 반응(네비 배경, 맨 위로 버튼), 등장 애니메이션, 타자기 효과, 연도

// ---------------------------------------------------------------------------
// 스크롤 위치에 따라: 네비게이션 배경 변경 + "맨 위로" 버튼 표시
// 흐름: scroll 이벤트 → 스크롤 위치(상태) → 클래스 토글(렌더링)
// ---------------------------------------------------------------------------
function initScrollEffects() {
  const header = document.querySelector('#site-header');
  const scrollTopButton = document.querySelector('#scroll-top');
  let isTicking = false; // 프레임당 한 번만 처리하기 위한 표시

  const render = () => {
    const { scrollY } = window;
    header.classList.toggle('scrolled', scrollY >= CONFIG.navScrolledThreshold);
    scrollTopButton.classList.toggle('visible', scrollY >= CONFIG.scrollTopThreshold);
    isTicking = false;
  };

  // scroll 이벤트는 1초에 수십 번 발생한다. requestAnimationFrame으로 화면이 그려지기 직전에
  // 한 번만 계산하면 부담이 줄어든다. passive: true는 "preventDefault 안 쓸게요"라는 약속.
  window.addEventListener(
    'scroll',
    () => {
      if (isTicking) return;
      isTicking = true;
      requestAnimationFrame(render);
    },
    { passive: true },
  );

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });

  render(); // 새로고침 후 브라우저가 스크롤 위치를 복원한 경우도 즉시 반영
}

// ---------------------------------------------------------------------------
// 스크롤 등장 애니메이션 (Intersection Observer)
// data-reveal 속성이 있는 요소가 화면에 threshold(20%)만큼 보이면 .is-visible 을 붙인다.
// ---------------------------------------------------------------------------
let revealObserver = null;

function initRevealOnScroll() {
  // 동작 줄이기 설정이거나 미지원 브라우저면 아무것도 숨기지 않는다. (모든 콘텐츠가 그냥 보임)
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add('is-visible');
        observer.unobserve(target); // 한 번 나타났으면 더 볼 필요 없음
      });
    },
    { threshold: CONFIG.revealThreshold },
  );

  observeReveal(document.querySelectorAll('[data-reveal]'));
}

// 나중에 JS로 만든 요소(프로젝트 카드)도 같은 애니메이션을 쓰도록 따로 뺀 함수
function observeReveal(elements) {
  if (!revealObserver) return;
  elements.forEach((element) => {
    element.classList.add('reveal'); // 먼저 숨기고
    revealObserver.observe(element); // 보이면 is-visible 로 나타낸다
  });
}

// ---------------------------------------------------------------------------
// Hero 타자기 효과 (보너스)
// async/await + sleep() 으로 "한 글자 쓰고 → 기다리고 → 다음 글자" 를 순서대로 표현한다.
// ---------------------------------------------------------------------------
async function initTypingEffect() {
  const target = document.querySelector('#typing-text');
  if (!target || prefersReducedMotion()) return; // 정적 문구를 그대로 보여 준다.

  const { typingPhrases } = CONFIG;
  let index = 0;

  while (true) {
    const phrase = typingPhrases[index % typingPhrases.length];

    for (let length = 1; length <= phrase.length; length++) {
      target.textContent = phrase.slice(0, length);
      await sleep(70);
    }
    await sleep(1600);

    for (let length = phrase.length - 1; length >= 0; length--) {
      target.textContent = phrase.slice(0, length);
      await sleep(35);
    }
    await sleep(400);

    index++;
  }
}

// ---------------------------------------------------------------------------
// 푸터 연도: textContent 로 텍스트를 바꾸는 가장 단순한 DOM 조작 예
// ---------------------------------------------------------------------------
function initFooterYear() {
  document.querySelector('#year').textContent = new Date().getFullYear();
}
