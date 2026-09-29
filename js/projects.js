// projects.js — GitHub API 연동 + 로딩/성공/에러/빈 상태 + 언어 필터
//
// 흐름:
//   loadProjects()  ─ setProjectsState({status:'loading'}) ─▶ renderProjects()  (스피너)
//        │  fetch 성공
//        ├─ 데이터 있음 ─ setProjectsState({status:'success', repos}) ─▶ renderProjects()  (카드)
//        ├─ 데이터 없음 ─ setProjectsState({status:'empty'})          ─▶ renderProjects()  (빈 메시지)
//        └─ 실패(catch) ─ setProjectsState({status:'error'})          ─▶ renderProjects()  (에러 + 재시도)
//   필터 버튼 클릭 ─ setProjectsState({filter}) ─▶ renderProjects()  (카드 목록 변경)

const FILTER_ALL = 'all';

// 상태: 화면에 그려질 모든 정보는 이 객체 하나에서 나온다.
const projectsState = {
  status: 'idle', // 'idle' | 'loading' | 'success' | 'empty' | 'error'
  repos: [], // 화면용으로 가공한 저장소 목록
  filter: FILTER_ALL, // 선택된 언어 필터
  errorMessage: '', // 에러 상태일 때 보여 줄 원인 설명
};

// 상태를 바꾸고 곧바로 화면을 다시 그린다. (React의 setState와 같은 발상)
function setProjectsState(patch) {
  Object.assign(projectsState, patch);
  renderProjects();
}

// ---------------------------------------------------------------------------
// 데이터: 가져오기 → 가공하기
// ---------------------------------------------------------------------------

// GitHub 응답(필드가 매우 많음)에서 필요한 값만 꺼내 우리가 쓰기 좋은 모양으로 바꾼다.
// 구조분해 할당으로 꺼내면서 이름을 바꾸고(html_url: url), 기본값도 준다.
const toProject = ({
  id,
  name,
  description,
  html_url: url,
  homepage,
  language,
  stargazers_count: stars,
  forks_count: forks,
  updated_at: updatedAt,
}) => ({
  id,
  name,
  description: description ?? '',
  url,
  homepage: homepage ?? '',
  language: language ?? '기타',
  stars,
  forks,
  updatedAt,
});

async function fetchRepos() {
  const { githubUsername, reposPerPage, requestTimeoutMs } = CONFIG;
  const endpoint = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=${reposPerPage}`;

  // 응답이 너무 오래 안 오면 스피너가 영원히 도는 것을 막기 위해 요청을 중단시킨다.
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch(endpoint, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    });

    // fetch는 404/403/500 이어도 "성공"으로 돌려준다. ok(200~299)인지 우리가 직접 확인해야 한다.
    if (!response.ok) {
      const error = new Error(`GitHub API 응답 오류: ${response.status}`);
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('예상하지 못한 응답 형식입니다.');
    return data;
  } finally {
    clearTimeout(timerId); // 성공/실패와 관계없이 타이머 정리
  }
}

// 에러 종류에 따라 사용자에게 보여 줄 설명을 고른다.
function describeError(error) {
  if (error.name === 'AbortError') return '응답이 너무 늦어 요청을 중단했습니다.';
  if (error.status === 403 || error.status === 429) {
    return 'GitHub API 요청 한도(인증 없이 시간당 60회)를 넘었습니다. 잠시 후 다시 시도해 주세요.';
  }
  if (error.status === 404) return `GitHub 사용자 '${CONFIG.githubUsername}'를 찾을 수 없습니다.`;
  if (error.status) return `서버가 오류를 돌려주었습니다. (상태 코드 ${error.status})`;
  return '네트워크 연결을 확인해 주세요.';
}

async function loadProjects() {
  if (projectsState.status === 'loading') return; // 연타로 중복 요청되는 것을 방지

  setProjectsState({ status: 'loading', errorMessage: '' });

  try {
    const data = await fetchRepos();
    const repos = data
      .filter(({ fork }) => !fork) // 남의 저장소를 fork 한 것은 제외
      .map(toProject); // 카드에 필요한 모양으로 변환

    setProjectsState({
      repos,
      filter: FILTER_ALL,
      status: repos.length > 0 ? 'success' : 'empty',
    });
  } catch (error) {
    setProjectsState({ status: 'error', repos: [], errorMessage: describeError(error) });
  }
}

// ---------------------------------------------------------------------------
// 렌더링: projectsState → DOM
// ---------------------------------------------------------------------------

const formatDate = (isoString) =>
  new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(
    new Date(isoString),
  );

// 템플릿 리터럴로 카드 1장의 HTML 문자열을 만든다.
// API에서 온 값(이름/설명/주소)은 전부 escapeHtml 을 거친 뒤 끼워 넣는다.
const createProjectCard = ({ name, description, url, homepage, language, stars, forks, updatedAt }) => {
  const liveUrl = toSafeUrl(homepage);

  return `
    <article class="card project-card">
      <h3 class="project-card__title">
        <a href="${escapeHtml(toSafeUrl(url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(name)}</a>
      </h3>
      <p class="project-card__desc">${description ? escapeHtml(description) : '설명이 없습니다.'}</p>
      <ul class="project-card__meta">
        <li><span class="lang-dot" data-lang="${escapeHtml(language)}"></span>${escapeHtml(language)}</li>
        <li><span aria-hidden="true">★</span> ${Number(stars)}<span class="visually-hidden"> 스타</span></li>
        <li><span aria-hidden="true">⑂</span> ${Number(forks)}<span class="visually-hidden"> 포크</span></li>
      </ul>
      <div class="project-card__foot">
        <span>업데이트 ${formatDate(updatedAt)}</span>
        ${liveUrl ? `<a href="${escapeHtml(liveUrl)}" target="_blank" rel="noopener noreferrer">데모 보기</a>` : ''}
      </div>
    </article>`;
};

// 로딩/에러/빈 상태 메시지 영역
function renderProjectsStatus() {
  const box = document.querySelector('#projects-status');
  const { status, errorMessage } = projectsState;

  switch (status) {
    case 'loading':
      box.innerHTML = `
        <div class="state state--loading">
          <span class="spinner" aria-hidden="true"></span>
          <p>로딩 중...</p>
        </div>`;
      break;
    case 'error':
      box.innerHTML = `
        <div class="state state--error">
          <p class="state__title">프로젝트를 불러올 수 없습니다.</p>
          <p class="state__detail">${escapeHtml(errorMessage)}</p>
          <button type="button" class="btn btn--primary" data-action="retry">다시 시도</button>
        </div>`;
      break;
    case 'empty':
      box.innerHTML = `
        <div class="state state--empty">
          <p>표시할 프로젝트가 없습니다.</p>
        </div>`;
      break;
    default: // 'idle', 'success' → 메시지 영역은 비운다.
      box.innerHTML = '';
  }
}

// 언어 필터 버튼 영역. 버튼을 매번 새로 만들면 키보드 포커스를 잃으므로,
// 언어 목록이 바뀔 때만 새로 만들고 평소에는 "선택 표시"만 갱신한다.
let renderedFilterKey = '';

function renderProjectFilters() {
  const bar = document.querySelector('#project-filters');
  const { status, repos, filter } = projectsState;

  const languages = [...new Set(repos.map(({ language }) => language))].sort();
  const hasFilters = status === 'success' && languages.length > 1;

  bar.hidden = !hasFilters;
  if (!hasFilters) {
    bar.innerHTML = '';
    renderedFilterKey = '';
    return;
  }

  const key = languages.join('|');
  if (key !== renderedFilterKey) {
    bar.innerHTML = [FILTER_ALL, ...languages]
      .map(
        (language) =>
          `<button type="button" class="chip" data-filter="${escapeHtml(language)}" aria-pressed="false">${
            language === FILTER_ALL ? '전체' : escapeHtml(language)
          }</button>`,
      )
      .join('');
    renderedFilterKey = key;
  }

  bar.querySelectorAll('[data-filter]').forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

// 카드 목록 영역
function renderProjectCards() {
  const grid = document.querySelector('#projects-grid');
  const { status, repos, filter } = projectsState;

  grid.setAttribute('aria-busy', String(status === 'loading'));

  if (status !== 'success') {
    grid.innerHTML = '';
    return;
  }

  const visibleRepos =
    filter === FILTER_ALL ? repos : repos.filter(({ language }) => language === filter);

  grid.innerHTML = visibleRepos.map(createProjectCard).join('');
  observeReveal(grid.querySelectorAll('.project-card')); // 새 카드에도 등장 애니메이션 적용
}

function renderProjects() {
  renderProjectsStatus();
  renderProjectFilters();
  renderProjectCards();
}

// ---------------------------------------------------------------------------
// 이벤트 연결
// ---------------------------------------------------------------------------
function initProjects() {
  // 이벤트 위임: 버튼은 화면이 다시 그려질 때마다 새로 만들어지므로,
  // 사라지지 않는 부모 요소에 리스너를 하나만 달고 "누가 눌렸는지"를 event.target 으로 판별한다.
  document.querySelector('#projects-status').addEventListener('click', (event) => {
    if (event.target.closest('[data-action="retry"]')) loadProjects();
  });

  document.querySelector('#project-filters').addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (button) setProjectsState({ filter: button.dataset.filter });
  });

  loadProjects();
}
