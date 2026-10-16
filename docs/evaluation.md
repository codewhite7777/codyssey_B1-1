# 피어 평가 준비

평가 체크리스트 항목마다 **무엇을 보여주고, 어떻게 답할지**를 정리합니다. `app.js 3번`처럼 적은 번호는 [js/app.js](../js/app.js)의 구역 번호입니다.

[← README](../README.md) · [개념 정리 (그림)](concepts.md)

---

## 평가 진행 순서 (시연)

[README 구조 설계](../README.md#구조-설계)로 전체 모양을 먼저 보여주고, [실행과 확인 흐름](../README.md#실행과-확인-흐름)을 따라 하면서 단계마다 아래 질문에 답합니다.

| 순서 | 할 것 | 답하는 항목 |
|---|---|---|
| 1 | README **구조 설계**: 파일 구조, 화면 구조, JS 흐름 표 | 항목 2, 3 |
| 2 | 배포 URL을 열고 **2단계** 반응형: 폭을 줄여 햄버거가 나오는 것 | 항목 1, 4 |
| 3 | **3단계** 다크 모드: 클릭 → 새로고침 → 유지 | 항목 1, 3 |
| 4 | **4단계** 메뉴, 부드러운 스크롤, 맨 위로, 애니메이션 | 항목 1 |
| 5 | **5단계** API 네 가지 상태 (api.github.com 차단 → 다시 시도, 콘솔로 빈 상태) | 항목 1, 3, 4 |
| 6 | **6단계** 폼: 빈 칸 제출, 이메일 `abc` | 항목 1, 3 |
| 7 | VS Code에서 `app.js`를 열고 아래 항목 2~4 질문에 답변 | 항목 2~4 |

---

## 항목 1. 결과물이 동작하는가

| 평가 질문 | 상태 | 보여줄 곳 |
|---|---|---|
| 창을 줄이면 레이아웃이 모바일에 맞게 바뀌는가? | ✅ | [README 2단계](../README.md#2단계-반응형-레이아웃-확인), 스크린샷 [모바일](../images/screenshots/mobile.png) |
| 테마 토글로 다크/라이트 전환, 새로고침 후 유지? | ✅ | [3단계](../README.md#3단계-다크-모드-확인), 개발자 도구 Local Storage `theme` |
| 햄버거, 스크롤 애니메이션, 맨 위로 버튼 동작? | ✅ | [4단계](../README.md#4단계-메뉴와-스크롤-확인) |
| GitHub 데이터 표시, 로딩/에러/빈 상태 구분? | ✅ | [5단계](../README.md#5단계-github-api-네-가지-상태-확인) |
| 필수값 누락, 이메일 형식 오류에 즉각 피드백? | ✅ | [6단계](../README.md#6단계-폼-검증-확인). `input` 이벤트라 입력하는 순간 검사 |

---

## 항목 2. 구조를 설명할 수 있는가

> **말하기**는 외우지 말고 흐름만 잡아 본인 말로 합니다.

### HTML, CSS, JS를 파일로 나눈 이유와 각 역할

**보여줄 곳**: [README 파일 구조](../README.md#파일-구조-역할마다-파일을-나눈다), [index.html 11~13줄](../index.html#L11-L13), [개념 1 그림](concepts.md#1-html-css-js를-왜-나누나-defer는-뭔가)

| 파일 | 역할 |
|---|---|
| index.html | 무엇이 있나 (내용, 구조) |
| style.css | 어떻게 보이나 (색, 배치) |
| app.js | 무엇이 바뀌나 (이벤트, 상태, 화면 갱신) |

**말하기**
> "역할별로 나눴습니다. 색을 바꾸고 싶으면 CSS만, 동작을 고치고 싶으면 JS만 열면 됩니다. 한 파일에 섞이면 수정할 곳을 찾기 어렵고, 하나를 고치다 다른 걸 망가뜨리기 쉽습니다. HTML은 `<link>`로 CSS를, `<script defer>`로 JS를 불러옵니다."

**꼬리질문 "defer는 왜?"** → "JS가 `querySelector`로 버튼을 찾는데, HTML을 다 읽기 전에 JS가 돌면 버튼이 아직 없어서 `null`이 됩니다. `defer`는 HTML을 다 읽은 뒤에 실행하게 합니다."

### 시맨틱 태그를 쓴 기준

**보여줄 곳**: [README 화면 구조](../README.md#화면-구조-시맨틱-태그로-영역을-나눈다), [개념 2 그림](concepts.md#2-시맨틱-태그-태그-이름이-곧-역할)

**말하기**
> "`div`만 쓰면 태그만 봐서는 어디가 메뉴고 어디가 본문인지 모릅니다. 사이트 머리말은 `header`, 이동 메뉴는 `nav`, 핵심 내용은 `main`, 제목이 붙는 주제 묶음은 `section`, 맨 아래는 `footer`로 했습니다. 프로젝트 카드는 하나만 떼어 놔도 뜻이 통해서 `article`입니다. 스크린 리더나 검색 엔진도 이 태그로 구조를 파악합니다."

**꼬리질문 "section과 article 차이?"** → "section은 큰 주제 묶음(프로젝트 섹션 전체), article은 그 안에서 독립된 한 덩어리(저장소 카드 하나)입니다."

### CSS 변수(:root)의 이점

**보여줄 곳**: [style.css 1번](../css/style.css#L6-L52), [개념 3 그림](concepts.md#3-css-변수와-다크-모드-그리고-localstorage)

```css
:root               { --color-bg: #fafbf8; --color-text: #172721; }
[data-theme="dark"] { --color-bg: #101b16; --color-text: #edf5ee; }
body { background: var(--color-bg); color: var(--color-text); }
```

**말하기**
> "색을 변수로 한 곳에 정의하고 나머지는 `var(--color-bg)`로 가져다 씁니다. 그래서 다크 모드는 **변수 값만 바꾸면** 됩니다. JS가 `<html data-theme="dark">`를 붙이면 `[data-theme="dark"]`의 값이 적용되고, 이 변수를 쓰는 모든 요소가 한 번에 바뀝니다. 변수가 없으면 다크 모드용 규칙을 요소마다 다시 써야 합니다."

**꼬리질문 "다른 이점?"** → "같은 색을 여러 곳에 쓰는데, 바꿀 때 한 줄만 고치면 됩니다. `--space-m` 같은 간격도 같아서 디자인이 일정해집니다."

### onclick 대신 addEventListener를 쓴 이유

**보여줄 곳**: `index.html`에 `onclick`이 없는 것, [app.js 3번](../js/app.js#L60-L65), [개념 6 그림](concepts.md#6-dom-선택과-이벤트-찾아서-붙인다)

| | `onclick` 속성 | `addEventListener` |
|---|---|---|
| 어디에 쓰나 | HTML 안 (`<button onclick="toggle()">`) | JS 안 |
| 같은 이벤트에 여러 함수 | 하나만 (덮어씀) | 여러 개 붙일 수 있음 |
| 역할 분리 | HTML에 동작 코드가 섞임 | HTML은 구조만, 동작은 JS에만 |

**말하기**
> "onclick은 HTML에 JS를 섞어 쓰는 거라 파일을 나눈 의미가 줄어듭니다. 그리고 한 요소에 함수를 하나밖에 못 붙입니다. addEventListener는 JS에서 `querySelector`로 요소를 찾아 '클릭되면 이 함수 실행'을 붙이고, 여러 개도 붙일 수 있어서, 나중에 기능을 더해도 기존 동작을 덮어쓰지 않습니다."

---

## 항목 3. 흐름을 설명할 수 있는가

### 이벤트 → 상태 변경 → 화면 업데이트 따라가기

**보여줄 곳**: [app.js 1번 STATE](../js/app.js#L19-L31), [3번 다크 모드](../js/app.js#L50-L65), [개념 7 그림](concepts.md#7-이벤트--상태-변경--화면-업데이트)

다크 모드로 따라가기:

```js
themeButton.addEventListener("click", () => {             // ① 이벤트: 버튼 클릭
  STATE.theme = STATE.theme === "dark" ? "light" : "dark"; // ② 상태 변경
  localStorage.setItem(THEME_KEY, STATE.theme);            //    (저장)
  renderTheme();                                           // ③ 화면 업데이트 호출
});

const renderTheme = () => {
  document.documentElement.dataset.theme = STATE.theme;   // <html data-theme="dark">
  themeButton.textContent = STATE.theme === "dark" ? "라이트 모드" : "다크 모드";
};
```

**말하기**
> "① 버튼을 클릭하면 ② `STATE.theme`을 dark로 바꾸고 로컬스토리지에 저장합니다. ③ `renderTheme`이 STATE를 보고 `<html>`에 `data-theme="dark"`를 붙이면, CSS의 다크 변수가 적용돼 전체 색이 바뀝니다. 새로고침하면 맨 아래 10번에서 저장된 값을 STATE에 넣고 `renderTheme`을 다시 부르니까 유지됩니다."

같은 흐름의 다른 예:

| | 이벤트 | 상태 | 렌더링 |
|---|---|---|---|
| API | 시작, 다시 시도 클릭 | `projectStatus`: loading → success/empty/error | `renderProjects` |
| 폼 | input, submit | `formErrors.email = "이메일 형식이 아닙니다..."` | `renderForm` → 문구 + `.error` 클래스 |

### async/await와 try/catch로 성공/실패 나누기

**보여줄 곳**: [app.js 8번 `loadProjects`](../js/app.js#L172-L199), [개념 9 그림](concepts.md#9-비동기-fetch-asyncawait-trycatch)

```js
const loadProjects = async () => {
  STATE.projectStatus = "loading";          // ① 로딩 상태로 먼저 그림
  renderProjects();
  try {
    const response = await fetch(url);     // ② 응답을 기다림
    if (!response.ok) throw new Error(...); // ③ 403/404면 직접 에러로 보냄
    const repos = await response.json();
    STATE.projects = repos.filter(...).slice(0, 6);
    STATE.projectStatus = STATE.projects.length > 0 ? "success" : "empty"; // ④ 성공 or 빈
  } catch (error) {
    STATE.projectStatus = "error";          // ⑤ 실패
  }
  renderProjects();                         // ⑥ 결과 상태로 다시 그림
};
```

**말하기**
> "요청 전에 loading으로 바꿔 스피너를 보여줍니다. `await`로 응답을 기다리고, 받으면 개수에 따라 success나 empty로 나눕니다. 네트워크가 끊기면 fetch가 에러를 던져서 catch로 가고 error 상태가 됩니다. 마지막에 어느 쪽이든 `renderProjects`를 한 번 불러서 상태에 맞는 화면을 그립니다."

**꼬리질문 "`response.ok` 검사는 왜?"** → "fetch는 서버가 403(요청 횟수 초과)이나 404를 줘도 **응답은 받았으니까** 에러를 던지지 않습니다. 그래서 `ok`가 아니면 직접 `throw`해서 catch로 보냅니다. 검사가 없으면 403 응답 본문(배열이 아닌 객체)에 `filter`를 부르다 엉뚱한 TypeError로 catch에 가게 돼서, 원인이 HTTP 오류라는 게 드러나지 않습니다."

**꼬리질문 "await가 없으면?"** → "`fetch`는 바로 Promise(나중에 올 값)를 돌려줘서, 응답이 오기 전에 다음 줄이 실행됩니다. `await`는 응답이 올 때까지 이 함수 안에서만 기다리게 합니다. 그동안 페이지의 다른 동작은 멈추지 않습니다."

### 배열 메서드로 GitHub 데이터 → 카드

**보여줄 곳**: [app.js 8번 `createCard`, `renderProjects`](../js/app.js#L141-L170), [개념 8 그림](concepts.md#8-es6-문법과-배열-메서드-github-데이터--카드)

| 단계 | 코드 | 결과 |
|---|---|---|
| 1. 받기 | `await response.json()` | 저장소 객체 배열 (최근 업데이트 순) |
| 2. 거르기 | `.filter((repo) => !repo.fork)` | 남의 것을 복사한 fork 제외 |
| 3. 자르기 | `.slice(0, PROJECT_COUNT)` | 앞에서 6개 |
| 4. 바꾸기 | `projects.map(createCard)` | 객체 6개 → HTML 문자열 6개 |
| 5. 합치기 | `.join("")` | 문자열 하나 |
| 6. 넣기 | `projectGrid.innerHTML = ...` | 화면에 카드 6개 |

`createCard` 안에서는 구조분해로 필요한 값만 꺼내고, 템플릿 리터럴로 HTML을 만듭니다.

```js
const { name, description, language, stargazers_count: stars, html_url: url } = repo;
return `<article class="project-card"><h3><a href="${url}">${name}</a></h3> ...`;
```

**말하기**
> "filter는 조건에 맞는 것만 남긴 새 배열, map은 각 원소를 다른 모양으로 바꾼 새 배열을 만듭니다. 저장소 객체 배열을 map으로 카드 HTML 배열로 바꾸고, join으로 이어서 innerHTML에 넣습니다. for문으로 빈 배열에 push하는 것보다 '무엇을 하는지'가 이름에 드러납니다."

### Flexbox와 Grid를 어디에, 왜

**보여줄 곳**: [`.nav`](../css/style.css#L114-L121), [`.project-grid`](../css/style.css#L194-L203), [개념 4 그림](concepts.md#4-flexbox와-grid-한-줄이냐-바둑판이냐)

| | 어디에 | 왜 |
|---|---|---|
| Flexbox | 네비게이션 (로고 · 메뉴 · 버튼), 히어로 버튼 줄, 푸터 | **한 줄**로 늘어선 것을 정렬. `justify-content: space-between`으로 로고는 왼쪽 끝, 버튼은 오른쪽 끝 (메뉴는 `margin-left: auto`로 버튼 옆에 붙임) |
| Grid | 프로젝트 카드, 기술 카드 | **행과 열**이 있는 바둑판. 카드 크기가 줄마다 맞음 |

```css
.project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
```

**말하기**
> "네비게이션은 한 줄에 놓고 양끝으로 벌리기만 하면 돼서 Flexbox를 썼습니다. 카드는 가로세로가 맞는 격자라 Grid를 썼습니다. `auto-fit, minmax(280px, 1fr)`은 '카드 하나가 최소 280px이 되게, 들어가는 만큼 열을 만들어라'라서 미디어 쿼리 없이 폭에 따라 3열 → 2열 → 1열로 바뀝니다."

---

## 항목 4. 설계 이유를 말할 수 있는가

### STATE 객체를 따로 만든 이유 (그냥 변수로 하면 안 되나)

**보여줄 곳**: [app.js 1번](../js/app.js#L19-L31), README [5단계 빈 상태](../README.md#5단계-github-api-네-가지-상태-확인), [개념 7 그림](concepts.md#7-이벤트--상태-변경--화면-업데이트)

**말하기**
> "화면을 결정하는 값을 STATE 한 곳에 모아서, **화면이 왜 이렇게 보이는지는 STATE만 보면** 알 수 있게 했습니다. 규칙은 '이벤트는 STATE만 바꾸고, 화면은 render 함수만 바꾼다'입니다. 변수를 흩어 놓거나 이벤트 핸들러에서 DOM을 직접 고치면, 같은 화면을 여러 곳에서 고치게 돼 어긋나기 쉽습니다. 예를 들어 콘솔에서 `STATE.projectStatus = "empty"; renderProjects();`만 해도 빈 상태 화면이 나옵니다. React의 state와 render가 이 방식입니다."

**꼬리질문 "변수로 하면 안 되나?"** → "동작은 같게 만들 수 있습니다. 하지만 `let theme`, `let menuOpen`, `let status`...가 흩어지면 화면에 영향을 주는 값이 무엇인지 한눈에 안 보입니다. 객체로 묶으면 목록이 곧 '이 페이지의 상태'입니다."

### 반응형을 모바일 퍼스트로 작성한 이유

**보여줄 곳**: [style.css 2~4번 기본 = 모바일](../css/style.css#L54-L265), [5번 미디어 쿼리](../css/style.css#L267-L294), [개념 5 그림](concepts.md#5-모바일-퍼스트-반응형-기본은-휴대폰-넓어지면-더하기)

```css
.nav-menu { display: none; }              /* 기본: 모바일 → 메뉴 숨김 */
@media (min-width: 768px) {               /* 넓어지면 추가 */
  .nav-menu { display: flex; }
}
```

**말하기**
> "기본 스타일을 가장 좁은 화면 기준으로 쓰고, `min-width` 미디어 쿼리로 넓은 화면에 필요한 것만 **더했습니다**. 작은 화면은 1열이라 단순하고, 넓어질 때 열을 늘리는 쪽이 반대로 줄이는 것보다 덮어쓸 코드가 적습니다. 실제 방문자도 휴대폰이 많아서, 가장 많이 쓰는 화면이 기본이 되게 했습니다."

**꼬리질문 "데스크톱 퍼스트면?"** → "`max-width`로 좁은 화면에서 이것저것 끄고 바꿔야 해서, 덮어쓰는 규칙이 많아지고 모바일이 무거운 스타일을 다 받은 뒤 다시 지우게 됩니다."
