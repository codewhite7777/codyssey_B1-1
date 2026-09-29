# 평가 체크리스트 — 요구사항 ↔ 구현 ↔ 확인 방법

> **이 표는 과제 명세서의 "기능 요구 사항 / 제약 사항 / 제출물"을 항목별로 쪼개서 만든 것입니다.**
> Codyssey가 별도의 채점 기준표(루브릭)를 제공한다면, 그 항목명에 맞춰 아래 "요구사항" 열을 바꿔 쓰면 됩니다. 구현 위치와 확인 방법은 그대로 재사용할 수 있습니다.

## 사용법

1. **자동 점검** — 터미널에서 실행하고 `FAIL`이 없는지 봅니다.
   ```bash
   node tools/verify.js            # 정적 검사 + 브라우저(Playwright) 검사
   node tools/verify.js --static   # 정적 검사만 (Node.js 만 필요)
   ```
2. **수동 확인** — 자동으로 못 보는 항목(디자인 품질, 배포 URL, 실제 GitHub 응답)은 아래 "수동 확인" 열대로 직접 봅니다.
3. **설명 준비** — 각 항목의 "구현 위치"를 열어 두고 *왜 그렇게 했는지* 말할 수 있는지 확인합니다. (`docs/03-peer-review-guide.md`)

표의 **자동 ID**는 `tools/verify.js` 출력의 항목 번호와 같습니다. 자동 점검은 "요구사항을 만족하는 근거"이지 "이해했다는 증명"이 아닙니다.

범례: ✅ 구현·자동 점검 통과 / 👀 사람이 직접 확인 / ⭐ 보너스(선택)

---

## 1. 프로젝트 기본 구성

| 요구사항 | 구현 위치 | 수동 확인 | 자동 ID | 상태 |
| --- | --- | --- | --- | :---: |
| `index.html`, `css/`, `js/`, `images/` 역할 분리 | 저장소 루트 구조 | 파일 탐색기에서 폴더 확인 | R1-1 | ✅ |
| 외부 CSS/JS를 HTML에 올바르게 연결 | `index.html` › `<link rel="stylesheet">`, `<script defer src>` | 페이지가 스타일·동작과 함께 열리면 OK | R1-2 | ✅ |
| VS Code + Live Server 개발 환경 | README › 실행 방법 | `Go Live` 후 저장하면 자동 새로고침되는지 | — | 👀 |

## 2. HTML 구조 (시맨틱 마크업)

| 요구사항 | 구현 위치 | 수동 확인 | 자동 ID | 상태 |
| --- | --- | --- | --- | :---: |
| 시맨틱 태그 사용 (`header` `nav` `main` `section` `article` `footer`) | `index.html` 전체 (카드류는 `article`) | DevTools › Elements에서 태그 구조 확인 | R2-1 | ✅ |
| 섹션: Hero · About · Skills · Projects · Contact · Footer | `index.html` › `#hero` `#about` `#skills` `#projects` `#contact` `<footer>` | 위→아래로 스크롤하며 6개 섹션 확인. Hero에 인사말+CTA 2개, About에 소개+프로필 이미지, Footer에 저작권+소셜 링크 | R2-2 | ✅ |
| 네비게이션 앵커 링크 | `index.html` › `.nav__menu` 의 `href="#about"` 등 | 메뉴 클릭 시 해당 섹션으로 이동 | R2-3 | ✅ |
| 모든 이미지에 의미 있는 `alt` | `index.html` › `.about__photo img` (아이콘 SVG는 `aria-hidden`) | alt가 "이미지"처럼 성의 없지 않은지 | R2-4 | ✅ |
| 폼 요소에 `<label for>` ↔ `id` 매칭 | `index.html` › `#contact-form` | 라벨 글자를 클릭하면 입력창에 포커스 | R2-5, R6-1 | ✅ |

## 3. CSS 스타일링 (레이아웃 & 반응형)

| 요구사항 | 구현 위치 | 수동 확인 | 자동 ID | 상태 |
| --- | --- | --- | --- | :---: |
| 외부 스타일시트 `css/style.css` | `index.html` › `<link>` | — | R3-1 | ✅ |
| `:root` 변수로 색상·폰트·간격 정의 | `css/style.css` › `:root` (`--color-*` `--font-*` `--space-*`) | DevTools › Elements › `<html>` › Styles | R3-2 | ✅ |
| 다크 모드용 변수 별도 정의 | `css/style.css` › `[data-theme="dark"]` | `<html data-theme="dark">`로 바꿔 보기 | R3-3 | ✅ |
| 네비게이션 **Flexbox** (로고 왼쪽, 메뉴 오른쪽) | `css/style.css` › `.nav` (`display:flex; justify-content:space-between`) + 태블릿 이상 `.nav__menu { margin-left:auto }` | 1280px에서 로고·메뉴 위치 | R3-4, R3-4b | ✅ |
| Projects 카드 **Grid** (`auto-fit` + `minmax`) | `css/style.css` › `.projects__grid` | 창 폭을 줄이면 3열→2열→1열 | R3-5, R3-5b | ✅ |
| 모바일 퍼스트, 브레이크포인트 768px / 1024px | `css/style.css` › 맨 아래 `@media (min-width: 768px)`, `(min-width: 1024px)` | DevTools 기기 툴바에서 폭 조절 | R3-6 | ✅ |
| 모바일: 네비게이션 숨김 + 햄버거 표시 | `css/style.css` › `.nav__menu`(기본 숨김), `.nav__toggle` | 767px↔768px 경계에서 전환 | R3-7 | ✅ |
| 버튼·카드 hover + transition | `css/style.css` › `.btn`, `.card` (`:hover`, `transition`) | 마우스를 올려 보기 | R3-8 | ✅ |
| 카드 `box-shadow` | `css/style.css` › `.card` | 카드 그림자 확인 | R3-9 | ✅ |
| (추가) 동작 줄이기 설정 존중 | `css/style.css` › `@media (prefers-reduced-motion)`, `js/effects.js` › `initRevealOnScroll` | OS의 "동작 줄이기" 켠 뒤 새로고침 | R3-10 | ✅ |

## 4. JavaScript 기초 (DOM & 이벤트)

| 요구사항 | 구현 위치 | 수동 확인 | 자동 ID | 상태 |
| --- | --- | --- | --- | :---: |
| 스크립트를 `defer`로 연결 | `index.html` › `<script defer src=…>` 8개 | DevTools › Elements에서 script 태그 확인 | R4-1, R4-1b | ✅ |
| `var` 미사용, `const`/`let`만 사용 | `js/*.js` 전체 | 편집기에서 `var ` 검색 → 0건 | R4-2 | ✅ |
| `onclick` 속성 금지, `addEventListener` 사용 | `js/*.js` 전체 (`index.html`에 `on*=` 없음) | 편집기에서 `onclick` 검색 → 0건 | R4-3 | ✅ |
| `querySelector`, `querySelectorAll` | `js/nav.js`, `js/projects.js` 등 | — | R4-4 | ✅ |
| `textContent`, `innerHTML` | `js/form.js`(textContent), `js/projects.js`(innerHTML) | — | R4-4 | ✅ |
| `classList.add` / `remove` / `toggle` | `js/effects.js`, `js/nav.js`, `js/form.js` | — | R4-4 | ✅ |
| `click` `submit` `scroll` `input` 이벤트 | `js/nav.js`(click) · `js/form.js`(submit, input) · `js/effects.js`(scroll) | — | R4-5 | ✅ |
| `event.preventDefault()` | `js/form.js` › submit 핸들러, `js/nav.js` › `initSmoothScroll` | 폼 제출 시 페이지가 새로고침되지 않음 | R4-6, R6-5 | ✅ |

## 5. 인터랙션 (6종 모두 동작)

| 요구사항 | 구현 위치 | 수동 확인 | 자동 ID | 상태 |
| --- | --- | --- | --- | :---: |
| ① 햄버거 메뉴 토글 (`classList.toggle('active')`) | `js/nav.js` › `initNavigation` | 375px에서 버튼 클릭/재클릭, 링크 클릭·Esc·바깥 클릭으로 닫힘 | R5-1 | ✅ |
| ② 부드러운 스크롤 | `js/nav.js` › `initSmoothScroll` (`scrollIntoView`) + CSS `scroll-behavior` | 메뉴 클릭 시 순간이동이 아니라 굴러가듯 이동 | R5-2 | ✅ |
| ③ 스크롤 탑 버튼 (300px 이상 표시, 클릭 시 맨 위) | `js/effects.js` › `initScrollEffects`, 기준값 `js/config.js` › `scrollTopThreshold` | 299px/300px 경계, 클릭 | R5-3 | ✅ |
| ④ 네비게이션 스타일 변경 (60px 이상) | `js/effects.js` › `initScrollEffects`, `css/style.css` › `.site-header.scrolled` | 살짝 스크롤하면 배경 생김 | R5-4 | ✅ |
| ⑤ 다크 모드 + localStorage 유지 | `js/theme.js` 전체, `js/utils.js` › `readStorage`/`writeStorage` | 토글 → 새로고침 → 유지. DevTools › Application › Local Storage `theme` | R5-5 | ✅ |
| ⑥ 스크롤 애니메이션 (Intersection Observer, threshold ≥ 0.2) | `js/effects.js` › `initRevealOnScroll`/`observeReveal`, `js/config.js` › `revealThreshold: 0.2` | 스크롤할 때 요소가 아래에서 떠오름 | R5-6 | ✅ |
| README에 기준값 명시 | `README.md` › 기준값 표 | 60px / 300px / 0.2 기재 확인 | R10-2 | ✅ |

## 6. 폼 UX

| 요구사항 | 구현 위치 | 수동 확인 | 자동 ID | 상태 |
| --- | --- | --- | --- | :---: |
| 이름·이메일·메시지 폼 | `index.html` › `#contact-form` | — | R6-1 | ✅ |
| 필수값 검증 (빈 필드 제출 불가) | `js/form.js` › `fieldValidators`, submit 핸들러 | 빈 채로 "보내기" → 에러 3개, 성공 메시지 없음 | R6-2 | ✅ |
| 이메일 형식 검증 | `js/form.js` › `EMAIL_PATTERN`, `fieldValidators.email` | `abc`, `abc@def` 입력 시 에러 | R6-3 | ✅ |
| 에러 메시지가 입력 필드 근처에 표시 | `index.html` › 각 `input` 바로 아래 `.field__error` | 에러가 입력창 바로 밑에 뜨는지 | R6-2 | ✅ |
| `preventDefault()` + 성공 메시지 | `js/form.js` › submit 핸들러 › `renderContactForm` | 올바르게 입력 후 제출 → 초록 메시지, 입력칸 비워짐, 주소창 변화 없음 | R6-5 | ✅ |

## 7. ES6+ 문법 & 배열 메서드

| 요구사항 | 구현 위치 | 수동 확인 | 자동 ID | 상태 |
| --- | --- | --- | --- | :---: |
| 화살표 함수 | `js/*.js` 전반 (예: `js/utils.js` › `sleep`) | — | R7-1 | ✅ |
| 템플릿 리터럴로 HTML 동적 생성 | `js/projects.js` › `createProjectCard`, `renderProjectsStatus` | — | R7-2 | ✅ |
| 구조분해 할당 | `js/projects.js` › `toProject`(이름 바꾸기·기본값), `js/form.js` › `const { name, value } = event.target` | — | R7-3 | ✅ |
| `map` — GitHub 데이터를 카드 HTML로 | `js/projects.js` › `renderProjectCards`(`visibleRepos.map(createProjectCard)`), `loadProjects`(`.map(toProject)`) | — | R7-4 | ✅ |
| `filter` — 조건에 맞는 프로젝트만 (선택) | `js/projects.js` › `loadProjects`(fork 제외), `renderProjectCards`(언어 필터) | 필터 버튼 클릭 ⭐ | R7-4, B-1 | ✅ |
| `forEach` — 배열 순회 | `js/nav.js` › `initSmoothScroll`, `js/effects.js` › `observeReveal` 등 | — | R7-4 | ✅ |

## 8. 비동기 처리 & API 연동

| 요구사항 | 구현 위치 | 수동 확인 | 자동 ID | 상태 |
| --- | --- | --- | --- | :---: |
| `fetch` + `async/await`, 엔드포인트 `https://api.github.com/users/{아이디}/repos` | `js/projects.js` › `fetchRepos`, 아이디는 `js/config.js` › `githubUsername` | DevTools › Network에서 요청 확인 | R8-1 | ✅ |
| **로딩 상태**: 스피너 또는 "로딩 중..." | `js/projects.js` › `renderProjectsStatus` (`case 'loading'`) | Network › Throttling: Slow 3G 후 새로고침 | R8-2 | ✅ |
| **성공 상태**: 카드 리스트 | `js/projects.js` › `renderProjectCards`, `createProjectCard` | 배포 URL에서 내 저장소가 카드로 표시 | R8-3 👀 | ✅ |
| **에러 상태**: "프로젝트를 불러올 수 없습니다" + 재시도 버튼 | `js/projects.js` › `case 'error'`, `describeError`, `initProjects`(이벤트 위임) | Network에서 `repos` 요청 차단(Block request URL) → 새로고침 → 에러 → 차단 해제 → "다시 시도" | R8-4, R8-4b | ✅ |
| **빈 상태**: "표시할 프로젝트가 없습니다" | `js/projects.js` › `case 'empty'` | 저장소가 없는(또는 전부 fork인) 계정으로 확인 | R8-5 | ✅ |
| `try/catch` 에러 처리 | `js/projects.js` › `loadProjects`(catch), `fetchRepos`(finally) | — | R8-6 | ✅ |
| 레이트 리밋(403) 시 에러 UI | `js/projects.js` › `describeError` (403/429 분기) | 자동 점검이 403 응답을 흉내 냄 | R8-4 | ✅ |

## 9. 상태 관리 패턴 (3가지 이상)

| 상태 → 렌더링 흐름 | 상태 변수 | 렌더링 함수 | 자동 ID |
| --- | --- | --- | --- |
| 다크 모드 토글 → 테마 상태 → 전체 스타일 | `themeState` (`js/theme.js`) | `renderTheme()` | R9-1, R5-5 |
| API 호출 → 로딩/성공/에러/빈 → Projects 렌더링 | `projectsState.status` (`js/projects.js`) | `renderProjects()` | R9-1, R8-* |
| 폼 입력 → 유효성 상태 → 에러 표시/숨김 | `contactState` (`js/form.js`) | `renderContactForm()` | R9-1, R6-* |
| ⭐ 필터 버튼 → 필터 상태 → 목록 변경 | `projectsState.filter` | `renderProjectCards()` | B-1 |

> 설명 요령: 각 흐름을 **"① 어떤 이벤트가 ② 어떤 상태 값을 바꾸고 ③ 어떤 함수가 화면을 다시 그리는가"** 세 문장으로 말하기.

## 10. 배포 & 제출물

| 요구사항 | 구현 위치 | 수동 확인 | 자동 ID | 상태 |
| --- | --- | --- | --- | :---: |
| GitHub Pages로 배포, 외부 접속 가능한 URL | 저장소 Settings › Pages | **시크릿 창**에서 배포 URL 접속 | R10-5 | 👀 |
| 배포 URL에서 반응형·인터랙션·API·폼 모두 정상 | — | 이 문서의 5·6·8 항목을 **배포 URL에서** 다시 확인 | R10-6 | 👀 |
| README: 프로젝트 설명 · 사용 기술 · 배포 URL · 스크린샷 | `README.md` | README 미리보기에서 이미지가 보이는지 | R10-1, R10-3, R10-4 | ✅ |
| 제출물: 저장소 URL, 배포 URL, 데스크톱/모바일/다크모드 스크린샷 | `images/screenshots/` (`desktop` `mobile` `dark`) | 배포 후 `node tools/screenshots.js <배포 URL>`로 재촬영 | R11 | 👀 |

## 11. 제약 사항

| 요구사항 | 구현 위치 | 수동 확인 | 자동 ID | 상태 |
| --- | --- | --- | --- | :---: |
| 외부 라이브러리 금지 (React/Vue/jQuery/Bootstrap/Tailwind) | `index.html`에 외부 `<script>`/`<link>` 없음 | DevTools › Network에서 외부 요청은 GitHub API뿐 | C-1 | ✅ |
| 인라인 `style="..."` 금지 | 전체 (언어별 색상은 `data-lang` + CSS 선택자로 처리) | Elements에서 `[style]` 검색 → 0건 | C-2, C-2b | ✅ |
| 최신 Chrome에서 정상 동작 | — | Chrome에서 콘솔 에러 없음 | C-3 | ✅ |
| 가로 스크롤 없는 반응형 | — | 320px~1280px | C-4 | ✅ |
| GitHub API 레이트 리밋(403) 대응 | `js/projects.js` › `describeError` | 위 8번 항목 | R8-4 | ✅ |
| (추가) API 응답 속 악성 HTML이 실행되지 않음 | `js/utils.js` › `escapeHtml`, `toSafeUrl` | 자동 점검이 `<img onerror>` 응답을 주입해 봄 | SEC-1 | ✅ |

## 12. 학습 목표 — "스스로 설명할 수 있는가" 자가 점검

각 문항을 **30초 안에** 말해 보고, 막히면 오른쪽 개념 노트 장을 다시 읽습니다. 모범 답안은 `docs/01-concept-notes.md` 18장, 예상 질문은 `docs/03-peer-review-guide.md`에 있습니다.

| # | 설명할 수 있어야 하는 것 | 보여줄 코드 | 개념 노트 장 | 설명 가능 |
| :-: | --- | --- | :-: | :-: |
| ① | 시맨틱 태그를 왜 쓰는가, 나는 어떤 기준으로 구조를 설계했는가 | `index.html` 전체 | 3 | ☐ |
| ② | Flexbox와 Grid의 차이, 언제 무엇을 고르는가 | `.nav`(Flex), `.projects__grid`(Grid) | 5 | ☐ |
| ③ | `querySelector`로 선택하고 `addEventListener`로 연결하는 흐름 | `js/nav.js` › `initNavigation` | 9, 10 | ☐ |
| ④ | 화살표 함수·구조분해·`map`/`filter`가 왜 필요하고 어떻게 쓰나 | `js/projects.js` › `toProject`, `loadProjects` | 8 | ☐ |
| ⑤ | `fetch` + `async/await`, 로딩/성공/실패를 UI로 표현한 방법 | `js/projects.js` › `fetchRepos`, `renderProjectsStatus` | 11, 12 | ☐ |
| ⑥ | 이벤트 → 상태 변경 → DOM 업데이트의 연결 | `js/theme.js` (가장 단순), `js/projects.js` | 12 | ☐ |

---

## 제출 전 TODO

- [ ] `js/config.js`의 `githubUsername`이 본인 GitHub 아이디인지 확인
- [ ] `index.html`의 `TODO(개인화)` 표시 부분 교체 — 이름, 자기소개, 프로필 사진(+alt), LinkedIn 주소
- [ ] `node tools/verify.js` 실행 → `FAIL 0`
- [ ] 저장소를 `main` 브랜치로 병합 → Settings › Pages › `main` / `(root)` 저장
- [ ] 배포 URL을 **시크릿 창**에서 열어 5·6·8번 항목을 직접 확인 (실제 GitHub 저장소가 카드로 뜨는지)
- [ ] `node tools/screenshots.js https://<아이디>.github.io/<저장소>/` 로 스크린샷 재촬영 → README의 "샘플 데이터" 안내 문구 삭제
- [ ] README의 배포 URL이 실제 주소와 같은지 확인
- [ ] 제출: 저장소 URL + 배포 URL + 스크린샷(데스크톱/모바일/다크)
