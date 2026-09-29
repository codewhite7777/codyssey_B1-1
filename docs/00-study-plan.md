# 80시간 학습 로드맵

> 웹(브라우저 · DOM · 렌더링 · 이벤트 · 비동기)을 처음 접하는 학습자를 위한 로드맵입니다.
> 이 과제에서 결과물(포트폴리오 사이트)은 이미 이 저장소에 구현되어 있습니다.
> 그래서 진짜 과제는 세 가지입니다. **코드를 이해하고, 자기 것으로 만들고, 피어 평가 3회에서 동료에게 설명하는 것.**

---

## 0. 이 문서 읽는 법

### 네 개의 문서는 이렇게 씁니다

| 문서 | 언제 여는가 |
| --- | --- |
| `docs/00-study-plan.md` (이 문서) | 오늘 무엇을 얼마나 할지 정할 때. 코드를 읽는 순서, 변형 과제, 막혔을 때의 루틴 |
| `docs/01-concept-notes.md` | 모르는 개념이 나왔을 때. 이 문서에서는 **"개념 노트 N장"** 으로 부릅니다 |
| `docs/02-evaluation-checklist.md` | 요구사항을 충족했는지 확인할 때. `node tools/verify.js` 출력의 항목 번호(`R2-1`, `R5-3` 등)와 1:1로 대응합니다 |
| `docs/03-peer-review-guide.md` | 발표 대본, 데모 순서, 예상 질문과 답변이 필요할 때. Phase 4부터 Q&A를 미리 읽어 두면 좋습니다 |

### 개념 노트 목차 (이 문서가 참조하는 장 번호)

| 장 | 주제 | 장 | 주제 |
| --- | --- | --- | --- |
| 1 | 웹 큰 그림 | 10 | 이벤트 |
| 2 | 렌더링 | 11 | 비동기 |
| 3 | HTML 시맨틱 | 12 | 상태 → 렌더링 |
| 4 | CSS 기초 | 13 | 저장소 |
| 5 | Flex / Grid | 14 | Intersection Observer |
| 6 | 반응형 | 15 | 도구 · 배포 |
| 7 | JS 문법 | 16 | 용어사전 |
| 8 | ES6+ | 17 | 오해 |
| 9 | DOM | 18 | 자가진단 |

### 표기 규칙

- 코드 위치는 줄 번호 대신 **`파일 › 함수명`** (CSS는 `css/style.css › .선택자`)으로 적습니다. 코드가 조금 바뀌어도 검색으로 찾을 수 있습니다.
- 난이도는 ★ (5분 안팎) / ★★ (15분 안팎) / ★★★ (40분 안팎)입니다.
- 시간은 "집중해서 공부하는 순수 시간"입니다. 실제 피어 평가 3회에 쓰는 시간은 이 80시간과 별개로 일정을 확인해 두세요.
- 각 Phase 끝의 체크박스를 채운 뒤 다음으로 넘어갑니다. 못 채운 항목이 있으면 다음 Phase 첫 30분에 복습하세요.

### 처음 읽을 때

1~2장(원칙, 로드맵)만 읽고 Phase 0을 시작하세요. 3장(코드 투어)은 Phase 1부터, 4장(변형 과제)은 Phase 2부터, 6장(디버깅 루틴)은 첫 에러를 만났을 때 꺼내 쓰면 됩니다.

> 이 문서는 저장소의 현재 코드를 기준으로 작성했습니다. 코드를 수정하면 함수 이름이나 위치가 달라질 수 있으니, 안 맞으면 `Ctrl+Shift+F`(VS Code 전체 검색)로 찾으세요.

---

## 1. 학습 원칙

### 1-1. 보기 → 따라 치기 → 바꿔 보기 → 설명하기

코드를 "읽어서 안다"고 느끼는 것과 "직접 다시 쓸 수 있다"는 큰 차이가 있고, 평가에서 요구하는 것은 후자입니다. 그래서 모든 주제를 아래 4단계 사이클로 돕니다. 한 사이클은 작게(함수 하나, 규칙 하나) 잡으세요. 파일 하나를 한 번에 통과하려 하면 대부분 3단계에서 막힙니다.

| 단계 | 하는 일 | 시간 비중 | 끝났다는 신호 |
| --- | --- | --- | --- |
| 1. 보기 | 코드와 주석을 읽고, 브라우저에서 그 기능이 돌아가는 모습을 DevTools로 본다 | 20% | "이 코드가 화면의 어느 부분을 만드는지" 손가락으로 짚을 수 있다 |
| 2. 따라 치기 | 코드를 **보면서 직접 타이핑**한다(복사 붙여넣기 금지). 연습 폴더에서 한다 | 30% | 오타를 내고 에러 메시지를 읽어 고쳐 본 경험이 있다 |
| 3. 바꿔 보기 | 값이나 동작을 바꾸고 결과를 **예측한 뒤** 확인한다 (4장 변형 과제) | 30% | 예측이 틀렸을 때 왜 틀렸는지 설명할 수 있다 |
| 4. 설명하기 | 코드를 가리고 60초 동안 소리 내어 설명한다. 녹음해 두면 좋다 | 20% | 얼버무린 부분이 줄어든다. 얼버무린 곳이 다음 사이클의 시작점이다 |

### 1-2. 피어 평가에서 설명해야 하는 6가지

| 목표 | 한 줄 요약 | 핵심 코드 | 주로 다루는 Phase | 개념 노트 |
| --- | --- | --- | --- | --- |
| ① | HTML 시맨틱 태그를 왜 쓰는지, 어떤 기준으로 구조를 설계했는지 | `index.html` | 1 | 3장 |
| ② | Flexbox와 Grid의 차이, 언제 무엇을 고르는지 | `css/style.css › .nav`, `.projects__grid`, `.about` | 2 | 5장, 6장 |
| ③ | `querySelector`로 DOM을 선택하고 `addEventListener`로 이벤트를 연결하는 흐름 | `js/nav.js`, `js/theme.js` | 4 | 9장, 10장 |
| ④ | 화살표 함수, 구조분해 할당, `map`/`filter`가 왜 필요하고 어떻게 쓰이는지 | `js/projects.js › toProject`, `loadProjects` | 3 | 7장, 8장 |
| ⑤ | `fetch` + `async/await`로 데이터를 가져오고 로딩/성공/실패를 UI로 표현하는 방법 | `js/projects.js › fetchRepos`, `renderProjectsStatus` | 5 | 11장 |
| ⑥ | 이벤트 → 상태 변경 → DOM 업데이트가 어떻게 연결되는지 (React 상태-렌더링의 기초) | `js/theme.js`, `js/form.js`, `js/projects.js` | 4, 5 | 12장 |

### 1-3. 학습 규칙 6가지

1. **원본은 지킨다.** `main` 브랜치는 제출용 최종본입니다. 실험은 `git switch -c experiment/이름` 브랜치에서 하고, 끝나면 버립니다.
2. **따라 치기는 저장소 밖에서 한다.** 예: `~/codyssey-practice/`. 저장소 안의 파일을 덮어쓰면 원본과 내 연습을 구분하기 어렵습니다.
3. **하루를 3줄로 마무리한다.** "오늘 이해한 것 / 아직 모르는 것 / 내일 할 것". 3줄이 안 써지는 날은 이해가 덜 된 날입니다.
4. **20분 규칙.** 같은 문제로 20분 넘게 혼자 막히면 6장의 루틴을 한 번 더 돌리고, 그래도 안 되면 질문 템플릿(6-3)으로 도움을 요청합니다.
5. **주석은 내 말로 다시 쓴다.** 코드에 이미 있는 주석은 초안 작성자의 설명입니다. 내 말로 바꿔 쓸 수 있으면 이해한 것입니다.
6. **Phase 4부터는 매주 한 번 소리 내어 설명한다.** 마지막 주에 몰아서 하면 시간이 모자랍니다.

연습 폴더 예시:

```text
~/codyssey-practice/
├── phase1-html/      # 스타일 없는 HTML 뼈대 다시 치기
├── phase2-css/       # Flex / Grid / 반응형 연습
├── phase3-js/        # 콘솔 문법 연습, 배열 메서드 문제
├── phase4-dom/       # 햄버거, 스크롤 탑, 폼 검증 재구현
├── phase5-async/     # fetch 미니 앱, 상태 4종 UI
└── notes/            # 하루 3줄 로그, 흐름도 사진
```

---

## 2. 80시간 로드맵

### 2-1. 시간 배분

| Phase | 주제 | 시간 | 누적 | 이 Phase가 끝나면 |
| --- | --- | ---: | ---: | --- |
| 0 | 준비 (VS Code, Live Server, DevTools, Git) | 3h | 3h | 사이트를 로컬에서 띄우고 DevTools로 들여다볼 수 있다 |
| 1 | 웹 큰 그림 + HTML | 9h | 12h | 목표 ①을 설명할 수 있다 |
| 2 | CSS · 레이아웃 · 반응형 | 13h | 25h | 목표 ②를 설명하고, 레이아웃을 바꿔 볼 수 있다 |
| 3 | JS 기초 · ES6 | 14h | 39h | 목표 ④를 설명할 수 있다 |
| 4 | DOM · 이벤트 (인터랙션) | 13h | 52h | 목표 ③을 설명하고, 목표 ⑥의 절반(theme, form)을 그릴 수 있다 |
| 5 | 비동기 · API · 상태 관리 | 14h | 66h | 목표 ⑤⑥을 설명할 수 있다 |
| 6 | 배포 · 검증 · README | 4h | 70h | 배포 URL이 살아 있고, 검증 결과를 보여 줄 수 있다 |
| 7 | 피어 평가 준비 · 리허설 | 10h | 80h | 5분/15분 설명과 라이브 수정에 대응할 수 있다 |
| **합계** | | **80h** | | |

시간을 이렇게 나눈 이유: JavaScript(Phase 3~5)가 전체의 절반이 넘습니다. 웹을 처음 배우는 사람에게 가장 낯선 부분(비동기, 이벤트, 상태)이고 평가 질문도 여기에 몰리기 때문입니다.

### 2-2. 일정 예시

**4주 압축 (주 20시간)**

| 주 | 시간대 | 할 일 |
| --- | --- | --- |
| 1주 | 0~20h | Phase 0, Phase 1, Phase 2 앞 8시간 (박스 모델, 변수, Flex) |
| 2주 | 20~40h | Phase 2 나머지 5시간 (Grid, 반응형), Phase 3 전체, Phase 4 첫 1시간 |
| 3주 | 40~60h | Phase 4 나머지 12시간, Phase 5 앞 8시간 (비동기 개념, fetch) |
| 4주 | 60~80h | Phase 5 나머지 6시간, Phase 6, Phase 7 |

**8주 표준 (주 10시간)**

| 주 | 시간대 | 할 일 |
| --- | --- | --- |
| 1주 | 0~10h | Phase 0, Phase 1 앞 7시간 |
| 2주 | 10~20h | Phase 1 나머지 2시간, Phase 2 앞 8시간 |
| 3주 | 20~30h | Phase 2 나머지 5시간, Phase 3 앞 5시간 |
| 4주 | 30~40h | Phase 3 나머지 9시간, Phase 4 첫 1시간 |
| 5주 | 40~50h | Phase 4 (10시간) |
| 6주 | 50~60h | Phase 4 나머지 2시간, Phase 5 앞 8시간 |
| 7주 | 60~70h | Phase 5 나머지 6시간, Phase 6 |
| 8주 | 70~80h | Phase 7 |

---

### Phase 0 — 준비 (3시간)

**목표**: 도구를 갖추고, 이 저장소를 로컬에서 띄워 "돌아가는 것"을 눈으로 확인한다.

**읽을 개념 노트**: 15장(도구 · 배포)의 VS Code, Live Server, DevTools, Git 부분

**이 저장소에서 볼 코드**: 아직 코드를 읽지 않습니다. `README.md`의 "실행 방법"과 "폴더 구조"만 봅니다.

| 활동 | 시간 |
| --- | ---: |
| VS Code 설치, 확장 프로그램 *Live Server* 설치, 저장소 폴더 열기, `index.html` 우클릭 → `Open with Live Server` | 0.5h |
| Chrome DevTools 5개 패널 투어: Elements, Console, Network, Sources, Application. 기기 툴바(`Ctrl+Shift+M`, Mac은 `Cmd+Shift+M`) | 1h |
| Git 기본 연습: `git status`, `git diff`, `git add`, `git commit`, `git switch -c`, `git restore`, `git log --oneline` (별도 연습 저장소에서) | 1h |
| 학습 브랜치와 연습 폴더 만들기, 사이트를 돌아다니며 "이 화면이 무슨 기능인지" 목록 적기 | 0.5h |

**산출물**
- 학습용 브랜치(예: `study`)와 연습 폴더(`~/codyssey-practice/`)
- 사이트의 기능 목록 메모 (햄버거 메뉴, 다크 모드, 스크롤 탑, 폼 검증, 프로젝트 카드, 필터 등)

**완료 기준**
- [ ] Live Server로 사이트가 열리고, 파일을 저장하면 브라우저가 자동으로 새로고침된다
- [ ] DevTools를 열어 Elements에서 요소를 클릭해 보고, Console에 `document.title`을 입력해 결과를 얻었다
- [ ] Network 탭에서 `api.github.com` 요청 하나를 찾아 Status와 Response를 확인했다
- [ ] Application 탭에서 Local Storage를 열어 봤다 (다크 모드를 한 번 눌러 `theme` 키가 생기는 것을 확인)
- [ ] `git switch -c`로 브랜치를 만들고, 파일을 수정한 뒤 `git restore`로 되돌려 봤다

---

### Phase 1 — 웹 큰 그림 + HTML (9시간)

**목표**: 브라우저가 HTML을 어떻게 읽어 화면을 만드는지 큰 그림을 잡고, 이 사이트의 HTML 구조가 왜 그렇게 생겼는지 설명한다. (목표 ①)

**읽을 개념 노트**: 1장(웹 큰 그림), 2장(렌더링 — 개요만), 3장(HTML 시맨틱)

**이 저장소에서 볼 코드**
- `index.html › <head>` : `lang`, `meta viewport`, `link`, `script defer`의 순서
- `index.html › <header>`, `<main>` 안의 `<section>` 5개, `<footer>`
- `index.html › #contact-form` : `label for` ↔ `id`, `aria-describedby`, `novalidate`
- `index.html › .skip-link`, `<noscript>` 같은 접근성 · 대비책

| 활동 | 시간 |
| --- | ---: |
| 웹의 큰 그림: URL을 치면 무슨 일이 일어나는가, HTML/CSS/JS의 역할 분담, 브라우저가 DOM을 만드는 과정 | 3h |
| HTML 태그와 시맨틱 이론 (제목 계층, 랜드마크, `section` / `article` / `div`) | 1.5h |
| `index.html`의 뼈대를 스타일 없이 **처음부터 손으로 다시 치기** (연습 폴더 `phase1-html`) | 2.5h |
| DevTools Elements의 DOM 트리와 내가 친 HTML 대응시키기, `Tab` 키로 페이지 이동해 보기 | 1h |
| 자기 것으로 만들기: `TODO(개인화)` 표시가 있는 곳(자기소개 문구, 프로필 사진과 `alt`)을 내 이야기로 수정하고, "구조 설계 기준" 메모 쓰기 | 1h |

**산출물**
- `phase1-html/index.html` (스타일 없는 뼈대 + 폼)
- "이 페이지를 이렇게 설계한 이유" 한 페이지 메모 (목표 ①의 답안 초안)
- 내 정보로 바뀐 `index.html`의 개인화 부분

**완료 기준**
- [ ] `header` / `nav` / `main` / `section` / `article` / `footer` 각각을 이 사이트에서 왜 썼는지 한 문장씩 말할 수 있다
- [ ] `section`과 `article`과 `div`를 언제 구분해 쓰는지 예를 들어 설명할 수 있다
- [ ] `<meta name="viewport">`가 없으면 모바일에서 어떻게 되는지, `defer`가 무슨 뜻인지 말할 수 있다
- [ ] `label for`와 `input id`가 연결되면 무엇이 좋은지 말할 수 있다
- [ ] `node tools/verify.js --static`에서 `R2-1`~`R2-5`가 PASS다
- [ ] 코드를 보지 않고 이 사이트의 섹션 구조를 나무 모양(들여쓰기 목록)으로 그릴 수 있다

---

### Phase 2 — CSS · 레이아웃 · 반응형 (13시간)

**목표**: CSS 변수로 디자인을 관리하고, Flexbox와 Grid를 구분해 쓰고, 모바일 퍼스트로 화면을 넓혀 가는 방식을 설명한다. (목표 ②)

**읽을 개념 노트**: 4장(CSS 기초), 5장(Flex / Grid), 6장(반응형), 2장(렌더링 — 레이아웃/페인트 부분)

**이 저장소에서 볼 코드** (`css/style.css`는 주석의 번호 순서대로: 1 변수 → 2 기본 → 3 레이아웃 → 4 컴포넌트 → 5 섹션 → 6 반응형)
- `css/style.css › :root`, `[data-theme="dark"]` : 디자인 토큰과 다크 모드
- `css/style.css › .container`, `.section` : 폭 제한과 여백
- Flexbox: `.nav`, `.nav__actions`, `.chips`, `.project-card`, `.hero`
- Grid: `.projects__grid` (`auto-fit` + `minmax`), `.about`, `.skills`
- `css/style.css › @media (min-width: 768px)`, `@media (min-width: 1024px)`
- 상태 클래스 규칙: `.nav__menu.active`, `.site-header.scrolled`, `.scroll-top.visible`, `.reveal.is-visible`

| 활동 | 시간 |
| --- | ---: |
| CSS 기초: 선택자, 박스 모델, `box-sizing`, 단위(`rem`), 특이도와 선언 순서, `:hover`와 `transition` | 3h |
| Flexbox: 주축/교차축, `justify-content`, `align-items`, `flex-wrap`, `gap`. 네비게이션 다시 만들기 | 3h |
| Grid: 열/행 정의, `fr`, `repeat`, `minmax`, `auto-fit`. 카드 그리드 다시 만들기 | 3h |
| 반응형: 모바일 퍼스트, `min-width` 미디어 쿼리, 기기 툴바로 폭을 바꿔 가며 관찰 | 2h |
| 변형 과제 V05, V06, V09, V11, V13, V21 + Flex vs Grid 비교표 쓰기 | 2h |

**산출물**
- `phase2-css/` 의 네비게이션(Flex)과 카드 그리드(Grid) 연습 페이지, 375/768/1280px 스크린샷
- "Flex vs Grid 언제 무엇을 쓰나" 비교표 (내 말로, 이 사이트의 실제 선택자를 예로)
- 변형 과제 6개 이상 수행 기록

**완료 기준**
- [ ] Flexbox와 Grid의 차이를 "1차원 / 2차원"이라는 단어 없이도 예를 들어 설명할 수 있다
- [ ] 이 사이트에서 Flex를 쓴 곳 3곳, Grid를 쓴 곳 3곳을 선택자 이름으로 댈 수 있다
- [ ] `repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))`를 한 줄씩 풀어 설명할 수 있다
- [ ] 다크 모드가 "변수 값만 바꾸는 방식"으로 동작하는 원리를 설명할 수 있다 (`:root`, `[data-theme="dark"]`)
- [ ] 모바일 퍼스트가 무엇이고 `max-width` 쿼리와 어떻게 다른지 말할 수 있다
- [ ] `node tools/verify.js --static`에서 `R3-*`가 PASS다
- [ ] 기기 툴바로 320px 폭에서 가로 스크롤이 생기지 않는 것을 직접 확인했다

---

### Phase 3 — JS 기초 · ES6 (14시간)

**목표**: 변수, 함수, 객체, 배열을 다룰 수 있고, 이 저장소에서 쓴 ES6+ 문법(화살표 함수, 구조분해 할당, 템플릿 리터럴, `map`/`filter`)이 왜 필요한지 설명한다. (목표 ④)

**읽을 개념 노트**: 7장(JS 문법), 8장(ES6+)

**이 저장소에서 볼 코드**
- `js/utils.js` : `escapeHtml`, `toSafeUrl`, `sleep`, `readStorage`, `writeStorage`
- `js/config.js › CONFIG` : 객체, 배열, `Object.freeze`
- `js/projects.js › toProject` : 구조분해 + 이름 바꾸기(`html_url: url`) + 기본값(`??`)
- `js/projects.js › loadProjects` : `.filter(...).map(...)` 체이닝
- `js/projects.js › renderProjectFilters` : `[...new Set(...)]`, `.map`, `.join`
- `js/form.js › fieldValidators`, `FIELD_NAMES` : 함수를 값으로 담은 객체, `Object.keys`

| 활동 | 시간 |
| --- | ---: |
| 문법 기초: 값과 타입, `const` / `let`, 조건문, 반복문. **Console에서 직접 실행하며** 익히기 | 4h |
| 함수(선언/표현식/화살표), 스코프, 객체와 배열, 참조와 복사 | 3.5h |
| ES6+: 구조분해, 스프레드, 템플릿 리터럴, `??`, `?.`, 배열 메서드(`map` / `filter` / `find` / `forEach` / `some`) | 3.5h |
| 따라 치기: `escapeHtml`, `toProject`, `loadProjects`의 데이터 가공 부분을 다시 쓰기 | 2h |
| 설명하기: `for` 반복문으로 쓴 코드를 `map`/`filter`로 바꾸는 예 5개 만들기 | 1h |

**산출물**
- `phase3-js/basics.js` (연습 코드) + 콘솔 실험 메모
- "for 반복문 → `map` / `filter` 변환" 예제 5개
- ES6 문법 치트시트 1장 (내가 쓴 예제는 이 저장소 코드에서 골라 넣기)

**완료 기준**
- [ ] `var`를 쓰지 않는 이유와 `const` / `let`을 고르는 기준을 말할 수 있다
- [ ] `toProject`의 매개변수 `({ id, name, html_url: url, ... })`가 무슨 뜻인지 한 줄씩 풀어 말할 수 있다
- [ ] `map`과 `forEach`의 차이, `filter`가 원본을 바꾸지 않는다는 것을 설명할 수 있다
- [ ] `??`와 `||`의 차이를 `stars`가 `0`일 때를 예로 설명할 수 있다
- [ ] 화살표 함수와 `function` 선언을 이 저장소에서 어떤 기준으로 나눠 썼는지 예를 들 수 있다
- [ ] `node tools/verify.js --static`에서 `R4-2`, `R7-*`가 PASS다
- [ ] 개념 노트 18장의 ④번(화살표 함수 · 구조분해 · `map` / `filter`) 30초 답을 내 말로 해 봤다

---

### Phase 4 — DOM · 이벤트 (인터랙션) (13시간)

**목표**: `querySelector`로 요소를 고르고, `addEventListener`로 이벤트를 연결하고, "이벤트 → 상태 변경 → DOM 업데이트" 흐름으로 인터랙션을 만드는 것을 설명한다. (목표 ③, 목표 ⑥의 앞부분)

**읽을 개념 노트**: 9장(DOM), 10장(이벤트), 14장(Intersection Observer), 12장(상태 → 렌더링, 앞부분)

**이 저장소에서 볼 코드** (이 순서로)
1. `js/theme.js` : `themeState`, `renderTheme`, `setTheme`, `initTheme` — 가장 단순한 상태 → 렌더링
2. `js/nav.js › initNavigation` : 햄버거(`classList.toggle`), 바깥 클릭/`Esc`, `matchMedia`
3. `js/nav.js › initSmoothScroll` : `preventDefault`, `scrollIntoView`, `history.pushState`, 포커스 이동
4. `js/effects.js › initScrollEffects` : `scroll` + `requestAnimationFrame`, 기준값 60/300
5. `js/effects.js › initRevealOnScroll`, `observeReveal` : Intersection Observer, threshold 0.2
6. `js/form.js › initContactForm`, `renderContactForm` : `input` / `focusout` / `submit`, `contactState`

| 활동 | 시간 |
| --- | ---: |
| DOM: 트리 구조, `querySelector` / `querySelectorAll`, `textContent` vs `innerHTML`, `classList`, `dataset` (Console에서 실습) | 3h |
| 이벤트: `addEventListener`, 이벤트 객체, 버블링과 `event.target`, `preventDefault`, 이벤트 위임 개념 | 3h |
| `theme.js`, `nav.js`, `effects.js` 읽기 + 햄버거, 스크롤 탑 버튼 **다시 구현하기** | 3.5h |
| `form.js` 읽기 + 필드 하나짜리 검증 다시 구현하기 | 1.5h |
| 변형 과제 V01, V02, V03, V04, V07, V08, V14, V18, V19 | 1.5h |
| 이벤트 → 상태 → DOM 흐름도를 종이에 3장 그리기 (theme / nav / form) | 0.5h |

**산출물**
- `phase4-dom/` 의 재구현 3종: 햄버거 메뉴, 스크롤 탑 버튼, 이름/이메일 검증
- 흐름도 3장 (종이 사진 가능)
- 변형 과제 수행 기록 (예측 → 결과 → 이유)

**완료 기준**
- [ ] "요소 선택 → 이벤트 연결 → 핸들러 안에서 상태/클래스 변경 → 화면 변화" 흐름을 햄버거 메뉴로 코드 없이 말할 수 있다
- [ ] 60px / 300px / 0.2 세 기준값이 어디에 있고 어떤 코드가 읽는지 말할 수 있다 (`js/config.js` → `js/effects.js`)
- [ ] `scroll` 이벤트에서 `requestAnimationFrame`과 `passive: true`를 쓴 이유를 말할 수 있다
- [ ] `preventDefault()`를 이 사이트에서 어디에 왜 썼는지 두 곳을 댈 수 있다 (`form.js`, `nav.js`)
- [ ] 스타일을 JS로 직접 바꾸지 않고 클래스를 토글하는 이유를 설명할 수 있다
- [ ] `node tools/verify.js`에서 `R4-*`, `R5-*`, `R6-*`가 PASS다 (브라우저 검사가 없으면 `--static`으로 `R4-*`, `R5-1`, `R5-6`만)
- [ ] 위 변형 과제 중 5개 이상을 브랜치에서 해 보고 원복했다

---

### Phase 5 — 비동기 · API · 상태 관리 (14시간)

**목표**: `fetch` + `async/await`로 데이터를 가져오고, 로딩/성공/에러/빈 상태를 화면에 표현하는 방식을 설명한다. 이벤트 → 상태 → 렌더링을 세 곳(theme, form, projects)에서 비교해 React와 연결한다. (목표 ⑤, ⑥)

**읽을 개념 노트**: 11장(비동기), 12장(상태 → 렌더링), 13장(저장소), 17장(오해)

**이 저장소에서 볼 코드**
- `js/projects.js › fetchRepos` : `AbortController` 타임아웃, `response.ok`, `finally`
- `js/projects.js › describeError` : 에러 종류별 문구 (`AbortError`, 403/429, 404)
- `js/projects.js › loadProjects` : 상태 전환과 연타 방지(`status === 'loading'`이면 return)
- `js/projects.js › renderProjectsStatus`, `renderProjectFilters`, `renderProjectCards`, `renderProjects`
- `js/projects.js › initProjects` : 이벤트 위임 (`closest`)
- `js/projects.js › createProjectCard` : 템플릿 리터럴 + `escapeHtml` / `toSafeUrl`
- `js/utils.js › readStorage`, `writeStorage` 와 `js/theme.js › getInitialTheme` : 저장소

| 활동 | 시간 |
| --- | ---: |
| 비동기 개념: 동기 vs 비동기, 콜백 → Promise → `async/await`, 이벤트 루프 큰 그림. `setTimeout` 실험 | 3h |
| `fetch` 실습: Console에서 GitHub API 호출, `response.ok` / `status` / `json()`, 404 실험, `try/catch/finally` | 3h |
| `projects.js` 읽기와 따라 치기: 상태 5종 → 렌더링 3분할, 이벤트 위임 | 3h |
| 상태 → 렌더링 정리: `themeState` / `contactState` / `projectsState`를 한 장의 비교표로 | 1.5h |
| 저장소와 보안: `localStorage`, `escapeHtml` 유무에 따른 XSS 실험 (로컬에서만) | 1.5h |
| 변형 과제 V10, V15, V16, V17, V20, V22, V23 (여력이 되면 V24, V25) | 2h |

**산출물**
- `phase5-async/` 의 `fetch` 미니 앱 (사용자 아이디 입력 → 저장소 이름 목록, 로딩/에러 표시)
- `projectsState` 상태 다이어그램 (`idle → loading → success / empty / error`, 어떤 이벤트가 어떤 화살표인지)
- "fetch가 404에서 catch로 안 가는 이유와 처리 방법" 설명 카드 (내 말로)
- 상태 → 렌더링 비교표: theme / form / projects

**완료 기준**
- [ ] `fetch` 한 줄 뒤에 `if (!response.ok)`가 왜 필요한지 말할 수 있다
- [ ] 로딩 → 성공/실패 각 경로에서 `projectsState`의 값이 어떻게 변하고 화면이 어떻게 바뀌는지 코드를 보지 않고 그릴 수 있다
- [ ] 에러 상태와 빈 상태가 어떻게 다른지 (`describeError` vs `repos.length > 0`) 설명할 수 있다
- [ ] '다시 시도'를 연타해도 요청이 한 번만 가는 이유(`loadProjects`의 early return, 버튼이 스피너로 교체됨)를 설명할 수 있다
- [ ] 이벤트 위임이 왜 필요한지 (`innerHTML`로 버튼이 다시 만들어진다) 설명할 수 있다
- [ ] `escapeHtml`을 지우면 어떤 일이 생기는지 시연 없이도 말할 수 있다
- [ ] React의 `setState`와 `setProjectsState`가 닮은 점과 다른 점을 각각 한 가지씩 말할 수 있다
- [ ] `node tools/verify.js`에서 `R8-*`, `R9-1`, `SEC-1`이 PASS다

---

### Phase 6 — 배포 · 검증 · README (4시간)

**목표**: 사이트를 GitHub Pages에 올리고, 자동 점검과 수동 확인으로 상태를 증명한다.

**읽을 개념 노트**: 15장(도구 · 배포)

**이 저장소에서 볼 코드**: `tools/verify.js`(구조만), `tools/screenshots.js`, `README.md`

| 활동 | 시간 |
| --- | ---: |
| GitHub Pages 배포: `Settings → Pages → Deploy from a branch → main / (root)`. 상대 경로가 왜 필요한지 이해하기 | 1h |
| 배포 URL에서 모든 기능 수동 확인 (`verify.js`가 못 보는 항목: `R10-5`, `R10-6`) | 1h |
| `node tools/verify.js` 실행과 결과 읽기, 실패 항목 원인 파악 | 0.5h |
| `node tools/screenshots.js <배포 URL>`로 스크린샷 재촬영, README의 안내 문구와 이미지 정리, `js/config.js`의 `githubUsername` 확인 | 1h |
| `TODO(개인화)`(LinkedIn 주소 등) 마무리, 최종 `git status` 점검 | 0.5h |

**산출물**
- 살아 있는 배포 URL (`https://<아이디>.github.io/<저장소이름>/`)
- `verify.js` 실행 결과 캡처 (PASS/FAIL 요약과 "자동으로 확인할 수 없는 항목" 3개)
- 배포 URL 기준으로 다시 찍은 스크린샷과 정리된 README

**완료 기준**
- [ ] 배포 URL에서 카드 목록이 **내 GitHub 저장소**로 표시된다 (샘플 데이터가 아니라)
- [ ] 시크릿 창에서 처음 접속해 다크 모드, 폼, 햄버거, 스크롤 동작을 확인했다
- [ ] `node tools/verify.js`의 FAIL이 0이다 (또는 FAIL의 원인을 설명할 수 있다)
- [ ] `verify.js`가 무엇을 확인하고 무엇을 확인하지 못하는지 말할 수 있다 (정규식 기반 간이 점검, 가짜 API 응답 사용)
- [ ] README의 배포 URL, 스크린샷, 기준값 표(60px / 300px / 0.2 / 768 / 1024)가 실제 코드와 일치한다
- [ ] `git status`가 깨끗하고 원격 저장소에 최신 커밋이 올라가 있다

---

### Phase 7 — 피어 평가 준비 · 리허설 (10시간)

**목표**: 어떤 순서로 평가가 배정되어도 5분 요약, 15분 설명, 라이브 수정, 질의응답에 대응한다.

**읽을 개념 노트**: 16장(용어사전), 17장(오해), 18장(자가진단)

**이 저장소에서 볼 문서**: `docs/03-peer-review-guide.md` 전체, `docs/02-evaluation-checklist.md`

| 활동 | 시간 |
| --- | ---: |
| 5분/15분 스크립트를 **내 말로** 다시 쓰기 (가이드의 대본은 뼈대일 뿐) | 2h |
| 혼자 리허설 3회: 타이머를 켜고, 화면 공유 상태로, 녹음하기. 녹음을 들으며 얼버무린 곳 표시 | 3h |
| Q&A 뱅크를 소리 내어 답하기: 답이 막히는 질문은 해당 개념 노트로 돌아가 보강 | 2h |
| 라이브 코딩 시뮬레이션: 4장 변형 과제에서 무작위로 3개를 뽑아 각 10분 안에 수행하고 설명 | 2h |
| 모의 평가: 동료나 스터디원에게 5분 설명 + 질문 3개 받기 | 1h |

**산출물**
- 내 말로 쓴 5분/15분 스크립트
- 리허설 기록: 걸린 시간, 얼버무린 곳, 못 답한 질문 목록
- 개념 노트 18장 자가진단 결과

**완료 기준**
- [ ] 5분 요약을 스크립트 없이 5분 ±30초로 말할 수 있다
- [ ] 목표 ①~⑥ 각각에 대해 30초 설명이 가능하다 (7장 마무리 점검 표)
- [ ] 데모 시나리오를 화면 전환 실수 없이 진행할 수 있다 (배포 URL + 로컬 Live Server 창 준비)
- [ ] 변형 과제 3개를 각 10분 안에 성공했다 (★ 2개 + ★★ 1개 수준)
- [ ] Q&A 뱅크에서 못 답하는 질문이 5개 이하다
- [ ] 모르는 질문을 받았을 때의 대응 순서(정직하게 인정 → 추론 → 함께 확인)를 몸에 익혔다
- [ ] 개념 노트 18장 자가진단에서 약한 영역을 스스로 알고 있다

---

## 3. 코드 투어

### 3-1. 지도

브라우저가 이 사이트를 만드는 과정과 파일의 역할:

```text
index.html  ── 뼈대와 의미 (누가 무엇인지: id, data-*, aria-*)
   │
   ├─▶ css/style.css ── 모양 (변수 → 기본 → 레이아웃 → 컴포넌트 → 섹션 → 반응형)
   │
   └─▶ js/*.js (모두 defer, 위에서 아래 순서로 실행. 전역 스코프를 공유)
         config.js    기준값 모음 (CONFIG)
         utils.js     작은 도우미 (escapeHtml, toSafeUrl, sleep, readStorage ...)
         theme.js     다크 모드            (init~ 함수를 "정의"만 한다)
         nav.js       햄버거, 부드러운 스크롤   (init~ 함수를 "정의"만 한다)
         effects.js   스크롤 반응, 등장, 타자기   (init~ 함수를 "정의"만 한다)
         form.js      폼 검증              (init~ 함수를 "정의"만 한다)
         projects.js  GitHub API, 4상태, 필터   (init~ 함수를 "정의"만 한다)
         main.js      마지막에 init~ 함수들을 순서대로 "호출" (조립)
```

이 사이트의 핵심은 "이벤트 → 상태 → 렌더링"이 세 곳에서 같은 모양으로 반복된다는 점입니다.

```text
[theme]    click #theme-toggle
             └▶ setTheme() ─▶ themeState.theme ─▶ renderTheme()
                                                   └▶ <html data-theme> 변경 ─▶ CSS 변수 값 교체 ─▶ 색이 바뀜

[form]     input / focusout / submit
             └▶ contactState { errors, touched, submitted, success } ─▶ renderContactForm()
                                                   └▶ 에러 문구, 빨간 테두리, aria-invalid, 성공 메시지

[projects] 페이지 로드 / 다시 시도 click / 필터 click
             └▶ setProjectsState(patch) ─▶ projectsState { status, repos, filter, errorMessage }
                                                   └▶ renderProjects() ─▶ 스피너 / 카드 / 에러 / 빈 상태
```

### 3-2. 읽는 순서

| 순서 | 파일 | 읽는 시기 | 한 번에 읽는 시간 |
| --- | --- | --- | --- |
| 1 | `index.html` | Phase 1 | 1.5~2h |
| 2 | `css/style.css` | Phase 2 | 3~4h (섹션별로 나눠서) |
| 3 | `js/main.js` → `config.js` → `utils.js` | Phase 3 | 1h |
| 4 | `js/theme.js` | Phase 4 | 1h |
| 5 | `js/nav.js` | Phase 4 | 1h |
| 6 | `js/effects.js` | Phase 4 | 1.5h |
| 7 | `js/form.js` | Phase 4 | 1.5h |
| 8 | `js/projects.js` | Phase 5 | 3~4h (두세 번에 나눠서) |
| 9 | `tools/verify.js` | Phase 6 | 30분 (구조만) |

`main.js`를 일찍 읽는 이유: 12줄짜리 "목차"입니다. 어떤 기능이 어떤 `init` 함수로 시작되는지 알면 나머지 파일이 어디에 붙는지 보입니다.

파일마다 **"꼭 설명할 수 있어야 하는 것 3가지"** 를 체크박스로 적었습니다. 세 개를 모두 코드를 보지 않고 말할 수 있으면 그 파일은 통과입니다.

#### 1. `index.html`

- [ ] 시맨틱 구조와 선택 이유: `header > nav`, `main` 안의 `section` 5개(각각 `aria-labelledby`로 제목과 연결), 독립적인 조각(카드, 소개 글)은 `article`, 제목 계층 `h1 → h2 → h3`
- [ ] `<head>`가 하는 일: `lang="ko"`, `meta viewport`, `script defer`가 순서대로 실행되어 `config → utils → ... → main` 순서가 유지되는 것
- [ ] HTML이 JS/CSS와 맺는 **계약**: `id`(JS가 찾는 이름), `data-reveal` / `data-filter` / `data-action`(동작용), `aria-*`(접근성 상태), 클래스(스타일용). 이 이름이 어긋나면 기능이 조용히 죽는다

셀프 체크: 폼의 `#name-error`를 지우면 어떤 파일의 어떤 줄에서 어떤 에러가 날까? (`js/form.js › renderContactForm`)

#### 2. `css/style.css`

- [ ] `:root` 변수(색, 간격, 폰트)와 `[data-theme="dark"]`가 같은 이름의 변수 값만 바꿔 다크 모드를 만드는 원리
- [ ] Flex를 쓴 곳(`.nav`, `.chips`, `.project-card`)과 Grid를 쓴 곳(`.projects__grid`, `.about`, `.skills`)을 나눈 기준
- [ ] 모바일 퍼스트(기본 = 모바일, `min-width: 768px` / `1024px`로 덧입힘)와 상태 클래스(`.active`, `.scrolled`, `.visible`, `.is-visible`)가 JS와 만나는 방식

셀프 체크: `.nav__menu`가 모바일에서 `display: none`이 아니라 `visibility: hidden` + `opacity: 0`인 이유는? (주석을 참고하고, `Tab` 키로 확인해 보기)

#### 3. `js/main.js`, `js/config.js`, `js/utils.js`

- [ ] `main.js`는 `init` 함수 8개를 부르는 진입점이고, 앞 파일의 함수를 쓸 수 있는 것은 `defer` 순서와 전역 스코프 덕분이라는 것
- [ ] `CONFIG`에 기준값(60 / 300 / 0.2 등)을 모은 이유와 `Object.freeze`의 의미(얕은 동결)
- [ ] `escapeHtml` / `toSafeUrl`이 필요한 이유(XSS), `readStorage` / `writeStorage`에 `try/catch`가 있는 이유, `sleep`이 Promise를 돌려주는 이유

셀프 체크: `main.js`에서 `initRevealOnScroll()`과 `initProjects()`의 순서를 바꾸면 어떻게 될까? (`js/effects.js › observeReveal`의 첫 줄을 읽어 보기)

#### 4. `js/theme.js`

- [ ] 이벤트(`click`) → 상태(`themeState.theme`) → 렌더링(`renderTheme`)의 3단계와, `data-theme`가 붙으면 CSS 변수가 바뀌는 원리
- [ ] 초기 테마 결정 순서: 저장된 값 → OS 설정(`prefers-color-scheme`) → 기본 light. 사용자가 직접 누른 것만 저장하는 이유(`persist` 옵션)
- [ ] 새로고침 후에도 유지되는 원리 (`writeStorage` → `readStorage`)와, 이 방식의 한계(첫 화면 깜빡임 가능성)

셀프 체크: Console에서 `themeState.theme = 'dark'`만 실행하면 화면이 바뀔까? 왜? `renderTheme()`를 실행하면?

#### 5. `js/nav.js`

- [ ] 햄버거: `classList.toggle('active')`의 반환값 → `syncToggleButton`이 `aria-expanded` / `aria-label` / X 아이콘을 맞추는 흐름
- [ ] 메뉴가 닫히는 경로 4가지: 바깥 클릭, `Esc`(+ 포커스 복귀), 링크 클릭, 화면이 768px 이상으로 넓어질 때
- [ ] `initSmoothScroll`: `preventDefault` → `scrollIntoView` → `history.pushState` → `focus`의 역할과 각각이 없으면 생기는 문제

셀프 체크: CSS의 `html { scroll-behavior: smooth; }`만으로도 부드럽게 이동하는데, JS에서 다시 처리하는 이유는?

#### 6. `js/effects.js`

- [ ] `scroll` 핸들러가 `isTicking` + `requestAnimationFrame` + `{ passive: true }`로 부담을 줄이는 방식, 그리고 60px / 300px 기준으로 클래스를 토글하는 부분
- [ ] Intersection Observer: `threshold: 0.2`의 뜻, `unobserve`를 하는 이유, `observeReveal`을 따로 뺀 이유(나중에 만들어지는 프로젝트 카드), 지원하지 않거나 동작 줄이기 설정이면 일찍 return 하는 이유
- [ ] 타자기 효과가 `async/await` + `sleep`으로 `while (true)`를 돌리는데도 화면이 멈추지 않는 이유

셀프 체크: `.reveal` 클래스를 HTML이 아니라 JS가 붙이는 이유는? (JS가 꺼져 있다면 콘텐츠가 어떻게 보이는가)

#### 7. `js/form.js`

- [ ] `fieldValidators`의 규약(문제가 있으면 에러 문구, 통과면 빈 문자열)과 `FIELD_NAMES`가 여기서 자동으로 만들어지는 것
- [ ] `contactState`의 네 가지(`errors`, `touched`, `submitted`, `success`)와, 타이핑 도중에 성급하게 에러를 보여 주지 않으려는 UX 의도
- [ ] `input` / `focusout` / `submit` 세 이벤트의 역할, `focusout`을 쓴 이유(버블링), `preventDefault`, 첫 오류 필드로 `focus()`를 옮기는 이유

셀프 체크: 이름 칸에 "가"를 입력하고 Tab을 누르면 화면에 에러가 나타난다. 이때 실행되는 함수를 순서대로 말해 보자.

#### 8. `js/projects.js`

- [ ] `fetchRepos`: `AbortController`로 타임아웃, `response.ok` 직접 확인(404/500에서도 fetch는 성공으로 돌려준다), `finally`에서 타이머 정리
- [ ] 상태 5종(`idle` / `loading` / `success` / `empty` / `error`)과 `setProjectsState` → `renderProjects` → 3개의 렌더링 함수(`renderProjectsStatus`, `renderProjectFilters`, `renderProjectCards`)
- [ ] 이벤트 위임(`closest`)이 필요한 이유, 그리고 외부 데이터를 `innerHTML`에 넣기 전에 `escapeHtml` / `toSafeUrl`을 거치는 이유

셀프 체크: `renderedFilterKey`가 없다면 필터 버튼을 누를 때마다 무엇이 불편해질까? (키보드로 Tab → Enter를 눌러 확인)

#### 9. `tools/verify.js` (읽기 수준)

- [ ] 무엇을 하는 도구인지: 정적 검사(파일 내용 정규식) + 브라우저 검사(Playwright로 Chromium을 띄워 클릭/스크롤/입력)
- [ ] GitHub API를 가짜 응답으로 대체해서 로딩/성공/에러/빈 상태를 인터넷과 무관하게 재현한다는 것
- [ ] 한계: 정규식 기반 간이 점검이라 "코드를 이해했는가"나 실제 배포 환경은 확인하지 못한다는 것

---

## 4. 변형 과제 (라이브 코딩 대비)

평가에서는 "코드를 조금 바꿔 보라"는 요청이 나올 수 있습니다. 그때 필요한 능력은 두 가지입니다. **어느 파일의 어디를 열어야 하는지 아는 것**, 그리고 **바꾼 결과를 예측하고 확인하는 것**. 아래 25개를 이 두 가지를 연습하는 재료로 씁니다.

### 4-1. 진행 방법

1. `git switch -c experiment/V07-typing`처럼 과제 이름으로 브랜치를 만든다.
2. **바꾸기 전에** "이렇게 바꾸면 이렇게 될 것이다"를 한 줄로 적는다. (예측)
3. 코드를 바꾸고 저장 → Live Server가 새로고침 → DevTools로 결과를 확인한다.
4. 예측과 다르면 왜 다른지 찾는다. 이 과정에서 가장 많이 배웁니다.
5. 30초로 "무엇을 바꿨고 왜 그렇게 되는지" 소리 내어 설명한다.
6. `node tools/verify.js --static` (가능하면 전체)로 다른 곳이 깨지지 않았는지 확인한다.
7. `git restore .`로 되돌리거나 브랜치를 버린다. (`git switch main && git branch -D experiment/...`)

목표 시간(라이브 코딩에서): ★ 5분, ★★ 15분, ★★★ 40분. 처음엔 시간을 재지 말고, Phase 7에서 재어 보세요.

### 4-2. 과제 목록

| # | 난이도 | 무엇을 바꾸나 — 어디를 | 힌트 | 확인 방법 |
| --- | --- | --- | --- | --- |
| V01 | ★ | 스크롤 탑 버튼 표시 기준 300px → 600px — `js/config.js › CONFIG.scrollTopThreshold` | 숫자 하나만 바꾼다. 이 값을 읽는 곳은 `js/effects.js › initScrollEffects › render`. README의 기준값 표도 고칠지 생각해 본다 | 스크롤하며 버튼이 나타나는 지점을 본다. Console에 `scrollY` 입력, Elements에서 `#scroll-top`에 `visible` 클래스가 붙는 순간 관찰 |
| V02 | ★ | 네비 배경이 바뀌는 기준 60px → 200px — `js/config.js › CONFIG.navScrolledThreshold` | 같은 `render`에서 `header.classList.toggle('scrolled', ...)`. CSS는 `.site-header.scrolled` | Elements에서 `#site-header`에 `scrolled`가 붙는 시점. Styles 패널에서 `--color-header-scrolled` 확인 |
| V03 | ★ | 에러 문구를 내 말투로 — `js/form.js › fieldValidators.email` 또는 `name`, `js/projects.js › describeError` | 문자열 리터럴만 바꾼다. 따옴표 짝 주의 | 잘못된 이메일 입력 후 `Tab`. `describeError`는 `CONFIG.githubUsername`을 없는 값으로 바꿔 404를 만들어 확인 |
| V04 | ★ | 메시지 최소 글자 수 10 → 20 — `js/form.js › fieldValidators.message`(숫자와 문구), `index.html`의 textarea `placeholder` | 값이 JS와 HTML **두 곳**에 흩어져 있는 것이 포인트. 하나만 고치면 안내와 실제 규칙이 어긋난다 | 15자 입력 후 포커스 이동 → 에러, 20자 → 에러 사라짐. Elements에서 `#message-error` 텍스트와 `aria-invalid` 확인 |
| V05 | ★ | 다크 모드 색 변경 (`--color-primary`, `--color-bg` 등) — `css/style.css › [data-theme="dark"]` | 변수 값만 바꾼다. JS는 건드리지 않는다 | 토글 후 Elements에서 `<html data-theme="dark">` 선택 → Styles의 변수 값 확인, Application → Local Storage에서 `theme` 확인 |
| V06 | ★ | 카드 hover 효과 변경 (올라가는 높이, 그림자, 테두리) — `css/style.css › .card:hover` | `translateY(-4px)`를 바꿔 본다. `transition`은 `.card`에 있다 (`.card.reveal`도 같이 보기) | 카드에 마우스를 올린다. 고정해서 보려면 Elements의 Styles 패널에서 `:hov` → `:hover` 체크 |
| V07 | ★ | 타자기 문구와 속도 변경 — `js/config.js › CONFIG.typingPhrases`, `js/effects.js › initTypingEffect`의 `sleep(70)` | 문구는 배열 요소 교체/추가, 속도는 `sleep`의 ms. HTML `#typing-text`의 기본 문구는 동작 줄이기 설정일 때 보이는 정적 문구 | 새로고침 후 타이핑 관찰. DevTools의 Rendering 패널(메뉴 위치는 버전에 따라 다름)에서 `prefers-reduced-motion`을 켜고 새로고침하면 타이핑이 멈춰야 한다 |
| V08 | ★ | 테마 저장 키 `'theme'` → `'codyssey-theme'` — `js/config.js › CONFIG.themeStorageKey` | 코드는 키 이름을 CONFIG에서만 읽는다. 옛 `theme` 키는 남아 있지만 무시된다 | Application → Local Storage에 새 키가 생기는지, 새로고침 후 유지되는지. `verify.js` R5-5는 `'theme'`를 고정으로 쓰므로 FAIL이 날 수 있다 (이유 설명해 보기) |
| V09 | ★ | Hero 버튼 정렬 — `css/style.css › .hero__cta`의 `justify-content: center` → `flex-start` / `space-between`, `flex-direction: column` | 주축과 교차축. `column`이 되면 `justify-content`가 세로 방향으로 바뀐다 | Elements에서 `.hero__cta` 옆 `flex` 배지를 눌러 오버레이. Styles 패널에서 값을 바꿔 보며 실험 |
| V10 | ★ | 로딩 상태를 눈으로 보기 — `js/projects.js › loadProjects`의 `await fetchRepos()` 앞에 `await sleep(2000);` 임시 추가 (`sleep`은 `js/utils.js`) | `loadProjects`가 이미 `async` 함수라 `await`을 바로 쓸 수 있다. 확인 후 반드시 삭제 | 새로고침 → 스피너와 "로딩 중..." → 카드. Elements에서 `#projects-status` 내용과 `#projects-grid`의 `aria-busy` 변화 |
| V11 | ★ | Skills 카드 하나 더 추가 후 4번째 카드가 어디로 가는지 관찰 → `repeat(3, 1fr)`을 `repeat(auto-fit, minmax(14rem, 1fr))`로 — `index.html › #skills`, `css/style.css › .skills` (768px 규칙 안) | 기존 카드의 `data-reveal` 속성까지 복사하면 JS 수정 없이 등장 애니메이션이 붙는다. 열 수가 "고정"인지 "자동"인지가 포인트 | 1280px에서 Elements의 `grid` 배지로 오버레이. 기기 툴바로 폭을 줄이며 열 수 변화 관찰 |
| V12 | ★★ | 브레이크포인트 768px → 900px — `css/style.css › @media (min-width: 768px)`, `js/nav.js › initNavigation`의 `matchMedia('(min-width: 768px)')` | CSS 변수는 미디어 쿼리 조건에 쓸 수 없어 같은 숫자가 CSS와 JS 두 곳에 있다. 둘 다 바꿔야 어긋나지 않는다 | 기기 툴바에서 폭 899/900 비교(햄버거 ↔ 가로 메뉴). 메뉴를 연 채로 폭을 늘렸을 때 자동으로 닫히는 시점. `verify.js` R3-7은 768/767 고정이라 FAIL이 날 수 있다 |
| V13 | ★★ | 그리드 최소 카드 폭 `17.5rem` → `22rem`, 그리고 `auto-fit` → `auto-fill` 비교 — `css/style.css › .projects__grid` | 열 수는 "들어갈 수 있는 만큼". `auto-fit`과 `auto-fill`의 차이는 카드가 열 수보다 적을 때(필터로 1~2장만 남기기) 드러난다 | 1280px에서 3열 → 2열이 되는지. Elements의 grid 배지로 트랙 확인. 필터를 눌러 1장만 남기고 두 방식 비교. `verify.js` R3-5b는 3열 기준이라 FAIL이 날 수 있다 |
| V14 | ★★ | Intersection Observer `threshold` 0.2 → 0.8 / 0 / 1 로 바꿔 차이 관찰 — `js/config.js › CONFIG.revealThreshold` (사용처: `js/effects.js › initRevealOnScroll`) | 0은 1px만 보여도, 1은 전부 보여야 시작. 화면보다 큰 요소는 1에서 영원히 안 나타날 수 있다 | 천천히 스크롤하며 나타나는 시점 비교. Elements에서 `.reveal` 요소에 `is-visible`이 붙을 때 클래스가 바뀌는 것을 관찰 |
| V15 | ★★ | 요청 타임아웃을 1ms로 줄여 시간 초과 에러 재현 — `js/config.js › CONFIG.requestTimeoutMs` (사용처: `js/projects.js › fetchRepos`, 문구: `describeError`) | 타임아웃은 `AbortController`가 fetch를 중단시키는 방식이다. `error.name === 'AbortError'` 분기를 따라가 본다 | 새로고침 → "응답이 너무 늦어 요청을 중단했습니다." + '다시 시도'. Network 탭에서 요청이 취소된 것으로 보이는지 확인. 끝나면 10000으로 복원 |
| V16 | ★★ | 카드를 별(stars) 많은 순으로 정렬 — `js/projects.js › renderProjectCards` | `sort`는 원본 배열을 바꾼다. `[...visibleRepos]`로 복사한 뒤 `(a, b) => b.stars - a.stars` | 카드 순서와 Console의 `projectsState.repos.map(r => r.stars)` 비교. 원본 `projectsState.repos`의 순서가 그대로인지, 필터와 함께 동작하는지 확인 |
| V17 | ★★ | 필터에 '스타 1개 이상' 추가 — `js/projects.js › renderProjectFilters`(버튼 목록과 라벨), `renderProjectCards`(거르는 조건) | `FILTER_ALL`처럼 특수 값 상수를 하나 더 만든다. 지금은 `language === filter`로만 거르므로 분기가 필요하다. 라벨은 `language === FILTER_ALL ? '전체' : ...` 부분 | 버튼이 생기는지, 누르면 stars 1 이상만 남는지, `aria-pressed`가 바뀌는지, 클릭 후에도 키보드 포커스가 유지되는지. `renderedFilterKey`가 왜 그대로 동작하는지 설명해 보기 |
| V18 | ★★ | 폼에 전화번호(선택) 필드 추가 — `index.html › #contact-form`, `js/form.js › fieldValidators` | `FIELD_NAMES`는 `Object.keys(fieldValidators)`라 검사 함수만 추가하면 자동 반영된다. 단 HTML에 `name="phone"`과 `#phone-error`가 있어야 한다. 비어 있으면 통과(`''`), 값이 있을 때만 형식 검사 | 빈 값 통과, `abc` 에러, `010-1234-5678` 통과. HTML을 빼먹고 실행해 Console에 뜨는 TypeError를 읽어 보기. 필수로 만들면 `verify.js` R6-2(빈 제출 시 오류 3개)가 FAIL이 날 수 있다 |
| V19 | ★★ | 새 섹션(예: Experience) 추가 + 네비 링크 연결 — `index.html` (새 `<section id>`와 `#nav-menu`의 `<li>`) | `section[id]` + `h2 class="section__title" data-reveal` + `aria-labelledby` 패턴을 복사한다. JS는 손대지 않아도 된다: `initSmoothScroll`이 `a[href^="#"]` 전체에, 등장 애니메이션이 `[data-reveal]` 전체에 init 때 붙기 때문. 배경 교차(`section--alt`)도 신경 쓴다 | 메뉴 클릭 → 부드러운 이동 + 주소창 `#experience`, 모바일 햄버거 메뉴에도 항목이 보이는지, 헤더에 가려지지 않는지(`scroll-margin-top`). `verify.js --static`의 R2-3 |
| V20 | ★★ | 카드에 저장소 생성일(`created_at`) 표시 — `js/projects.js › toProject`(필드 추가), `createProjectCard`(템플릿) | 응답의 필드 이름은 Network 탭 Response에서 확인. `html_url: url`처럼 이름을 바꿔 꺼낸다. 날짜 표시는 `formatDate`를 재사용 | Network → 해당 요청 → Response/Preview에서 `created_at` 확인 → 카드에 표시. Console에서 `projectsState.repos[0]`에 새 속성이 있는지 |
| V21 | ★★ | 1024px 이상에서 About 사진을 오른쪽으로 — `css/style.css › .about`(1024px 규칙), `.about__photo` | 컬럼 정의만 바꾸면 첫 번째 아이템(사진)이 넓은 쪽에 들어간다. `order`나 `grid-template-areas`로 위치를 지정. 시각 순서와 DOM 순서가 달라질 때의 접근성 영향도 생각해 본다 | 1024px, 1280px에서 확인. Elements의 grid 오버레이. `Tab` 순서가 그대로인지 |
| V22 | ★★★ | 정렬 토글 UI(최근 업데이트순 / 별 많은 순) — `index.html`(버튼 그룹), `js/projects.js`: `projectsState`에 `sort` 추가, `renderProjectCards`, `initProjects`(이벤트 위임) | (1) 상태 필드 추가 (2) 렌더링에서 정렬 반영 (3) 버튼 클릭 → `setProjectsState({ sort })`. 필터 버튼(`data-filter`, `aria-pressed`)을 모델로 삼는다. `loadProjects`가 상태를 초기화할 때 `sort`를 어떻게 할지 결정 | 버튼을 누를 때마다 순서가 바뀌는지, Console의 `projectsState.sort`가 바뀌는지, 새로고침/재시도 후에도 동작하는지. "이벤트 → 상태 → 렌더링"으로 말로 설명 |
| V23 | ★★★ | 텍스트 검색 입력으로 카드 거르기 — `index.html`(label + `input type="search"`), `js/projects.js`: `projectsState.query`, `renderProjectCards`, `initProjects` | `input` 이벤트는 폼 검증과 같은 방식. 대소문자 무시는 `toLowerCase()` + `includes()`. 언어 필터와 함께 적용한다(둘 다 만족). 입력창이 다시 그려지는 영역 밖에 있어 포커스가 유지된다 | 타이핑할 때마다 즉시 걸러지는지, 지우면 복원되는지, 결과가 0개일 때 화면은 어떻게 되는지(빈 상태 문구도 생각해 본다) |
| V24 | ★★★ | 스크롤스파이: 지금 보는 섹션의 메뉴 링크 강조 — `js/effects.js`(새 init 함수), `js/main.js`(호출 추가), `css/style.css`(`.nav__link` 강조) | Intersection Observer를 하나 더 만들어 `main section[id]`를 관찰. `rootMargin`으로 화면 중앙 부근만 감지 영역으로 삼는 방법이 있다. 강조는 `aria-current="true"`를 CSS 선택자로 스타일. 이 사이트의 알려진 한계이기도 하다 | 스크롤하면서 Elements에서 `aria-current`가 옮겨 다니는지, 메뉴를 눌러 이동한 뒤에도 맞는지 |
| V25 | ★★★ | GitHub 응답을 `localStorage`에 10분간 캐시(레이트 리밋 대비) — `js/projects.js › fetchRepos`(또는 `loadProjects`), `js/utils.js › readStorage` / `writeStorage` | 저장할 때 `JSON.stringify({ time: Date.now(), data })`, 읽을 때 `JSON.parse` + 만료 시간 비교. 파싱 실패도 대비. '다시 시도'는 캐시를 무시할지 결정해야 한다 | Application → Local Storage에 캐시 키가 생기는지. 두 번째 새로고침에서 Network 탭에 `api.github.com` 요청이 없는지. 만료 시간을 짧게 바꿔 갱신도 확인 |

### 4-3. 요청 → 먼저 열 곳 (라이브 코딩 치트시트)

라이브 코딩에서 가장 시간을 잃는 순간은 "어디를 열어야 하지?"입니다. 요청을 듣고 3초 안에 파일을 떠올리는 연습을 하세요.

| 이런 요청이 오면 | 먼저 열 곳 |
| --- | --- |
| 기준값(px, 초, 임계값)을 바꿔 보세요 | `js/config.js › CONFIG` |
| 색, 간격, 둥글기를 바꿔 보세요 | `css/style.css › :root`, 다크 모드는 `[data-theme="dark"]` |
| 열 수, 정렬, 배치를 바꿔 보세요 | `css/style.css › .projects__grid`, `.skills`, `.about`, `.nav` |
| 화면 폭에 따라 다르게 | `css/style.css › @media (min-width: 768px)` / `(min-width: 1024px)` |
| 화면에 보이는 문구를 바꿔 보세요 | `index.html` |
| 에러/검증 문구를 바꿔 보세요 | `js/form.js › fieldValidators`, `js/projects.js › describeError` |
| 섹션/메뉴를 추가해 보세요 | `index.html` (`section`과 `#nav-menu`) |
| 카드에 항목을 추가/삭제해 보세요 | `js/projects.js › toProject`, `createProjectCard` |
| 정렬/필터/검색을 추가해 보세요 | `js/projects.js › projectsState`, `renderProjectFilters`, `renderProjectCards`, `initProjects` |
| 버튼을 누르면 ~하게 해 보세요 | 해당 기능의 `init~` 함수 안에 `addEventListener` 추가 |
| 다크 모드 관련 | `js/theme.js` + `css/style.css › [data-theme="dark"]` |
| 로딩/에러 화면 관련 | `js/projects.js › renderProjectsStatus` + `css/style.css › .state`, `.spinner` |
| 스크롤에 반응하는 것 | `js/effects.js › initScrollEffects`, `initRevealOnScroll` |
| 애니메이션이 나타나는 시점/모양 | `js/config.js › revealThreshold`, `css/style.css › .reveal` |

### 4-4. 변형 후 `verify.js`가 FAIL이 날 수 있는 경우

`verify.js`에는 기준값이 고정되어 있는 항목이 있습니다. 변형 과제 후 FAIL이 나면 **"내 변경이 실제로 기능을 깼는가, 검사 도구의 고정값과 어긋났을 뿐인가"** 를 구분해 보세요. 이 구분 자체가 좋은 학습입니다.

| 변형 | FAIL이 날 수 있는 항목 | 이유 |
| --- | --- | --- |
| V01 | R5-3 | 299px / 300px 기준으로 확인 |
| V02 | R5-4 | 59px / 60px 기준으로 확인 |
| V03 | R6-3, R8-4 | 에러 문구에 "형식", "요청 한도", "찾을 수 없", "네트워크"가 있는지 문자열로 확인 |
| V08 | R5-5 | localStorage 키 `theme`를 고정으로 읽음 |
| V12 | R3-7 | 768px / 767px 기준으로 메뉴 전환을 확인 |
| V13 | R3-5b | 375px=1열 / 768px=2열 / 1280px=3열 기준 |
| V14 | R5-6 (정적) | threshold가 0.2 이상인지 확인 |
| V18 | R6-2 | 빈 제출 시 오류 필드가 정확히 3개라고 가정 |

---

## 5. AI 활용 원칙

이 저장소의 코드는 AI의 도움을 받아 작성된 초안입니다. 그래서 이 과제에서 "코드를 갖고 있는 것"은 아무런 증거가 되지 않습니다. 평가가 보는 것은 **본인이 이해하고 설명할 수 있는가**입니다.

### 5-1. 먼저 확인할 것

이 문서는 과정 규정을 대신 판단하지 않습니다. 아래를 안내문이나 운영진에게 직접 확인하고, 확인한 내용을 적어 두세요.

- [ ] 과정이 AI 도구 사용을 허용하는 범위는 어디까지인가 (코드 생성, 설명 요청, 디버깅 등)
- [ ] 사용 사실을 어떤 방식으로 밝혀야 하는가 (README, 발표 중 구두, 별도 양식 등)
- [ ] 초안 코드를 제출물에 그대로 써도 되는가, 내 것으로 바꿔야 하는 최소 범위가 있는가

확인한 내용(출처와 날짜): ______________________________________________

평가에서 "직접 작성했나요?" 같은 질문을 받으면 규정이 정한 방식대로 사실을 말하면 됩니다. 답변 예시는 `docs/03-peer-review-guide.md`의 Q&A에 있습니다.

### 5-2. 코드를 시키기보다 "왜 이렇게 했나"를 묻는다

같은 도구도 어떻게 쓰느냐에 따라 이해가 늘 수도, 그대로 남을 수도 있습니다. 이해를 늘리는 쪽의 질문은 대체로 이런 모양입니다.

| 하고 싶은 것 | 이렇게 묻기 (예시) | 이유 |
| --- | --- | --- |
| 코드의 의도 파악 | "`renderedFilterKey`가 없으면 어떤 문제가 생기나요? 직접 확인할 방법도 알려 주세요" | 답을 듣고 끝내지 않고 DevTools로 재현해 본다 |
| 설계 이유 | "이 파일에서 함수를 `renderProjectsStatus`, `renderProjectFilters`, `renderProjectCards`로 나눈 이유가 뭔가요? 하나로 합치면 뭐가 불편한가요?" | 설계 결정은 평가에서 자주 묻는다 |
| 대안 비교 | "`querySelector` 대신 다른 방법도 있나요? 각각 장단점은요?" | "왜 A 대신 B?" 질문 대비 |
| 내 이해 점검 | "제 설명을 채점해 주세요. 틀렸거나 빠진 부분만 짚어 주세요: (내 설명)" | 설명하기 단계를 확인받는다 |
| 에러 해결 | "기대한 결과 / 실제 결과 / 에러 메시지 전문 / 관련 코드 10줄"을 함께 보내기 | 6-3의 질문 템플릿 |

답이 맞는지는 **직접 확인**합니다. AI 도구의 설명이 틀리는 일도 있으므로, 중요한 주장은 DevTools에서 실행해 보거나 MDN 같은 공식 문서와 대조하세요. 설명이 상충하면 실험이 이깁니다.

### 5-3. 지우고 다시 써 보기

- 함수 하나를 정해서 **파일을 닫고 빈 화면에서 다시 쓴다.** 막힌 지점이 곧 이해가 덜 된 지점입니다.
- 다시 쓴 코드와 원본을 나란히 놓고, 다른 부분마다 "내가 이렇게 쓴 이유 / 원본이 이렇게 쓴 이유"를 한 줄씩 적습니다. 둘 다 맞을 수 있고, 그 차이를 설명하는 것이 곧 설계 이야기입니다.
- 변수나 함수 이름을 내 말로 바꿔 보세요. 이름을 바꿀 수 있다는 것은 역할을 안다는 뜻입니다.

### 5-4. 이해 여부 셀프 테스트

| 테스트 | 방법 | 통과 기준 |
| --- | --- | --- |
| 빈 화면 테스트 | 함수 하나를 코드 없이 다시 쓴다 (예: `escapeHtml`, `fieldValidators.email`, `setTheme`) | 완전히 같지 않아도 같은 동작을 한다 |
| 흐름도 테스트 | 코드를 가리고 종이에 "이벤트 → 상태 → DOM" 화살표를 그린다 (theme, form, projects 각각) | 함수 이름을 화살표 옆에 쓸 수 있다 |
| 삭제 예측 테스트 | 한 줄을 주석 처리하기 **전에** 증상을 적고, 실행해서 맞혀 본다 (예: `event.preventDefault()`, `observer.unobserve(target)`, `finally`) | 예측이 맞거나, 틀렸다면 이유를 설명할 수 있다 |
| 녹음 테스트 | 함수 하나를 60초 설명하며 녹음한다 | "그냥", "뭔가", "어쨌든"으로 넘어간 곳을 표시할 수 있다 |
| "왜?" 3번 테스트 | 코드의 한 줄을 골라 "왜 이렇게?"를 3번 연속 답한다 | 세 번째 답이 막히면 그 개념을 개념 노트에서 다시 본다 |
| 낯선 요청 테스트 | 4장 변형 과제를 무작위로 하나 뽑아 시간을 잰다 | ★ 5분, ★★ 15분 안에 원인 파일을 찾고 시작할 수 있다 |

### 5-5. 이해도 지도 (복사해서 채우기)

파일/함수마다 지금 상태에 ○를 표시합니다. 초록 = 코드를 안 보고 설명하고 바꿀 수 있음, 노랑 = 보면서 설명할 수 있음, 빨강 = 읽어도 잘 모르겠음. 빨강을 노랑으로, 노랑을 초록으로 바꾸는 것이 남은 시간의 할 일입니다.

| 파일 › 대상 | 초록 | 노랑 | 빨강 |
| --- | :---: | :---: | :---: |
| `index.html › 구조 / head / 폼` | | | |
| `css/style.css › 변수 / 다크 모드` | | | |
| `css/style.css › Flex / Grid / 미디어 쿼리` | | | |
| `js/theme.js › setTheme / renderTheme / getInitialTheme` | | | |
| `js/nav.js › initNavigation / initSmoothScroll` | | | |
| `js/effects.js › initScrollEffects` | | | |
| `js/effects.js › initRevealOnScroll / observeReveal` | | | |
| `js/effects.js › initTypingEffect` | | | |
| `js/form.js › fieldValidators / contactState / renderContactForm` | | | |
| `js/projects.js › fetchRepos / describeError / loadProjects` | | | |
| `js/projects.js › render* 3종 / setProjectsState` | | | |
| `js/projects.js › 이벤트 위임 / createProjectCard / escapeHtml` | | | |

---

## 6. 막혔을 때 디버깅 루틴

### 6-1. 증상별 표

| 증상 | 먼저 볼 곳 | 이렇게 확인 | 흔한 원인 |
| --- | --- | --- | --- |
| 버튼을 눌러도 아무 일이 없다 | Console | 빨간 에러의 **마지막 줄**(파일명:줄 번호)을 클릭해 Sources로 이동. 에러가 없으면 리스너가 붙었는지 Elements의 Event Listeners 탭 | 선택자 오타, 이벤트가 붙기 전에 요소가 없었음, 다른 곳에서 먼저 에러가 나서 `init`이 중단됨 |
| `Cannot read properties of null (reading 'addEventListener')` | Console | 같은 선택자를 Console에 직접 입력: `document.querySelector('#nav-toggle')`. `null`이면 HTML에 그 `id`가 없거나 오타 | `id` 오타, HTML에서 지웠음, 스크립트가 DOM보다 먼저 실행됨(`defer` 누락) |
| `ReferenceError: X is not defined` | Console → Network | 함수가 정의된 파일이 로드됐는지 Network 탭의 js 요청 Status 확인, `index.html`의 `script` 순서 확인 | 로드 순서(`config → utils → ... → main`), 오타, 파일 경로 오류(404) |
| 스타일이 안 먹는다 | Elements → Styles | 요소를 선택하고 Styles에서 취소선이 그어진 규칙 찾기. Computed 탭에서 최종 값과 어느 규칙이 이겼는지 확인 | 선택자 특이도, 선언 순서(나중 것이 이김), 클래스 오타, 브라우저 캐시 |
| 클래스가 붙었다 떨어졌다 하는데 이유를 모르겠다 | Elements | 요소 우클릭 → `Break on` → `attribute modifications`. 클래스가 바뀌는 순간 코드에서 멈춘다 | 다른 이벤트나 `render`가 덮어씀, `toggle` 조건 오류 |
| 값이 기대와 다르다 | Console | `console.log`를 3곳에 둔다: 함수 **입구**(들어온 값), **분기 직전**(조건에 쓰는 값), **출력 직전**(화면에 쓸 값) | 매개변수 이름 혼동, `undefined`, 타입(문자열 vs 숫자) |
| 데이터가 안 온다 / 이상하다 | Network | 필터를 `Fetch/XHR`로. 요청 클릭 → Headers(URL, Status), Response(본문). 404/403 여부 확인 | 사용자 아이디 오타, 레이트 리밋(403), 응답 필드 이름 오해 |
| 실행 흐름을 한 줄씩 따라가고 싶다 | Sources | 줄 번호를 클릭해 브레이크포인트를 걸고 새로고침/동작 실행. `F10` 다음 줄, `F11` 함수 안으로, `F8` 계속. 오른쪽 Scope 패널에서 변수 값 확인 | — (도구 사용법) |
| 저장했는데 화면이 그대로다 | 브라우저 | 하드 리로드(`Ctrl+Shift+R`). DevTools Network 탭의 `Disable cache`(DevTools가 열려 있을 때만 적용). Live Server가 켜져 있는지 | 캐시, 다른 폴더를 열고 있음, 저장을 안 함 |
| 새로고침하면 상태가 초기화된다 | Application | Local Storage에 키가 저장됐는지 확인. 코드에서 `writeStorage`가 호출되는지 | 저장 코드 누락, 키 이름 불일치, 사생활 보호 모드 |
| 특정 폭에서만 깨진다 | 기기 툴바 | `Ctrl+Shift+M` → Responsive에서 폭을 직접 드래그. 깨지는 폭에서 Elements로 요소 선택 | 미디어 쿼리 범위, 고정 폭(px), 넘치는 긴 텍스트 |
| 내 변경 때문에 다른 게 깨졌다 | 터미널 | `git diff`로 바꾼 줄만 보기. 의심되면 `git restore <파일>`로 되돌린 뒤 다시 하나씩 | 변경 범위가 너무 컸음 → 한 번에 하나씩 바꾼다 |

### 6-2. 브레이크포인트 vs `console.log`

| 상황 | 추천 |
| --- | --- |
| "이 함수가 불리긴 하나?" | `console.log('여기')` 한 줄 |
| "값이 뭐지?" | `console.log(변수)` (객체는 `console.table`이 보기 편함) |
| "여기서 저기까지 어떻게 흘러가지?" | 브레이크포인트 + `F10` / `F11`로 한 줄씩 |
| "이 값이 언제 바뀌지?" | 브레이크포인트 + Watch 패널에 변수 추가 |
| "누가 이 클래스를 바꿨지?" | Elements의 `Break on → attribute modifications` |

`console.log`를 넣었다면 커밋 전에 `Ctrl+Shift+F`로 `console.log`를 검색해 지웁니다.

### 6-3. 질문 템플릿

막혀서 사람이나 도구에게 물을 때는 아래 다섯 줄이 있으면 답이 훨씬 빨리 옵니다. 쓰는 동안 스스로 답을 찾는 경우도 많습니다.

```text
1. 하려는 것:   (예: 필터에 '스타 1개 이상' 버튼을 추가하고 싶다)
2. 기대한 결과: (예: 버튼을 누르면 stars가 1 이상인 카드만 남는다)
3. 실제 결과:   (예: 버튼은 생기는데 누르면 카드가 전부 사라진다)
4. 에러 메시지: (Console 전문. 없으면 "에러 없음")
5. 관련 코드:   (파일명 › 함수명 + 해당 10줄 안팎)  / 이미 시도한 것
```

---

## 7. 마무리 점검

Phase 7 끝에서 아래 표를 채웁니다. "30초 설명"은 실제로 소리 내어 말하고 시간을 재어 보세요.

| 목표 | 30초 설명 가능 | 코드 위치를 보여 줄 수 있음 | 꼬리 질문 2개에 답할 수 있음 |
| --- | :---: | :---: | :---: |
| ① HTML 시맨틱 | [ ] | [ ] | [ ] |
| ② Flex와 Grid | [ ] | [ ] | [ ] |
| ③ `querySelector` + `addEventListener` | [ ] | [ ] | [ ] |
| ④ 화살표 함수 / 구조분해 / `map` / `filter` | [ ] | [ ] | [ ] |
| ⑤ `fetch` + `async/await` + 4가지 상태 | [ ] | [ ] | [ ] |
| ⑥ 이벤트 → 상태 → DOM | [ ] | [ ] | [ ] |

### 하루 학습 로그 (3줄)

```text
날짜: 2026-__-__   Phase: _   공부한 시간: _h
1. 오늘 이해한 것:
2. 아직 모르는 것:
3. 내일 할 것:
```

### 마지막으로

- 이 문서의 시간 배분은 기준일 뿐입니다. 빨리 끝나는 Phase는 변형 과제와 설명하기에 시간을 더 쓰고, 오래 걸리는 Phase는 Phase 7의 시간을 조금 빌려 오세요. 단, Phase 7의 리허설은 줄이지 않는 것을 권합니다.
- 평가에서는 완벽한 답보다 **아는 것과 모르는 것을 구분해서 말하는 태도**가 더 신뢰를 줍니다. 그 연습은 `docs/03-peer-review-guide.md`에 있습니다.
