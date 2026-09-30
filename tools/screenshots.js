#!/usr/bin/env node
/**
 * tools/screenshots.js — README/제출용 스크린샷 생성 (images/screenshots/*.png)
 *
 *   node tools/screenshots.js                 로컬 서버 + 샘플 API 응답으로 촬영
 *   node tools/screenshots.js <배포 URL>       배포된 사이트를 실제 GitHub API 로 촬영 (제출용 권장)
 *
 * 샘플 응답으로 찍은 사진은 "테스트 화면"이다. 제출 전에 배포 URL 로 다시 찍어 교체할 것.
 */
const fs = require('fs');
const path = require('path');
const { ROOT, startServer, loadPlaywright, SAMPLE_REPOS } = require('./lib');

const OUT = path.join(ROOT, 'images', 'screenshots');
const remoteUrl = process.argv[2];
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function prepare(browser, url, { width, height, colorScheme = 'light', mock = !remoteUrl, mode = 'success' }) {
  const context = await browser.newContext({ viewport: { width, height }, colorScheme, deviceScaleFactor: 1 });
  const page = await context.newPage();
  if (mock) {
    await page.route('https://api.github.com/**', async (route) => {
      if (mode === 'slow') await new Promise(() => {}); // 응답하지 않음 → 로딩 상태 유지
      const fail = mode === 'error';
      const body = mode === 'empty' ? [] : fail ? { message: 'API rate limit exceeded' } : SAMPLE_REPOS;
      await route.fulfill({
        status: fail ? 403 : 200,
        contentType: 'application/json',
        headers: { 'access-control-allow-origin': '*' },
        body: JSON.stringify(body),
      });
    });
  }
  await page.goto(url, { waitUntil: 'load' });
  return { context, page };
}

// 스크롤 등장 애니메이션이 모두 끝나도록 끝까지 내려갔다가 맨 위로 돌아온다.
async function revealEverything(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= height; y += 300) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
    await wait(80);
  }
  await wait(800);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await wait(500);
}

(async () => {
  const playwright = loadPlaywright();
  if (!playwright) throw new Error('Playwright 를 찾을 수 없습니다. (npm i -g playwright)');
  fs.mkdirSync(OUT, { recursive: true });

  const local = remoteUrl ? null : await startServer();
  const url = remoteUrl || local.url;
  const browser = await playwright.chromium.launch();
  const save = (name) => path.join(OUT, name);

  try {
    // 데스크톱 (라이트 / 다크)
    for (const [file, scheme] of [['desktop.png', 'light'], ['dark.png', 'dark']]) {
      const { context, page } = await prepare(browser, url, { width: 1280, height: 800, colorScheme: scheme });
      await page.waitForSelector('.project-card, .state--error, .state--empty');
      await revealEverything(page);
      await page.screenshot({ path: save(file), fullPage: true });
      await context.close();
    }

    // 모바일 (라이트 / 다크) + 햄버거 메뉴 열린 모습
    for (const [file, scheme] of [['mobile.png', 'light'], ['mobile-dark.png', 'dark']]) {
      const { context, page } = await prepare(browser, url, { width: 375, height: 760, colorScheme: scheme });
      await page.waitForSelector('.project-card, .state--error, .state--empty');
      await revealEverything(page);
      await page.screenshot({ path: save(file), fullPage: true });
      if (scheme === 'light') {
        await page.click('#nav-toggle');
        await wait(400);
        await page.screenshot({ path: save('mobile-menu.png') });
      }
      await context.close();
    }

    // Projects 섹션의 상태별 화면 (샘플 응답 모드에서만)
    if (!remoteUrl) {
      for (const [file, mode, selector] of [
        ['state-loading.png', 'slow', '.state--loading'],
        ['state-error.png', 'error', '.state--error'],
        ['state-empty.png', 'empty', '.state--empty'],
      ]) {
        const { context, page } = await prepare(browser, url, { width: 1280, height: 800, mode });
        await page.waitForSelector(selector);
        await page.evaluate(() => document.querySelector('#projects').scrollIntoView({ behavior: 'instant' }));
        await wait(1000);
        await page.locator('#projects').screenshot({ path: save(file) });
        await context.close();
      }
    }
    console.log(`스크린샷 저장 완료: ${path.relative(ROOT, OUT)}/`);
    console.log(fs.readdirSync(OUT).map((f) => ` - ${f}`).join('\n'));
  } finally {
    await browser.close();
    if (local) local.server.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
