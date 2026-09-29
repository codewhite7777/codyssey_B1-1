# 개념 정리 노트: 나를 소개하는 웹페이지 처음부터 만들기

> 웹(브라우저, DOM, 렌더링, 이벤트, 비동기)을 하나도 몰라도 시작할 수 있게 만든 학습자용 노트예요.
> 목표는 하나예요. 완성한 뒤 **동료 3명에게 내 코드를 직접 설명**할 수 있게 되는 것이에요.

## 0. 이 노트 읽는 법 + 과제 전체 지도

> **이 장을 읽고 나면** HTML, CSS, JavaScript가 각각 무슨 일을 하는지 한 문장씩 말할 수 있어요. 그리고 6개 학습 목표를 설명하려면 이 노트의 어느 장을 읽어야 하는지 알게 돼요.

### 0.1 노트 읽는 법

모든 주요 개념은 아래 순서로 정리했어요. 이 순서대로 말하면 그대로 설명이 돼요.

```
한 줄 정의 → 비유 → 핵심 설명 → 왜 필요한가 → 내 코드에서는 → 직접 확인해 보기 → 스스로 설명해보기
```

- **코드 위치 표기**: 줄 번호 대신 `파일명 › 함수명/선택자`로 써요. 예: `js/theme.js › renderTheme()`, `css/style.css › .projects__grid`. 코드가 바뀌면 줄 번호는 틀어지기 때문이에요. VS Code에서 `Ctrl+Shift+F`(Mac은 `Cmd+Shift+F`)로 함수 이름을 검색해 찾아가세요.
- **직접 확인해 보기**: Chrome DevTools(개발자 도구)로 해요. `F12` 또는 `Ctrl+Shift+I`(Mac은 `Cmd+Option+I`)로 열고, Elements(DOM/CSS 보기·수정), Console(JS 실행·에러), Network(요청/응답), Application(localStorage), Sources(중단점) 탭을 써요.
- **읽는 순서 추천**: 처음이라면 0장부터 차례대로 읽어요. 이미 아는 장은 "스스로 설명해보기"만 풀어 보고 넘어가도 좋아요.
- **확실하지 않은 브라우저 동작**은 단정하지 않고 "환경에 따라 다를 수 있어요"라고 적었어요.

### 0.2 HTML은 뼈대, CSS는 옷, JavaScript는 동작

| 구분 | 하는 일 | 사람에 비유하면 | 이 프로젝트 파일 | 없으면? |
|------|---------|-----------------|------------------|---------|
| HTML | 내용과 구조 (무엇이 있는가) | 뼈대와 장기 | `index.html` | 보여 줄 내용이 없음 |
| CSS | 모양과 배치 (어떻게 보이는가) | 옷과 화장 | `css/style.css` | 내용은 있지만 밋밋한 문서 |
| JavaScript | 동작과 변화 (누르면 어떻게 되는가) | 근육과 신경 | `js/*.js` (8개 파일) | 예쁘지만 반응 없는 그림 |

이 프로젝트의 핵심 한 문장은 **이벤트 → 상태 변경 → 화면 갱신**이에요. 사용자가 무언가 하면(이벤트), 값이 바뀌고(상태), 화면이 그 값에 맞게 다시 그려져요(렌더링). 12장에서 자세히 다뤄요.

### 0.3 프로젝트 파일 지도

```
codyssey_B1-1/
├── index.html          뼈대. 6개 영역(Hero/About/Skills/Projects/Contact/Footer)
├── css/style.css       모든 스타일. 변수 → 기본 → 레이아웃 → 컴포넌트 → 섹션 → 반응형
├── js/
│   ├── config.js       바꿔 쓰는 값(60px, 300px, 0.2, 사용자 이름 등)을 한곳에
│   ├── utils.js        escapeHtml, toSafeUrl, sleep, readStorage/writeStorage ...
│   ├── theme.js        다크 모드      (themeState  → renderTheme)
│   ├── nav.js          햄버거 메뉴 + 부드러운 스크롤
│   ├── effects.js      스크롤 효과, 등장 애니메이션, 타자기, 푸터 연도
│   ├── form.js         Contact 폼 검증 (contactState → renderContactForm)
│   ├── projects.js     GitHub API + 4가지 상태 + 언어 필터 (projectsState → renderProjects)
│   └── main.js         진입점. 위 파일들의 init 함수를 순서대로 호출
├── images/             favicon.svg, profile.svg, screenshots/
├── tools/              verify.js(과제 요구사항 자동 점검) 등 개발용 도구 (사이트에서는 쓰지 않음)
└── .nojekyll           GitHub Pages가 파일을 가공하지 않게 하는 빈 파일
```

`index.html`은 `js/config.js`부터 `js/main.js`까지 8개를 **이 순서대로 `defer`** 로 불러와요. 앞 파일에서 만든 함수와 상수를 뒤 파일이 쓰기 때문에 순서가 중요해요. `main.js`가 마지막인 이유는 "앞에서 정의한 함수들을 조립해서 실행"하는 파일이라서예요.

### 0.4 학습 목표 6개와 이 노트의 대응

| # | 학습 목표 | 먼저 읽을 장 |
|---|-----------|--------------|
| ① | 시맨틱 태그를 왜 쓰는지, 어떤 기준으로 구조를 설계했는지 | 3장 (+ 1장, 2장) |
| ② | Flexbox와 Grid의 차이, 언제 무엇을 고르는지 | 5장 (+ 4장, 6장) |
| ③ | querySelector로 DOM을 선택하고 addEventListener로 이벤트를 연결하는 흐름 | 9장, 10장 |
| ④ | 화살표 함수, 구조분해 할당, 배열 메서드(map/filter)의 필요성과 사용법 | 7장, 8장 |
| ⑤ | fetch와 async/await로 데이터를 가져오고 로딩/성공/실패를 UI로 표현 | 11장 (+ 12장) |
| ⑥ | 이벤트 → 상태 변경 → DOM 업데이트의 연결 (React 상태-렌더링의 기초) | 12장 (+ 13장, 14장) |

18장에서 6개 목표 각각에 대한 **30초 모범 답변**을 확인할 수 있어요.

## 1. 웹이 동작하는 큰 그림

> **이 장을 읽고 나면** 주소창에 URL을 넣었을 때 어떤 일이 일어나는지 설명할 수 있어요. 또 이 사이트가 왜 "정적 사이트"인지, 왜 상대경로를 써야 GitHub Pages에서 동작하는지 말할 수 있어요.

### 1.1 브라우저, 서버, URL
- **한 줄 정의**: 브라우저는 웹 문서를 요청해 받아서 화면으로 보여 주는 프로그램이고, 서버는 요청에 응답하는 컴퓨터예요. URL은 그 문서의 주소예요.
- **비유**: 식당이에요. 브라우저는 손님(주문서를 쓰고 음식을 받아 먹음), 서버는 주방, URL은 "어느 식당의 몇 번 메뉴"라고 적은 주문서예요.
- **핵심 설명**:

```
https://codewhite7777.github.io/codyssey_B1-1/index.html?lang=ko#projects
└─┬─┘   └────────────┬────────┘└───────┬──────┘└────┬───┘└──┬───┘└───┬───┘
scheme            host(도메인)        path(경로)   파일    query  fragment
(통신 방식)     (어느 서버인가)   (서버 안의 위치)          (질문)  (문서 안 위치)
```

  `#projects` 같은 fragment는 서버로 보내지지 않고 브라우저가 문서 안에서 그 위치로 이동할 때만 써요. 이 사이트의 메뉴(`href="#about"`)가 바로 fragment 이동이에요.
- **왜 필요한가**: 주소의 각 부분 뜻을 모르면 "왜 이 파일이 404인지", "왜 이 요청이 막히는지"를 읽어낼 수 없어요.
- **내 코드에서는**: `index.html › <nav>`의 `href="#about"` 등 4개 링크(fragment)와, `js/projects.js › fetchRepos`의 `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=30`(query가 있는 주소)를 비교해 보세요.
- **직접 확인해 보기**: (1) 배포된 사이트에서 메뉴를 눌러 주소창 끝의 `#about`이 바뀌는 것을 봐요. `js/nav.js › initSmoothScroll`이 `history.pushState`로 바꿔 주고 있어요. (2) DevTools › Network에서 새로고침 후 첫 번째 요청(문서)을 클릭해 보세요.
- **스스로 설명해보기**: "URL에서 host와 path는 각각 무엇을 뜻하나요?"

### 1.2 HTTP 요청/응답과 상태 코드
- **한 줄 정의**: HTTP는 브라우저와 서버가 "요청 한 번에 응답 한 번"으로 대화하는 규칙이에요.
- **비유**: 우편 편지예요. 요청 편지(무엇을 달라)에 답장(결과 + 내용물)이 오고, 답장 맨 위에는 처리 결과를 알리는 세 자리 번호(상태 코드)가 적혀 있어요.
- **핵심 설명**:

```
브라우저                                              서버
   │  GET /users/codewhite7777/repos HTTP/1.1          │
   │  Host: api.github.com                             │
   │  Accept: application/vnd.github+json   ─────────▶ │  (요청: 메서드 + 경로 + 헤더)
   │                                                   │
   │  HTTP/1.1 200 OK                                  │
   │  Content-Type: application/json        ◀───────── │  (응답: 상태 코드 + 헤더 + 본문)
   │  [ { "name": "...", ... }, ... ]                  │
```

| 코드 | 이름 | 뜻 | 이 프로젝트와의 관계 |
|------|------|----|----------------------|
| 200 | OK | 성공 | 정상 응답 → 카드 렌더링 |
| 403 | Forbidden | 요청은 이해했지만 거절 | GitHub API 요청 한도 초과 때 (`describeError`) |
| 404 | Not Found | 그 주소에 자원이 없음 | 사용자 이름 오타 / 배포 후 CSS·JS 경로 오류 |
| 500 | Internal Server Error | 서버 내부 오류 | "서버가 오류를 돌려주었습니다" 메시지 |

  앞자리로 큰 분류를 기억하면 편해요: 2xx 성공, 3xx 이동, 4xx **요청한 쪽** 문제, 5xx **서버** 문제.
- **왜 필요한가**: 상태 코드가 있어야 "성공했는지, 누구 잘못인지"를 코드로 판단하고 사용자에게 알맞은 안내를 할 수 있어요.
- **내 코드에서는**: `js/projects.js › describeError()`가 `403/429`, `404`, 그 밖의 상태 코드, 네트워크 실패를 나눠서 다른 문구를 보여 줘요.
- **직접 확인해 보기**: (1) DevTools › Network › 새로고침 → `repos?sort=updated...` 요청을 클릭 → Headers 탭의 **Status Code** 확인. (2) Preview 탭에서 JSON을 펼쳐 보기.
- **스스로 설명해보기**: "404와 500의 차이는? 403은 언제 만났나요?"

### 1.3 정적 사이트 vs 동적 사이트, GitHub Pages
- **한 줄 정의**: 정적 사이트는 미리 만들어 둔 파일을 **그대로** 전달하는 사이트이고, 동적 사이트는 서버 프로그램이 요청마다 응답을 **만들어** 주는 사이트예요.
- **비유**: 정적은 진열대에 놓인 포장 도시락, 동적은 주문받고 그 자리에서 만드는 요리예요.
- **핵심 설명**: GitHub Pages는 **정적 호스팅**이에요. HTML/CSS/JS/이미지 파일을 그대로 내려줄 뿐 서버 코드를 실행하지 않아요. 그래서 이 사이트가 "GitHub 저장소 목록"처럼 바뀌는 데이터를 보여 주려면, **브라우저 안의 JavaScript가 직접 외부 API에 요청**해야 해요.
- **왜 필요한가**: 정적 호스팅은 무료이고 간단하지만, 서버에서 하던 일(DB 조회, 비밀번호 검사)을 할 수 없어요. Contact 폼이 실제 전송이 아니라 "데모"인 이유예요(`js/form.js`의 성공 메시지가 안내해요).
- **스스로 설명해보기**: "이 사이트는 정적인데 어떻게 최신 GitHub 저장소 목록을 보여 주나요?"

### 1.4 API와 JSON, CORS(개념만)
- **한 줄 정의**: API는 프로그램끼리 데이터를 주고받는 창구이고, JSON은 그 데이터를 글자로 표현한 형식이에요. CORS는 브라우저가 "다른 사이트의 응답을 내 스크립트가 읽어도 되는지" 검사하는 규칙이에요.
- **비유**: API는 은행 창구(정해진 양식으로만 요청), JSON은 창구에서 주고받는 표준 서류, CORS는 창구 직원이 "이 손님이 이 서류를 가져가도 된다고 은행이 허락했는지" 확인하는 절차예요.
- **핵심 설명**: JSON은 JS 객체와 닮은 텍스트예요(`{ "name": "repo", "stargazers_count": 3, "description": null }`). `response.json()`이 이 글자를 JS 값으로 바꿔 줘요. CORS는 "출처(scheme+host+port)"가 다른 곳의 응답을 읽을 때 적용돼요. 응답에 `Access-Control-Allow-Origin` 헤더로 허락이 있어야 브라우저가 스크립트에 결과를 넘겨줘요. GitHub API는 공개 API라 허용하고 있어서 이 사이트가 읽을 수 있어요. 허락이 없으면 Console에 "blocked by CORS policy" 에러가 떠요.
- **왜 필요한가**: CORS가 없다면 아무 사이트의 스크립트나 내 로그인 정보로 다른 사이트의 데이터를 읽어 갈 수 있어요. 보안을 위한 브라우저의 기본 방어선이에요.
- **직접 확인해 보기**: Network › `repos` 요청 › Response 헤더에서 `access-control-allow-origin`을 찾아봐요. 응답 헤더 이름은 소문자로 보일 수 있어요.
- **스스로 설명해보기**: "API와 JSON을 각각 한 문장으로? CORS가 없으면 무엇이 위험한가요?"

### 1.5 상대경로와 절대경로
- **한 줄 정의**: 상대경로는 "지금 문서 위치 기준"의 주소(`css/style.css`), 절대경로는 "기준점부터 전부 적은" 주소(`/css/style.css` 또는 `https://...`)예요.
- **비유**: "옆집 두 번째 집"(상대) vs "서울시 ○○구 ○○로 12번지"(절대)예요. 마을 전체가 이사 가면 상대 표현은 그대로 통하지만, 도로명 주소에 시(市)가 박혀 있으면 틀려요.
- **핵심 설명**: GitHub Pages의 프로젝트 사이트는 **도메인 바로 아래가 아니라 `/저장소이름/` 하위 경로**에 배포돼요.

| 코드 | 배포 주소에서 실제로 가리키는 곳 | 결과 |
|------|-----------------------------------|------|
| `href="css/style.css"` | `https://codewhite7777.github.io/codyssey_B1-1/css/style.css` | 정상 |
| `href="/css/style.css"` | `https://codewhite7777.github.io/css/style.css` | **404** (도메인 루트 기준이라 저장소 이름이 빠짐) |

- **왜 필요한가**: 로컬(Live Server)에서는 두 방식 모두 되는 것처럼 보여서, 배포한 뒤에야 CSS/JS가 통째로 404가 되는 사고가 나요.
- **내 코드에서는**: `index.html`의 `css/style.css`, `js/*.js`, `images/favicon.svg`, `images/profile.svg`는 모두 `/`로 시작하지 않는 상대경로예요. 반대로 `https://api.github.com/...`은 다른 서버라 절대 주소를 써야 해요.
- **직접 확인해 보기**: 배포 후 Network 탭에서 Status가 404(빨간색)인 요청이 있는지 확인해요. 대소문자도 확인하세요(`Images/`와 `images/`는 GitHub Pages 서버에서 다른 경로일 수 있어요).
- **스스로 설명해보기**: "왜 `/css/style.css` 대신 `css/style.css`를 썼나요?"

## 2. 브라우저 렌더링 과정

> **이 장을 읽고 나면** 브라우저가 HTML/CSS를 화면으로 바꾸는 6단계를 순서대로 말할 수 있어요. 그리고 이 프로젝트의 `.reveal`이 `top`이 아니라 `translate`+`opacity`로 움직이는 이유, `defer`를 쓰는 이유를 설명할 수 있어요.

### 2.1 렌더링 파이프라인
- **한 줄 정의**: 브라우저는 HTML/CSS 글자를 받아 DOM → CSSOM → Render Tree → Layout → Paint → Composite 순서로 화면 픽셀을 만들어요.
- **비유**: 건축이에요. 설계도 읽기(DOM/CSSOM) → 실제 지을 것만 추리기(Render Tree) → 벽 위치·크기 정하기(Layout) → 칠하기(Paint) → 층을 겹쳐 완성(Composite)이에요.
- **핵심 설명**:

```
HTML 글자 ──파싱──▶ DOM 트리 ─────────┐
                                      ├─▶ Render Tree ─▶ Layout ─▶ Paint ─▶ Composite ─▶ 화면
CSS 글자  ──파싱──▶ CSSOM 트리 ───────┘   (보이는 것만)   (위치·크기)  (색칠)    (층 합치기)
```

| 단계 | 하는 일 | 다시 실행되는 경우(예) |
|------|---------|--------------------------|
| DOM | HTML을 요소 트리로 | JS가 요소를 추가/삭제 |
| CSSOM | CSS 규칙을 트리로 | 스타일 변경 |
| Render Tree | DOM + CSSOM 중 **화면에 그릴 것**만 (`display:none`은 제외, `visibility:hidden`은 자리를 차지하므로 포함) | 위와 같음 |
| Layout (reflow) | 각 요소의 위치와 크기 계산 | `width`, `margin`, `top`, `font-size` 변경, 요소 추가 |
| Paint | 색, 그림자, 글자를 픽셀로 | `color`, `background`, `box-shadow` 변경 |
| Composite | 그려 둔 층들을 합성(주로 GPU) | `transform`, `opacity` 변경 |

- **왜 필요한가**: Layout은 앞 단계 중 가장 비싼 편이에요. 어떤 CSS 속성이 어느 단계부터 다시 시작시키는지 알면 부드러운 화면을 만들 수 있어요. 아래 단계일수록 일이 적어요(대개 Layout > Paint > Composite 순서로 비쌈. 실제 비용은 환경에 따라 달라요).
- **내 코드에서는**: `css/style.css › .field__error { min-height }`, `.hero__role { min-height }`는 에러 문구가 생겨도 Layout이 흔들리지 않도록 **자리를 미리 예약**해요. `index.html › <img width="400" height="400">`도 같은 이유예요(이미지가 로드되기 전에 자리를 알 수 있음).
- **직접 확인해 보기**: (1) DevTools › Performance 탭에서 녹화 시작 → 새로고침 → 중지. 결과에 `Parse HTML`, `Recalculate Style`, `Layout`, `Paint` 같은 막대가 보여요(이름은 버전에 따라 조금 달라요). (2) `⋮` › More tools › Rendering › **Paint flashing**을 켜고 스크롤/hover하면 다시 칠해지는 영역이 초록색으로 깜빡여요.
- **스스로 설명해보기**: "reflow와 repaint의 차이를 예로 들어 볼래요?"

### 2.2 왜 transform/opacity/translate 애니메이션이 유리한가
- **한 줄 정의**: `transform`, `opacity`(그리고 개별 속성 `translate`)는 대개 Layout과 Paint를 건너뛰고 Composite 단계만 다시 하기 때문에 움직임이 부드러워요.
- **비유**: 그림이 그려진 투명 필름 한 장을 옆으로 밀거나 흐리게 하는 것(합성)이 필름 위 그림을 지우고 다시 그리는 것(Layout+Paint)보다 훨씬 가벼워요.
- **핵심 설명**: `top`, `left`, `width`, `margin`을 애니메이션하면 매 프레임 Layout이 다시 일어나고 주변 요소까지 밀려나요. `transform`/`opacity`는 다른 요소의 배치를 바꾸지 않아요. (브라우저·기기·요소 상태에 따라 최적화 정도는 달라질 수 있어요.)
- **왜 필요한가**: 저사양 폰에서 스크롤 도중 버벅이는 원인의 상당수가 불필요한 reflow예요.
- **내 코드에서는**: `css/style.css › .reveal`은 `opacity: 0; translate: 0 1.5rem;`로 숨겨 두고 `.reveal.is-visible`에서 `opacity: 1; translate: 0 0;`로 나타나요. `.card:hover`(`transform: translateY(-4px)`), `.btn:hover`, 햄버거 막대(`.bar`), `.spinner`(`rotate`)도 모두 레이아웃을 건드리지 않는 속성만 써요.
  `.reveal`이 `transform`이 아니라 개별 속성 **`translate`** 를 쓰는 이유가 하나 더 있어요. 카드는 hover 때 이미 `transform`을 쓰는데, 둘은 서로 독립된 속성이라 **충돌 없이 함께 적용**돼요(그래서 `.card.reveal`이 두 전환을 모두 나열해요).
- **스스로 설명해보기**: "왜 스크롤 등장 애니메이션에 `margin-top`이 아닌 `translate`를 썼나요?"

### 2.3 script의 defer/async와 파싱 차단
- **한 줄 정의**: 일반 `<script src>`는 HTML 읽기를 멈추고 내려받아 실행하지만, `defer`는 읽기를 멈추지 않고 문서가 끝난 뒤 순서대로 실행해요.
- **비유**: 요리하다가(HTML 파싱) 택배가 올 때마다 요리를 멈추고 뜯어보는 것(일반) vs 요리를 다 끝낸 뒤 한꺼번에 뜯어보는 것(defer)이에요.
- **핵심 설명**:

```
일반 script  : ──HTML 파싱──┤멈춤: 다운로드 + 실행├──HTML 파싱 계속──▶
async        : ──HTML 파싱─────────(다운로드는 병렬)──┤멈춤: 실행├──파싱 계속──▶  (먼저 도착한 것부터, 순서 보장 X)
defer        : ──HTML 파싱─────────(다운로드는 병렬)────────────▶ 파싱 끝 ─▶ 순서대로 실행
```

  `defer`와 `async`는 `src`가 있는 외부 스크립트에만 의미가 있어요.
- **왜 필요한가**: 스크립트가 `<head>`에 있어도 화면 표시를 막지 않고, 실행 시점에 DOM이 이미 완성돼 있어 `querySelector`가 바로 요소를 찾을 수 있어요. 파일 간 순서(`config.js`가 `utils.js`보다 먼저)도 지켜져요.
- **내 코드에서는**: `index.html › <head>`의 `<script defer src="js/config.js">` ~ `js/main.js` 8개 전부 `defer`예요. `tools/verify.js`도 "모든 스크립트가 defer인가"를 점검해요.
- **직접 확인해 보기**: Console에서 `[...document.scripts].every(s => s.defer)`를 실행하면 `true`가 나와요.
- **스스로 설명해보기**: "defer와 async의 차이는? 왜 defer를 골랐나요?"

## 3. HTML과 시맨틱 마크업

> **이 장을 읽고 나면** `div`만 쓰지 않고 `header/nav/main/section/article/footer`를 나눠 쓴 이유를 설명할 수 있어요. 그리고 내가 "어떤 기준으로" 구조를 설계했는지 말할 수 있어요. (학습 목표 ①)

### 3.1 시맨틱 태그
- **한 줄 정의**: 시맨틱(semantic) 태그는 모양이 아니라 **의미**를 담은 태그예요. ("여기는 내비게이션", "여기는 본문")
- **비유**: 이삿짐 상자에 "주방", "침실"이라고 적는 것과 전부 "상자1, 상자2"라고 적는 것의 차이예요.
- **핵심 설명**:

| 태그 | 의미 | 이 프로젝트에서 |
|------|------|------------------|
| `<header>` | 페이지(또는 영역)의 머리말 | `#site-header` 로고 + 메뉴 |
| `<nav>` | 주요 이동 링크 묶음 | `.nav` (`aria-label="주요 메뉴"`) |
| `<main>` | 페이지 고유의 핵심 내용, **문서에 하나** | `#main` (스킵 링크 목적지) |
| `<section>` | 제목이 있는 주제별 구역 | Hero/About/Skills/Projects/Contact |
| `<article>` | 떼어 내서 따로 배포해도 뜻이 통하는 **독립된 콘텐츠 조각** | Skills 그룹 카드, 프로젝트 카드, About 본문 |
| `<footer>` | 꼬리말 (저작권, 링크) | `.site-footer` |
| `<div>` | 의미 없는 상자, **레이아웃 전용** | `.container`, `.about`, `.skills`, `.projects__grid` |

  내가 세운 설계 기준은 다음과 같아요.
  1. 랜드마크(`header`, `nav`, `main`, `footer`)는 페이지에 하나씩.
  2. 화면의 큰 구역은 `section`으로 하고, 모두 제목을 두고 `aria-labelledby`로 연결(예: `<section id="about" aria-labelledby="about-title">` ↔ `<h2 id="about-title">`). 이름이 붙은 section은 보조기술이 "구역(region)"으로 알려줘요.
  3. "이 조각만 복사해 다른 곳에 붙여도 의미가 있는가?"에 "예"면 `article`이에요. 그래서 Skills의 `Frontend/Tools/Next` 카드(각자 `h3` 제목)와, JS가 만드는 프로젝트 카드(`createProjectCard`가 만드는 `<article class="card project-card">`)를 `article`로 했어요. (정답이 하나는 아니에요. 기준을 말할 수 있으면 돼요.)
  4. 제목 계층은 **h1(Hero에 하나) → h2(각 섹션 제목) → h3(카드 제목)**. 글자 크기는 CSS가 정하고, 제목 레벨은 **구조**만 나타내요. 단계를 건너뛰지 않아요. 그 밖에도 사진은 `figure`, 관심 분야 같은 "이름-값"은 `dl/dt/dd`, 목록은 `ul/li`, **이동은 `a`, 동작은 `button`**(테마 토글, 다시 시도).
- **왜 필요한가**: (a) 스크린리더 사용자가 랜드마크/제목으로 원하는 곳에 바로 이동, (b) 검색엔진이 구조를 이해(SEO), (c) 코드를 읽는 사람이 구조를 바로 파악(유지보수), (d) 키보드/브라우저 기본 기능(예: `button`의 Enter/Space)을 공짜로 얻어요.
- **내 코드에서는**: `index.html` 전체. `tools/verify.js`는 6개 태그의 존재, 섹션 6개, 앵커 링크 ↔ `id` 연결을 점검해요.
- **직접 확인해 보기**: (1) Elements에서 `<main>` 하위 구조를 접었다 펴 보기. (2) Elements 오른쪽 **Accessibility** 창에서 요소를 고르면 역할(role)과 이름이 보여요. (3) Lighthouse 탭에서 Accessibility 점검을 실행할 수 있어요.
- **스스로 설명해보기**: "왜 Skills 카드는 `div`가 아니라 `article`인가요? 제목 레벨은 어떻게 정했나요?"

### 3.2 접근성 기초: alt, label, aria-*, 스킵 링크
- **한 줄 정의**: 접근성(a11y)은 시각·운동·인지 특성과 상관없이 누구나 페이지를 쓸 수 있게 하는 것이고, ARIA는 HTML만으로 부족한 의미·상태를 보조기술에 알려 주는 속성이에요.
- **비유**: 건물의 점자 표지판과 경사로예요. 계단만 있는 건물은 휠체어가 못 들어가요.
- **핵심 설명**: 첫 번째 규칙은 **"가능하면 ARIA보다 네이티브 HTML"** 이에요. ARIA는 의미를 덧붙일 뿐 동작(키보드 처리 등)을 만들어 주지 않아요.

| 속성/요소 | 알려 주는 것 | 이 프로젝트의 사용처 |
|-----------|--------------|------------------------|
| `alt` | 이미지의 대체 텍스트 (장식이면 `alt=""`) | `<img src="images/profile.svg" alt="기본 프로필 일러스트: ...">` |
| `<label for>` ↔ `id` | 입력창의 이름. 라벨을 눌러도 입력창에 포커스 | `<label for="name">` ↔ `<input id="name">` |
| `aria-label` | 눈에 보이는 글자가 없는 요소의 이름 | `#theme-toggle`, `#nav-toggle`, `#scroll-top` |
| `aria-hidden="true"` | 장식 요소를 보조기술에서 숨김 | SVG 아이콘, 햄버거 막대 `.bar` |
| `aria-expanded` (+`aria-controls`) | 펼침/접힘 상태 | `#nav-toggle` → `#nav-menu` (JS가 갱신) |
| `aria-pressed` | 토글 버튼 켜짐/꺼짐 | `#theme-toggle`, 필터 칩 |
| `role="status"` / `aria-live="polite"` | 내용이 바뀌면 (방해 없이) 읽어 줌 | `#projects-status`, `#form-status` |
| `aria-invalid` + `aria-describedby` | 입력 오류 + 설명 문구 연결 | 폼 입력창 ↔ `#name-error` 등 |
| 스킵 링크 | 반복되는 메뉴를 건너뛰고 본문으로 | `<a class="skip-link" href="#main">` |

  폼 요소도 의미를 가져요. `input type="email"`은 형식 힌트와 모바일 키보드를, `textarea`는 여러 줄 입력을, `required`는 필수 표시를, `name`은 `FormData`의 키를, `autocomplete`는 자동완성을 담당하고, `placeholder`는 라벨을 대신할 수 없어요. `<form novalidate>`는 브라우저 기본 검증 말풍선을 끄고 `js/form.js`의 검증을 쓴다는 뜻이에요.

  스킵 링크는 평소엔 `top: -4rem`으로 화면 밖에 있다가 `Tab`으로 포커스를 받으면(`.skip-link:focus`) 나타나요. `.visually-hidden`은 화면에서는 안 보이지만 스크린리더는 읽는 기법이에요(Hero의 타자기 문구 대신 읽히는 문장에 사용).
- **왜 필요한가**: 아이콘만 있는 버튼은 스크린리더에서 "버튼"이라고만 들려요. 입력창에 `label`이 없으면 무엇을 적는 칸인지 몰라요.
- **내 코드에서는**: `js/nav.js › syncToggleButton()`이 `aria-expanded`와 `aria-label`을, `js/theme.js › renderTheme()`가 `aria-pressed`를, `js/form.js › renderContactForm()`이 `aria-invalid`를 갱신해요. **상태가 바뀌면 시각 표현(클래스)과 접근성 속성을 함께** 바꾸는 게 원칙이에요.
- **직접 확인해 보기**: 페이지를 클릭한 뒤 `Tab` 키만으로 끝까지 이동해 보세요(첫 `Tab`에 스킵 링크가 나타나요). 포커스 테두리는 `:focus-visible` 규칙이 만들어요. 마우스 없이 햄버거를 열고 `Esc`로 닫을 수 있는지도 확인해 보세요.
- **스스로 설명해보기**: "`aria-expanded`는 언제 누가 바꾸나요? `label for`가 없으면 어떤 문제가 생기나요?"

## 4. CSS 기초

> **이 장을 읽고 나면** 박스 모델·명시도·CSS 변수를 이용해 "다크 모드가 어떻게 변수 값만 덮어써서 동작하는지" 설명할 수 있어요.

### 4.1 박스 모델, 캐스케이드, 상속, 명시도
- **한 줄 정의**: 모든 요소는 content + padding + border + margin의 상자이고, 여러 CSS 규칙이 충돌하면 **캐스케이드(중요도 → 명시도 → 나중에 쓴 순서)** 로 승자를 정해요.
- **비유**: 상자 안 물건(content), 완충재(padding), 상자 벽(border), 상자 사이 간격(margin)이에요. 규칙 충돌은 "학교 규칙 vs 교실 규칙 vs 선생님 지시"처럼 더 구체적인 것이 이겨요.
- **핵심 설명**: `box-sizing: border-box`는 `width`에 padding과 border를 **포함**시켜요(계산이 직관적). 명시도는 ID > 클래스/속성/가상클래스 > 태그 순으로 커요.

| 선택자 | 명시도(ID, 클래스류, 태그) | 이 프로젝트 예시 |
|--------|------------------------------|--------------------|
| `.icon--sun` vs `[data-theme="dark"] .icon--sun` | (0,1,0) vs (0,2,0) → 뒤가 이김 | 기본은 숨김, 다크일 때 표시 |
| `.nav__menu` / `.nav__menu.active` | (0,1,0) / (0,2,0) | 메뉴 숨김 ↔ 표시 |
| `.field input:focus` vs `.field input.is-invalid` | 둘 다 (0,2,1) → **나중에 쓴 쪽**이 이김 | 나중 규칙(`.is-invalid`)이 빨간 테두리를 유지 |

  상속: `color`, `font-family`는 자식에게 물려주지만, 폼 컨트롤은 브라우저 기본 스타일 때문에 안 받아서 `button, input, textarea { font: inherit; color: inherit; }`로 맞춰요. `!important`는 명시도를 무시하는 비상 수단이라 `[hidden]`과 `prefers-reduced-motion`처럼 꼭 필요한 곳에만 써요.
- **왜 필요한가**: "스타일을 썼는데 안 먹어요"의 원인 대부분이 명시도/순서예요.
- **내 코드에서는**: `css/style.css › *, *::before, *::after { box-sizing: border-box; }`, `.hero`(`min-height:100svh`에 `padding-top`이 포함됨).
- **직접 확인해 보기**: Elements › 요소 선택 › Styles 창에서 **취소선이 그어진 규칙**이 진 규칙이에요. 오른쪽 아래 박스 모델 도표에서 margin/border/padding/content를 확인해요.
- **스스로 설명해보기**: "`.nav__menu.active`는 왜 `.nav__menu`의 `visibility:hidden`을 이기나요?"

### 4.2 단위와 CSS 변수, 다크 모드 원리
- **한 줄 정의**: CSS 변수(`--이름`)는 값을 이름표로 저장해 `var(--이름)`으로 재사용하는 기능이에요.
- **비유**: 벽을 칠할 때 "파랑"이라는 페인트 통 라벨을 붙여 두고, 통 안의 색만 바꾸면 모든 벽이 바뀌는 것과 같아요.
- **핵심 설명**: 단위는 `px`(고정, 1px 테두리), `rem`(루트 글자 크기 기준, 보통 16px이고 사용자 설정을 따라서 간격·글자에 사용), `%`(부모 기준), `vw`/`vh`(뷰포트 폭/높이의 1%, 이 프로젝트에서는 히어로 제목 `clamp(1.5rem, 7.5vw, 1.75rem)`에서만 사용: 화면이 좁을수록 글자가 줄어들다가 상·하한에서 멈춰요), `svh`(모바일 주소창이 보일 때의 작은 뷰포트 높이, `.hero { min-height: 100svh }`)예요. 다크 모드는 이렇게 동작해요.

```css
:root              { color-scheme: light; --color-bg: #f8fafc; --color-text: #0f172a; ... }
[data-theme="dark"] { color-scheme: dark;  --color-bg: #0b1120; --color-text: #e2e8f0; ... }
body { background-color: var(--color-bg); color: var(--color-text); }
```

  `<html>`에 `data-theme="dark"`가 붙으면 **같은 이름의 변수 값만 덮어써지고**, 그 변수를 쓰는 모든 규칙이 자동으로 새 색이 돼요. 컴포넌트 CSS는 한 줄도 안 바뀌어요. 두 선택자(`:root`, `[data-theme="dark"]`)의 명시도가 같아서 **나중에 쓴 다크 블록이 이기는** 점에 주의하세요. `color-scheme`은 스크롤바·폼 컨트롤 같은 브라우저 기본 UI 색도 테마에 맞추라고 알려 줘요. `body`의 `transition`이 전환을 부드럽게 만들어요.
- **왜 필요한가**: 색을 곳곳에 직접 쓰면 다크 모드가 "모든 규칙 복사"가 돼요. 변수를 쓰면 팔레트 한 벌만 더 정의하면 끝이에요.
- **내 코드에서는**: `css/style.css › :root`, `[data-theme="dark"]`, `js/theme.js › renderTheme()`의 `document.documentElement.dataset.theme = theme` 한 줄(JS는 스위치만 누르고 색은 CSS가 결정해요).
- **직접 확인해 보기**: Elements에서 `<html>` 선택 → Styles 창에서 `:root` 변수 목록 확인 → 테마 버튼을 눌러 `data-theme="dark"`가 붙는지, `--color-bg` 값이 바뀌는지 봐요. Console에서 `document.documentElement.dataset.theme = 'dark'`로 직접 바꿔 봐도 돼요.
- **스스로 설명해보기**: "JS가 다크 모드에서 하는 일은 정확히 무엇인가요? 색은 누가 바꾸나요?"

### 4.3 position, transition, hover, prefers-reduced-motion
- **한 줄 정의**: `position`은 요소를 흐름에서 꺼내 위치를 지정하는 방식이고, `transition`은 속성 값 변화를 일정 시간에 걸쳐 부드럽게 만들어요.
- **비유**: `sticky`는 스크롤해도 따라오는 포스트잇, `fixed`는 모니터에 붙인 스티커, `absolute`는 가장 가까운 "기준 상자" 안에 핀으로 꽂은 메모예요.
- **핵심 설명**:

| 값 | 기준 | 이 프로젝트 |
|----|------|--------------|
| `sticky` | 평소엔 흐름 안, 스크롤이 `top`에 닿으면 고정 | `.site-header { position: sticky; top: 0 }` |
| `fixed` | 뷰포트 | `.scroll-top` (오른쪽 아래) |
| `absolute` | 가장 가까운 positioned 조상 | 모바일 `.nav__menu` (`top:100%`, 기준은 sticky인 `.site-header`라서 헤더 바로 아래) |

  `transition: transform var(--transition)`(= `0.2s ease`) 하나로 hover의 이동/그림자 변화가 부드러워져요. 그림자는 `box-shadow`, hover는 `:hover`, 키보드 사용자를 위한 포커스는 `:focus-visible`이에요. 운영체제에서 "동작 줄이기"를 켠 사용자를 위해 `@media (prefers-reduced-motion: reduce)`에서 애니메이션/전환 시간을 사실상 0으로 줄이고, JS도 `utils.js › prefersReducedMotion()`으로 등장 효과와 타자기 효과를 생략해요.
- **왜 필요한가**: 어지러움·멀미를 느끼는 사용자가 있어서 접근성 요건이에요. hover는 터치 기기에서 어색할 수 있어 핵심 정보를 hover에만 두지 않아요.
- **내 코드에서는**: `css/style.css › .card:hover`, `.btn:hover`, `.site-header`, `.scroll-top`, 맨 아래 `@media (prefers-reduced-motion: reduce)`.
- **직접 확인해 보기**: DevTools `⋮` › More tools › Rendering › **Emulate CSS media feature prefers-reduced-motion**을 `reduce`로 바꾸고 새로고침하면 등장 애니메이션과 타자기 효과가 사라져요.
- **스스로 설명해보기**: "sticky와 fixed의 차이는? reduced-motion을 왜 지원하나요?"

## 5. 레이아웃: Flexbox vs Grid

> **이 장을 읽고 나면** "한 줄로 늘어놓기는 Flex, 행과 열이 있는 격자는 Grid"라고 말하고, 이 프로젝트의 선택 이유를 예로 설명할 수 있어요. (학습 목표 ②)

### 5.1 1차원 vs 2차원
- **한 줄 정의**: Flexbox는 **한 방향(행 또는 열)** 으로 요소를 배치하는 1차원 레이아웃, Grid는 **행과 열을 동시에** 다루는 2차원 레이아웃이에요.
- **비유**: Flex는 한 줄로 서 있는 사람들을 정렬하는 것, Grid는 좌석 번호가 있는 극장 배치예요.
- **핵심 설명**:

| 상황 | 고를 것 | 이유 |
|------|---------|------|
| 로고 왼쪽 / 메뉴 오른쪽 한 줄 | Flex | 한 방향 정렬 (`justify-content`) |
| 내용 크기대로 줄바꿈되는 태그 묶음 | Flex + `wrap` | 아이템 크기가 제각각 |
| 카드 여러 장을 열 맞춰 격자로 | Grid | 행과 열이 동시에 필요 |
| "왼쪽 고정폭 + 오른쪽 나머지" 2단 | Grid (`16rem 1fr`) | 열 크기를 선언 |
| 잘 모르겠다 | "행/열 정렬이 둘 다 필요한가?" | 아니오 → Flex, 예 → Grid |

  자주 쓰는 속성: Flex는 `display:flex`, `flex-direction`, `justify-content`(주축), `align-items`(교차축), `gap`, `flex-wrap`, `flex:1`. Grid는 `display:grid`, `grid-template-columns`, `gap`.
- **왜 필요한가**: 예전의 `float`/`position` 꼼수 없이 중앙 정렬·균등 분배·반응형 열 수를 선언만으로 처리할 수 있어요.
- **내 코드에서는**:

| 위치 (`css/style.css ›`) | 종류 | 왜 그 선택인가 |
|------------------------|------|-----------------|
| `.nav` (+ `.nav__actions`) | Flex | 한 줄에 로고/메뉴/버튼 분배 (`space-between`) |
| `.chips`, `.filters` | Flex + `flex-wrap` | 칩 개수·폭이 제각각, 넘치면 다음 줄 |
| `.hero`, `.hero__cta` | Flex | 세로 중앙 정렬, 버튼 가운데 정렬 |
| `.project-card` | Flex `column` | `.project-card__desc { flex: 1 }`로 하단 정보 정렬 |
| `.about` | Grid | 모바일 1열, 768px부터 `16rem 1fr`, 1024px부터 `20rem 1fr` |
| `.skills` | Grid | 모바일 1열, 768px부터 `repeat(3, 1fr)` |
| `.projects__grid` | Grid `auto-fit` + `minmax` | 화면 폭에 따라 열 수가 저절로 변함 |

- **직접 확인해 보기**: Elements 트리에서 요소 옆의 `flex` / `grid` 배지를 클릭하면 화면에 격자선/정렬 오버레이가 켜져요.
- **스스로 설명해보기**: "네비는 왜 Grid가 아니라 Flex인가요? 프로젝트 목록은 왜 Grid인가요?"

### 5.2 auto-fit과 `minmax(min(100%, 17.5rem), 1fr)`
- **한 줄 정의**: `repeat(auto-fit, minmax(최소, 1fr))`는 "카드 폭이 최소 이상이 되도록 한 줄에 최대한 많이 넣고, 남는 폭은 균등 분배해"라는 뜻이에요.
- **비유**: 상 위에 접시(카드)를 놓는데, 접시 최소 지름 이하로는 줄이지 않고 상 폭에 맞게 몇 개 놓을지와 접시 크기를 자동으로 정하는 것과 같아요.
- **핵심 설명**: `minmax(min(100%, 17.5rem), 1fr)`을 나눠 읽어요. `17.5rem`(약 280px)은 카드 최소폭, `1fr`은 남는 공간 분배, 바깥의 `min(100%, ...)`은 컨테이너가 17.5rem보다 좁아도 **가로로 넘치지 않게** 막는 안전장치예요. `auto-fit`과 `auto-fill`의 차이는 카드가 적을 때 나타나요. `auto-fit`은 빈 열을 접어서 있는 카드가 폭을 나눠 가지고, `auto-fill`은 빈 열을 남겨 둬서 카드가 좁게 왼쪽에 몰려요(예: 저장소 2개일 때).
  열 수 계산 예 (컨테이너 = `min(100% - 2rem, 68rem)`, rem=16px 가정):

| 뷰포트 | 컨테이너 | gap | 들어가는 열 수 |
|--------|----------|-----|-----------------|
| 375px | 343px | 24px | 1열 (280×2+24 > 343) |
| 768px | 736px | 24px | 2열 (280×3+48 > 736) |
| 1280px | 1088px | 32px | 3열 (280×4+96 > 1088) |

  `tools/verify.js`도 이 세 폭에서 1/2/3열인지 실제로 측정해요.
- **왜 필요한가**: 미디어 쿼리 없이도 열 수가 반응해서 코드가 짧고 깨지지 않아요.
- **내 코드에서는**: `css/style.css › .projects__grid { grid-template-columns: repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr)); }`
- **직접 확인해 보기**: 브라우저 창 너비를 천천히 줄이며 카드 열 수가 3→2→1로 바뀌는 것을 봐요. Elements에서 `.projects__grid`의 `grid` 배지를 켜면 열 경계가 보여요.
- **스스로 설명해보기**: "`minmax(min(100%, 17.5rem), 1fr)`을 소리 내어 풀어 보세요. `auto-fit`과 `auto-fill`은 무엇이 다른가요?"

## 6. 반응형 웹

> **이 장을 읽고 나면** 모바일 퍼스트가 무엇인지, 햄버거 메뉴를 HTML·CSS·JS가 어떻게 나눠서 만드는지 설명할 수 있어요.

### 6.1 viewport 메타 태그와 모바일 퍼스트
- **한 줄 정의**: 반응형 웹은 하나의 HTML이 화면 폭에 맞춰 스스로 배치를 바꾸는 것이고, 모바일 퍼스트는 **가장 좁은 화면 스타일을 기본**으로 두고 넓은 화면 규칙을 `min-width`로 **덧입히는** 작성 방식이에요.
- **비유**: 작은 원룸 가구 배치를 기본 도면으로 잡고, 큰 집으로 이사하면 가구를 추가하는 방식이에요. 큰 집 배치에서 시작하면 원룸에 넣을 땐 이것저것 빼야 해요(그게 `max-width`).
- **핵심 설명**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`이 없으면 모바일 브라우저가 데스크톱 폭(대개 약 980px)으로 그린 뒤 축소해서, 미디어 쿼리가 의도대로 동작하지 않아요. 브레이크포인트는 **768px(태블릿)** 과 **1024px(데스크톱)** 두 개예요.

| 구간 | 바뀌는 것 (`css/style.css` 6번 섹션) |
|------|----------------------------------------|
| 기본(~767px) | 1열, 햄버거 메뉴, 작은 글자 |
| `min-width: 768px` | 햄버거 숨김 + 메뉴 가로 배치, `.about` 2열, `.skills` 3열, 푸터 가로, 섹션 여백 증가 |
| `min-width: 1024px` | 히어로 제목 3.5rem, `.about` 사진 열 20rem, 카드 간격 확대 |

  이 프로젝트에는 `max-width` 쿼리가 없어요(`prefers-reduced-motion` 쿼리는 별개).
- **왜 필요한가**: 트래픽의 큰 부분이 모바일이고, 기본 스타일이 단순할수록 덮어쓰기(override)가 줄어 버그가 줄어요.
- **내 코드에서는**: `index.html › <meta name="viewport">`, `css/style.css › @media (min-width: 768px)`, `@media (min-width: 1024px)`.
- **직접 확인해 보기**: DevTools 왼쪽 위 기기 모양 아이콘(`Ctrl+Shift+M`)으로 Device Toolbar를 켜고, 폭을 320 → 768 → 1280으로 바꿔 봐요.
- **스스로 설명해보기**: "왜 `max-width`가 아니라 `min-width`를 썼나요?"

### 6.2 햄버거 메뉴: HTML · CSS · JS의 협업
- **한 줄 정의**: JS는 클래스 하나(`.active`)와 접근성 속성만 바꾸고, **보이는 방식은 전부 CSS**가 결정해요.
- **핵심 설명**:

```
[버튼 클릭] ─▶ nav.js: menu.classList.toggle('active') ─▶ isOpen(true/false)
                        syncToggleButton(isOpen): 버튼에 .active, aria-expanded, aria-label 갱신
                                   │
      CSS ◀────────────────────────┘
      .nav__menu          { visibility:hidden; opacity:0; transform:translateY(-0.5rem) }   (평소: 숨김)
      .nav__menu.active   { visibility:visible; opacity:1; transform:none }                (열림)
      .nav__toggle.active .bar  → 세 막대가 X 모양으로 변형
      @media (min-width:768px)  → 토글 display:none, 메뉴는 static + 항상 visible
```

  왜 `display:none`이 아니라 `visibility`+`opacity`일까요? `display`는 기본적으로 부드러운 전환(transition)이 안 되지만 이 조합은 페이드/슬라이드가 되고, `visibility:hidden`이면 **Tab 키 포커스도 안 가서** 숨은 링크가 키보드로 잡히지 않아요. 또 메뉴 밖 클릭, `Esc`, 링크 클릭, 화면이 768px 이상으로 커질 때(`matchMedia('(min-width: 768px)')`의 `change`)에도 `closeMenu()`가 상태를 정리해요. 메뉴가 열린 동안 헤더 배경은 `.site-header:has(.nav__menu.active)` 규칙 덕에 불투명해지고요(`:has()`는 비교적 최근 CSS라 아주 오래된 브라우저에서는 적용되지 않을 수 있어요).
- **왜 필요한가**: 좁은 화면에서 메뉴 4개+버튼 2개를 한 줄에 다 놓을 수 없어서예요. 상태(열림/닫힘)를 JS 변수 대신 **DOM의 클래스 하나로** 표현해 CSS와 JS가 같은 정보를 공유해요.
- **내 코드에서는**: `js/nav.js › initNavigation()`, `syncToggleButton()`, `closeMenu()`, `css/style.css › .nav__menu`, `.nav__menu.active`, `.nav__toggle.active .bar:nth-child(...)`.
- **직접 확인해 보기**: 폭 375px에서 햄버거를 눌러 Elements에서 `#nav-menu`에 `active`가 붙고 `#nav-toggle`의 `aria-expanded`가 `true`로 바뀌는지 봐요. 이어서 창을 768px 넘게 키워 보세요.
- **스스로 설명해보기**: "햄버거 메뉴에서 HTML, CSS, JS는 각각 무엇을 맡나요? 왜 `display:none`을 안 썼나요?"

## 7. JavaScript 기초 문법

> **이 장을 읽고 나면** `const`/`let`/`var`의 차이와 `var`를 쓰지 않는 이유를 말할 수 있어요. 코드에 나오는 `??`, `...`, `Object.assign`, `Set` 같은 낯선 문법도 읽을 수 있어요.

### 7.1 변수: const / let / var
- **한 줄 정의**: 변수는 값에 이름표를 붙여 저장하는 것이고, `const`는 재할당 불가, `let`은 재할당 가능, `var`는 옛 방식이에요.
- **비유**: `const`는 이름표가 접착된 서랍이에요. 서랍 안 물건은 바꿔도 되지만 다른 서랍으로 교체할 수는 없어요.
- **핵심 설명**:

| | `var` | `let` | `const` |
|---|-------|-------|---------|
| 스코프 | **함수** 단위 | **블록**(`{}`) 단위 | 블록 단위 |
| 재선언 / 재할당 | 둘 다 가능 | 재할당만 | 둘 다 불가 |
| 호이스팅 | 선언이 위로 끌어올려져 선언 전에 읽으면 `undefined` | 선언 전 접근 시 에러(TDZ) | 같음 |

```js
for (var i = 0; i < 3; i++) {}
console.log(i);          // 3  ← 블록 밖에서도 살아 있음(스코프 누수)
for (let j = 0; j < 3; j++) {}
console.log(typeof j);   // 'undefined' (블록 안에서만 존재)
```

  `const`는 "값이 불변"이 아니라 "이름에 다른 값을 다시 못 넣는다"예요. `const projectsState = {...}`의 속성은 `Object.assign`으로 바뀌어요. `js/config.js`의 `Object.freeze(...)`도 **얕게만** 막아서 `typingPhrases` 배열 자체는 여전히 수정할 수 있어요. 기본은 `const`, 재할당이 필요할 때만 `let`, `var`는 쓰지 않아요.
- **왜 필요한가**: `var`는 의도치 않게 바깥에서 값이 바뀌거나 선언 전에 읽혀도 에러 없이 `undefined`가 나와서 버그를 숨겨요.
- **내 코드에서는**: 대부분 `const`이고, `let`은 값이 실제로 바뀌는 곳뿐이에요. `js/effects.js`의 `isTicking`(`initScrollEffects` 안), `revealObserver`, `index`(`initTypingEffect` 안), `js/projects.js`의 `renderedFilterKey`, `for` 반복 변수. `tools/verify.js`는 `var` 선언이 없는지 점검해요. 또 클래식 스크립트들의 최상위 `const`/`function`은 파일이 달라도 서로 보여서 `main.js`가 `initTheme()`을 바로 부를 수 있어요(그래서 `<script>` 순서가 중요해요).
- **스스로 설명해보기**: "`var`를 왜 안 쓰나요? `const` 객체의 속성은 바꿔도 되나요?"

### 7.2 자주 만나는 문법 사전

| 문법 | 뜻 | 이 프로젝트에서 |
|------|----|------------------|
| 자료형 | 원시값(string, number, boolean, null, undefined)과 객체(배열·함수 포함). 거짓처럼 취급되는 값: `false, 0, '', null, undefined, NaN` | `js/form.js › fieldValidators`의 `if (!text)` |
| 객체 `{}` / 배열 `[]` | 이름으로 / 순서로 접근하는 묶음 | `CONFIG.reposPerPage`, `projectsState.repos` |
| 함수 선언 vs 화살표 | `function f(){}`는 위로 끌어올려져 어디서나 호출 가능, `const f = () => {}`는 선언 뒤에서만 | 기능 단위는 `function renderTheme()`, 작은 도우미·콜백은 `const sleep = (ms) => ...` |
| 조건·반복 | `if`/삼항/`switch`, `for`/`while` | `js/projects.js › renderProjectsStatus()`의 `switch (status)`, `js/effects.js › initTypingEffect()`의 `while`/`for` |
| `??` (널 병합) | `null`/`undefined`일 때만 기본값. `\|\|`는 `0`, `''`, `false`도 대체해요 | `description ?? ''`, `contactState.errors[fieldName] ?? ''` |
| `?.` (옵셔널 체이닝) | `a?.b`는 `a`가 없으면 에러 대신 `undefined` | 이 프로젝트 코드에는 쓰이지 않아요. 중첩 데이터(`repo?.owner?.login`)에 쓰는 문법이라고만 알아 두세요 |
| 스프레드 `...` | 배열/객체 펼치기 | `[...new Set(...)]`, `[FILTER_ALL, ...languages]` |
| `Object.assign(a, b)` | `b`의 속성을 `a`에 덮어씀(**a가 바뀜**) | `js/projects.js › setProjectsState()` |
| `Object.fromEntries` | `[[키, 값], ...]` → 객체 | `js/form.js`: `Object.fromEntries(new FormData(form))` |
| `Set` | 중복 없는 집합 | `js/projects.js › renderProjectFilters()`에서 언어 중복 제거 |

- **스스로 설명해보기**: "`description ?? ''`와 `description || ''`는 언제 결과가 달라지나요?" (예: 값이 빈 문자열 `''`이거나 `0`일 때)

## 8. ES6+ 핵심 3가지

> **이 장을 읽고 나면** 화살표 함수, 구조분해 할당, 배열 메서드(`map`/`filter`)가 "왜 필요하고 어떻게 쓰는지" 내 코드로 설명할 수 있어요. (학습 목표 ④)

### 8.1 화살표 함수
- **한 줄 정의**: `function` 대신 `=>`로 짧게 쓰는 함수 문법이에요.
- **비유**: 긴 편지 대신 짧은 문자 메시지예요.
- **핵심 설명**: `(x) => x * 2`처럼 본문이 식 하나면 `return`과 `{}`를 생략해요. **객체를 바로 돌려줄 때는 괄호로 감싸요**: `() => ({ a: 1 })`(`{`만 쓰면 함수 본문으로 읽혀요). `this`를 따로 갖지 않는 특징이 있지만 이 프로젝트에서는 필요 없어서 다루지 않아요.
- **왜 필요한가**: 콜백(다른 함수에 넘기는 함수)을 많이 쓰는 코드에서 짧고 읽기 쉬워요.
- **내 코드에서는**: `js/utils.js › toSafeUrl = (url = '') => (...)`, `js/projects.js › .filter(({ fork }) => !fork)`, `addEventListener('click', () => {...})`.
- **스스로 설명해보기**: "`=> ({ ... })`에서 괄호는 왜 필요한가요?"

### 8.2 구조분해 할당
- **한 줄 정의**: 객체나 배열에서 필요한 값을 **한 번에 이름 붙여** 꺼내는 문법이에요.
- **비유**: 택배 상자에서 필요한 물건만 꺼내서 라벨을 붙여 책상에 놓는 것이에요.
- **핵심 설명**: `const { theme } = themeState`는 `const theme = themeState.theme`와 같아요. 콜론으로 **이름을 바꾸고**(`html_url: url`), `=`로 **기본값**을 줄 수 있어요. 함수 매개변수 자리에서도 바로 쓸 수 있어요. 아래는 GitHub 응답에서 필요한 필드만 꺼내는 실제 코드예요(중간은 `…`로 생략).

```js
const toProject = ({
  id,
  name,
  description,
  html_url: url,
  …
  stargazers_count: stars,
  forks_count: forks,
  updated_at: updatedAt,
}) => ({
  id,
  name,
  description: description ?? '',
  …
  language: language ?? '기타',
  …
});
```

  `html_url`은 밑줄 표기라 JS 관례(camelCase)와 안 맞아서 `url`로, `stargazers_count`는 길어서 `stars`로 바꿨어요. **기본값 주의**: 구조분해의 `= 기본값`은 값이 `undefined`일 때만 쓰여요. GitHub은 설명이 없는 저장소에 `null`을 주기 때문에 이 코드는 `??`로 처리해요. (`js/theme.js › setTheme(theme, { persist = true } = {})`는 구조분해 기본값을 쓰는 예예요.)
- **왜 필요한가**: `repo.html_url`, `repo.stargazers_count`를 매번 길게 쓰지 않고, 화면에서 쓸 모양으로 한 번 정리해 두면 이후 코드가 짧고 명확해요.
- **내 코드에서는**: `js/projects.js › toProject`, `js/form.js`의 `const { name, value } = event.target;`, `js/effects.js`의 `entries.forEach(({ target, isIntersecting }) => ...)`, `const { githubUsername, reposPerPage, requestTimeoutMs } = CONFIG;`.
- **직접 확인해 보기**: Console에서 `const { a: x, b = 5 } = { a: 1 }; console.log(x, b)`를 실행해 보세요(`1 5`).
- **스스로 설명해보기**: "`html_url: url`의 왼쪽과 오른쪽은 각각 무엇인가요?"

### 8.3 템플릿 리터럴
- **한 줄 정의**: 백틱(`` ` ``)으로 감싼 문자열 안에 `${식}`을 끼워 넣고 여러 줄도 쓸 수 있는 문법이에요.
- **핵심 설명**: `"a" + b + "c"`보다 읽기 쉽고, 카드 HTML 같은 긴 문자열에 적합해요. 다만 값을 **그대로** 끼워 넣으므로 바깥에서 온 값은 반드시 escape해야 해요(9장). 예: `js/projects.js › createProjectCard`(카드 1장의 HTML), `fetchRepos`의 `endpoint`, `js/form.js`의 `` `#${fieldName}-error` ``.
- **스스로 설명해보기**: "템플릿 리터럴이 왜 JSX와 비슷한가요?" (12장)

### 8.4 배열 메서드: forEach / map / filter
- **한 줄 정의**: 반복문(`for`)을 직접 쓰는 대신 "각 요소에 무엇을 할지"만 함수로 전달하는 배열 메서드예요.
- **비유**: `filter`는 체(조건에 맞는 것만 남김), `map`은 공장 라인(하나씩 변환해 같은 개수의 결과), `forEach`는 순회하며 각자에게 일 시키기(결과물 없음)예요.
- **핵심 설명**:

| 메서드 | 입력 → 출력 | 원본 | 언제 쓰나 |
|--------|--------------|------|------------|
| `forEach(fn)` | 배열 → **없음**(`undefined`) | 유지 | DOM 갱신 같은 부수 효과 |
| `map(fn)` | `[a,b,c]` → `[f(a),f(b),f(c)]` (**같은 길이**) | 유지 | 데이터 변환, 목록을 HTML로 |
| `filter(fn)` | 배열 → 조건이 참인 요소만 (**같거나 짧음**) | 유지 | 걸러내기 |
| `find(fn)` | 배열 → 첫 번째 일치 요소 하나 | 유지 | 하나만 찾기 (`FIELD_NAMES.find`) |

  `map`/`filter`는 새 배열을 돌려주고 원본을 바꾸지 않아요(`push`, `sort`처럼 원본을 바꾸는 메서드도 있어서 주의해요). 이 프로젝트의 체이닝이에요.

```js
    const data = await fetchRepos();
    const repos = data
      .filter(({ fork }) => !fork) // 남의 저장소를 fork 한 것은 제외
      .map(toProject); // 카드에 필요한 모양으로 변환
```

```
data:  [ A(fork:false), B(fork:true), C(fork:false) ]
  filter(!fork) ─▶ [ A, C ]              (B 제외, 원본 data는 그대로)
  map(toProject) ─▶ [ toProject(A), toProject(C) ]   (필요한 필드만 가진 새 객체들)
```

- **왜 필요한가**: "어떻게(인덱스 증가, 빈 배열에 push)"가 아니라 "무엇을(fork 제외, 변환)"만 적어서 읽기 쉽고 실수가 적어요. React의 목록 렌더링(`items.map(...)`)도 같은 발상이에요.
- **직접 확인해 보기**: Console에서 `[1,2,3,4].filter(n => n % 2 === 0).map(n => n * 10)` → `[20, 40]`.
- **스스로 설명해보기**: "`map`과 `forEach`는 무엇이 다른가요? `filter → map` 순서를 바꾸면 어떻게 되나요?"

## 9. DOM

> **이 장을 읽고 나면** `querySelector`로 요소를 찾아 내용·클래스·속성을 바꾸는 방법과, `innerHTML`을 쓸 때 왜 `escapeHtml`이 필요한지 설명할 수 있어요. (학습 목표 ③의 앞부분)

### 9.1 DOM 트리와 요소 선택
- **한 줄 정의**: DOM(Document Object Model)은 브라우저가 HTML을 읽어 만든 **요소 객체의 트리**이고, JS는 이 트리를 통해 화면을 바꿔요.
- **비유**: 회사 조직도예요. `document`가 사장, 각 요소는 부서/직원이고, 조직도를 고치면 회사(화면)가 바뀌어요.
- **핵심 설명**:

```
document
└─ html            ← document.documentElement (data-theme이 붙는 곳)
   ├─ head
   └─ body
      ├─ header#site-header ─ nav.nav ─ (로고, ul#nav-menu, 버튼들)
      ├─ main#main ─ section#hero / #about / #skills / #projects / #contact
      ├─ footer.site-footer
      └─ button#scroll-top
```

| 메서드 | 돌려주는 것 | 비고 |
|--------|--------------|------|
| `getElementById('x')` | 요소 1개 / `null` | id만, 빠르고 단순 |
| `querySelector('css선택자')` | **첫 번째** 요소 / `null` | 클래스·속성·조합 가능 |
| `querySelectorAll('css선택자')` | 모두(NodeList, `forEach` 가능, `map`은 없음) | 찾은 시점의 스냅샷 |

  이 프로젝트는 일관되게 `querySelector('#id')` 형태를 써요. 요소가 없으면 `null`이라 `.classList` 등에서 에러가 나므로 HTML의 id와 JS의 선택자를 항상 맞춰야 해요.
- **왜 필요한가**: 화면을 바꾸려면 먼저 "무엇을" 바꿀지 찾아야 해요.
- **내 코드에서는**: `js/nav.js › initNavigation`의 `document.querySelector('#nav-menu')`, `initSmoothScroll`의 `document.querySelectorAll('a[href^="#"]')`.
- **직접 확인해 보기**: Console에서 `document.querySelector('#nav-menu')`를 입력하면 그 요소가 출력되고 마우스를 올리면 화면에서 강조돼요. Elements에서 요소를 클릭한 뒤 Console에서 `$0`을 입력하면 방금 고른 요소가 나와요.
- **스스로 설명해보기**: "`querySelector`와 `querySelectorAll`의 차이는? 못 찾으면 무엇이 나오나요?"

### 9.2 textContent vs innerHTML, 그리고 XSS 방어
- **한 줄 정의**: `textContent`는 값을 **글자로만**, `innerHTML`은 값을 **HTML로 해석해서** 넣어요.
- **비유**: `textContent`는 벽에 붙이는 포스트잇(무슨 내용이든 그냥 글자), `innerHTML`은 "이 지시대로 공사해"라는 설계도(내용에 악의적 지시가 섞이면 그대로 공사)예요.
- **핵심 설명**:

| | `textContent` | `innerHTML` |
|---|---------------|-------------|
| 처리 | 글자 그대로 | HTML로 파싱 (`<img onerror=...>` 실행 가능) |
| 안전성 | 안전 | **바깥에서 온 값은 위험(XSS)** |
| 속도/부작용 | 가벼움 | 자식 노드를 전부 새로 만듦 → 포커스·리스너 소실 |

  **XSS(교차 사이트 스크립팅)** 는 남이 넣은 문자열이 내 페이지에서 코드로 실행되는 공격이에요. 이 프로젝트의 보안 시나리오(`tools/verify.js`의 SEC 점검)는 GitHub 응답이 이렇게 조작된 경우예요: 이름 `<script>...</script>`, 설명 `<img src=x onerror="...">`, 홈페이지 `javascript:...`. 방어는 값의 종류마다 달라요.

| 값 | 방어 | 위치 |
|----|------|------|
| 이름·설명·언어 | `escapeHtml()` → `< > & " '`를 `&lt;` 등으로 바꿔 **글자로만 보이게** | `js/utils.js` |
| 링크 주소 | `toSafeUrl()` → `http(s)://`로 시작할 때만 통과(`javascript:` 차단) 후 `escapeHtml` | `js/utils.js` |
| 숫자 | `Number(stars)` | `createProjectCard` |
| 날짜 | `Intl.DateTimeFormat`이 만든 문자열 | `formatDate` |

  `innerHTML`이 항상 나쁜 건 아니에요. 정적 문구뿐인 템플릿은 괜찮고, **바깥 값이 섞일 때** 반드시 escape해야 해요. 글자만 바꿀 땐 `textContent`가 더 안전하고 간단해요.
- **왜 필요한가**: 방어가 없으면 남이 만든 저장소 이름 하나로 내 포트폴리오 방문자의 브라우저에서 코드가 실행될 수 있어요.
- **내 코드에서는**: `textContent`는 `js/form.js`의 에러 문구, `js/effects.js`의 타자기·연도. `innerHTML`은 `js/projects.js › renderProjectsStatus / renderProjectFilters / renderProjectCards`에서 모두 `escapeHtml`을 거쳐요.
- **직접 확인해 보기**: Console에서 `escapeHtml('<img src=x onerror=alert(1)>')`를 실행해 결과 문자열을 확인해요. 그다음 `const d = document.createElement('div'); document.body.append(d); d.textContent = '<b>hi</b>'`(글자 그대로 보임)와 `d.innerHTML = '<b>hi</b>'`(굵은 글씨로 해석됨)를 차례로 실행해 차이를 봐요.
- **스스로 설명해보기**: "왜 카드 HTML에 저장소 이름을 그냥 넣으면 위험한가요? `toSafeUrl`은 `escapeHtml`과 무엇이 다른가요?"

### 9.3 classList, dataset, setAttribute, closest, 요소 만들기

| 도구 | 하는 일 | 이 프로젝트 예 |
|------|---------|------------------|
| `classList.add / remove / toggle(이름, 강제값) / contains` | 클래스 붙이기/떼기/뒤집기/확인. `toggle`은 결과(true/false)를 돌려줌 | `header.classList.toggle('scrolled', scrollY >= CONFIG.navScrolledThreshold)`, `menu.classList.contains('active')` |
| `dataset` | `data-*` 속성 읽기/쓰기 (`data-filter` → `dataset.filter`) | `button.dataset.filter`, `document.documentElement.dataset.theme` |
| `setAttribute / getAttribute` | 속성 값(항상 **문자열**) | `aria-pressed`는 `String(theme === 'dark')` |
| `closest(선택자)` | 자기 자신부터 부모로 올라가며 처음 일치하는 요소 | `event.target.closest('[data-filter]')` |
| `contains(노드)` | 자손인지 확인 | `header.contains(event.target)` |

  요소를 만드는 방법은 세 가지예요. `createElement` + `append`(안전하지만 코드가 길어짐), `insertAdjacentHTML`(기존 자식을 유지한 채 추가, escape 필수), `innerHTML = 템플릿`(이 프로젝트의 선택: 모양이 코드에 보이고 JSX와 닮았지만 escape가 필수이고 자식을 통째로 재생성).

  **왜 인라인 `style` 대신 클래스 토글인가?** JS는 "상태(scrolled, active)"만 말하고 모양은 CSS가 정하도록 역할을 나누면, 다크 모드·미디어 쿼리·hover·transition을 CSS에서 한 곳에 관리할 수 있어요. 인라인 스타일은 명시도가 높아 덮어쓰기 어렵고 CSS에서 찾을 수 없어요. 그래서 이 프로젝트에는 `style=""`이 없고 `tools/verify.js`도 점검해요(계산된 좌표처럼 값이 진짜 동적일 때만 예외).
- **직접 확인해 보기**: 스크롤하면서 Elements의 `<header>`에 `scrolled`가 붙었다 떨어지는지 봐요(60px 기준). Console에서 `document.querySelector('#site-header').classList.contains('scrolled')`.
- **스스로 설명해보기**: "`event.target.closest('[data-filter]')`는 왜 `event.target.dataset.filter`가 아니라 `closest`를 쓰나요?" (버튼 안쪽 자식 요소가 눌릴 수도 있기 때문)

## 10. 이벤트

> **이 장을 읽고 나면** 클릭 한 번이 리스너까지 전달되는 경로(버블링)와, 이벤트 위임·`preventDefault`·`requestAnimationFrame` 쓰로틀이 왜 필요한지 설명할 수 있어요. (학습 목표 ③)

### 10.1 이벤트 모델과 addEventListener
- **한 줄 정의**: 이벤트는 "클릭됐다", "스크롤됐다" 같은 사건이고, `addEventListener('이벤트', 함수)`로 사건이 일어났을 때 실행할 함수를 등록해요.
- **비유**: 초인종(이벤트)과 집 안 사람의 행동 규칙("벨이 울리면 문을 열어")이에요.
- **핵심 설명**: 이벤트 객체(`event`)에는 `target`(실제 눌린 요소), `currentTarget`(리스너가 붙은 요소), `key`(키보드), `preventDefault()`가 있어요.
  **`onclick="..."` 속성을 쓰지 않는 이유**: HTML과 JS가 뒤섞이고, 한 요소에 하나만 지정되며, 전역 함수가 필요하고, 보안 정책(CSP)을 쓰는 환경에서는 막히기도 해요. `addEventListener`는 여러 개 등록·제거·옵션(`passive`, `once`)이 가능해요. (`tools/verify.js`가 `on*` 속성이 없는지 점검해요.)

| 이벤트 | 언제 | 이 프로젝트 |
|--------|------|--------------|
| `click` | 클릭/탭/Enter·Space(버튼) | 테마 토글, 햄버거, 필터 칩, 다시 시도, 맨 위로 |
| `submit` | 폼 제출 | `js/form.js › initContactForm` |
| `input` | 입력값이 바뀔 때마다 | 폼 실시간 검사 |
| `focusout` | 포커스가 떠날 때 (**버블링됨**, `blur`는 안 됨) | 폼 `touched` 처리 |
| `scroll` | 스크롤 | `js/effects.js › initScrollEffects` |
| `keydown` | 키 누름 (`event.key === 'Escape'`) | 메뉴 닫기 |

- **왜 필요한가**: 이벤트가 있어야 사용자 행동에 반응하는 페이지가 돼요.
- **내 코드에서는**: `js/theme.js › initTheme()`의 `toggle.addEventListener('click', ...)`. `js/main.js`가 각 `init*` 함수를 모아 실행해 리스너를 연결해요.
- **직접 확인해 보기**: Elements에서 `#theme-toggle` 선택 → 오른쪽 **Event Listeners** 탭에서 `click` 리스너와 소스 위치를 확인해요. Console의 `getEventListeners($0)`도 Chrome DevTools에서 쓸 수 있어요.
- **스스로 설명해보기**: "`onclick` 속성 대신 `addEventListener`를 쓰는 이유 두 가지는?"

### 10.2 preventDefault, 버블링, 이벤트 위임
- **한 줄 정의**: 이벤트는 눌린 요소에서 시작해 **부모 방향으로 올라가며(버블링)** 전달돼요. 그래서 부모 하나에 리스너를 달아 자식들의 이벤트를 처리하는 것이 **이벤트 위임**이에요.
- **비유**: 아파트 경비실(부모)이에요. 집마다(자식) 벨을 다는 대신, 방문자가 누구를 찾는지 경비실에서 확인해 안내하는 방식이에요.
- **핵심 설명**:

```
window ─▶ document ─▶ … ─▶ #project-filters ─▶ button[data-filter]   (1) 캡처: 위에서 아래로 (거의 안 씀)
                                                   ▲ target: 실제 클릭된 곳                (2) 타깃
window ◀─ document ◀─ … ◀─ #project-filters ◀─ button[data-filter]   (3) 버블링: 아래에서 위로 ← 리스너는 보통 여기서 실행
```

  `preventDefault()`는 브라우저의 **기본 동작**을 막아요. `<a href="#about">`는 즉시 점프가 기본이라 막고 부드러운 스크롤·포커스 이동을 직접 제어하고(`js/nav.js`), `<form>`은 제출하면 페이지가 새로고침되는 것이 기본이라 막고 우리가 검증해요(`js/form.js`). 위임의 실제 코드예요.

```js
  document.querySelector('#project-filters').addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (button) setProjectsState({ filter: button.dataset.filter });
  });
```

  필터 버튼과 "다시 시도" 버튼은 화면이 다시 그려질 때마다 **새로 만들어져요**. 버튼에 직접 리스너를 달면 다시 그릴 때마다 사라지므로, **사라지지 않는 부모**(`#project-filters`, `#projects-status`)에 리스너를 하나만 달고 `closest`로 누가 눌렸는지 판별해요. `js/form.js`도 `<form>` 하나에서 `input`/`focusout`을 받아 필드를 구분하고, `js/nav.js`의 `document` 클릭 리스너는 `header.contains(event.target)`으로 "메뉴 밖 클릭"을 알아내요(햄버거 버튼 클릭도 `document`까지 버블링되지만 헤더 안이라 닫히지 않아요).
- **왜 필요한가**: 위임이 없으면 동적으로 생긴 요소마다 리스너를 다시 달아야 하고, 빠뜨리거나 중복 등록하기 쉬워요.
- **내 코드에서는**: `js/projects.js › initProjects()`, `js/nav.js › initSmoothScroll()`, `js/form.js › initContactForm()`.
- **직접 확인해 보기**: Event Listeners 탭에서 `#project-filters`에 `click` 리스너가 **하나**만 있는지 확인하고, 필터 버튼 하나를 골라 리스너가 없는 것도 확인해요.
- **스스로 설명해보기**: "필터 버튼마다 리스너를 달지 않고 부모에 한 번만 단 이유는? `preventDefault()`를 빼면 폼이 어떻게 되나요?"

### 10.3 scroll 쓰로틀, passive, matchMedia
- **한 줄 정의**: `scroll` 이벤트는 스크롤하는 동안 초당 수십 번 발생하므로, `requestAnimationFrame`(다음 화면을 그리기 직전에 실행해 주는 예약)으로 **프레임당 한 번만** 처리해요.
- **비유**: 1초에 수십 번 울리는 초인종마다 문을 열지 않고, 5분마다 한 번만 우편함을 확인하는 것이에요.
- **핵심 설명**:

```
scroll ▮ ▮ ▮ ▮ ▮ ▮ ▮ ▮ …   (매우 자주 발생)
       │ isTicking=false → true 로 바꾸고 requestAnimationFrame(render) 예약
       ▮ ▮ ▮   isTicking 이 true 이므로 즉시 return (무시)
프레임  ───────────▶ render(): 스크롤 위치 읽기 → classList.toggle → isTicking=false
```

  `{ passive: true }`는 "이 리스너에서 `preventDefault()`를 쓰지 않겠다"는 약속이에요. 터치·휠 같은 취소 가능한 이벤트에서는 브라우저가 기다리지 않고 스크롤할 수 있게 해 줘요. `scroll` 이벤트 자체는 취소할 수 없어서 여기서는 방어적인 표기에 가까워요. `matchMedia('(min-width: 768px)')`는 CSS 미디어 쿼리를 JS에서 확인하는 도구로, `.matches`로 현재 값을, `'change'` 이벤트로 변화를 알 수 있어요(`prefers-color-scheme`, `prefers-reduced-motion`에도 사용해요).
- **왜 필요한가**: 스크롤마다 무거운 DOM 갱신을 하면 스크롤이 끊겨요.
- **내 코드에서는**: `js/effects.js › initScrollEffects()`. 기준값은 `js/config.js`의 `navScrolledThreshold: 60`(네비 배경)과 `scrollTopThreshold: 300`(맨 위로 버튼), 비교는 `>=`예요. `js/nav.js › initNavigation()`(768px), `js/theme.js`, `js/utils.js › prefersReducedMotion()`은 `matchMedia`를 써요.
- **직접 확인해 보기**: 스크롤하며 `#scroll-top`의 `visible` 클래스가 299px/300px 경계에서 붙는지 봐요. Performance 탭에서 스크롤을 녹화하면 프레임 단위로 `render`가 실행되는 것을 볼 수 있어요.
- **스스로 설명해보기**: "`isTicking` 변수는 무슨 역할인가요? 왜 스크롤 이벤트 안에서 바로 계산하지 않나요?"

## 11. 비동기

> **이 장을 읽고 나면** 왜 `fetch`를 기다리는 동안 화면이 멈추지 않는지 그림으로 설명할 수 있고, 로딩/성공/실패를 어떻게 코드로 나눴는지 말할 수 있어요. (학습 목표 ⑤)

### 11.1 동기 vs 비동기, 이벤트 루프
- **한 줄 정의**: JavaScript는 한 번에 한 가지만 실행하는데(싱글 스레드), 오래 걸리는 일(네트워크, 타이머)은 브라우저에 **맡겨 두고** 끝났을 때 알려 달라고 하는 방식이 비동기예요.
- **비유**: 식당 주방이에요. 요리사(JS) 한 명이 라면(네트워크)을 끓이는 동안 멍하니 기다리지 않고 타이머를 맞춘 뒤 다른 요리를 하다가, 타이머가 울리면 돌아와요.
- **핵심 설명**:

```
┌ 호출 스택: 지금 실행 중인 함수 (한 번에 하나) ┐    ┌ Web API (브라우저가 대신 처리) ┐
│ loadProjects → fetchRepos → fetch(...)        │───▶│ 네트워크 요청, setTimeout 타이머  │
└───────────────────────────────────────────────┘    └──────────────┬───────────────────┘
        ▲ 스택이 비면 큐에서 꺼내 실행                                │ 끝나면 콜백을 큐에 넣음
        │                                                            ▼
   [이벤트 루프]  ◀── 마이크로태스크 큐: Promise 후속 처리, await 이후 코드 (먼저 전부 실행)
                 ◀── 태스크 큐: 타이머 콜백, 클릭 같은 이벤트 콜백 (그다음 하나씩)
```

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
// 출력: A D C B  (동기 코드 → 마이크로태스크 → 태스크)
```

  `setTimeout`의 시간은 "최소 이 정도 뒤"이지 정확한 시각이 아니에요(환경에 따라 조금 늦을 수 있어요).
- **왜 필요한가**: 비동기가 없으면 응답을 기다리는 동안 스크롤·클릭이 모두 멈춰요.
- **내 코드에서는**: `js/main.js`가 `initProjects()`를 부르면 `loadProjects()`가 곧바로 `loading` 상태를 그리고(동기 부분), `await fetchRepos()`에서 제어를 넘겨요. 그동안 다른 코드(스크롤 효과, 타자기)가 계속 돌아요.
- **직접 확인해 보기**: Console에서 위 코드를 실행해 `A D C B` 순서를 확인해요. Network 탭 throttling을 `Slow 4G`로 바꾸고 새로고침하면 스피너가 보이는 동안에도 스크롤이 돼요.
- **스스로 설명해보기**: "fetch를 기다리는 동안 화면이 왜 멈추지 않나요?"

### 11.2 Promise와 async/await
- **한 줄 정의**: Promise는 "나중에 결과(성공 또는 실패)를 주겠다"는 약속 객체이고, `async/await`는 그 Promise를 **위에서 아래로 읽히는 코드**처럼 쓰게 해 주는 문법 설탕이에요.
- **비유**: 진동벨이에요. 주문(요청)하면 벨(Promise)을 받고, 울리면(fulfilled) 음식을, 문제가 생기면(rejected) 사과를 받아요.
- **핵심 설명**: Promise 상태는 `pending`(대기) → `fulfilled`(성공) 또는 `rejected`(실패). `async` 함수는 항상 Promise를 돌려주고, `await`는 **그 함수만** 잠깐 멈추고(스레드는 안 멈춤) 결과가 오면 이어서 실행해요. 실패는 `try/catch`로 잡아요.

```js
// Promise 체인                                  // async/await (같은 일, 읽기 쉬움)
fetchRepos()                                     try {
  .then((data) => render(data))                    const data = await fetchRepos();
  .catch((error) => showError(error));             render(data);
                                                 } catch (error) { showError(error); }
```

  `await`을 연달아 쓰면 **순서대로** 실행돼요(서로 무관한 요청을 동시에 하려면 `Promise.all([a(), b()])`).
- **왜 필요한가**: `then` 안에 `then`이 중첩되면 읽기 어렵고 에러 처리가 여러 곳으로 흩어져요.
- **내 코드에서는**: `js/utils.js › sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))`, `js/projects.js › loadProjects()`(`async` + `try/catch`). `js/effects.js › initTypingEffect()`는 `while (true)` 안에서 한 글자 쓰고 `await sleep(70)`으로 쉬는데, 매번 `await`에서 제어를 돌려주므로 화면이 멈추지 않아요(`await` 없이 `while(true)`를 돌리면 탭이 멈추니 시도하지 마세요).
- **스스로 설명해보기**: "async/await는 새로운 기능인가요, 기존 Promise의 다른 문법인가요?"

### 11.3 fetch, 상태 코드 검사, 타임아웃, 레이트 리밋
- **한 줄 정의**: `fetch(주소)`는 요청을 보내고 `Response`를 담은 Promise를 돌려줘요. 이때 **HTTP 404/403/500도 "성공"** 으로 도착하므로 `response.ok`(200~299)를 직접 확인해야 해요.
- **비유**: 택배 기사가 "배송 시도했습니다"라고 문자를 보내는 것이에요. 수취인 부재(404)여도 배송 '시도'는 성공한 거라 내용물(상태)을 열어 봐야 해요.
- **핵심 설명**: `fetch`가 reject되는 경우는 네트워크 실패, 중단(abort), CORS 차단 같은 **요청 자체가 실패**한 때예요. 실제 코드예요(`js/projects.js › fetchRepos`).

```js
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
```

  `response.json()`도 Promise라서 `await`이 필요해요. **타임아웃**은 `AbortController`로 만들어요: `setTimeout(() => controller.abort(), requestTimeoutMs)`(`js/config.js`의 10000ms)를 걸고 `signal`을 fetch에 넘기면, 시간이 지났을 때 fetch가 `AbortError`로 reject돼요(본문을 읽는 도중이어도 중단될 수 있어요). `finally { clearTimeout(timerId) }`는 성공/실패와 무관하게 타이머를 정리해요. 에러는 `throw`로 올려 보내고 `loadProjects`의 `catch`가 잡아 `describeError(error)`로 사용자용 문장으로 바꿔요.

  **GitHub API 레이트 리밋**: 인증 없이는 대개 **시간당 60회**(IP 기준)이고 초과하면 403(때로 429)을 줘요. 정책은 바뀔 수 있어서 공식 문서로 확인하세요. 이 프로젝트는 `describeError`가 "GitHub API 요청 한도(인증 없이 시간당 60회)를 넘었습니다. 잠시 후 다시 시도해 주세요."를 보여 주고 "다시 시도" 버튼을 제공해요. (토큰을 쓰면 한도가 늘지만, 프런트엔드 코드에는 비밀값을 넣으면 안 돼요.)
- **왜 필요한가**: `ok` 검사가 없으면 404 응답의 `{ "message": "Not Found" }`를 성공 데이터로 착각해 `filter`에서 터지거나 빈 화면이 돼요. 타임아웃이 없으면 스피너가 영원히 돌 수 있어요.
- **내 코드에서는**: `js/projects.js › fetchRepos()`, `describeError()`, `loadProjects()`(`if (projectsState.status === 'loading') return;`로 연타 방지).
- **직접 확인해 보기**: (1) Network에서 `repos` 요청을 우클릭 › **Block request URL**(또는 Block request domain) 후 새로고침하면 에러 화면이 나와요. 차단을 풀고 "다시 시도"를 누르면 성공해요. (`Offline` 체크는 이미 열린 페이지에서는 새 요청이 없어 아무 일도 안 일어나고, 켠 채 새로고침하면 페이지 자체가 안 열릴 수 있어서 권하지 않아요.) (3) Console에서 `(await fetch('https://api.github.com/users/codewhite7777/repos')).status`.
- **스스로 설명해보기**: "fetch는 404일 때 왜 catch로 안 가나요? 그래서 어떻게 처리했나요?"

## 12. 상태 → 렌더링 패턴 (과제의 핵심)

> **이 장을 읽고 나면** "이벤트 → 상태 변경 → DOM 업데이트"를 내 프로젝트의 4가지 기능으로 그려서 설명할 수 있어요. 또 이 구조가 React의 `useState`·컴포넌트와 어떻게 대응되는지 말할 수 있어요. (학습 목표 ⑥)

### 12.1 UI = f(state)
- **한 줄 정의**: 화면(UI)을 "현재 상태(state)를 넣으면 화면이 나오는 함수"로 보는 관점이에요. 상태만 바꾸고, 화면은 그 상태로부터 다시 그려요.
- **비유**: 교통 신호등 제어기예요. 신호 상태(빨강/초록)만 정하면 램프(화면)는 거기에 맞춰 켜져요. 램프를 하나하나 직접 켜고 끄지 않아요.
- **핵심 설명**: 수동 방식은 핸들러마다 "A를 숨기고 B를 보이고 C의 글자를 바꾸고…"를 흩어서 적어야 하고, 상태가 늘면 조합이 폭발해서 하나만 빼먹어도 화면이 어긋나요. 상태 → 렌더링 방식은 핸들러가 상태 값만 바꾸고 화면 갱신은 `renderX()` 한 곳이 맡아요. 이 프로젝트의 공통 패턴은 **"상태 객체 1개 + 상태를 바꾸는 함수 + 상태를 화면에 반영하는 render 함수"** 예요. 그리고 화면에 필요한 값은 다시 계산해서 써요(예: `visibleRepos`는 저장하지 않고 렌더링 때 `repos`와 `filter`로 계산).
- **왜 필요한가**: 기능이 커질수록 "지금 화면이 상태와 일치하는가"를 사람이 추적할 수 없게 돼요.
- **스스로 설명해보기**: "왜 핸들러 안에서 DOM을 직접 고치지 않고 상태를 먼저 바꾸나요?"

### 12.2 흐름 ① 다크 모드 (`js/theme.js`)

```
[이벤트] #theme-toggle click ─▶ setTheme(현재가 dark ? 'light' : 'dark')
            ├─ themeState.theme = 새 값                      (상태)
            ├─ writeStorage('theme', 새 값)                   (사용자가 직접 골랐을 때만 저장: persist)
            └─ renderTheme()                                  (렌더링)
                 ├─ <html data-theme="dark|light">  → CSS 변수 값이 바뀌어 전체 색·해/달 아이콘 교체
                 └─ #theme-toggle 의 aria-pressed
시작할 때: getInitialTheme() = 저장값('light'|'dark')이 있으면 그것, 없으면 시스템 설정(다크면 dark, 아니면 light). 저장은 하지 않음(persist:false)
OS 다크 모드가 바뀌면: 저장된 값이 없을 때만 따라감
```

### 12.3 흐름 ② GitHub 프로젝트 목록 상태기계 (`js/projects.js`)

```
idle ──loadProjects()──▶ loading ──┬─ 저장소 ≥ 1개 ─────────────▶ success  (필터 클릭: filter만 바뀌고 status 유지)
                                   ├─ 저장소 0개 (fork 제외 후) ──▶ empty
                                   └─ 요청 실패 (catch) ─────────▶ error ─ "다시 시도" 클릭 ─▶ loading (loadProjects 재호출)
```

| `status` | `#projects-status` | `#project-filters` | `#projects-grid` |
|----------|--------------------|--------------------|-------------------|
| `loading` | 스피너 + "로딩 중..." | 숨김 | 비움 (`aria-busy="true"`) |
| `success` | 비움 | 언어가 2종 이상이면 표시 | 카드 (`filter` 적용) |
| `empty` | "표시할 프로젝트가 없습니다." | 숨김 | 비움 |
| `error` | 제목 + 원인 + "다시 시도" 버튼 | 숨김 | 비움 |

  `setProjectsState(patch)`는 `Object.assign(projectsState, patch)` 후 `renderProjects()`를 부르는 **유일한 상태 변경 통로**예요. `renderProjects()`는 `renderProjectsStatus() → renderProjectFilters() → renderProjectCards()`를 차례로 실행하고, 각각 `projectsState` 하나만 읽어요. 상태가 `'loading' | 'success' | 'empty' | 'error'`로 **딱 정해진 값** 중 하나라서 "로딩 중인데 에러 문구도 보이는" 모순된 화면이 나올 수 없어요.

### 12.4 흐름 ③ 폼 검증 (`js/form.js`)

```
input(타이핑)  ─▶ errors[필드] = 검사결과; success=false ─▶ renderContactForm   (touched가 아니면 아직 화면엔 안 보임)
focusout(떠남) ─▶ touched[필드]=true; errors[필드]=검사결과 ─▶ renderContactForm  (이때부터 그 필드 에러 표시)
submit         ─▶ preventDefault; submitted=true; 모든 필드 검사
                   ├─ 에러 있음 ─▶ success=false; render; 첫 에러 필드로 focus()
                   └─ 통과 ─▶ form.reset(); errors/touched/submitted 초기화; success=true; render
render: 보여 줄 에러 = (submitted || touched[필드]) ? errors[필드] : ''  →  문구 + .is-invalid + aria-invalid, 성공 문구 + .is-success
```

  `contactState`는 `{ errors, touched, submitted, success }`예요. **touched**는 "그 필드를 이미 떠났는가"로, 사용자가 이름 첫 글자를 치는 순간 "2자 이상 입력하세요"라고 혼내지 않기 위한 장치예요. **submitted**는 "제출을 시도했는가"로, 시도했다면 건드리지 않은 필드의 에러도 모두 보여 줘요.

### 12.5 흐름 ④ 언어 필터 (`filter` 상태와 `renderedFilterKey`)

```
필터 칩 click ─▶ (이벤트 위임) closest('[data-filter]') ─▶ setProjectsState({ filter })
   └▶ renderProjects()
        renderProjectsStatus()  변화 없음
        renderProjectFilters()  언어 목록 key(예 'C|HTML|JavaScript') == renderedFilterKey → 버튼은 그대로 두고 .active / aria-pressed 만 갱신
        renderProjectCards()    visibleRepos = filter==='all' ? repos : repos.filter(...) → grid.innerHTML 교체 → observeReveal
```

  **왜 버튼을 다시 만들지 않을까요?** `innerHTML`로 버튼을 갈아 끼우면 방금 눌러서 포커스를 가진 버튼이 사라져 포커스가 문서 처음으로 돌아가요. 키보드·스크린리더 사용자는 필터 하나 고를 때마다 처음부터 다시 이동해야 해요. 그래서 언어 목록이 **바뀔 때만**(`renderedFilterKey`와 비교) 버튼을 만들고 평소엔 선택 표시만 바꿔요. `tools/verify.js`도 클릭 후 포커스가 유지되는지 점검해요.
- **직접 확인해 보기**: Console에서 `document.querySelector('#theme-toggle').click()`을 실행해 `data-theme`과 `aria-pressed`가 함께 바뀌는지 봐요. 필터 칩을 Tab으로 이동해 Enter를 눌러 본 뒤 포커스 테두리가 유지되는지 확인해요. Network에서 `repos` 요청을 차단하고 새로고침 → 차단 해제 → "다시 시도"로 상태 전이(`error → loading → success`)를 눈으로 따라가 봐요.
- **스스로 설명해보기**: "`empty`와 `error`의 차이는? `touched`와 `submitted`는 왜 둘 다 필요한가요?"

### 12.6 수동 동기화의 한계와 React 대응표

이 프로젝트는 `renderProjects()`가 카드 영역을 **통째로 다시 만들어요**(`innerHTML`). 작은 앱에서는 단순해서 좋지만, 규모가 커지면 (a) 입력창 커서·포커스·스크롤이 날아가고(그래서 `renderedFilterKey` 같은 예외 처리가 늘어남), (b) 바뀐 부분만 고치는 코드를 손으로 짜야 하고, (c) escape를 손으로 챙겨야 해요. React 같은 라이브러리는 이런 반복 작업을 대신해 줘요. 아래는 이 프로젝트의 무엇이 React의 무엇에 대응하는지 정리한 표예요(참고용이며 이 프로젝트에는 React가 없어요).

| 이 프로젝트 | React | 같은 점 / 다른 점 |
|-------------|-------|--------------------|
| `projectsState` 객체 | `useState` 값 | 화면의 근거가 되는 데이터 |
| `setProjectsState(patch)` | `setState` (`setProjects(...)`) | 상태 변경 → 화면 갱신. 다른 점: 여기선 즉시 동기 렌더, React는 자동 예약·묶음 처리 |
| `createProjectCard(project)` | 컴포넌트 `<ProjectCard {...project} />` | "데이터 → 화면 조각" 함수. 매개변수 ≈ props |
| 템플릿 리터럴 HTML 문자열 | JSX | 모양이 코드에 보임. JSX는 값을 **자동 escape**해서 XSS에 더 안전 |
| `renderProjects()` | 리렌더 | 다른 점: 우리는 `innerHTML`로 통째 교체, React는 바뀐 부분만 반영 |
| `renderProjectsStatus()`의 `switch(status)` | 조건부 렌더링 `{loading && <Spinner/>}` | 상태에 따라 다른 화면 |
| `addEventListener` / 이벤트 위임 | `onClick={...}` | React는 리스너 관리를 대신함 |
| `renderedFilterKey` 비교 | 재조정(reconciliation) + `key` | 무엇을 다시 만들지 판단 |
| `init*()` 끝의 `loadProjects()` | `useEffect(() => {...}, [])` | 처음 나타날 때 한 번 실행 |

- **스스로 설명해보기**: "`setProjectsState`는 React의 무엇과 비슷하고, 어디가 다른가요?"

## 13. 브라우저 저장소

> **이 장을 읽고 나면** 다크 모드 선택이 새로고침 후에도 유지되는 원리와, 저장소 접근에 `try/catch`가 필요한 이유를 설명할 수 있어요.

- **한 줄 정의**: 브라우저 저장소는 사용자의 브라우저 안에 작은 데이터를 저장하는 공간이에요. 이 프로젝트는 `localStorage`에 `theme` 키 하나만 저장해요.
- **비유**: `localStorage`는 냉장고에 붙인 메모(껐다 켜도 남음), `sessionStorage`는 포스트잇(탭을 닫으면 사라짐), 쿠키는 매번 계산대에 내미는 회원 카드(요청마다 서버로 함께 전송)예요.

| | `localStorage` | `sessionStorage` | cookie |
|---|----------------|------------------|--------|
| 수명 | 직접 지울 때까지 | 탭/창을 닫을 때까지 | 만료 시각까지 |
| 서버로 전송 | 안 함 | 안 함 | **요청마다 자동 전송** |
| 용량(대략) | 수 MB (브라우저마다 다름) | 수 MB | 약 4KB |

- **핵심 설명**: 저장소는 **문자열만** 저장해요(객체는 `JSON.stringify`/`JSON.parse`로 변환). 저장소 접근은 사생활 보호 모드나 차단 설정, 용량 초과에서 **에러를 던질 수 있어서**, `js/utils.js › readStorage/writeStorage`가 `try/catch`로 감싸요. 실패해도 테마는 화면에서 그대로 동작하고 "저장만 안 되는" 정도로 끝나요. 저장소는 **출처(origin) 단위**라 같은 `*.github.io` 도메인의 다른 사이트와 키 이름이 겹칠 수 있어요. 비밀번호나 토큰은 저장하지 않아요(같은 출처의 스크립트가 읽을 수 있음).
- **왜 필요한가**: 새로고침하면 JS 변수는 사라져요. 사용자의 선택을 기억하려면 브라우저 저장소가 필요해요.
- **초기 테마 결정 순서** (`js/theme.js › getInitialTheme()`): ① 저장값이 `'light'`나 `'dark'`면 그것 ② 아니면 시스템 설정이 다크(`prefers-color-scheme: dark`)일 때 `dark` ③ 그 외에는 `light`.
- **한계 (솔직하게)**: FOUC(Flash Of Unstyled/wrong-theme Content, 잘못된 테마가 잠깐 보이는 현상)가 생길 수 있어요. 이 프로젝트는 **모든 스크립트를 `defer`** 로 불러서 HTML을 다 읽은 뒤에야 `initTheme()`가 실행되므로, 브라우저가 첫 화면을 그린 뒤에 저장된 다크 모드가 적용될 수 있어요(체감은 환경에 따라 달라요). 흔한 해결책은 `<head>`에서 저장값만 먼저 읽어 `data-theme`을 붙이는 작은 인라인 스크립트이지만, "모든 스크립트는 `defer`" 규칙과 맞지 않아 이 프로젝트는 채택하지 않았어요.
- **내 코드에서는**: `js/config.js › themeStorageKey: 'theme'`, `js/theme.js › setTheme(theme, { persist = true } = {})`(사용자가 직접 고른 경우에만 저장).
- **직접 확인해 보기**: Application › Local Storage › 사이트 주소 › `theme` 키를 찾고 값을 직접 `dark`로 바꾸고 새로고침. 키를 삭제하면 OS 설정을 따라가요. (`⋮` › More tools › Rendering › Emulate CSS media feature prefers-color-scheme으로 OS 설정을 흉내 낼 수 있어요.)
- **스스로 설명해보기**: "왜 저장소 접근을 `try/catch`로 감쌌나요? 이 프로젝트의 테마 깜빡임 한계는 무엇인가요?"

## 14. Intersection Observer와 스크롤 애니메이션

> **이 장을 읽고 나면** 스크롤할 때 카드가 나타나는 동작이 `data-reveal → .reveal → .is-visible` 순서로 일어나는 것을 설명할 수 있어요.

- **한 줄 정의**: Intersection Observer는 "이 요소가 화면(뷰포트)에 얼마나 보이는지"가 바뀔 때 알려 주는 브라우저 기능이에요.
- **비유**: 극장 입구 직원이에요. 관객이 입장 기준선을 넘을 때만 알려 주니, 로비를 계속 돌아다니며 확인할 필요가 없어요.
- **핵심 설명**: `scroll` 이벤트로 매번 `getBoundingClientRect()`를 읽는 것보다 효율적이에요(브라우저가 알아서 계산해 변화 시점에만 콜백). `threshold: 0.2`는 요소 면적의 **20%** 가 보일 때를 뜻하고 값은 `js/config.js › revealThreshold`예요.

```
index.html: <h2 data-reveal>, <article data-reveal>, <form data-reveal> …
   └▶ effects.js observeReveal(): 요소에 .reveal 추가(opacity:0; translate 아래로)  +  observer.observe(요소)
        └▶ 20% 이상 보임(isIntersecting) ─▶ .is-visible 추가 ─▶ CSS transition으로 나타남 ─▶ observer.unobserve(요소)
```

  **함정**: 비율은 요소 면적 대비 보이는 면적이라, 요소가 뷰포트 높이의 5배보다 크면 20%가 절대 안 보여서 **영원히 나타나지 않아요**. 그래서 큰 컨테이너 대신 개별 카드에 적용해요(프로젝트 카드는 `#projects-grid`가 아니라 카드 각각을 `observeReveal(grid.querySelectorAll('.project-card'))`). 또 `observe()` 직후 콜백이 한 번 불리기 때문에 `if (!isIntersecting) return;`으로 걸러요.
- **reduced-motion / 미지원 처리**: `initRevealOnScroll()`은 동작 줄이기 설정이거나 `IntersectionObserver`가 없으면 그냥 끝나서 `.reveal`이 붙지 않고 모든 콘텐츠가 처음부터 보여요. JS가 꺼져 있어도 마찬가지예요(숨김 클래스는 JS가 붙이므로).
- **왜 필요한가**: 스크롤 위치를 직접 계산하는 코드는 무겁고 실수하기 쉬워요.
- **내 코드에서는**: `js/effects.js › initRevealOnScroll()`, `observeReveal()`, `css/style.css › .reveal`, `.reveal.is-visible`, `.card.reveal`.
- **직접 확인해 보기**: Elements에서 아직 화면 아래에 있는 카드가 `class="... reveal"`이다가 스크롤하면 `is-visible`이 붙는 것을 봐요. Rendering › Emulate prefers-reduced-motion: reduce로 바꾸고 새로고침하면 `reveal` 클래스 자체가 없어요.
- **스스로 설명해보기**: "왜 `threshold`를 컨테이너가 아닌 카드 개별 요소에 적용하나요?"

## 15. 개발 도구와 배포

> **이 장을 읽고 나면** 코드를 저장→커밋→푸시→배포하는 흐름과 GitHub Pages 배포 후 점검 항목을 말할 수 있어요.

- **VS Code + Live Server**: Live Server는 내 컴퓨터에서 **작은 웹 서버**를 띄워 `http://127.0.0.1:포트/`(기본 포트는 대개 5500) 주소로 열어 주고, 파일을 저장하면 브라우저를 **자동 새로고침**해 줘요. 파일을 더블클릭해 `file://`로 열면 주소 체계와 보안 규칙이 달라 서버 환경과 다르게 동작하는 경우가 있어서 서버로 여는 것을 권해요.
- **Git/GitHub 기본 흐름**:

```
작업 폴더 ──git add──▶ 스테이징 ──git commit -m "메시지"──▶ 내 컴퓨터의 저장소 ──git push──▶ GitHub(원격) ──▶ GitHub Pages
```

  `git status`로 상태를, `git log --oneline`로 기록을 확인해요. 커밋 메시지는 "무엇을 왜"를 짧게 적어요.
- **GitHub Pages 배포 절차**: 저장소 **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / 폴더 `/ (root)` → Save**. 잠시(보통 1~수 분) 뒤 `https://<id>.github.io/<저장소>/`, 이 저장소는 `https://codewhite7777.github.io/codyssey_B1-1/`에서 열려요. 진행 상황은 저장소의 Actions 탭에서 볼 수 있어요. 무료 계정은 공개(public) 저장소에서 쓰는 것이 일반적이에요.
- **`.nojekyll`**: 저장소 루트의 빈 파일이에요. GitHub Pages는 기본적으로 Jekyll이라는 정적 사이트 생성기를 거치는데, 이 파일이 있으면 그 과정을 건너뛰고 **파일을 그대로** 서비스해요(예: `_`로 시작하는 폴더가 무시되는 문제를 예방).
- **배포 후 점검 항목**:
  1. 시크릿(사생활 보호) 창에서 배포 URL을 열어 CSS/JS/이미지가 모두 로드되고 Console에 빨간 에러가 없는가 (Network에 404가 없는가, 파일 경로의 **대소문자**가 맞는가)
  2. 모바일 폭(Device Toolbar)에서 햄버거 메뉴가 열리고 가로 스크롤이 없는가, 메뉴 앵커 링크와 폼 검증이 동작하는가
  3. 다크 모드 토글 후 새로고침해도 유지되는가
  4. Projects 카드가 배포 주소에서 실제로 로드되는가 (레이트 리밋이면 에러 문구 확인). 수정 후 옛 화면이 보이면 캐시 때문일 수 있으니 강력 새로고침(`Ctrl+Shift+R`)
- **자동 점검 도구**: `node tools/verify.js --static`으로 파일 규칙을, 브라우저 도구(Playwright)가 있으면 옵션 없이 실행해 실제 동작까지 확인해요.
- **스스로 설명해보기**: "로컬에서는 되는데 배포하면 CSS가 안 먹을 때 무엇을 확인하나요?"

## 16. 용어 사전 (영문 알파벳 순)

> **이 장을 읽고 나면** 낯선 용어를 만났을 때 한 줄 뜻과 이 프로젝트 속 위치를 바로 찾아볼 수 있어요. (한글 용어는 대응하는 영문 이름 자리에 넣었어요.)

| 개념 | 한 줄 뜻 | 이 프로젝트 위치 |
|------|----------|--------------------|
| AbortController | 진행 중인 fetch를 중단시키는 도구 | `js/projects.js › fetchRepos` |
| API | 프로그램끼리 데이터를 주고받는 창구 | `fetchRepos`가 부르는 `api.github.com` |
| aria-* | 보조기술에 의미·상태를 알리는 속성 | `index.html › #nav-toggle`, `js/nav.js › syncToggleButton` |
| async/await | Promise를 순서대로 읽히게 쓰는 문법 | `js/projects.js › loadProjects` |
| 버블링 | 이벤트가 자식에서 부모로 올라가며 전달 | `js/nav.js`의 `document` click 리스너 |
| 캐스케이드·명시도 | CSS 규칙 충돌 시 승자를 정하는 규칙 | `.nav__menu.active` |
| classList | 클래스 추가/제거/토글/확인 | `js/nav.js`, `js/effects.js` |
| closest | 자신부터 조상 방향으로 일치하는 요소 찾기 | `js/projects.js › initProjects` |
| CORS | 다른 출처 응답을 읽어도 되는지 정한 브라우저 규칙 | `api.github.com` 요청 |
| CSS 변수 | `--이름` 값을 `var()`로 재사용 | `css/style.css › :root` |
| defer | 문서를 다 읽은 뒤 순서대로 스크립트 실행 | `index.html › <script defer>` |
| 구조분해 할당 | 객체/배열에서 값을 꺼내 이름 붙임 | `js/projects.js › toProject` |
| DOM | HTML을 요소 객체의 트리로 만든 것 | `document.querySelector` 전반 |
| escapeHtml / toSafeUrl | 특수문자 치환 / http(s) 주소만 허용 | `js/utils.js` |
| 이벤트 위임 | 부모 리스너 하나로 자식 이벤트 처리 | `js/projects.js › initProjects` |
| 이벤트 루프 | 스택이 비면 큐의 콜백을 실행하는 장치 | `await`, `setTimeout` (11장) |
| fetch | HTTP 요청을 보내고 Response Promise 반환 | `fetchRepos` |
| Flexbox | 1차원 배치 | `.nav`, `.chips` |
| FOUC | 잘못된 스타일/테마가 잠깐 보이는 현상 | `js/theme.js` (13장 한계) |
| GitHub Pages | 정적 파일 무료 호스팅 | `https://codewhite7777.github.io/codyssey_B1-1/` |
| Grid | 2차원 배치 | `.projects__grid`, `.about`, `.skills` |
| 호이스팅 | 선언이 위로 끌어올려진 것처럼 동작 | `function renderTheme()` 등 (7장) |
| HTTP 상태 코드 | 응답 처리 결과를 나타내는 번호 | `describeError` |
| innerHTML / textContent | HTML로 해석해 넣기 / 글자로만 넣기 | `renderProjectCards` / `renderContactForm` |
| Intersection Observer | 요소가 화면에 보이는지 알려 주는 API | `js/effects.js › initRevealOnScroll` |
| JSON | JS 객체와 닮은 데이터 텍스트 형식 | `response.json()` |
| 랜드마크 | 페이지의 주요 영역(header/nav/main/footer) | `index.html` |
| Layout (reflow) | 요소의 위치·크기를 계산하는 단계 | `.field__error { min-height }` |
| localStorage | 영구 저장되는 문자열 저장소 | `js/utils.js › readStorage` |
| map / filter / forEach | 배열 변환 / 걸러내기 / 순회 | `loadProjects`, `renderProjectFilters` |
| matchMedia | JS에서 미디어 쿼리 확인 | `js/nav.js`, `js/theme.js` |
| 모바일 퍼스트 | 좁은 화면이 기본, `min-width`로 덧입힘 | `@media (min-width: 768px)` |
| Origin (출처) | scheme + host + port | CORS, localStorage 범위 |
| preventDefault | 기본 동작(이동, 새로고침) 막기 | `initSmoothScroll`, 폼 submit |
| Promise | 나중에 오는 결과(성공/실패)의 약속 | `sleep`, `fetch` |
| prefers-color-scheme | OS의 다크/라이트 설정 | `js/theme.js › getInitialTheme` |
| prefers-reduced-motion | OS의 "동작 줄이기" 설정 | `css/style.css` 끝, `prefersReducedMotion()` |
| 레이트 리밋 | 시간당 요청 횟수 제한 | `describeError`의 403 처리 |
| requestAnimationFrame | 다음 화면 그리기 직전에 콜백 실행 | `initScrollEffects` |
| 시맨틱 HTML | 의미를 담은 태그 사용 | `index.html` (3장) |
| 스킵 링크 | 반복 메뉴를 건너뛰고 본문으로 | `.skip-link` |
| 상태 (state) | 화면의 근거가 되는 데이터 | `themeState`, `projectsState`, `contactState` |
| 템플릿 리터럴 | 백틱 문자열 + `${}` | `createProjectCard` |
| viewport | 보이는 영역 / 반응형용 메타 태그 | `index.html › <meta name="viewport">` |
| XSS | 삽입된 스크립트가 실행되는 공격 | `escapeHtml`로 방어 |
| .nojekyll | Jekyll 처리를 끄는 빈 파일 | 저장소 루트 |

## 17. 흔한 오해와 함정 모음

> **이 장을 읽고 나면** 초보자가 자주 빠지는 함정 14가지를 정정해서 설명할 수 있어요.

1. **"fetch는 404에서 에러를 던진다"** → 아니에요. 요청 자체가 실패할 때만 reject돼요. 404/403/500은 정상 도착한 응답이라 `response.ok`를 직접 검사해야 해요(`fetchRepos`).
2. **"innerHTML은 항상 나쁘다"** → 정적 문구에는 괜찮아요. 위험한 것은 **바깥에서 온 값을 escape 없이** 넣는 것이에요. 다만 자식을 통째로 갈아 끼워 포커스·리스너가 사라지는 부작용은 있어요.
3. **"display:none과 visibility:hidden은 같다"** → `display:none`은 자리도 없애고 기본적으로 부드러운 전환이 안 돼요. `visibility:hidden`은 자리는 남기고 포커스만 막아요. `opacity:0`은 포커스도 되고 클릭도 돼서 보이지 않는 요소가 잡힐 수 있어요.
4. **"Grid가 Flex의 상위호환이다"** → 서로 다른 도구예요. 한 줄 정렬·줄바꿈 나열은 Flex가 더 간단하고 자연스러워요.
5. **"async 함수는 항상 병렬로 실행된다"** → JS는 한 번에 하나만 실행해요. 연달아 쓴 `await`은 순서대로 기다리고, 동시에 요청하려면 `Promise.all`이 필요해요.
6. **"const면 값이 절대 안 바뀐다"** → 이름에 다른 값을 못 넣을 뿐이에요. `projectsState`는 `const`인데 `Object.assign`으로 바뀌고 `Object.freeze`도 얕아요.
7. **"aria-label만 붙이면 접근성이 끝난다"** → ARIA는 이름·상태만 알릴 뿐 동작은 안 만들어요. `<div role="button">`보다 `<button>`이 키보드 동작까지 공짜로 해 줘요.
8. **"defer와 async는 같다"** → `async`는 다운로드가 끝나는 대로 실행해 순서가 보장되지 않고, `defer`는 문서를 다 읽은 뒤 순서대로 실행해요.
9. **"setTimeout(fn, 0)은 즉시 실행이다"** → 현재 코드와 마이크로태스크가 끝난 뒤 태스크 큐에서 실행돼요. 시간도 "최소" 지연일 뿐이에요.
10. **"모바일 퍼스트는 모바일만 만든다는 뜻이다"** → 좁은 화면이 **기본 스타일**이고, 넓은 화면은 `min-width`로 덧입혀요.
11. **"`/css/style.css`와 `css/style.css`는 같다"** → GitHub Pages 프로젝트 사이트에서는 앞의 `/`가 도메인 루트를 가리켜 404가 나요. 로컬에서는 둘 다 되는 것처럼 보여서 배포 후에 발견돼요.
12. **"애니메이션은 아무 속성이나 써도 성능이 같다"** → `top`/`width`/`margin`은 Layout을 다시 하지만 `transform`/`opacity`/`translate`는 대개 합성만 다시 해요.
13. **"localStorage는 안전한 저장소다"** → 같은 출처의 스크립트는 누구나 읽을 수 있어요. 비밀번호·토큰은 넣지 않아요. 용량 초과·차단으로 에러가 날 수도 있어요.
14. **"상태를 바꾸면 화면이 자동으로 바뀐다"** → 순수 JS에서는 아니에요. `renderX()`를 직접 불러야 해요. `setProjectsState`가 항상 `renderProjects()`까지 부르는 이유예요(React는 `setState`가 이 일을 자동으로 예약해요).

## 18. 학습 목표 6개 자가 진단표

> **이 장을 읽고 나면** 6개 학습 목표 각각을 30초 안에 말할 수 있어요.

각 목표를 **30초** 안에 말해 보고, 아래 모범 답변과 비교해 보세요. 그대로 외우지 말고 내 코드 이름을 넣어 내 말로 바꾸는 연습이 목적이에요.

**① 시맨틱 태그와 구조 설계 기준** (3장)
> "모양이 아니라 **의미**를 담으려고 시맨틱 태그를 썼어요. `header/nav/main/footer`는 랜드마크로 하나씩 두고, 큰 구역은 `section`에 제목을 달아 `aria-labelledby`로 연결했어요. 떼어 내도 뜻이 통하는 Skills 카드와 프로젝트 카드는 `article`, 레이아웃용 상자만 `div`이고, 제목은 h1→h2→h3로 건너뛰지 않았어요. 덕분에 스크린리더 사용자가 구역 단위로 이동하고, 검색엔진과 팀원도 구조를 쉽게 파악해요."

**② Flexbox와 Grid의 차이와 선택 기준** (5장)
> "Flexbox는 **한 방향**, Grid는 **행과 열을 동시에** 다뤄요. 로고는 왼쪽 메뉴는 오른쪽으로 한 줄 정렬하는 `.nav`와 개수가 제각각인 `.chips`는 Flex예요. 프로젝트 카드는 화면 폭에 따라 열 수가 바뀌는 격자라서 Grid의 `repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))`로 미디어 쿼리 없이 1/2/3열을 만들었어요. 저는 '행과 열 정렬이 동시에 필요한가?'로 골라요."

**③ querySelector → addEventListener 흐름** (9, 10장)
> "`querySelector('#nav-toggle')`로 요소를 찾고 `addEventListener('click', 함수)`로 클릭 때 실행할 동작을 연결해요. 햄버거 버튼은 클릭하면 `menu.classList.toggle('active')`만 하고, 어떻게 보일지는 CSS가 정해요. 버튼이 다시 그려지는 필터에는 **부모에 리스너를 하나만** 달고 `event.target.closest`로 누가 눌렸는지 알아내는 이벤트 위임을 썼어요. 폼은 `submit`에서 `preventDefault`로 새로고침을 막았어요."

**④ 화살표 함수 · 구조분해 · map/filter** (8장)
> "화살표 함수는 콜백을 짧게, 구조분해는 GitHub의 긴 응답에서 필요한 값만 이름을 바꿔(`html_url: url`) 꺼내려고, `map/filter`는 반복문 대신 '무엇을 할지'만 선언하려고 써요. `loadProjects`에서 `filter`로 fork를 빼고 `map(toProject)`로 카드용 모양으로 바꿔요. 원본을 건드리지 않고 새 배열이 나와서 실수가 적고, React의 목록 렌더링과도 같은 발상이에요."

**⑤ fetch · async/await와 로딩/성공/실패 UI** (11, 12장)
> "`fetchRepos`가 `async/await`로 GitHub API를 호출해요. fetch는 404·403에도 reject하지 않아서 `response.ok`를 직접 검사하고 실패면 상태 코드를 붙여 `throw`해요. `AbortController`로 10초 타임아웃도 걸었어요. `loadProjects`가 `status`를 `loading`으로 바꾸면 `renderProjects`가 스피너를, 성공이면 카드를, 0개면 빈 상태를, `catch`에서는 원인 문구와 '다시 시도' 버튼을 그려요. 화면은 항상 `projectsState` 하나에서 나와요."

**⑥ 이벤트 → 상태 변경 → DOM 업데이트** (12장)
> "다크 모드로 말할게요. 토글 버튼 `click`(이벤트)이 `setTheme`를 불러 `themeState.theme`를 바꾸고(상태), `renderTheme`이 `<html data-theme>`과 `aria-pressed`를 갱신하면(DOM) CSS 변수 값이 바뀌어 전체 색이 바뀌어요. 프로젝트 목록과 폼도 같은 구조로 `projectsState`/`contactState`를 바꾸고 render 함수가 화면을 다시 그려요. React와 견주면 `setProjectsState`는 `setState`, `createProjectCard`는 컴포넌트, 템플릿 리터럴은 JSX에 대응해요."

**자가 점검**: 각 목표마다 (1) 30초 안에 말했다 (2) 코드 위치(`파일 › 함수`)를 짚었다 (3) "그럼 ○○는 왜요?"라는 꼬리 질문 하나에 답했다. 세 가지가 모두 되면 피어 평가 준비 완료예요.
