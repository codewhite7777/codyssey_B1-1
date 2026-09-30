#!/usr/bin/env node
/**
 * tools/verify.js — 과제 요구사항 자동 점검 (docs/02-evaluation-checklist.md 의 항목 번호와 1:1 대응)
 *
 *   node tools/verify.js            정적 검사 + 브라우저 검사
 *   node tools/verify.js --static   정적 검사만 (Playwright 불필요)
 *
 * - 정적 검사: index.html / css / js / README 를 읽어서 규칙을 만족하는지 확인 (정규식 기반 간이 점검)
 * - 브라우저 검사: Playwright(Chromium)로 실제 화면을 띄워 클릭/스크롤/폼 입력 후 결과를 확인
 *   (GitHub API 는 가짜 응답으로 대체하므로 인터넷/레이트 리밋과 무관하게 4가지 상태를 모두 재현한다)
 *
 * 이 파일은 "검증 도구"이며 사이트(index.html)에서는 사용하지 않는다.
 */
const fs = require('fs');
const path = require('path');
const { ROOT, startServer, loadPlaywright, repo, SAMPLE_REPOS } = require('./lib');

const staticOnly = process.argv.includes('--static');

// ---------------------------------------------------------------------------
// 결과 수집
// ---------------------------------------------------------------------------
const results = [];
const color = (code, text) => (process.stdout.isTTY ? `\x1b[${code}m${text}\x1b[0m` : text);

function record(id, title, status, detail = '') {
  results.push({ id, title, status, detail });
  const tag = { PASS: color(32, 'PASS'), FAIL: color(31, 'FAIL'), WARN: color(33, 'WARN'), INFO: color(36, 'INFO') }[status];
  console.log(`[${tag}] ${id.padEnd(5)} ${title}${detail ? color(90, `  — ${detail}`) : ''}`);
}

const pass = (id, title, detail) => record(id, title, 'PASS', detail);
const fail = (id, title, detail) => record(id, title, 'FAIL', detail);
const check = (id, title, ok, detail = '') => record(id, title, ok ? 'PASS' : 'FAIL', ok ? '' : detail);

async function attempt(id, title, fn) {
  try {
    const outcome = await fn();
    if (outcome === undefined || outcome === true) pass(id, title);
    else if (outcome === false) fail(id, title);
    else if (typeof outcome === 'string') fail(id, title, outcome);
    else if (outcome.warn) record(id, title, 'WARN', outcome.warn);
    else pass(id, title, outcome.info);
  } catch (error) {
    fail(id, title, error.message.split('\n')[0]);
  }
}

// ---------------------------------------------------------------------------
// 파일 읽기 도우미
// ---------------------------------------------------------------------------
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(ROOT, file));

const html = read('index.html').replace(/<!--[\s\S]*?-->/g, ''); // 주석 제거
const css = read('css/style.css').replace(/\/\*[\s\S]*?\*\//g, '');
const jsFiles = fs.readdirSync(path.join(ROOT, 'js')).filter((f) => f.endsWith('.js')).sort();
const stripJsComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/.*$/gm, '$1');
const js = jsFiles.map((f) => stripJsComments(read(`js/${f}`))).join('\n');
const readme = exists('README.md') ? read('README.md') : '';

// CSS 규칙 찾기: 선택자가 정확히 일치하는 규칙 본문들을 이어 붙여 돌려준다.
function cssRules(selector) {
  const bodies = [];
  const pattern = /([^{}]+)\{([^{}]*)\}/g;
  let match;
  while ((match = pattern.exec(css))) {
    const selectors = match[1].split(',').map((s) => s.trim());
    if (selectors.includes(selector)) bodies.push(match[2]);
  }
  return bodies.join('\n');
}

// ---------------------------------------------------------------------------
// 정적 검사
// ---------------------------------------------------------------------------
async function runStaticChecks() {
  console.log(color(1, '\n■ 정적 검사 (파일 내용)'));

  // 1. 프로젝트 기본 구성
  await attempt('R1-1', '폴더 구조: index.html / css/ / js/ / images/', () =>
    ['index.html', 'css', 'js', 'images'].every(exists) || '필수 파일/폴더 누락');
  await attempt('R1-2', '외부 CSS·JS 연결 (파일이 실제로 존재)', () => {
    const hrefs = [...html.matchAll(/<link[^>]+href="([^"]+)"/g)].map((m) => m[1]);
    const srcs = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]);
    const missing = [...hrefs, ...srcs].filter((f) => !/^https?:/.test(f) && !exists(f));
    return missing.length === 0 || `없는 파일: ${missing.join(', ')}`;
  });

  // 2. HTML
  await attempt('R2-1', '시맨틱 태그 사용: header, nav, main, section, article, footer', () => {
    const missing = ['header', 'nav', 'main', 'section', 'article', 'footer'].filter((t) => !new RegExp(`<${t}[\\s>]`).test(html));
    return missing.length === 0 || `누락: ${missing.join(', ')}`;
  });
  await attempt('R2-2', '섹션 6개: Hero / About / Skills / Projects / Contact / Footer', () => {
    const missing = ['hero', 'about', 'skills', 'projects', 'contact'].filter((id) => !new RegExp(`<section[^>]*id="${id}"`).test(html));
    if (!/<footer[\s>]/.test(html)) missing.push('footer');
    return missing.length === 0 || `누락: ${missing.join(', ')}`;
  });
  await attempt('R2-3', '네비게이션 앵커 링크가 실제 섹션 id 와 연결', () => {
    const nav = (html.match(/<nav[\s\S]*?<\/nav>/) || [''])[0];
    const targets = [...nav.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
    const broken = targets.filter((id) => !new RegExp(`id="${id}"`).test(html));
    if (targets.length < 4) return `앵커 링크 ${targets.length}개 (4개 이상 필요)`;
    return broken.length === 0 || `대상 없음: ${broken.join(', ')}`;
  });
  await attempt('R2-4', '모든 <img> 에 의미 있는 alt', () => {
    const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
    if (imgs.length === 0) return '이미지가 하나도 없음';
    const bad = imgs.filter((tag) => {
      const alt = (tag.match(/\salt="([^"]*)"/) || [])[1];
      return !alt || alt.trim().length < 5 || /^(image|img|photo|사진|이미지)$/i.test(alt.trim());
    });
    return bad.length === 0 || `alt 부족: ${bad.length}개`;
  });
  await attempt('R2-5', '폼 요소마다 <label for> ↔ id 연결', () => {
    const controls = [...html.matchAll(/<(input|textarea|select)\b[^>]*>/g)].map((m) => m[0]).filter((t) => !/type="(hidden|submit|button)"/.test(t));
    const bad = controls.filter((tag) => {
      const id = (tag.match(/\sid="([^"]+)"/) || [])[1];
      return !id || !new RegExp(`<label[^>]*for="${id}"`).test(html);
    });
    return (controls.length >= 3 && bad.length === 0) || `연결 안 된 입력 ${bad.length}개 / 전체 ${controls.length}개`;
  });

  // 3. CSS
  await attempt('R3-1', '외부 스타일시트 css/style.css 사용', () => /<link[^>]+href="css\/style\.css"/.test(html));
  await attempt('R3-2', ':root 에 색상·폰트·간격 CSS 변수 정의', () => {
    const root = cssRules(':root');
    return (/--color-/.test(root) && /--font-/.test(root) && /--space-/.test(root)) || '--color-/--font-/--space- 변수 부족';
  });
  await attempt('R3-3', '[data-theme="dark"] 다크 모드 변수 별도 정의', () => /--color-/.test(cssRules('[data-theme="dark"]')));
  await attempt('R3-4', '네비게이션 Flexbox (.nav { display:flex })', () => /display:\s*flex/.test(cssRules('.nav')));
  await attempt('R3-5', 'Projects 카드 Grid (auto-fit + minmax)', () => {
    const rule = cssRules('.projects__grid');
    return (/display:\s*grid/.test(rule) && /auto-fit/.test(rule) && /minmax\(/.test(rule)) || 'display:grid / auto-fit / minmax 중 누락';
  });
  await attempt('R3-6', '모바일 퍼스트: min-width 768px, 1024px 브레이크포인트', () => {
    const mq = [...css.matchAll(/@media\s*\(([^)]+)\)/g)].map((m) => m[1].replace(/\s/g, ''));
    const hasBoth = mq.includes('min-width:768px') && mq.includes('min-width:1024px');
    const maxWidth = mq.filter((q) => q.startsWith('max-width'));
    if (!hasBoth) return 'min-width 768px / 1024px 미디어 쿼리 누락';
    return maxWidth.length ? { warn: `max-width 쿼리 ${maxWidth.length}개 (모바일 퍼스트 위반 가능)` } : true;
  });
  await attempt('R3-8', '버튼·카드 hover + transition', () => {
    const ok = ['.btn', '.card'].every((sel) => /transition/.test(cssRules(sel)) && new RegExp(`${sel.replace('.', '\\.')}:hover`).test(css));
    return ok || '.btn/.card 의 transition 또는 :hover 누락';
  });
  await attempt('R3-9', '카드 box-shadow', () => /box-shadow/.test(cssRules('.card')));

  // 4. JavaScript 기초
  await attempt('R4-1', '모든 스크립트가 defer 로 연결', () => {
    const tags = [...html.matchAll(/<script\b[^>]*>/g)].map((m) => m[0]);
    const bad = tags.filter((t) => !/\sdefer[\s>]/.test(t));
    return (tags.length > 0 && bad.length === 0) || `defer 없는 script ${bad.length}개`;
  });
  await attempt('R4-2', 'var 미사용 (const / let 만 사용)', () => !/(^|[^\w$.])var\s+[\w$[{]/m.test(js) || 'var 선언 발견');
  await attempt('R4-3', 'HTML 인라인 이벤트(onclick 등) 미사용 + addEventListener 사용', () => {
    if (/\son[a-z]+\s*=/.test(html)) return 'HTML 에 on* 속성 발견';
    return /addEventListener\(/.test(js) || 'addEventListener 없음';
  });
  await attempt('R4-4', 'DOM API: querySelector(All), textContent, innerHTML, classList.add/remove/toggle', () => {
    const need = ['querySelector(', 'querySelectorAll(', 'textContent', 'innerHTML', 'classList.add(', 'classList.remove(', 'classList.toggle('];
    const missing = need.filter((w) => !js.includes(w));
    return missing.length === 0 || `누락: ${missing.join(', ')}`;
  });
  await attempt('R4-5', '이벤트: click, submit, scroll, input', () => {
    const missing = ['click', 'submit', 'scroll', 'input'].filter((e) => !new RegExp(`addEventListener\\(\\s*['"]${e}['"]`).test(js));
    return missing.length === 0 || `누락: ${missing.join(', ')}`;
  });
  await attempt('R4-6', 'event.preventDefault() 사용', () => /preventDefault\(\)/.test(js));

  // 5. 인터랙션 (코드 근거)
  await attempt('R5-1', "햄버거: classList.toggle('active')", () => /classList\.toggle\(\s*['"]active['"]\s*\)/.test(js));
  await attempt('R5-6', '스크롤 애니메이션: IntersectionObserver, threshold ≥ 0.2', () => {
    if (!/new IntersectionObserver\(/.test(js)) return 'IntersectionObserver 없음';
    const value = Number((read('js/config.js').match(/revealThreshold:\s*([\d.]+)/) || [])[1]);
    return value >= 0.2 || `threshold=${value}`;
  });

  // 7. ES6+
  await attempt('R7-1', '화살표 함수', () => /=>/.test(js));
  await attempt('R7-2', '템플릿 리터럴로 HTML 동적 생성', () => /`[^`]*<[a-z][^`]*`/.test(js));
  await attempt('R7-3', '구조분해 할당', () => /(const|let)\s*[{[][^=]+[}\]]\s*=/.test(js) || /\(\s*\{[^}]+\}\s*\)\s*=>/.test(js));
  await attempt('R7-4', '배열 메서드: map, filter, forEach', () => {
    const missing = ['.map(', '.filter(', '.forEach('].filter((m) => !js.includes(m));
    return missing.length === 0 || `누락: ${missing.join(', ')}`;
  });

  // 8. 비동기
  await attempt('R8-1', 'fetch + async/await, 엔드포인트 api.github.com/users/{id}/repos', () => {
    const ok = /await fetch\(/.test(js) && /async function|async \(/.test(js) && /api\.github\.com\/users\/\$\{[^}]+\}\/repos/.test(js);
    return ok || 'fetch/async/엔드포인트 확인 필요';
  });
  await attempt('R8-6', 'try/catch 로 에러 처리', () => /try\s*\{[\s\S]*?\}\s*catch/.test(js));

  // 9. 상태 관리
  await attempt('R9-1', '상태 → 렌더링 흐름 3개 이상 (theme / projects / contact)', () => {
    const flows = [
      /themeState/.test(js) && /function renderTheme/.test(js),
      /projectsState/.test(js) && /function renderProjects/.test(js),
      /contactState/.test(js) && /function renderContactForm/.test(js),
    ].filter(Boolean).length;
    return flows >= 3 || `발견된 흐름 ${flows}개`;
  });

  // 10. 제약 사항
  await attempt('C-1', '외부 라이브러리 미사용 (React/Vue/jQuery/Bootstrap/Tailwind)', () => {
    const banned = /(react|vue|jquery|bootstrap|tailwind|angular)/i;
    const external = [...html.matchAll(/<(?:script|link)[^>]+(?:src|href)="(https?:[^"]+)"/g)].map((m) => m[1]);
    const hit = external.filter((u) => banned.test(u));
    return hit.length === 0 || `외부 라이브러리 추정: ${hit.join(', ')}`;
  });
  await attempt('C-2', 'HTML 인라인 style="" 미사용 (JS 의 .style 직접 조작도 없음)', () => {
    if (/\sstyle\s*=/.test(html)) return 'HTML 에 style 속성';
    if (/\.style\.|setAttribute\(\s*['"]style['"]/.test(js)) return 'JS 에서 style 직접 조작';
    return true;
  });

  // README / 제출물
  await attempt('R10-1', 'README: 프로젝트 설명 / 사용 기술 / 배포 URL / 스크린샷', () => {
    const sections = { '프로젝트 설명': /소개|설명|About/i, '사용 기술': /사용 기술|Tech/i, '배포 URL': /배포|Deploy|github\.io/i, 스크린샷: /스크린샷|Screenshot/i };
    const missing = Object.entries(sections).filter(([, re]) => !re.test(readme)).map(([k]) => k);
    return missing.length === 0 || `누락: ${missing.join(', ')}`;
  });
  await attempt('R10-2', 'README 에 기준값(60px / 300px / threshold) 명시', () => {
    const ok = /60\s*px/.test(readme) && /300\s*px/.test(readme) && /0\.2/.test(readme);
    return ok || '60px, 300px, 0.2 중 누락';
  });
  await attempt('R10-3', 'README 스크린샷 이미지 파일 존재 (데스크톱/모바일/다크)', () => {
    const files = [
      ...[...readme.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1]), // ![alt](경로)
      ...[...readme.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]), // <img src="경로">
    ];
    const missing = files.filter((f) => !/^https?:/.test(f) && !exists(f));
    const kinds = ['desktop', 'mobile', 'dark'].filter((k) => !files.some((f) => f.includes(k)));
    if (missing.length) return `없는 이미지: ${missing.join(', ')}`;
    return kinds.length === 0 || `누락 종류: ${kinds.join(', ')}`;
  });
  await attempt('R10-4', 'README 배포 URL 형식 (https://<id>.github.io/<repo>/)', () => /https:\/\/[\w-]+\.github\.io\/[\w-]+\/?/.test(readme));

  // 보너스
  const bonus = (id, title, ok) => (ok ? pass(id, `[보너스] ${title}`) : record(id, `[보너스] ${title}`, 'INFO', '미구현'));
  bonus('B-1', '언어별 프로젝트 필터', /\.filter\(\(\{\s*language\s*\}\)/.test(js) && /data-filter/.test(js));
  bonus('B-2', 'Hero 타자기 효과', /initTypingEffect/.test(js));
  bonus('B-4', '시스템 다크 모드 감지 (prefers-color-scheme)', /prefers-color-scheme/.test(js));
}

// ---------------------------------------------------------------------------
// 브라우저 검사
// ---------------------------------------------------------------------------
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const API_MODES = {
  success: () => ({ status: 200, body: SAMPLE_REPOS }),
  slow: () => ({ status: 200, body: SAMPLE_REPOS, delay: 900 }),
  http500: () => ({ status: 500, body: { message: 'Server Error' } }),
  rate403: () => ({ status: 403, body: { message: 'API rate limit exceeded' } }),
  notfound: () => ({ status: 404, body: { message: 'Not Found' } }),
  empty: () => ({ status: 200, body: [] }),
  allforks: () => ({ status: 200, body: [repo(1, { fork: true }), repo(2, { fork: true })] }),
  xss: () => ({
    status: 200,
    body: [
      repo(1, {
        name: '<script>window.__xss=1</script>',
        description: '<img src=x onerror="window.__xss=1"> 위험한 설명',
        homepage: 'javascript:window.__xss=1',
      }),
      repo(2, { language: 'JavaScript' }),
    ],
  }),
};

async function openPage(browser, baseUrl, options = {}) {
  const { width = 1280, height = 800, colorScheme = 'light', reducedMotion = 'no-preference', api = 'success' } = options;
  const context = await browser.newContext({ viewport: { width, height }, colorScheme, reducedMotion });
  const page = await context.newPage();
  const control = { mode: api, calls: 0 };
  const errors = [];

  await page.route('https://api.github.com/**', async (route) => {
    control.calls += 1;
    if (control.mode === 'network') return route.abort('failed');
    const { status, body, delay } = API_MODES[control.mode]();
    if (delay) await wait(delay);
    return route.fulfill({
      status,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify(body),
    });
  });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !/Failed to load resource/.test(msg.text())) errors.push(msg.text());
  });

  await page.goto(baseUrl, { waitUntil: 'load' });
  return { context, page, control, errors };
}

const instantScroll = (page, top) => page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), top);
const nextFrames = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

async function runBrowserChecks(baseUrl) {
  console.log(color(1, '\n■ 브라우저 검사 (Playwright / Chromium)'));

  const playwright = loadPlaywright();
  if (!playwright) {
    record('BROWSER', 'Playwright 를 찾을 수 없어 브라우저 검사를 건너뜀', 'WARN', 'npm i -g playwright 후 다시 실행');
    return;
  }

  let browser;
  try {
    browser = await playwright.chromium.launch();
  } catch (error) {
    record('BROWSER', 'Chromium 을 실행할 수 없어 브라우저 검사를 건너뜀', 'WARN', error.message.split('\n')[0]);
    return;
  }

  try {
    // ── 반응형 레이아웃 ─────────────────────────────────────────────
    await attempt('R3-7', '모바일(375px): 메뉴 숨김 + 햄버거 표시 / 태블릿(768px)부터 가로 메뉴', async () => {
      const mobile = await openPage(browser, baseUrl, { width: 375, height: 700 });
      const state = await mobile.page.evaluate(() => ({
        menu: getComputedStyle(document.querySelector('#nav-menu')).visibility,
        toggle: getComputedStyle(document.querySelector('#nav-toggle')).display,
      }));
      await mobile.context.close();
      if (state.menu !== 'hidden' || state.toggle === 'none') return `375px: menu=${state.menu}, toggle=${state.toggle}`;

      const tablet = await openPage(browser, baseUrl, { width: 768, height: 800 });
      const wide = await tablet.page.evaluate(() => ({
        menu: getComputedStyle(document.querySelector('#nav-menu')).visibility,
        toggle: getComputedStyle(document.querySelector('#nav-toggle')).display,
      }));
      await tablet.context.close();
      if (wide.menu !== 'visible' || wide.toggle !== 'none') return `768px: menu=${wide.menu}, toggle=${wide.toggle}`;

      const edge = await openPage(browser, baseUrl, { width: 767, height: 800 });
      const toggle767 = await edge.page.evaluate(() => getComputedStyle(document.querySelector('#nav-toggle')).display);
      await edge.context.close();
      return toggle767 !== 'none' || '767px 에서 햄버거가 보여야 함';
    });

    await attempt('R3-4b', '데스크톱: 로고 왼쪽 · 메뉴 오른쪽 (Flexbox 실측)', async () => {
      const { page, context } = await openPage(browser, baseUrl, { width: 1280 });
      const info = await page.evaluate(() => {
        const nav = document.querySelector('.nav');
        const logo = document.querySelector('.nav__logo').getBoundingClientRect();
        const menu = document.querySelector('#nav-menu').getBoundingClientRect();
        const actions = document.querySelector('.nav__actions').getBoundingClientRect();
        const box = nav.getBoundingClientRect();
        return { display: getComputedStyle(nav).display, logoLeft: logo.left - box.left, menuRight: box.right - actions.right, menuAfterLogo: menu.left > logo.right, menuNearRight: box.right - menu.right < 120 };
      });
      await context.close();
      return (info.display === 'flex' && info.menuAfterLogo && info.logoLeft < 8 && info.menuNearRight) || JSON.stringify(info);
    });

    await attempt('R3-5b', 'Projects Grid 열 수: 375px=1열 / 768px=2열 / 1280px=3열', async () => {
      const columns = {};
      for (const width of [375, 768, 1280]) {
        const { page, context } = await openPage(browser, baseUrl, { width });
        await page.waitForSelector('.project-card');
        columns[width] = await page.evaluate(() => getComputedStyle(document.querySelector('#projects-grid')).gridTemplateColumns.split(' ').length);
        await context.close();
      }
      return (columns[375] === 1 && columns[768] === 2 && columns[1280] === 3) || JSON.stringify(columns);
    });

    await attempt('C-4', '가로 스크롤 없음 (320 / 375 / 768 / 1024 / 1280px)', async () => {
      const bad = [];
      for (const width of [320, 375, 768, 1024, 1280]) {
        const { page, context } = await openPage(browser, baseUrl, { width });
        await page.waitForSelector('.project-card');
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        if (overflow > 0) bad.push(`${width}px(+${overflow})`);
        await context.close();
      }
      return bad.length === 0 || `넘침: ${bad.join(', ')}`;
    });

    // ── 인터랙션 ───────────────────────────────────────────────────
    await attempt('R5-1', '햄버거: 클릭하면 열리고, 다시 클릭하면 닫힘 / 링크 클릭·Esc 로도 닫힘', async () => {
      const { page, context } = await openPage(browser, baseUrl, { width: 375, height: 700 });
      const isOpen = () => page.evaluate(() => document.querySelector('#nav-menu').classList.contains('active'));
      const visibility = () => page.evaluate(() => getComputedStyle(document.querySelector('#nav-menu')).visibility);
      await page.click('#nav-toggle');
      const opened = (await isOpen()) && (await page.getAttribute('#nav-toggle', 'aria-expanded')) === 'true';
      await wait(300);
      const shown = (await visibility()) === 'visible';
      await page.click('#nav-toggle');
      const closed = !(await isOpen());
      await page.click('#nav-toggle');
      await page.click('#nav-menu a[href="#skills"]');
      const closedByLink = !(await isOpen());
      await page.click('#nav-toggle');
      await page.keyboard.press('Escape');
      const closedByEsc = !(await isOpen());
      await context.close();
      return (opened && shown && closed && closedByLink && closedByEsc) || JSON.stringify({ opened, shown, closed, closedByLink, closedByEsc });
    });

    await attempt('R5-2', '부드러운 스크롤: 메뉴 클릭 시 애니메이션으로 이동 + 주소 #hash 갱신', async () => {
      const { page, context } = await openPage(browser, baseUrl, { width: 1280, height: 800 });
      await page.waitForSelector('.project-card');
      await page.click('.nav__link[href="#projects"]');
      const samples = [];
      for (let i = 0; i < 40; i++) {
        samples.push(await page.evaluate(() => Math.round(window.scrollY)));
        await wait(40);
      }
      const final = samples[samples.length - 1];
      const distinct = new Set(samples.filter((y) => y > 0 && y < final)).size;
      const offset = await page.evaluate(() => Math.round(document.querySelector('#projects').getBoundingClientRect().top));
      const hash = await page.evaluate(() => location.hash);
      await context.close();
      return (distinct >= 3 && Math.abs(offset - 64) <= 4 && hash === '#projects') || JSON.stringify({ distinct, offset, hash });
    });

    await attempt('R5-3', `스크롤 탑 버튼: 299px 숨김 / 300px 표시 / 클릭 시 맨 위로`, async () => {
      const { page, context } = await openPage(browser, baseUrl, { width: 1280, height: 800 });
      const shown = () => page.evaluate(() => getComputedStyle(document.querySelector('#scroll-top')).visibility === 'visible');
      await instantScroll(page, 299);
      await nextFrames(page);
      const at299 = await shown();
      await instantScroll(page, 300);
      await nextFrames(page);
      await wait(300);
      const at300 = await shown();
      await page.click('#scroll-top');
      await page.waitForFunction(() => window.scrollY === 0, null, { timeout: 4000 });
      await context.close();
      return (!at299 && at300) || JSON.stringify({ at299, at300 });
    });

    await attempt('R5-4', '네비게이션 스타일: 59px 그대로 / 60px 부터 배경색 변경', async () => {
      const { page, context } = await openPage(browser, baseUrl, { width: 1280, height: 800 });
      const bg = () => page.evaluate(() => getComputedStyle(document.querySelector('#site-header')).backgroundColor);
      const before = await bg();
      await instantScroll(page, 59);
      await nextFrames(page);
      const at59 = await page.evaluate(() => document.querySelector('#site-header').classList.contains('scrolled'));
      await instantScroll(page, 60);
      await nextFrames(page);
      await wait(400);
      const at60 = await page.evaluate(() => document.querySelector('#site-header').classList.contains('scrolled'));
      const after = await bg();
      await context.close();
      return (!at59 && at60 && before !== after) || JSON.stringify({ at59, at60, before, after });
    });

    await attempt('R5-5', '다크 모드: 토글 → 색상 변경 → localStorage 저장 → 새로고침 후 유지', async () => {
      const { page, context } = await openPage(browser, baseUrl, { width: 1280, colorScheme: 'light' });
      const theme = () => page.evaluate(() => document.documentElement.dataset.theme);
      const bodyBg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      const initial = await theme();
      const lightBg = await bodyBg();
      await page.click('#theme-toggle');
      await wait(400);
      const darkBg = await bodyBg();
      const saved = await page.evaluate(() => localStorage.getItem('theme'));
      await page.reload({ waitUntil: 'load' });
      const afterReload = await theme();
      await page.click('#theme-toggle');
      const backToLight = await theme();
      const savedLight = await page.evaluate(() => localStorage.getItem('theme'));
      await page.reload({ waitUntil: 'load' });
      const lightAfterReload = await theme();
      await context.close();
      const ok = initial === 'light' && saved === 'dark' && afterReload === 'dark' && darkBg !== lightBg && backToLight === 'light' && savedLight === 'light' && lightAfterReload === 'light';
      return ok || JSON.stringify({ initial, saved, afterReload, backToLight, savedLight, lightAfterReload });
    });

    await attempt('B-4', '[보너스] 시스템이 다크 모드면 처음부터 다크 (저장값 없을 때)', async () => {
      const { page, context } = await openPage(browser, baseUrl, { colorScheme: 'dark' });
      const theme = await page.evaluate(() => document.documentElement.dataset.theme);
      await context.close();
      return theme === 'dark' || `theme=${theme}`;
    });

    await attempt('R5-6', '스크롤 애니메이션: 처음엔 숨김 → 스크롤하면 .is-visible', async () => {
      const { page, context } = await openPage(browser, baseUrl, { width: 375, height: 700 });
      await page.waitForSelector('.project-card');
      const total = await page.evaluate(() => document.querySelectorAll('.reveal').length);
      const visibleAtStart = await page.evaluate(() => document.querySelectorAll('.reveal.is-visible').length);
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y <= height; y += 250) {
        await instantScroll(page, y);
        await wait(60);
      }
      await wait(700);
      const visibleAtEnd = await page.evaluate(() => document.querySelectorAll('.reveal.is-visible').length);
      await context.close();
      return (total > 8 && visibleAtStart < total && visibleAtEnd === total) || JSON.stringify({ total, visibleAtStart, visibleAtEnd });
    });

    await attempt('B-2', '[보너스] 타자기 효과: 시간이 지나면 문구가 한 글자씩 바뀜', async () => {
      const { page, context } = await openPage(browser, baseUrl);
      const read = () => page.evaluate(() => document.querySelector('#typing-text').textContent);
      const a = await read();
      await wait(350);
      const b = await read();
      await wait(350);
      const c = await read();
      await context.close();
      return new Set([a, b, c]).size >= 2 || JSON.stringify([a, b, c]);
    });

    await attempt('R3-10', '동작 줄이기(prefers-reduced-motion) 설정 시 애니메이션 없이 콘텐츠 표시', async () => {
      const { page, context } = await openPage(browser, baseUrl, { reducedMotion: 'reduce' });
      const hidden = await page.evaluate(() => document.querySelectorAll('.reveal:not(.is-visible)').length);
      await context.close();
      return hidden === 0 || `숨겨진 요소 ${hidden}개`;
    });

    // ── 폼 ────────────────────────────────────────────────────────
    await attempt('R6-1', '폼: 이름/이메일/메시지 필드와 label 클릭 시 입력창 포커스 (for-id)', async () => {
      const { page, context } = await openPage(browser, baseUrl);
      const results = [];
      for (const id of ['name', 'email', 'message']) {
        await page.click(`label[for="${id}"]`);
        results.push(await page.evaluate(() => document.activeElement.id));
      }
      await context.close();
      return (results.join() === 'name,email,message') || results.join();
    });

    await attempt('R6-2', '필수값 검증: 빈 폼 제출 불가 + 에러가 각 입력창 아래에 표시', async () => {
      const { page, context } = await openPage(browser, baseUrl);
      const before = page.url();
      await page.click('#contact-form button[type="submit"]');
      const info = await page.evaluate(() => ({
        errors: ['name', 'email', 'message'].map((id) => document.querySelector(`#${id}-error`).textContent),
        success: document.querySelector('#form-status').textContent,
        invalid: document.querySelectorAll('#contact-form .is-invalid').length,
        near: ['name', 'email', 'message'].every((id) => document.querySelector(`#${id}`).nextElementSibling === document.querySelector(`#${id}-error`)),
        focused: document.activeElement.id,
      }));
      const after = page.url();
      await context.close();
      const ok = info.errors.every(Boolean) && !info.success && info.invalid === 3 && info.near && info.focused === 'name' && before === after;
      return ok || JSON.stringify(info);
    });

    await attempt('R6-3', '이메일 형식 검증: 잘못된 형식은 에러, 올바르면 에러 해제', async () => {
      const { page, context } = await openPage(browser, baseUrl);
      const err = () => page.evaluate(() => document.querySelector('#email-error').textContent);
      await page.fill('#email', 'abc');
      await page.press('#email', 'Tab');
      const bad1 = await err();
      await page.fill('#email', 'abc@def');
      const bad2 = await err();
      await page.fill('#email', 'user@example.com');
      const good = await err();
      await context.close();
      return (/형식/.test(bad1) && /형식/.test(bad2) && good === '') || JSON.stringify({ bad1, bad2, good });
    });

    await attempt('R6-5', '제출 성공: preventDefault(주소·입력 유지) → 성공 메시지 → 입력 초기화', async () => {
      const { page, context } = await openPage(browser, baseUrl);
      const before = page.url();
      await page.fill('#name', '홍길동');
      await page.fill('#email', 'gildong@example.com');
      await page.fill('#message', '안녕하세요, 포트폴리오 잘 봤습니다.');
      await page.click('#contact-form button[type="submit"]');
      const info = await page.evaluate(() => ({
        status: document.querySelector('#form-status').textContent,
        success: document.querySelector('#form-status').classList.contains('is-success'),
        values: ['name', 'email', 'message'].map((id) => document.querySelector(`#${id}`).value),
        errors: ['name', 'email', 'message'].map((id) => document.querySelector(`#${id}-error`).textContent),
      }));
      const same = page.url() === before;
      await context.close();
      const ok = info.success && info.status.length > 0 && info.values.every((v) => v === '') && info.errors.every((e) => e === '') && same;
      return ok || JSON.stringify(info);
    });

    // ── GitHub API 4가지 상태 ─────────────────────────────────────
    await attempt('R8-2', '로딩 상태: 요청 중 스피너 + "로딩 중..."', async () => {
      const { page, context } = await openPage(browser, baseUrl, { api: 'slow' });
      const during = await page.evaluate(() => ({
        text: document.querySelector('#projects-status').textContent.trim(),
        spinner: Boolean(document.querySelector('#projects-status .spinner')),
        busy: document.querySelector('#projects-grid').getAttribute('aria-busy'),
        cards: document.querySelectorAll('.project-card').length,
      }));
      await page.waitForSelector('.project-card');
      const after = await page.evaluate(() => document.querySelector('#projects-status').textContent.trim());
      await context.close();
      return (/로딩 중/.test(during.text) && during.spinner && during.busy === 'true' && during.cards === 0 && after === '') || JSON.stringify({ during, after });
    });

    await attempt('R8-3', '성공 상태: 카드 렌더링 (fork 제외, 설명 없음/언어 없음 처리, 링크 보안 속성)', async () => {
      const { page, context } = await openPage(browser, baseUrl);
      await page.waitForSelector('.project-card');
      const info = await page.evaluate(() => {
        const cards = [...document.querySelectorAll('.project-card')];
        const first = cards[0].querySelector('a');
        return {
          count: cards.length,
          hasFork: document.body.textContent.includes('forked-lib'),
          noDesc: cards.some((c) => c.textContent.includes('설명이 없습니다')),
          noLang: cards.some((c) => c.textContent.includes('기타')),
          href: first.getAttribute('href'),
          rel: first.getAttribute('rel'),
          target: first.getAttribute('target'),
          article: cards.every((c) => c.tagName === 'ARTICLE'),
        };
      });
      await context.close();
      const ok = info.count === 6 && !info.hasFork && info.noDesc && info.noLang && info.href.startsWith('https://github.com/') && /noopener/.test(info.rel) && info.target === '_blank' && info.article;
      return ok || JSON.stringify(info);
    });

    await attempt('R8-4', '에러 상태: 500 / 403(레이트 리밋) / 404 / 네트워크 실패 → 메시지 + "다시 시도" 버튼', async () => {
      const found = {};
      for (const mode of ['http500', 'rate403', 'notfound', 'network']) {
        const { page, context } = await openPage(browser, baseUrl, { api: mode });
        await page.waitForSelector('.state--error');
        found[mode] = await page.evaluate(() => ({
          title: document.querySelector('.state__title').textContent,
          detail: document.querySelector('.state__detail').textContent,
          retry: document.querySelector('[data-action="retry"]')?.textContent.trim(),
          cards: document.querySelectorAll('.project-card').length,
        }));
        await context.close();
      }
      const ok = Object.values(found).every((f) => /프로젝트를 불러올 수 없습니다/.test(f.title) && f.retry === '다시 시도' && f.cards === 0) && /요청 한도/.test(found.rate403.detail) && /찾을 수 없/.test(found.notfound.detail) && /네트워크/.test(found.network.detail);
      return ok || JSON.stringify(found);
    });

    await attempt('R8-4b', '재시도: "다시 시도" 클릭 → 다시 로딩 → 성공 (중복 클릭해도 요청 1회)', async () => {
      const { page, context, control } = await openPage(browser, baseUrl, { api: 'http500' });
      await page.waitForSelector('.state--error');
      control.mode = 'slow';
      const callsBefore = control.calls;
      await page.click('[data-action="retry"]');
      const loading = await page.evaluate(() => Boolean(document.querySelector('.spinner')));
      await page.waitForSelector('.project-card');
      const errorGone = await page.evaluate(() => !document.querySelector('.state--error'));
      await context.close();
      return (loading && errorGone && control.calls - callsBefore === 1) || JSON.stringify({ loading, errorGone, extraCalls: control.calls - callsBefore });
    });

    await attempt('R8-5', '빈 상태: 저장소 0개 / fork 만 있을 때 "표시할 프로젝트가 없습니다."', async () => {
      const texts = [];
      for (const mode of ['empty', 'allforks']) {
        const { page, context } = await openPage(browser, baseUrl, { api: mode });
        await page.waitForSelector('.state--empty');
        texts.push(await page.evaluate(() => document.querySelector('.state--empty').textContent.trim()));
        await context.close();
      }
      return texts.every((t) => t === '표시할 프로젝트가 없습니다.') || JSON.stringify(texts);
    });

    await attempt('B-1', '[보너스] 언어 필터: 클릭 → 목록 변경 → aria-pressed / 포커스 유지', async () => {
      const { page, context } = await openPage(browser, baseUrl);
      await page.waitForSelector('.project-card');
      const langs = await page.evaluate(() => [...document.querySelectorAll('#project-filters [data-filter]')].map((b) => b.dataset.filter));
      await page.click('#project-filters [data-filter="JavaScript"]');
      const js = await page.evaluate(() => ({
        cards: document.querySelectorAll('.project-card').length,
        pressed: document.querySelector('#project-filters [data-filter="JavaScript"]').getAttribute('aria-pressed'),
        focusKept: document.activeElement.dataset.filter === 'JavaScript',
      }));
      await page.click('#project-filters [data-filter="all"]');
      const all = await page.evaluate(() => document.querySelectorAll('.project-card').length);
      await context.close();
      const ok = langs[0] === 'all' && langs.length >= 4 && js.cards === 2 && js.pressed === 'true' && js.focusKept && all === 6;
      return ok || JSON.stringify({ langs, js, all });
    });

    await attempt('SEC-1', '보안: API 응답에 악성 HTML/javascript: 주소가 있어도 실행되지 않음 (XSS 방지)', async () => {
      const { page, context } = await openPage(browser, baseUrl, { api: 'xss' });
      await page.waitForSelector('.project-card');
      await wait(300);
      const info = await page.evaluate(() => ({
        executed: window.__xss === 1,
        injectedImg: Boolean(document.querySelector('.project-card img')),
        showsAsText: document.querySelector('.project-card').textContent.includes('<img src=x'),
        jsLink: [...document.querySelectorAll('.project-card a')].some((a) => a.href.startsWith('javascript:')),
      }));
      await context.close();
      return (!info.executed && !info.injectedImg && info.showsAsText && !info.jsLink) || JSON.stringify(info);
    });

    // ── 전체 품질 ─────────────────────────────────────────────────
    await attempt('C-3', '콘솔 에러 / 미처리 예외 없음 (정상 시나리오)', async () => {
      const { page, context, errors } = await openPage(browser, baseUrl);
      await page.waitForSelector('.project-card');
      await page.click('#theme-toggle');
      await page.click('#contact-form button[type="submit"]');
      await page.click('.nav__link[href="#about"]');
      await wait(500);
      await context.close();
      return errors.length === 0 || errors.join(' | ');
    });

    await attempt('C-2b', '실행 중에도 인라인 style 속성이 생기지 않음', async () => {
      const { page, context } = await openPage(browser, baseUrl, { width: 375 });
      await page.waitForSelector('.project-card');
      await page.click('#nav-toggle');
      await instantScroll(page, 500);
      await nextFrames(page);
      const count = await page.evaluate(() => document.querySelectorAll('[style]').length);
      await context.close();
      return count === 0 || `[style] 요소 ${count}개`;
    });

    await attempt('R4-1b', '실행 결과: 모든 script 가 defer 이고 로드 후 DOM 이 완성된 상태에서 실행', async () => {
      const { page, context } = await openPage(browser, baseUrl);
      const info = await page.evaluate(() => ({ allDefer: [...document.scripts].every((s) => s.defer), year: document.querySelector('#year').textContent }));
      await context.close();
      return (info.allDefer && info.year === String(new Date().getFullYear())) || JSON.stringify(info);
    });
  } finally {
    await browser.close();
  }
}

// ---------------------------------------------------------------------------
// 실행
// ---------------------------------------------------------------------------
(async () => {
  await runStaticChecks();

  if (!staticOnly) {
    const { server, url } = await startServer();
    try {
      await runBrowserChecks(url);
    } finally {
      server.close();
    }
  }

  const count = (status) => results.filter((r) => r.status === status).length;
  console.log(color(1, '\n■ 요약'));
  console.log(`PASS ${count('PASS')}  /  FAIL ${count('FAIL')}  /  WARN ${count('WARN')}  /  INFO ${count('INFO')}`);
  console.log(color(1, '\n■ 자동으로 확인할 수 없는 항목 (직접 확인)'));
  console.log(' - R10-5  배포된 GitHub Pages URL 에서 모든 기능이 동작하는가 (브라우저로 직접 접속)');
  console.log(' - R10-6  실제 GitHub API 응답(본인 저장소)이 카드로 표시되는가 (배포 URL 에서 확인)');
  console.log(' - R11    데스크톱/모바일/다크모드 스크린샷 제출 (배포 URL 기준으로 다시 촬영 권장)');
  process.exitCode = count('FAIL') > 0 ? 1 : 0;
})();
