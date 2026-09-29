// tools/lib.js — verify.js / screenshots.js 가 함께 쓰는 개발용 도구 (사이트 코드와 무관)
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
  '.md': 'text/markdown; charset=utf-8',
};

// 의존성 없는 정적 서버. GitHub Pages 처럼 저장소 루트를 그대로 서빙한다.
function startServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const filePath = path.join(ROOT, urlPath.endsWith('/') ? `${urlPath}index.html` : urlPath);
    if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, url: `http://127.0.0.1:${server.address().port}/` });
    });
  });
}

// playwright 는 사이트 의존성이 아니라 "검증 도구"일 뿐이다. 전역 설치본도 찾아본다.
function loadPlaywright() {
  const candidates = ['playwright'];
  try {
    candidates.push(path.join(execSync('npm root -g', { encoding: 'utf8' }).trim(), 'playwright'));
  } catch {
    /* npm 없음 */
  }
  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch {
      /* 다음 후보 */
    }
  }
  return null;
}

// GitHub API 응답을 흉내 낸 샘플 데이터 (테스트/스크린샷 전용)
const repo = (id, overrides = {}) => ({
  id,
  name: `sample-repo-${id}`,
  description: `샘플 저장소 ${id}의 설명입니다.`,
  html_url: `https://github.com/example/sample-repo-${id}`,
  homepage: '',
  language: 'JavaScript',
  fork: false,
  stargazers_count: id,
  forks_count: 0,
  updated_at: '2026-09-01T09:00:00Z',
  ...overrides,
});

const SAMPLE_REPOS = [
  repo(1, { name: 'portfolio-site', description: 'HTML/CSS/JS로 만든 반응형 포트폴리오', language: 'JavaScript', stargazers_count: 5, homepage: 'https://example.com/portfolio' }),
  repo(2, { name: 'css-playground', description: 'Flexbox와 Grid 연습장', language: 'CSS', stargazers_count: 3 }),
  repo(3, { name: 'algorithm-notes', description: '알고리즘 풀이 기록', language: 'Python', stargazers_count: 2, forks_count: 1 }),
  repo(4, { name: 'todo-app', description: '', language: 'JavaScript', stargazers_count: 1 }),
  repo(5, { name: 'landing-page', description: '정적 랜딩 페이지 실습', language: 'HTML', stargazers_count: 0 }),
  repo(6, { name: 'notes', description: '언어 정보가 없는 저장소', language: null, stargazers_count: 0 }),
  repo(7, { name: 'forked-lib', description: 'fork 한 저장소는 목록에서 제외되어야 함', language: 'JavaScript', fork: true }),
];

module.exports = { ROOT, startServer, loadPlaywright, repo, SAMPLE_REPOS };
