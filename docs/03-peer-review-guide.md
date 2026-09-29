# 피어 평가 설명 가이드

> 피어 평가 3회에서 동료에게 이 프로젝트를 **설명하고, 질문에 답하고, 코드를 조금 바꿔 보이는 것**을 준비하는 문서입니다.
> 대본과 답변은 뼈대입니다. 반드시 **내 말로 다시 쓰고 소리 내어 연습**한 뒤 사용하세요. 남이 쓴 문장을 그대로 외우면 꼬리 질문에서 바로 드러납니다.

---

## 0. 이 문서 읽는 법

### 언제 어디를 여는가

| 상황 | 볼 곳 |
| --- | --- |
| 회차별로 무엇을 어떻게 준비할지 | 1장 (운영 전략) |
| 발표 대본이 필요할 때 | 2장 (30초 / 5분 / 15분 스크립트) |
| 데모를 어떤 순서로 보여 줄지 | 3장 (데모 시나리오) |
| 예상 질문에 답을 연습할 때 | 4장 (Q&A 뱅크 86문항) |
| 모르는 질문, 라이브 코딩 요청을 받았을 때 | 5장 |
| 내 사이트의 약점을 정리할 때 | 6장 (알려진 한계) |
| 평가 전날 / 당일 | 9장 (체크리스트), 10장 (검증 도구 활용) |

### 표기 규칙

- 코드 위치는 **`파일 › 함수명`** 으로 적습니다. (줄 번호는 코드가 바뀌면 틀려집니다.)
- "개념 노트 N장"은 `docs/01-concept-notes.md`, `R5-3` 같은 항목은 `docs/02-evaluation-checklist.md` 및 `node tools/verify.js` 출력의 번호, `V07` 같은 항목은 `docs/00-study-plan.md`의 변형 과제 번호입니다.
- 대본의 `[이름]`, `[배포 URL]`, `[ ]` 안은 내 것으로 바꿔 넣는 자리입니다.

### 다섯 가지 원칙

1. **평가가 보는 것은 완벽함이 아니라 이해와 정직입니다.** 아는 것과 모르는 것을 구분해서 말하면 신뢰를 얻습니다.
2. **모든 설명은 "무엇 + 왜 + 어디(코드 위치)"로 끝냅니다.** 예: "햄버거는 `classList.toggle('active')`로 클래스만 바꾸고 모양은 CSS가 정합니다. 역할을 나누려고 그렇게 했고, `js/nav.js › initNavigation`에 있습니다."
3. **화면 → 코드 → 화면 순서로 보여 줍니다.** 동작을 먼저 보여 주고, 코드를 열고, 다시 동작으로 돌아와 확인합니다.
4. **한계는 내가 먼저 말합니다.** 6장 참고.
5. **막히면 인정하고 같이 확인합니다.** 5장 참고.

---

## 1. 피어 평가 3회 운영 전략

### 1-1. 회차별 계획

| 항목 | 1회차 | 2회차 | 3회차 |
| --- | --- | --- | --- |
| 시간 | 10~15분 | 15~20분 | 20분 |
| 주제 | 결과물 데모 + 웹 큰 그림 + HTML/CSS | DOM · 이벤트 · 인터랙션 코드 워크스루 + **라이브 수정** | 비동기 · 상태 관리 + 질의응답 + 한계/개선점 |
| 다루는 학습 목표 | ① HTML 시맨틱, ② Flex와 Grid | ③ `querySelector` + `addEventListener`, ④ 화살표 함수 / 구조분해 / `map` / `filter` | ⑤ `fetch` + `async/await` + 4가지 상태, ⑥ 이벤트 → 상태 → DOM |
| 강조점 | "동작하는 결과물을 보여 주고, 구조를 **왜** 그렇게 설계했는지" 말하기 | "코드를 **읽어 낼 수 있고 바꿀 수 있다**"는 것을 보여 주기 | "상태가 화면을 결정한다"는 원리와 **에러/로딩 처리**, 그리고 한계를 정직하게 |
| 주로 여는 파일 | `index.html`, `css/style.css` | `js/main.js`, `js/nav.js`, `js/effects.js`, `js/theme.js`, `js/form.js` | `js/projects.js`, `js/theme.js`, `js/form.js` |
| 성공 기준 (요약) | 반응형 데모를 2분 안에 진행하고, 시맨틱 태그와 Flex/Grid 선택 이유를 실제 선택자로 설명 | 라이브 수정 1건을 5분 안에 성공하고, 이벤트 → 상태 → 클래스 흐름을 코드를 짚으며 설명 | 4가지 상태를 3분 안에 재현하고, `response.ok` 처리와 한계 3개 이상을 스스로 설명 |
| 준비를 시작하는 시점 | Phase 2 이후 (학습 로드맵) | Phase 4 이후 | Phase 5 이후 |

**1회차 성공 기준**
- [ ] 반응형 데모(375 → 768 → 1280px)를 2분 안에 막힘없이 진행했다
- [ ] 시맨틱 태그를 고른 이유를 "의미 + 접근성 + 유지보수" 세 가지 중 둘 이상으로 말했다
- [ ] Flex와 Grid를 이 사이트의 실제 선택자로 구분해서 설명했다 (`.nav` vs `.projects__grid`)
- [ ] 예상 시간(10~15분)을 넘기지 않았다

**2회차 성공 기준**
- [ ] `querySelector` → `addEventListener` → 핸들러 → 클래스 변경 흐름을 코드를 짚으며 설명했다
- [ ] 라이브 수정 요청 1건을 예측 → 변경 → 확인 → 설명 순서로 5분 안에 마쳤다
- [ ] `requestAnimationFrame` 또는 이벤트 위임 질문에 이유까지 답했다
- [ ] 화살표 함수 / 구조분해 / `map` / `filter`를 실제 코드 위치와 함께 보여 줬다

**3회차 성공 기준**
- [ ] 로딩 / 성공 / 에러 / 빈 상태를 3분 안에 화면에서 재현했다 (3장 참고)
- [ ] "fetch는 404에서도 성공으로 돌려준다"와 `response.ok` 처리를 설명했다
- [ ] 이벤트 → 상태 → 렌더링을 theme / form / projects 세 곳에 걸쳐 정리하고 React와 연결했다
- [ ] 알려진 한계를 먼저 3개 이상 말하고 개선 방향을 덧붙였다
- [ ] 질의응답에서 5개 이상 답했다 (모르는 질문에는 5장의 절차로 대응)

### 1-2. 회차별 시간 배분 예시

| 회차 | 구성 (분) |
| --- | --- |
| 1회차 (15분 기준) | 오프닝 1 · 데모 2 · 웹 큰 그림 1 · HTML 3 · CSS 4 · 질문 4 |
| 2회차 (20분 기준) | 데모 복습 1 · `main.js`와 코드 지도 1 · `theme.js` / `nav.js` / `effects.js` / `form.js` 워크스루 9 · **라이브 수정 5** · 질문 4 |
| 3회차 (20분 기준) | 상태 4종 시연 3 · `projects.js` 워크스루 7 · 상태 → 렌더링 정리(React 연결) 3 · 한계와 개선 2 · 질문 5 |

시간이 줄어들면 앞의 것부터 압축하고, **질문 시간은 줄이지 않는 것**을 권합니다. 질문에서 이해가 드러납니다.

### 1-3. 어떤 순서로 배정받아도 대응하기

회차는 내가 고르지 못할 수 있습니다. 그래서 준비를 다음 규칙으로 합니다.

1. **모든 회차에 공통 5분 요약(2-2)을 갖고 들어간다.** 평가자가 이전 회차를 보지 않았다는 전제로 시작합니다.
2. **6개 학습 목표 각각에 30초 답을 준비한다.** 어느 회차든 어떤 목표든 물어볼 수 있습니다.
3. **배정된 회차의 주제는 깊게, 나머지는 5분 요약 수준으로** 다룹니다.
4. **이전 회차에서 다루지 않은 목표는 이번 회차에 짧게라도 넣습니다.** 아래 커버 매트릭스로 관리합니다.
5. **Q&A 뱅크(4장)는 회차와 무관하게 전부 훑어 둡니다.** 1회차에도 비동기 질문이 나올 수 있습니다.

**커버 매트릭스** (회차가 끝날 때마다 표시)

| 학습 목표 | 1회차 | 2회차 | 3회차 | 아직 안 다룬 목표는 다음 회차에 |
| --- | :---: | :---: | :---: | --- |
| ① HTML 시맨틱 | [ ] | [ ] | [ ] | |
| ② Flex와 Grid | [ ] | [ ] | [ ] | |
| ③ `querySelector` + `addEventListener` | [ ] | [ ] | [ ] | |
| ④ 화살표 함수 / 구조분해 / `map` / `filter` | [ ] | [ ] | [ ] | |
| ⑤ `fetch` + `async/await` + 4가지 상태 | [ ] | [ ] | [ ] | |
| ⑥ 이벤트 → 상태 → DOM | [ ] | [ ] | [ ] | |

**배정 순서가 달라졌을 때**

| 상황 | 대응 |
| --- | --- |
| 첫 회차인데 주제가 ⑤⑥(3회차 주제) | 5분 요약 후 바로 `projects.js`로. 상태 4종 시연을 앞당기고, ①②는 요약으로 갈음 |
| 마지막 회차인데 주제가 ①②(1회차 주제) | 새로 배운 것(이전 회차 피드백 반영)을 한 줄 언급하고, 구조 설계 이유를 더 깊게 |
| 회차 주제와 무관한 질문이 나옴 | 무시하지 말고 30초 답으로 대응한 뒤 "이 부분은 다음 회차에서 코드로 더 보여 드리겠습니다" |

### 1-4. 회차 사이 피드백 반영하기

피드백은 받는 것보다 **다음 회차에 반영하는 것**이 중요합니다. 흐름은 이렇습니다.

1. **회차 직후 15분 안에 기록한다.** 기억이 선명할 때 받은 질문(원문), 내 답, 아쉬웠던 점을 8장의 양식에 적습니다.
2. **원인을 분류한다.**
   - A. 이해 부족 (개념을 몰랐다)
   - B. 전달 문제 (알지만 설명이 매끄럽지 않았다)
   - C. 시연 · 환경 문제 (데모가 안 됐다, 시간이 부족했다)
   - D. 코드 개선 (실제로 고칠 만한 약점이었다)
3. **다음 회차 전에 처리할 것을 3개 이내로 고른다.**
4. **분류별 처방을 적용한다.**

| 분류 | 처방 | 확인 방법 |
| --- | --- | --- |
| A 이해 부족 | 개념 노트 해당 장을 다시 읽고, 내 말로 Q&A 문항을 추가 | 빈 화면 테스트(학습 로드맵 5-4)로 다시 설명 |
| B 전달 문제 | 대본의 해당 부분을 다시 쓰고 60초 녹음 | 녹음을 들으며 얼버무린 곳이 줄었는지 |
| C 시연 · 환경 | 체크리스트(9장)에 항목 추가, 예비 재현 방법 준비 | 리허설에서 같은 실수가 안 나오는지 |
| D 코드 개선 | 브랜치에서 수정 → `node tools/verify.js` → 배포 URL에서 재확인 | 회귀가 없는지 |

5. **다음 회차 오프닝에서 한 줄로 언급한다.** 예: "지난 회차에 이벤트 위임이 추상적이라는 피드백을 받아서, 이번에는 화면에서 버튼이 다시 만들어지는 것을 직접 보여 드리겠습니다."
6. **커버 매트릭스를 갱신한다.**

**주의**: 평가 **직전(전날 이후)** 에는 큰 코드 변경을 하지 않습니다. 고친다면 작은 변경만 하고, 반드시 `node tools/verify.js`와 배포 URL 확인까지 마칩니다.

---

## 2. 스크립트

아래는 **뼈대**입니다. 문장을 내 말투로 바꾸고, 내가 실제로 한 것(예: 변형 과제를 해 본 것)만 남기세요.

### 2-1. 짧은 버전

**30초 (엘리베이터 버전)**

> 저는 HTML, CSS, JavaScript만으로 반응형 포트폴리오를 만들었습니다. 시맨틱 태그로 구조를 잡고, 레이아웃은 Flexbox와 Grid를 나눠 썼습니다. 다크 모드, 폼 검증, GitHub API 연동은 모두 '이벤트가 상태를 바꾸고, 상태가 화면을 결정한다'는 같은 구조로 만들었고, API는 로딩 · 성공 · 에러 · 빈 상태를 각각 화면으로 구분했습니다.

**1분 버전**

> 안녕하세요, [이름]입니다. 이 페이지는 라이브러리 없이 HTML, CSS, JavaScript만으로 만들었습니다. 구조는 header, main 안의 section 다섯 개, footer로 나눴고, 색과 간격은 CSS 변수로 모아서 다크 모드를 변수 값 교체만으로 구현했습니다. 인터랙션은 클래스를 바꾸는 방식으로 통일했습니다. 햄버거 메뉴, 스크롤에 따른 헤더 배경과 맨 위로 버튼, 스크롤 등장 애니메이션이 모두 그렇습니다. 프로젝트 목록은 fetch와 async/await로 GitHub에서 가져오고, 화면 상태를 status 값 하나로 관리합니다. 결국 이 페이지 전체가 '이벤트 → 상태 변경 → 화면 갱신'이라는 하나의 흐름을 세 군데에 적용한 것입니다.

### 2-2. 범용 5분 요약 스크립트

어떤 회차에 배정되어도 시작할 때 쓸 수 있는 말하기 대본입니다. 공백 포함 약 1,900자로, 또박또박 읽으면 5분 안팎입니다.

**[0:00~0:30] 오프닝**

> 안녕하세요, [이름]입니다. 저는 '나를 소개하는 웹페이지'를 HTML, CSS, JavaScript만으로 만들었습니다. 라이브러리 없이 만든 이유는, 사용자가 버튼을 누르면 왜 화면이 바뀌는지를 제 손으로 구현하며 이해하고 싶었기 때문입니다. 5분 동안 구조, 스타일, 인터랙션, 데이터 가져오기 순서로 설명드리겠습니다.

**[0:30~1:30] HTML · CSS (목표 ①②)**

> 먼저 구조입니다. header 안에 nav, main 안에 hero, about, skills, projects, contact 다섯 개의 section, 마지막에 footer를 두었습니다. section은 제목과 aria-labelledby로 연결해서 스크린리더가 구역을 구분하게 했고, 스킬 카드와 프로젝트 카드처럼 따로 떼어 놔도 의미가 있는 덩어리는 article로 만들었습니다. 스타일은 CSS 변수에 색과 간격을 모았고, 다크 모드는 같은 이름의 변수 값만 data-theme="dark"에서 바꾸는 방식입니다. 레이아웃은 로고, 메뉴, 버튼처럼 한 줄 정렬은 Flexbox로, 프로젝트 카드처럼 행과 열이 있는 격자는 Grid로 나눠 썼습니다. 그리고 모바일 퍼스트라서 기본이 모바일이고, 768px과 1024px에서 넓혀 갑니다.

**[1:30~2:45] DOM · 이벤트 (목표 ③④)**

> 인터랙션은 요소를 찾고, 이벤트를 연결하고, 상태를 바꾸는 세 단계로 통일했습니다. 예를 들어 햄버거 메뉴는 querySelector로 버튼을 찾고 addEventListener로 click을 연결해서, 누를 때마다 classList.toggle('active')를 호출합니다. 그러면 CSS가 active 클래스를 보고 메뉴를 보여 주니까, JS는 상태만 바꾸고 모양은 CSS가 결정합니다. 스크롤이 60px을 넘으면 헤더 배경이, 300px을 넘으면 맨 위로 버튼이 나타나는데, scroll 이벤트가 너무 자주 발생해서 requestAnimationFrame으로 한 프레임에 한 번만 계산합니다. 섹션이 나타나는 애니메이션은 Intersection Observer로, 요소가 20% 보이면 클래스를 붙입니다. 코드에서는 화살표 함수로 콜백을 짧게 쓰고, 이벤트 객체에서 필요한 값은 구조분해로 꺼냅니다.

**[2:45~4:15] 비동기 (목표 ⑤)**

> Projects는 GitHub API에서 제 저장소를 fetch로 가져옵니다. async/await로 위에서 아래로 읽히게 썼고, 중요한 점은 fetch가 404나 500에서도 에러를 던지지 않는다는 것입니다. 그래서 response.ok를 직접 확인하고, 아니면 상태 코드를 담은 에러를 던져서 catch에서 원인별 문구를 보여 줍니다. 10초 안에 응답이 없으면 AbortController로 요청을 끊습니다. 화면 상태는 로딩, 성공, 에러, 빈 상태 네 가지이고 projectsState.status 하나로 관리합니다. 로딩이면 스피너, 성공이면 카드, 실패하면 원인 설명과 '다시 시도' 버튼을 보여 줍니다. 받은 데이터는 filter로 fork를 빼고, map으로 카드에 필요한 필드만 가공하고, 화면에 넣기 전에는 escapeHtml로 특수문자를 바꿔서 악성 문자열이 실행되지 않게 했습니다.

**[4:15~4:50] 상태 → 렌더링 (목표 ⑥)**

> 정리하면 다크 모드, 폼 검증, 프로젝트 목록 모두 '이벤트가 상태를 바꾸고, 렌더링 함수가 상태를 화면에 반영한다'는 같은 모양입니다. setProjectsState가 상태를 바꾸고 곧바로 renderProjects를 부르는 구조는 React의 setState와 같은 발상입니다. 다만 React는 렌더링을 자동으로 하고 바뀐 부분만 갱신하는데, 저는 직접 호출하고 통째로 다시 그린다는 차이가 있습니다. 그래서 다음에는 이 반복을 React가 어떻게 자동화하는지 배우려고 합니다.

**[4:50~5:00] 한계와 마무리**

> 한계도 말씀드리면, 문의 폼은 데모라서 실제로 전송하지 않고, 저장된 테마가 다크일 때 첫 화면이 아주 잠깐 라이트로 보일 수 있습니다. 궁금한 부분이나 코드를 바꿔 보길 원하시는 곳이 있으면 말씀해 주세요.

**리허설 팁**: 대본을 처음 소리 내어 읽어 보면 예상보다 길어지는 경우가 많으니 타이머로 직접 재어 보세요. 5분을 넘기면 문장을 줄입니다. 외우려 하지 말고 "핵심 단어 7개"만 종이에 적어 두고 말하세요. (구조, 변수, Flex/Grid, 클래스 토글, fetch, 상태, 한계)

### 2-3. 15분 상세 스크립트

섹션마다 **대본**, **화면에서 보여줄 것**, **코드에서 열어 둘 파일/함수**를 적었습니다. 회차에 따라 쓰는 섹션이 다릅니다. (1회차: S1~S4, 2회차: S1~S2 축약 + S5, 3회차: S1 축약 + S6~S8)

| 섹션 | 시간 | 주제 | 목표 |
| --- | --- | --- | --- |
| S1 | 0:00~1:00 | 오프닝, 웹 큰 그림 | 전체 |
| S2 | 1:00~2:30 | 결과물 데모 | 전체 |
| S3 | 2:30~4:30 | HTML 구조 | ① |
| S4 | 4:30~6:30 | CSS 변수, Flex/Grid, 반응형 | ② |
| S5 | 6:30~9:00 | DOM · 이벤트 · ES6 | ③④ |
| S6 | 9:00~12:00 | 비동기 (`fetch`, 4가지 상태) | ⑤ |
| S7 | 12:00~13:30 | 상태 → 렌더링, React 연결 | ⑥ |
| S8 | 13:30~14:30 | 한계와 개선 | — |
| S9 | 14:30~15:00 | 마무리 | — |

#### S1. 오프닝, 웹 큰 그림 (1분)

> 안녕하세요, [이름]입니다. 오늘은 제가 HTML, CSS, JavaScript만으로 만든 포트폴리오 페이지를 소개하겠습니다. 이 페이지의 목표는 화면을 예쁘게 꾸미는 것보다 '버튼을 누르면 왜 화면이 바뀌는가'를 코드로 설명하는 것이었습니다.
> 먼저 큰 그림입니다. 브라우저는 HTML을 읽어서 DOM이라는 트리를 만들고, CSS를 적용해 화면을 그리고, 자바스크립트가 DOM을 바꾸면 화면이 다시 그려집니다. 제 페이지는 index.html이 style.css와 js 파일 여덟 개를 불러오는 구조이고, 15분 동안 구조, 스타일, 이벤트, 비동기 데이터, 상태 순서로 말씀드리겠습니다. 궁금한 점은 언제든 끊어서 물어봐 주세요.

- **화면**: 배포 URL 첫 화면(Hero), 필요하면 DevTools Elements의 DOM 트리를 잠깐
- **열어 둘 것**: 브라우저 `[배포 URL]` (시크릿 창)
- **관련**: 개념 노트 1장, 2장

#### S2. 결과물 데모 (1분 30초)

> 먼저 30~40초만 결과물을 보여 드리겠습니다. 스크롤하면 섹션이 차례로 나타나고, 폭을 줄이면 메뉴가 햄버거로 바뀝니다. 다크 모드를 켜면 색이 바뀌고 새로고침해도 유지됩니다. Projects는 제 GitHub 저장소를 실제로 불러온 것입니다. 이 화면들이 어떻게 만들어졌는지를 이제 코드로 보겠습니다.

- **화면**: 스크롤 → 기기 툴바 375px에서 햄버거 → 다크 모드 토글 → 프로젝트 카드
- **열어 둘 것**: 3장 데모 시나리오의 1~4단계만 (자세한 시연은 뒤에서)
- **시간 주의**: 여기서 길어지면 뒤가 밀립니다. 30~40초만

#### S3. HTML 구조 (2분) — 목표 ①

> index.html입니다. head에는 lang, viewport 메타 태그, CSS 링크, 그리고 defer가 붙은 스크립트가 있습니다. defer는 HTML을 끝까지 읽은 뒤에 순서대로 실행하라는 뜻이라서, 스크립트에서 querySelector로 요소를 바로 찾을 수 있습니다.
> 본문은 header 안에 nav, main 안에 section 다섯 개, 마지막에 footer입니다. 태그를 고른 기준은 세 가지입니다. 사이트 전체의 머리, 본문, 꼬리는 header, main, footer. 제목이 있는 주제별 구획은 section. 따로 떼어 놔도 의미가 있는 조각, 예를 들어 스킬 카드나 프로젝트 카드는 article입니다. 제목은 h1이 하나, 섹션이 h2, 카드 안이 h3입니다.
> div 대신 이런 태그를 쓴 이유는 태그 이름이 곧 의미라서, 스크린리더가 구역을 건너뛰며 탐색할 수 있고 검색엔진도 구조를 이해하며, 저도 코드를 읽기 쉽기 때문입니다. 폼은 label의 for와 input의 id를 연결해서 라벨을 눌러도 입력창으로 포커스가 갑니다.

- **화면**: VS Code에서 `index.html`의 구조를 접어서(들여쓰기 접기) 뼈대만 보이게 → 브라우저 Elements 트리와 나란히
- **열어 둘 것**: `index.html › <head>`, `header#site-header`, `main > section`(id 5개), `#contact-form`, `footer`
- **덧붙일 것(시간이 되면)**: skip-link, `<noscript>`, `aria-*`
- **관련**: 개념 노트 3장, R2-1 ~ R2-5

#### S4. CSS 변수, Flex/Grid, 반응형 (2분) — 목표 ②

> style.css는 맨 위 :root에 색, 간격, 폰트를 변수로 모았습니다. 다크 모드는 [data-theme="dark"] 안에서 같은 이름의 변수 값만 바꾸는 방식이라 컴포넌트 CSS는 다크 모드를 전혀 모릅니다.
> 레이아웃은 두 가지로 나눴습니다. 헤더는 로고를 왼쪽, 나머지를 오른쪽에 두는 한 줄 정렬이라 Flexbox입니다. 프로젝트 카드는 행과 열이 있는 격자라 Grid이고, repeat(auto-fit, minmax(…))를 써서 미디어 쿼리 없이도 화면 폭에 따라 열 수가 알아서 바뀝니다. 기준은 '한 방향으로 흐르는가, 행과 열이 함께 필요한가'입니다.
> 반응형은 모바일 퍼스트입니다. 기본 스타일이 모바일이고, min-width 768px, 1024px에서 필요한 것만 덧입힙니다. 지금 폭을 줄여 보면 메뉴가 햄버거로 바뀌고 카드가 1열이 됩니다.

- **화면**: DevTools 기기 툴바에서 폭을 375 → 768 → 1280으로. Elements에서 `.nav`와 `#projects-grid` 옆의 `flex` / `grid` 배지를 눌러 오버레이 표시
- **열어 둘 것**: `css/style.css › :root`, `[data-theme="dark"]`, `.nav`, `.projects__grid`, `.about`, `@media (min-width: 768px)`
- **관련**: 개념 노트 4~6장, R3-*

#### S5. DOM · 이벤트 · ES6 (2분 30초) — 목표 ③④

> 자바스크립트는 main.js에서 init 함수를 순서대로 호출하는 구조입니다. nav.js의 햄버거 메뉴를 보겠습니다. querySelector로 버튼과 메뉴를 찾고, 버튼에 addEventListener로 click을 연결했습니다. 누르면 classList.toggle('active')로 클래스를 붙였다 떼고, 모양은 전부 CSS의 .nav__menu.active가 담당합니다. JS는 상태만, 모양은 CSS가 맡도록 역할을 나눈 것입니다.
> 스크롤은 effects.js입니다. 60px을 넘으면 헤더에 scrolled, 300px을 넘으면 맨 위로 버튼에 visible을 붙입니다. scroll 이벤트는 초당 수십 번 발생하기 때문에 requestAnimationFrame으로 한 프레임에 한 번만 계산합니다. 등장 애니메이션은 Intersection Observer로 요소가 20% 보이면 is-visible을 붙이고 관찰을 끝냅니다.
> 문법은 콜백에 화살표 함수를 쓰고, event.target에서 name과 value를 구조분해로 꺼내고, 여러 요소는 forEach로 순회합니다. 기준값 60, 300, 0.2는 config.js 한 곳에 모아 두었습니다.

- **화면**: 375px에서 햄버거 열기/닫기, Elements에서 `#nav-menu`의 `active` 클래스가 붙었다 떨어지는 것. 스크롤하며 `#site-header.scrolled`, `#scroll-top.visible`
- **열어 둘 것**: `js/main.js`, `js/nav.js › initNavigation`, `js/effects.js › initScrollEffects`, `initRevealOnScroll`, `js/config.js › CONFIG`
- **2회차라면 추가**: `js/theme.js`(상태 → 렌더링의 가장 작은 예), `js/form.js`(입력 → 상태 → 에러 표시), **라이브 수정 요청 대비**
- **관련**: 개념 노트 9~10장, 14장, R4-*, R5-*

#### S6. 비동기: fetch와 4가지 상태 (3분) — 목표 ⑤

> 가장 신경 쓴 부분이 projects.js입니다. GitHub API에서 제 저장소 목록을 가져오는데, 응답을 기다리는 동안 화면이 멈추면 안 되니까 비동기로 처리합니다. fetchRepos에서 fetch를 await로 기다리고, 여기서 중요한 점은 fetch는 404나 500이어도 에러를 던지지 않는다는 것입니다. 그래서 response.ok를 직접 확인하고, 아니면 상태 코드를 담은 에러를 던집니다. 10초 안에 응답이 없으면 AbortController로 요청을 끊어서 스피너가 영원히 돌지 않게 했습니다.
> loadProjects는 try/catch로 감싸서, 성공하면 filter로 fork를 빼고 map으로 카드에 필요한 모양으로 바꿉니다. toProject 함수는 구조분해로 필요한 필드만 꺼내면서 html_url을 url로 이름도 바꿉니다.
> 화면은 네 가지 상태입니다. 로딩이면 스피너, 성공이면 카드, 데이터가 없으면 빈 상태 메시지, 실패하면 원인 설명과 '다시 시도' 버튼입니다. 이 네 가지가 projectsState.status 하나로 결정됩니다. 지금 네트워크를 막아서 에러 상태를 만들어 보겠습니다.

- **화면**: Network 탭에서 `api.github.com` 요청의 Status와 Response → 3장의 8~12단계 시연(로딩 → 에러 → 다시 시도 → 성공, 404, 빈 상태)
- **열어 둘 것**: `js/projects.js › fetchRepos`, `describeError`, `loadProjects`, `toProject`, `renderProjectsStatus`
- **관련**: 개념 노트 11장, R8-*

#### S7. 상태 → 렌더링, React 연결 (1분 30초) — 목표 ⑥

> 정리하면 이 페이지에서 상태가 화면을 만드는 곳이 세 군데입니다. 다크 모드는 themeState와 renderTheme, 폼은 contactState와 renderContactForm, 프로젝트는 projectsState와 renderProjects입니다. 모두 이벤트가 상태를 바꾸고, 렌더링 함수가 상태를 읽어 화면을 갱신하는 같은 모양입니다.
> setProjectsState는 상태를 갱신한 뒤 곧바로 renderProjects를 부르는데, 이게 React의 setState와 같은 발상입니다. 차이는 React는 렌더링을 자동으로 호출하고 바뀐 부분만 갱신하는데, 저는 직접 호출하고 innerHTML로 통째로 다시 그린다는 점입니다. 그래서 필터 버튼이 포커스를 잃지 않게 renderedFilterKey 같은 수동 최적화가 필요했고, 이 부분이 프레임워크가 필요한 이유를 가장 잘 보여 줍니다.

- **화면**: Console에서 `themeState.theme = 'dark'` (화면 안 바뀜) → `renderTheme()` (바뀜) → 상태만 바꾸면 안 되고 렌더링이 필요하다는 것. 3장의 마지막 단계
- **열어 둘 것**: `js/theme.js`, `js/form.js › contactState`, `js/projects.js › setProjectsState`
- **관련**: 개념 노트 12장, R9-1

#### S8. 한계와 개선 (1분)

> 한계도 말씀드리겠습니다. 첫째, 문의 폼은 데모라서 실제로 전송하지 않습니다. Formspree나 EmailJS 같은 서비스로 확장할 수 있고, 그 경우에는 전송 중 · 성공 · 실패 상태를 프로젝트 목록처럼 추가하면 됩니다. 둘째, 모든 스크립트를 defer로 로드해서 저장된 테마가 다크일 때 첫 화면이 잠깐 라이트로 보일 수 있습니다. 셋째, 인증 없는 GitHub API는 시간당 60회 제한이 있어서 응답을 캐시하면 좋겠습니다. 넷째, 지금 보는 섹션을 메뉴에서 강조하는 스크롤스파이는 아직 없습니다.

- **화면**: 코드 또는 README의 "알려진 한계" (6장 참고)
- **열어 둘 것**: `README.md › 알려진 한계`, `js/form.js`, `js/theme.js`

#### S9. 마무리 (30초)

> 정리하면 이 페이지는 '이벤트가 상태를 바꾸고, 상태가 화면을 결정한다'는 한 가지 아이디어를 세 군데에 적용한 것입니다. 질문 주시면 코드를 열어서 바로 보여 드리겠습니다. 코드를 바꿔 보길 원하시는 곳이 있으면 말씀해 주세요.

---

## 3. 데모 시나리오 체크리스트

### 3-1. 준비: 창을 이렇게 나눠 둡니다

| 창 | 내용 | 용도 |
| --- | --- | --- |
| A. 브라우저 (시크릿 창) | 배포 URL `[배포 URL]` | 기본 데모. 저장소(Local Storage)와 캐시가 깨끗한 상태로 시작 |
| B. 브라우저 (일반 창) | 로컬 Live Server 주소 (보통 `http://127.0.0.1:5500/`. 실제 주소는 Live Server가 표시하는 값) | 404 · 빈 상태 재현, 라이브 코딩 확인 |
| C. VS Code | 열어 둘 파일 탭을 고정: `index.html`, `css/style.css`, `js/config.js`, `js/main.js`, `js/nav.js`, `js/effects.js`, `js/theme.js`, `js/form.js`, `js/projects.js` | 코드 설명, 라이브 수정 |
| D. 메모장 | 콘솔에 붙여 넣을 명령어 (3-3 참고) | 타이핑 실수 방지 |

- DevTools는 **아래 또는 오른쪽에 도킹**하고 글자 크기를 키워 둡니다. (DevTools 설정의 확대, 또는 `Ctrl` + `+`)
- 브라우저 확대 비율은 100%로 맞춥니다. 발표 중 화면 공유로는 작아 보입니다.
- 창 B의 `git status`는 깨끗해야 합니다. 코드를 바꾸는 시연 후에는 `git restore <파일>`로 되돌립니다.

### 3-2. 단계별 시나리오

각 단계의 **"이때 이렇게 말한다"** 는 한 줄 멘트입니다. DevTools 메뉴 이름과 위치는 브라우저 버전에 따라 다를 수 있으니, 리허설 때 내 환경에서 한 번씩 눌러 보세요.

| # | 조작 | 확인할 것 | 이때 이렇게 말한다 |
| --- | --- | --- | --- |
| 1 | **배포 URL 열기** (창 A, 시크릿). `F12`로 Console도 확인 | Hero가 뜨고 타이핑 효과가 돈다. Console에 빨간 에러가 없다. Projects에 내 저장소 카드가 뜬다 | "GitHub Pages로 배포한 주소입니다. 모든 경로를 상대 경로로 썼기 때문에 저장소 이름이 붙은 하위 주소에서도 동작합니다." |
| 2 | **반응형**: `Ctrl+Shift+M`(Mac은 `Cmd+Shift+M`)으로 기기 툴바를 켜고 폭을 **375 → 768 → 1280** 순으로 바꾼다 | 375: 햄버거 + 카드 1열. 768: 가로 메뉴, Skills 3열, About 2열, 카드 2열. 1280: 카드 3열. 어느 폭에서도 가로 스크롤이 없다 | "기본 스타일이 모바일이고 768, 1024px에서 덧입히는 모바일 퍼스트입니다. 프로젝트 카드는 미디어 쿼리 없이 auto-fit과 minmax로 열 수가 알아서 바뀝니다." |
| 3 | **햄버거** (375px): 열기 → 다시 눌러 닫기 → 열고 메뉴 링크 클릭 → 열고 `Esc` → 열고 바깥 클릭 | 아이콘이 X로 바뀐다. 링크를 누르면 이동하며 닫힌다. Elements에서 `#nav-menu`에 `active` 클래스가 붙고 `#nav-toggle`의 `aria-expanded`가 `true`/`false`로 바뀐다 | "버튼을 누를 때마다 active 클래스가 붙었다 떨어집니다. 모양은 CSS가 결정하고, 접근성 속성 aria-expanded도 함께 바뀝니다." |
| 4 | **다크 모드** (1280px): 토글 클릭 → Application 탭 → Local Storage → 도메인 선택 → `theme` 키 확인 → 새로고침 → 다시 토글 | 색이 전환된다. `theme: dark`가 저장된다. 새로고침 후에도 다크가 유지된다. Elements에서 `<html data-theme="dark">` | "토글이 상태를 바꾸고, 사용자가 직접 고른 값만 localStorage에 저장합니다. 다음 방문에는 저장값을 먼저 보고, 없으면 OS 설정을 따릅니다." |
| 4-b | (선택) `theme` 키를 삭제하고, DevTools의 Rendering 패널(메뉴 위치는 버전에 따라 다름)에서 `prefers-color-scheme: dark`를 에뮬레이트한 뒤 새로고침 | 저장값이 없으면 OS 설정을 따라 처음부터 다크로 시작한다 | "저장된 값이 없을 때만 시스템 설정을 따르는 것도 초기 테마 결정 순서의 일부입니다." |
| 5 | **스크롤 탑 · 네비 배경**: 맨 위에서 천천히 스크롤. Console에 `scrollY` 입력해 값을 확인 | 60px 부근에서 헤더에 배경과 그림자(`#site-header.scrolled`), 300px 부근에서 맨 위로 버튼(`#scroll-top.visible`). 버튼 클릭 시 부드럽게 맨 위로 | "기준값은 config.js에 60과 300으로 모아 뒀습니다. scroll 이벤트는 requestAnimationFrame으로 한 프레임에 한 번만 계산합니다." |
| 6 | **등장 애니메이션**: 새로고침 후 천천히 스크롤. Elements에서 `.reveal` 요소를 선택해 둔다 | 요소가 20% 보이는 순간 `is-visible`이 붙으며 나타난다 | "Intersection Observer로 요소가 20% 보이면 클래스를 붙이고 관찰을 끝냅니다. scroll 이벤트로 위치를 매번 계산하지 않아도 됩니다." |
| 7 | **폼 검증** (Contact): (a) 빈 상태로 '보내기' (b) 이메일에 `abc` 입력 후 `Tab`, 이어서 `abc@def` (c) 이름 `홍길동`, 이메일 `gildong@example.com`, 메시지 10자 이상으로 제출 | (a) 세 필드에 에러 문구가 나오고 이름 칸으로 포커스가 이동. (b) 형식 오류 문구. (c) 성공 메시지와 함께 입력이 비워짐. 어느 경우에도 페이지가 새로고침되지 않음 | "제출하면 preventDefault로 새로고침을 막고 상태 객체를 바꾼 뒤 renderContactForm이 화면을 그립니다. 데모 폼이라 실제 전송은 하지 않는다고 화면에도 적어 두었습니다." |
| 8 | **로딩 상태**: Network 탭 → 스로틀링 드롭다운에서 `Slow 3G`(버전에 따라 이름이 다를 수 있음)를 고르고 **Disable cache** 체크 → 새로고침 | 페이지 전체가 느려지고, Projects에 스피너와 "로딩 중..."이 보이는 구간이 생긴다. Elements에서 `#projects-grid`의 `aria-busy="true"` | "네트워크를 느리게 하면 요청이 끝나기 전까지 로딩 상태가 보입니다. 이 상태는 projectsState.status가 'loading'일 때 그려집니다." |
| 9 | **에러 상태 + 다시 시도**: Network 탭에서 `api.github.com` 요청을 우클릭 → 요청 차단(`Block request domain` 등, 또는 Command Menu(`Ctrl+Shift+P`)에서 "Show Network request blocking"으로 패턴 `api.github.com` 추가) → 새로고침 → 에러 확인 → **차단 해제** → '다시 시도' 클릭 | 차단 중: "프로젝트를 불러올 수 없습니다." + "네트워크 연결을 확인해 주세요." + '다시 시도' 버튼. 해제 후 클릭: 스피너 → 카드 | "네트워크가 막히면 fetch가 실패해서 catch로 가고, describeError가 원인을 사람이 읽는 문장으로 바꿉니다. '다시 시도'는 같은 loadProjects를 다시 부릅니다." |
| 10 | **404 에러** (창 B, 로컬): `js/config.js › CONFIG.githubUsername`을 **존재하지 않는 값**으로 바꾸고 저장 → 자동 새로고침 → Network 탭에서 Status 404 확인 → `git restore js/config.js` | "GitHub 사용자 '…'를 찾을 수 없습니다." + '다시 시도'. Network 탭의 요청이 404 | "fetch는 404에서도 성공으로 취급하기 때문에 response.ok를 검사해서 직접 에러를 던집니다. 그래서 상태 코드별로 다른 문구를 보여 줄 수 있습니다." |
| 11 | **레이트 리밋(403) 문구**: Console에 `setProjectsState({ status: 'error', repos: [], errorMessage: describeError({ status: 403 }) })` | "GitHub API 요청 한도(인증 없이 시간당 60회)를 넘었습니다…" 문구가 에러 상태로 표시된다 | "실제로는 인증 없이 시간당 60회를 넘으면 403이 오고 이 문구가 나옵니다. 지금은 상태를 직접 넣어서 문구가 나오는 경로만 재현한 것입니다." |
| 12 | **빈 상태** (창 B, 로컬): `js/projects.js › loadProjects`의 `.filter(({ fork }) => !fork)`를 임시로 `.filter(() => false)`로 바꾸고 저장 → 확인 → `git restore js/projects.js`. (대체: Console에 `setProjectsState({ status: 'empty', repos: [] })`) | "표시할 프로젝트가 없습니다." 메시지. 필터 버튼 영역이 숨겨진다 | "에러가 아니라 '성공했는데 보여 줄 게 없는' 경우입니다. 저장소가 없거나 fork뿐일 때 이 상태가 됩니다. 사용자가 할 수 있는 행동이 없으니 다시 시도 버튼도 없습니다." |
| 13 | **필터**: 언어 버튼 클릭 → 카드가 줄어듦 → '전체' 클릭. `Tab` / `Enter`로 키보드 조작도 | 눌린 버튼이 강조되고(`active`, `aria-pressed="true"`), 카드 목록이 바뀐다. 키보드 포커스가 사라지지 않는다 | "필터도 같은 패턴입니다. 클릭이 filter 상태를 바꾸고 renderProjectCards가 목록을 다시 그립니다. 버튼은 언어 목록이 바뀔 때만 새로 만들어서 포커스가 유지됩니다." |
| 14 | **(보너스) 상태 → 렌더링 시연**: Console에 `themeState.theme = 'dark'` → 화면 그대로 → `renderTheme()` → 화면이 바뀜 → `setTheme('light')` | 상태만 바꾸면 화면이 안 바뀌고, 렌더링 함수를 불러야 반영된다 | "상태와 렌더링은 별개의 단계입니다. 이 호출을 사람이 잊지 않도록 자동으로 해 주는 것이 React의 역할이라고 이해하고 있습니다." |

**단계별 소요 시간 가이드**: 1~2단계 1분 / 3~5단계 2분 / 6~7단계 2분 / 8~12단계 4~5분 / 13단계 30초 / 14단계 30초. 15분 발표에서는 8~12단계가 가장 길어지기 쉬우니, 필요하면 8(로딩)과 12(빈 상태)는 Console 명령으로 빠르게 대체합니다.

### 3-3. 4가지 상태를 재현하는 방법 정리

| 상태 | 권장 방법 | 대체 방법 | 주의 |
| --- | --- | --- | --- |
| 로딩 | Network 스로틀링(`Slow 3G` 등) + 새로고침 | 로컬에서 `loadProjects`의 `await fetchRepos()` 앞에 `await sleep(2000);` 임시 삽입 (V10). 또는 Console `setProjectsState({ status: 'loading' })` | 스로틀링은 **페이지 전체**를 느리게 하므로 스피너가 보이기까지 오래 걸릴 수 있다. 리허설에서 시간을 재 볼 것. Console로 loading을 만든 뒤에는 `loadProjects()`를 불러도 **바로 return**한다(이미 loading이라서). 되돌릴 때는 새로고침 |
| 성공 | 그냥 열기 | — | 배포 URL에서는 내 저장소가 나와야 한다. 샘플 데이터가 아님을 확인 |
| 에러 (네트워크) | Network 요청 차단 → 새로고침 → 차단 해제 → '다시 시도' | Console `setProjectsState({ status: 'error', repos: [], errorMessage: '네트워크 연결을 확인해 주세요.' })` | 차단 메뉴 위치는 버전에 따라 다름. **Offline 체크 후 새로고침은 페이지 자체가 안 열릴 수 있어 권장하지 않음** (캐시 상태와 브라우저에 따라 다름). 이미 열린 페이지에서 Offline으로 바꿔도 새 요청이 없으면 아무 일도 일어나지 않음 |
| 에러 (404) | 로컬에서 `CONFIG.githubUsername`을 없는 값으로 | — | 사전에 브라우저 주소창에 `https://api.github.com/users/<그 값>`을 열어 404인지 확인해 둘 것. 시연 후 `git restore js/config.js` |
| 에러 (403 레이트 리밋) | Console에서 `describeError({ status: 403 })`를 이용해 문구만 재현 (단계 11) | 실제로 60회를 넘기는 것은 권장하지 않음 (같은 IP를 쓰는 다른 사람에게도 영향) | "실제 403이 아니라 문구 경로를 재현했다"고 밝힐 것 |
| 에러 (시간 초과) | 로컬에서 `CONFIG.requestTimeoutMs`를 `1`로 (V15) | — | 끝나면 `10000`으로 복원 (`git restore js/config.js`) |
| 빈 | 로컬에서 `.filter(({ fork }) => !fork)`를 `.filter(() => false)`로 임시 변경 | Console `setProjectsState({ status: 'empty', repos: [] })` | 코드 변경은 `git restore js/projects.js`로 원복 |

> Console에서 `projectsState`, `setProjectsState`, `describeError`, `themeState`, `renderTheme`, `setTheme`를 직접 부를 수 있는 이유: 이 프로젝트는 ES 모듈이 아니라 일반 스크립트(전역 스코프)로 로드하기 때문입니다. 이것도 "왜 모듈을 안 썼나요?"에 대한 답의 재료입니다. 발표 전 리허설에서 내 브라우저에서 한 번 실행해 보세요.

**메모장에 준비해 둘 Console 명령**

```js
// 성공 상태에서 현재 상태 보기
projectsState

// 403 문구 재현 (실제 403이 아니라 문구 경로)
setProjectsState({ status: 'error', repos: [], errorMessage: describeError({ status: 403 }) })

// 빈 상태
setProjectsState({ status: 'empty', repos: [] })

// 로딩 상태 (되돌릴 때는 새로고침)
setProjectsState({ status: 'loading' })

// 상태 -> 렌더링 시연
themeState.theme = 'dark'   // 화면 변화 없음
renderTheme()               // 이제 바뀜
setTheme('light')           // 원래대로 (저장도 함)
```

---

## 4. 예상 질문 & 모범 답변 뱅크 (86문항)

**사용법**
- 답변은 30~60초 분량(핵심 문장 3~5개)입니다. 그대로 외우지 말고 **내 말로 바꿔** 소리 내어 연습하세요.
- **코드** 줄은 답하면서 열어 보일 위치입니다. 질문을 받으면 "코드로 보여 드리겠습니다" 하고 바로 열 수 있어야 합니다.
- `[ ]`로 표시한 부분은 **내가 실제로 한 것만** 말합니다. 하지 않은 것을 했다고 하지 마세요.
- 꼬리 질문이 이어지면 해당 개념 노트 장을 참고하세요.

### 4-1. 목표 ① HTML 시맨틱 (개념 노트 3장)

**Q01. 시맨틱 태그를 왜 쓰나요? div로 다 만들면 안 되나요?**
- **답**: 태그 이름 자체가 "이 덩어리가 무엇인지"를 알려 주기 때문입니다. header, nav, main, footer는 스크린리더가 구역(랜드마크)으로 인식해서 구역 사이를 건너뛰며 탐색할 수 있고, 검색엔진도 구조를 파악하기 쉽습니다. 저도 코드를 읽을 때 div가 중첩된 것보다 구역이 바로 보여서 유지보수가 쉬웠습니다. 모양은 CSS가, 의미는 HTML이 담당하도록 역할을 나눠서 생각했습니다.
- **코드**: `index.html › header, nav, main, section, article, footer` / 자동 점검 R2-1

**Q02. 구조를 어떤 기준으로 설계했나요?**
- **답**: 세 가지 질문으로 나눴습니다. 사이트 전체의 머리, 본문, 꼬리인가(header, main, footer). 제목을 붙일 수 있는 주제별 구획인가(section과 h2). 따로 떼어 놔도 의미가 통하는 독립 조각인가(article). 그 결과 Hero, About, Skills, Projects, Contact 다섯 개의 section이 나왔고, 메뉴 링크가 각 section의 id로 이동하도록 연결했습니다. 사진과 설명은 figure, "관심 분야: …" 같은 이름-값 쌍은 dl로 표현했습니다.
- **코드**: `index.html › section#hero, #about, #skills, #projects, #contact`, `figure.about__photo`, `dl.about__facts`

**Q03. section, article, div는 어떻게 구분했나요?**
- **답**: section은 제목이 있는 주제 묶음, article은 따로 떼어 재사용해도 의미가 있는 독립 콘텐츠, div는 의미 없이 스타일이나 레이아웃을 위한 상자입니다. 프로젝트 카드와 스킬 그룹 카드는 카드 한 장이 독립된 정보라서 article로 했고, `.container`나 `.hero__inner`처럼 폭이나 정렬만을 위한 것은 div입니다. 솔직히 스킬 카드를 article로 볼지는 판단이 갈릴 수 있고, 저는 "카드 한 장이 독립된 묶음"이라는 기준으로 골랐습니다.
- **코드**: `index.html › article.card.skills__group`, `.container`

**Q04. 제목(h1~h3) 계층은 어떻게 잡았나요?**
- **답**: h1은 페이지에 하나(Hero의 이름), 각 섹션 제목은 h2, 카드 안의 제목(스킬 그룹, 프로젝트 이름)은 h3입니다. 단계를 건너뛰지 않았는데, 스크린리더 사용자가 제목 목록만으로 페이지를 훑기 때문입니다. 글자 크기를 맞추려고 제목 태그를 고르지 않고, 크기는 CSS로 조절했습니다.
- **코드**: `index.html › h1#hero-title, h2.section__title, h3` (DevTools Elements의 Accessibility 패널에서 트리를 볼 수 있음. 메뉴 위치는 버전에 따라 다름)

**Q05. `<meta name="viewport">`가 없으면 어떻게 되나요?**
- **답**: 모바일 브라우저는 페이지를 데스크톱처럼 보통 980px 안팎의 넓은 가상 폭으로 그린 뒤 축소해서 보여 줍니다. 그러면 768px 같은 미디어 쿼리 기준이 실제 화면 폭이 아니라 그 가상 폭에 적용되어 반응형이 의도대로 동작하지 않습니다. `width=device-width, initial-scale=1.0`은 "실제 기기 폭을 기준으로 그려 달라"는 신호입니다.
- **코드**: `index.html › <meta name="viewport">` 바로 위 주석 / 개념 노트 6장

**Q06. label의 for와 input의 id는 왜 연결하나요? placeholder로 충분하지 않나요?**
- **답**: label을 for로 input의 id와 연결하면 라벨을 눌러도 입력창에 포커스가 가고, 스크린리더가 입력창의 용도를 읽어 줍니다. placeholder는 입력을 시작하면 사라지고 대비도 낮아서 라벨을 대신할 수 없습니다. 그래서 라벨은 항상 보이게 두고 placeholder는 예시를 보여 주는 용도로만 썼습니다. 에러 문구는 `aria-describedby`로 입력창과 연결했습니다.
- **코드**: `index.html › #contact-form › label[for="name"], input#name, p#name-error` / R2-5, R6-1

**Q07. 이미지에 alt와 width/height를 넣은 이유는?**
- **답**: alt는 이미지를 볼 수 없는 사용자와 로딩 실패를 위한 대체 텍스트라서 이미지가 전달하는 내용을 문장으로 적었습니다. width와 height 속성은 이미지가 로드되기 전에 자리를 미리 확보해서 로딩 후에 레이아웃이 밀리는 현상을 줄여 줍니다. 반응형 크기는 CSS의 `max-width: 100%`와 `height: auto`로 따로 맞췄습니다. 장식용 SVG 아이콘에는 `aria-hidden="true"`를 붙여 스크린리더가 건너뛰게 했습니다.
- **코드**: `index.html › figure.about__photo img`, `css/style.css › img` / R2-4

**Q08. `defer`가 뭔가요? 왜 붙였나요?**
- **답**: defer는 스크립트를 HTML 파싱과 병렬로 내려받고, HTML을 끝까지 읽은 뒤 태그 순서대로 실행하게 합니다. 그래서 스크립트가 실행될 때 DOM이 이미 완성되어 있어 `querySelector`로 요소를 바로 찾을 수 있고, 화면 표시도 막지 않습니다. 파일 여러 개가 서로의 함수를 쓰기 때문에 실행 순서가 보장되는 defer가 필요했습니다. 순서가 보장되지 않는 async는 이 구조에 맞지 않습니다. config, utils가 앞에, main.js가 마지막에 오는 순서가 중요합니다.
- **코드**: `index.html › <script defer>` 8개와 그 위 주석 / R4-1 / 개념 노트 1장, 9장

### 4-2. 목표 ② CSS: Flexbox, Grid, 반응형 (개념 노트 4~6장)

**Q09. Flexbox와 Grid의 차이는 무엇이고, 언제 무엇을 고르나요?**
- **답**: Flexbox는 한 방향(가로 또는 세로 한 줄)으로 아이템을 늘어놓고 정렬 · 분배하는 데 강하고, 아이템의 내용 크기에서 출발해 공간을 나눕니다. Grid는 행과 열을 동시에 정의하는 격자로, 컨테이너가 칸(트랙)을 먼저 정하고 아이템을 그 칸에 넣습니다. 그래서 한 줄로 정렬하는 메뉴나 버튼 묶음은 Flex, 행과 열이 맞아야 하는 카드 격자나 2열 레이아웃은 Grid를 고릅니다. 둘은 경쟁이 아니라 함께 쓰는 도구입니다.
- **코드**: `css/style.css › .nav`(Flex), `.projects__grid`(Grid) / 개념 노트 5장

**Q10. 이 프로젝트에서는 왜 이렇게 나눠 썼나요?**
- **답**: Flex는 세 곳에 썼습니다. 헤더 `.nav`는 로고를 왼쪽 끝, 나머지를 오른쪽 끝에 두는 `justify-content: space-between`, 칩과 필터는 한 줄에 다 안 들어가면 줄바꿈하는 `flex-wrap`, 카드 내부 `.project-card`는 세로로 쌓되 설명 영역에 `flex: 1`을 줘서 설명 길이가 달라도 하단 정보가 같은 높이에 정렬되게 했습니다. Grid는 프로젝트 카드 격자, About의 사진 + 글 2열, Skills 3열에 썼습니다. 기준은 "한 방향으로 흐르는가, 행과 열이 함께 필요한가"입니다.
- **코드**: `css/style.css › .nav, .chips, .filters, .project-card, .project-card__desc, .projects__grid, .about, .skills`

**Q11. `auto-fit`과 `auto-fill`의 차이는요?**
- **답**: 둘 다 "최소 폭 이상으로 들어갈 수 있는 만큼 열을 만든다"는 점은 같습니다. 차이는 카드가 열 수보다 적을 때 나타납니다. auto-fit은 빈 칸을 접어서 남은 공간을 카드들이 1fr로 나눠 가지므로 카드가 넓어지고, auto-fill은 빈 칸을 그대로 두어서 카드 크기가 유지되고 오른쪽이 비어 있습니다. 저는 필터로 카드가 1~2장만 남았을 때 화면이 비어 보이지 않도록 auto-fit을 썼는데, 카드가 너무 넓어지는 점은 취향에 따라 auto-fill이 나을 수도 있습니다. [직접 바꿔서 비교해 봤다면 그 결과를 덧붙이기]
- **코드**: `css/style.css › .projects__grid` / 변형 과제 V13

**Q12. `minmax(min(100%, 17.5rem), 1fr)`는 어떻게 읽나요?**
- **답**: 각 열의 폭은 최소 17.5rem 이상이고, 남는 공간은 1fr로 균등하게 나눈다는 뜻입니다. 안쪽의 `min(100%, 17.5rem)`은 컨테이너가 17.5rem보다 좁은 아주 작은 화면에서 최소 폭이 컨테이너를 넘어 가로 스크롤이 생기는 것을 막는 안전장치입니다. 덕분에 미디어 쿼리 없이도 화면 폭에 따라 1열, 2열, 3열로 알아서 바뀝니다.
- **코드**: `css/style.css › .projects__grid` / R3-5b (375px=1열, 768px=2열, 1280px=3열)

**Q13. 모바일 퍼스트가 뭔가요?**
- **답**: 기본 CSS를 가장 작은 화면(모바일) 기준으로 쓰고, 화면이 커질 때 `min-width` 미디어 쿼리로 필요한 스타일만 덧입히는 방식입니다. 모바일이 가장 단순한 레이아웃(1열, 햄버거 메뉴)이라 기본 코드가 짧아지고, 큰 화면에서 무엇이 달라지는지가 쿼리 안에 모여 읽기 쉽습니다. 반대로 `max-width`로 데스크톱에서 줄여 가는 방식은 덮어쓰는 코드가 많아지기 쉽습니다. 이 파일은 768px과 1024px 두 곳에서만 확장합니다.
- **코드**: `css/style.css › @media (min-width: 768px)`, `@media (min-width: 1024px)` / R3-6

**Q14. 브레이크포인트 768과 1024는 어떻게 정했나요?**
- **답**: 태블릿과 데스크톱의 흔한 경계값이자 과제의 기준값이라서 그대로 썼습니다. 다만 실무에서는 기기 폭보다 "콘텐츠가 어색해지는 지점"에서 나누는 것이 좋다고 알고 있습니다. 실제로 프로젝트 카드 격자는 미디어 쿼리 없이 auto-fit으로 처리한 것도 그 이유입니다. 그리고 768이라는 숫자가 CSS와 `nav.js`의 `matchMedia`에 중복되어 있어서, 바꿀 때 두 곳을 같이 고쳐야 하는 점은 개선하고 싶은 부분입니다. (CSS 변수는 미디어 쿼리 조건에 쓸 수 없습니다.)
- **코드**: `css/style.css › @media`, `js/nav.js › initNavigation › matchMedia` / V12

**Q15. CSS 변수를 왜 썼고, 다크 모드는 어떻게 동작하나요?**
- **답**: `:root`에 색, 간격, 폰트를 변수로 모으고 컴포넌트는 `var(--color-text)`처럼 변수만 참조합니다. 다크 모드는 `[data-theme="dark"]` 안에서 같은 이름의 변수 값만 다시 정의합니다. JS는 `<html>`에 `data-theme="dark"` 속성만 붙이면 되고, 색을 바꾸는 코드가 JS에는 하나도 없습니다. 수정 지점이 한 곳이라 색을 바꿀 때도 변수 값 하나만 고치면 됩니다. Sass 변수와 달리 CSS 변수는 브라우저에서 실행 중에 값이 바뀔 수 있어서 이런 방식이 가능합니다.
- **코드**: `css/style.css › :root, [data-theme="dark"]`, `js/theme.js › renderTheme` / V05

**Q16. `[data-theme="dark"]`가 `:root` 뒤에 있어야 하는 이유는?**
- **답**: 두 선택자의 우선순위(특이도)가 같아서, 나중에 선언된 쪽이 이깁니다. `<html data-theme="dark">`는 `:root`와 `[data-theme="dark"]` 둘 다에 해당하므로, 다크 규칙이 뒤에 있어야 라이트 값을 덮어씁니다. 순서를 바꾸면 다크 모드가 적용되지 않습니다.
- **코드**: `css/style.css` 상단 두 블록

**Q17. 애니메이션에 `opacity`와 `translate`만 쓴 이유는? `.card.reveal`은 왜 따로 있나요?**
- **답**: opacity와 이동(transform 계열)은 레이아웃을 다시 계산하지 않고 합성 단계에서 처리할 수 있어서 부드럽다고 알려져 있습니다. 그래서 width나 top 같은 속성은 애니메이션하지 않았습니다. `.reveal`은 `translate`라는 개별 속성을 써서 카드 hover의 `transform`과 충돌하지 않게 했습니다. 그런데 `.reveal`의 `transition`이 `.card`의 `transition`을 통째로 덮어쓰기 때문에, `.card.reveal`에서 두 목록을 합쳐 다시 선언했습니다.
- **코드**: `css/style.css › .reveal, .card, .card.reveal` / 개념 노트 2장

**Q18. 고정 헤더에 섹션 제목이 가려지는 문제는 어떻게 해결했나요?**
- **답**: 헤더가 `position: sticky`로 화면 위에 붙어 있어서, 앵커로 이동하면 섹션의 위쪽이 헤더에 가려집니다. `section[id]`에 `scroll-margin-top: var(--header-height)`를 줘서 이동 위치를 헤더 높이만큼 내렸습니다. `scrollIntoView`도 이 값을 따릅니다. 자동 점검 R5-2가 이동 후 섹션이 헤더 높이(4rem=64px) 아래에 놓이는지 확인합니다.
- **코드**: `css/style.css › section[id], --header-height` / R5-2

**Q19. Hero의 `100svh`는 뭔가요? `100vh`와 뭐가 다른가요?**
- **답**: 모바일 브라우저는 주소창이 보였다 사라졌다 해서 화면 높이가 변합니다. `100vh`는 주소창이 접힌 큰 화면 기준이라 주소창이 보일 때 아래쪽이 잘릴 수 있고, `100svh`(small viewport height)는 주소창이 보이는 작은 화면 기준이라 처음부터 화면 안에 들어옵니다. 비교적 최신 브라우저에서 지원되는 단위로 알고 있고, 구형 브라우저용 대체값은 넣지 않았습니다.
- **코드**: `css/style.css › .hero`

### 4-3. 목표 ③ DOM과 이벤트 (개념 노트 9~10장, 14장)

**Q20. `querySelector`로 DOM을 선택하고 `addEventListener`로 이벤트를 연결하는 흐름을 설명해 주세요.**
- **답**: 다크 모드 버튼을 예로 들면, `document.querySelector('#theme-toggle')`로 요소를 찾고 `addEventListener('click', 핸들러)`로 클릭에 함수를 연결합니다. 핸들러 안에서 `setTheme`을 부르면 상태(`themeState.theme`)가 바뀌고, 그 안에서 `renderTheme`이 `<html>`의 `data-theme`를 갱신합니다. 정리하면 "요소를 찾는다 → 이벤트를 연결한다 → 핸들러가 상태를 바꾼다 → 화면이 바뀐다"입니다. 이 연결은 페이지가 로드된 뒤 `main.js`가 `initTheme`을 호출할 때 한 번 만들어집니다.
- **코드**: `js/theme.js › initTheme → setTheme → renderTheme`, `js/main.js`

**Q21. HTML에 `onclick`을 쓰지 않고 `addEventListener`를 쓴 이유는요?**
- **답**: `onclick` 속성을 쓰면 구조(HTML)와 동작(JS)이 섞여서 어디서 무슨 일이 일어나는지 찾기 어렵습니다. `addEventListener`는 동작을 JS 파일에서만 관리하고, 같은 이벤트에 여러 리스너를 붙일 수 있으며, `passive` 같은 옵션도 줄 수 있습니다. 이 프로젝트의 `index.html`에는 `on`으로 시작하는 속성이 하나도 없고, HTML은 `id`와 `data-*` 속성으로 JS가 찾을 이름만 제공합니다.
- **코드**: `index.html`(on* 속성 없음), `js/*.js › addEventListener` / R4-3

**Q22. 이벤트 위임을 왜 썼나요?**
- **답**: `projects.js`는 화면을 다시 그릴 때마다 `innerHTML`로 버튼('다시 시도', 필터)을 새로 만듭니다. 새로 만든 버튼에 리스너를 직접 붙이면 다시 그릴 때마다 사라져서 매번 다시 붙여야 합니다. 그래서 사라지지 않는 부모(`#projects-status`, `#project-filters`)에 리스너를 하나만 달고, 자식에서 버블링되어 올라온 클릭을 `event.target.closest('[data-action="retry"]')`로 판별합니다. 버튼 안의 자식 요소를 눌러도 `closest`가 가장 가까운 버튼을 찾아 줍니다.
- **코드**: `js/projects.js › initProjects` / 개념 노트 10장

**Q23. scroll 이벤트에서 `requestAnimationFrame`은 왜 썼나요? `passive`는요?**
- **답**: scroll 이벤트는 스크롤하는 동안 초당 수십 번 발생하는데, 매번 계산하면 낭비입니다. 첫 이벤트에서 `isTicking`을 true로 잠그고 `requestAnimationFrame`으로 다음 화면 갱신 직전에 `render`를 한 번만 실행한 뒤 잠금을 풉니다. 결과적으로 프레임당 최대 한 번만 계산합니다. `{ passive: true }`는 핸들러에서 `preventDefault`를 호출하지 않겠다는 약속이라, 브라우저가 핸들러의 결과를 기다리지 않고 스크롤을 바로 진행할 수 있습니다.
- **코드**: `js/effects.js › initScrollEffects`

**Q24. `preventDefault()`는 어디에 왜 썼나요?**
- **답**: 두 곳입니다. 폼 submit에서는 기본 동작인 페이지 새로고침(과 주소 이동)을 막아서 검증과 화면 갱신을 JS가 처리하게 했습니다. 앵커 링크 click에서는 브라우저의 즉시 점프를 막고 `scrollIntoView`로 부드럽게 이동시켰습니다. 기본 동작을 막는 것은 "그 이후를 내가 책임진다"는 뜻이라서, 주소창 해시 갱신과 포커스 이동까지 직접 챙겼습니다.
- **코드**: `js/form.js › initContactForm(submit)`, `js/nav.js › initSmoothScroll` / R4-6

**Q25. 폼에서 `focus`가 아니라 `focusout`을 쓴 이유는요?**
- **답**: `focus`와 `blur`는 버블링되지 않아서 form 하나에 리스너를 달아 모든 입력창을 처리(위임)할 수 없습니다. `focusin`과 `focusout`은 버블링됩니다. 그래서 form에 `focusout` 리스너 하나로 세 필드를 처리했고, 필드를 떠나는 순간부터 그 필드의 에러를 보여 주도록 `touched` 상태를 바꿉니다.
- **코드**: `js/form.js › initContactForm`

**Q26. `classList.toggle`의 두 번째 인자는 뭔가요? 스타일을 JS로 직접 안 바꾸고 클래스를 토글하는 이유는요?**
- **답**: `toggle(클래스, 조건)`은 조건이 true면 추가하고 false면 제거합니다. if/else 없이 "스크롤 위치 ≥ 60"이라는 상태와 클래스를 항상 일치시킬 수 있습니다. `element.style`로 직접 바꾸지 않은 이유는, 모양은 CSS에 두고 JS는 상태만 전달하는 역할 분리 때문입니다. 그러면 transition, 다크 모드, 반응형 규칙을 그대로 재사용할 수 있고 디자인 수정이 CSS 파일 한 곳에서 끝납니다. 과제의 제약(인라인 스타일 금지)이기도 합니다.
- **코드**: `js/effects.js › initScrollEffects › render` / R5-1, C-2

**Q27. Intersection Observer가 뭔가요? scroll 이벤트 대신 쓴 이유는요?**
- **답**: 요소가 화면(뷰포트)에 들어왔는지를 브라우저가 알려 주는 API입니다. scroll 이벤트로 매번 요소 위치를 계산하지 않아도 되고, 조건이 바뀔 때만 콜백이 호출됩니다. 저는 등장 애니메이션에 써서 `data-reveal` 요소가 20% 보이면 `is-visible` 클래스를 붙이고, `unobserve`로 관찰을 끝냅니다. 반대로 "스크롤이 몇 px인가"가 조건인 헤더 배경과 맨 위로 버튼은 위치 값이 필요해서 scroll 이벤트를 썼습니다.
- **코드**: `js/effects.js › initRevealOnScroll, observeReveal` / 개념 노트 14장

**Q28. threshold를 0.2로 한 이유는요?**
- **답**: threshold는 요소가 얼마나 보였을 때 콜백을 부를지 정하는 비율입니다. 0이면 1px만 보여도 시작해서 사용자가 애니메이션을 놓치기 쉽고, 1이면 전부 보여야 해서 화면보다 큰 요소는 영원히 시작하지 않을 수 있습니다. 20%는 "확실히 들어왔고 아직 애니메이션이 보이는" 절충이며 과제의 기준값이기도 합니다. [config.js에서 0.8이나 0으로 바꿔 차이를 관찰해 봤다면 그 결과를 덧붙이기]
- **코드**: `js/config.js › revealThreshold` / V14

**Q29. 햄버거 메뉴는 어떻게 동작하고, 언제 닫히나요?**
- **답**: 버튼 click에서 `menu.classList.toggle('active')`를 호출하고, 그 반환값(붙었는지)으로 X 아이콘, `aria-expanded`, `aria-label`을 맞춥니다. 열고 닫는 모양은 CSS의 `.nav__menu.active`가 담당합니다. 메뉴는 바깥을 누르거나, `Esc`를 누르거나, 메뉴 링크를 누르거나, 화면이 768px 이상으로 넓어지면 닫힙니다. `Esc`로 닫을 때는 포커스를 버튼으로 돌려줘서 키보드 사용자가 길을 잃지 않게 했습니다.
- **코드**: `js/nav.js › initNavigation, syncToggleButton`, `css/style.css › .nav__menu.active` / R5-1

**Q30. 부드러운 스크롤은 CSS만으로 되는데 왜 JS로 다시 처리했나요?**
- **답**: CSS의 `scroll-behavior: smooth`만으로도 앵커 이동은 부드럽습니다. JS를 더한 이유는 부가 동작 때문입니다. 동작 줄이기 설정이면 즉시 이동하고, 이동 후 `history.pushState`로 주소창 해시를 갱신해 링크 공유와 뒤로 가기가 자연스럽고, 이동한 섹션으로 포커스를 옮겨 키보드 사용자가 이어서 탐색할 수 있으며, 모바일 메뉴도 함께 닫습니다.
- **코드**: `js/nav.js › initSmoothScroll` / R5-2

**Q31. 타자기 효과는 `while (true)`인데 왜 화면이 안 멈추나요?**
- **답**: 무한 루프처럼 보이지만 `await sleep(70)`에서 매번 제어권을 브라우저에 돌려주므로 화면이 멈추지 않습니다. `sleep`은 `setTimeout`을 Promise로 감싼 함수입니다. 동작 줄이기 설정이면 바로 return해서 HTML의 정적 문구가 그대로 보이고, 스크린리더에는 타이핑 문구를 `aria-hidden`으로 숨기고 대신 `visually-hidden` 문장을 읽게 했습니다.
- **코드**: `js/effects.js › initTypingEffect`, `js/utils.js › sleep`, `index.html › .hero__role`

### 4-4. 목표 ④ ES6+ 문법 (개념 노트 7~8장)

**Q32. 화살표 함수는 왜 필요한가요? `function`과 어떻게 나눠 썼나요?**
- **답**: 콜백처럼 짧은 함수를 간결하게 쓰기 위해서입니다. 예를 들어 `data.filter(({ fork }) => !fork)`처럼 조건을 한 줄로 표현하고, 중괄호가 없는 본문은 값을 바로 반환합니다. 화살표 함수는 자기 `this`를 갖지 않고 바깥 것을 물려받는다는 차이도 있지만, 이 프로젝트는 `this`를 쓰지 않습니다. 반대로 `initTheme`, `renderProjects`처럼 이름이 있는 큰 동작 단위는 `function` 선언으로 써서 스택 트레이스에 이름이 보이게 했고, 작은 변환과 콜백은 화살표 함수로 썼습니다.
- **코드**: `js/projects.js › loadProjects, toProject`, `js/theme.js › initTheme` / R7-1

**Q33. 구조분해 할당은 왜 쓰고, 어디에 썼나요?**
- **답**: 객체나 배열에서 필요한 값을 꺼내 변수로 만드는 문법입니다. `toProject`는 GitHub 응답의 수십 개 필드 중 필요한 것만 매개변수 자리에서 꺼내고, `html_url: url`처럼 이름도 바꾸며, `description ?? ''`처럼 기본값도 줍니다. 이벤트 처리에서는 `const { name, value } = event.target`처럼 씁니다. 매번 `event.target.name`을 반복해 쓰는 것보다 읽기 쉽고, 어떤 값을 쓰는지가 함수 첫머리에 드러납니다.
- **코드**: `js/projects.js › toProject`, `js/form.js › initContactForm`, `js/effects.js › render (const { scrollY } = window)` / R7-3

**Q34. `map`과 `filter`는 왜 쓰나요? `for`나 `forEach`와 뭐가 다른가요?**
- **답**: 반복문과 임시 배열 대신 "무엇을 하려는지"가 드러나기 때문입니다. `loadProjects`에서 `filter`로 fork가 아닌 것만 남기고 `map`으로 카드에 필요한 모양으로 바꾸는 체이닝은 그 자체로 데이터 가공 순서를 보여 줍니다. 둘 다 원본 배열을 바꾸지 않고 새 배열을 돌려줍니다. `forEach`는 반환값이 없어서 클래스 토글처럼 "값을 만들지 않고 동작만 할 때" 쓰고, 새 배열이 필요하면 `map`을 씁니다.
- **코드**: `js/projects.js › loadProjects, renderProjectFilters`, `js/nav.js › initSmoothScroll(forEach)` / R7-4

**Q35. 템플릿 리터럴은 왜 썼나요?**
- **답**: 백틱과 `${}`로 문자열 안에 값을 끼워 넣고 여러 줄을 그대로 쓸 수 있습니다. 카드 HTML은 여러 줄이라 `+`로 이어 붙이는 것보다 실제 HTML 모양이 유지되어 읽기 쉽습니다. 다만 `${}`에 외부에서 온 값을 그대로 넣으면 안 되고 `escapeHtml`을 거쳐야 합니다. 이 부분이 템플릿 방식의 가장 큰 주의점입니다.
- **코드**: `js/projects.js › createProjectCard` / R7-2

**Q36. `var`를 안 쓰는 이유는요? `const`와 `let`은 어떻게 골랐나요?**
- **답**: `var`는 함수 스코프이고 호이스팅 때문에 선언 전에 접근해도 에러 없이 `undefined`가 되며 재선언도 허용되어 실수를 숨깁니다. `const`와 `let`은 블록 스코프라 범위가 예측 가능합니다. 기본은 `const`로 쓰고, 다시 대입해야 할 때만 `let`을 썼습니다(`isTicking`, `revealObserver`, `renderedFilterKey` 등). 참고로 `const`는 재할당만 막기 때문에 `themeState.theme = 'dark'`처럼 객체 내부는 바꿀 수 있습니다.
- **코드**: `js/*.js` 전체 / R4-2

**Q37. `??`와 `||`의 차이는요?**
- **답**: `??`는 왼쪽이 `null`이나 `undefined`일 때만 오른쪽 값을 씁니다. `||`는 `0`, 빈 문자열, `false`도 "없는 값"으로 취급합니다. 그래서 `language ?? '기타'`처럼 "값이 없을 때만" 기본값을 주고 싶을 때 `??`를 씁니다. 만약 별 개수 `0`에 `||`로 기본값을 줬다면 0이 다른 값으로 바뀌는 문제가 생길 수 있습니다.
- **코드**: `js/projects.js › toProject`, `js/form.js › renderContactForm`

### 4-5. 목표 ⑤ 비동기와 fetch (개념 노트 11장)

**Q38. 비동기가 뭐고, 왜 필요한가요?**
- **답**: 네트워크 응답처럼 오래 걸리는 작업을 기다리는 동안 다른 일을 할 수 있게 하는 방식입니다. 자바스크립트는 한 번에 하나의 코드만 실행하는데, 응답을 그 자리에서 기다리면 스크롤과 클릭을 포함한 화면 전체가 멈춥니다. `fetch`는 결과를 Promise로 돌려주고, `await`는 그 함수만 일시 정지시키고 브라우저는 다른 일을 계속하게 합니다. 응답이 오면 이어서 실행됩니다.
- **코드**: `js/projects.js › fetchRepos, loadProjects`

**Q39. `fetch`와 `async/await`로 데이터를 가져오는 흐름을 설명해 주세요.**
- **답**: `loadProjects`가 시작되면 status를 loading으로 바꿔 스피너를 그립니다. `fetchRepos`에서 URL을 만들어 `fetch`를 `await`하고, 응답이 ok인지 확인한 뒤 `response.json()`을 `await`해서 배열을 돌려줍니다. `loadProjects`는 이를 `filter`와 `map`으로 가공해 status를 success 또는 empty로 바꾸고, 중간에 예외가 나면 `catch`에서 error 상태로 바꿉니다. 상태가 바뀔 때마다 `renderProjects`가 화면을 다시 그립니다.
- **코드**: `js/projects.js › loadProjects → fetchRepos → toProject → setProjectsState → renderProjects` / R8-1

**Q40. `fetch`는 404에서 `catch`로 안 가는데, 어떻게 에러 처리했나요?**
- **답**: `fetch`는 네트워크 자체가 실패했을 때(오프라인, DNS 오류, 중단)만 reject하고, 서버가 404나 500을 돌려주면 성공으로 resolve합니다. 그래서 응답을 받은 직후 `response.ok`(상태 코드 200~299)를 직접 확인하고, 아니면 `status`를 담은 Error를 던집니다. 그러면 `catch`에서 `describeError`가 status에 따라 403과 429는 요청 한도, 404는 사용자를 찾을 수 없음, 그 외는 상태 코드 안내로 문구를 나눕니다. 이 처리를 안 하면 오류 응답의 JSON을 카드로 그리려다 엉뚱한 곳에서 실패합니다.
- **코드**: `js/projects.js › fetchRepos (if (!response.ok))`, `describeError` / R8-4 / 시연: 3장 10단계

**Q41. `try/catch/finally`를 이렇게 쓴 이유는요?**
- **답**: `catch`는 요청 중 발생하는 모든 실패를 한곳에서 error 상태로 바꾸기 위해 썼습니다. `fetchRepos`의 `finally`는 성공하든 실패하든 타임아웃 타이머(`clearTimeout`)를 정리하기 위한 것입니다. 정리하지 않으면 이미 끝난 요청에 불필요한 타이머가 남습니다. `loadProjects`의 `catch`에서는 `repos`를 비우고 `errorMessage`를 채워 에러 상태로 전환합니다.
- **코드**: `js/projects.js › fetchRepos(finally), loadProjects(catch)` / R8-6

**Q42. `AbortController`로 타임아웃을 건 이유는요?**
- **답**: `fetch`에는 타임아웃 옵션이 없습니다. 응답이 오지 않으면 스피너가 영원히 도는 문제가 생겨서, `AbortController`를 만들어 signal을 fetch에 넘기고 `setTimeout`으로 10초 뒤 `abort()`를 부릅니다. 중단되면 fetch가 `AbortError`라는 이름의 에러로 실패하고, `describeError`가 "응답이 너무 늦어 요청을 중단했습니다"라는 문구를 고릅니다. 시간은 `config.js`의 `requestTimeoutMs`에 있습니다.
- **코드**: `js/projects.js › fetchRepos, describeError`, `js/config.js` / V15

**Q43. 로딩 / 성공 / 에러 / 빈 상태를 UI로 어떻게 표현했나요?**
- **답**: 화면 상태를 `projectsState.status` 하나로 관리합니다. `renderProjectsStatus`가 status를 `switch`로 보고, loading이면 스피너와 "로딩 중...", error면 원인 문구와 '다시 시도' 버튼, empty면 "표시할 프로젝트가 없습니다."를 그립니다. success일 때는 메시지 영역을 비우고 `renderProjectCards`가 카드를 그립니다. 로딩 중에는 카드 영역에 `aria-busy`를 켜고, 상태 영역은 `role="status" aria-live="polite"`라서 스크린리더에도 변화가 전달됩니다.
- **코드**: `js/projects.js › renderProjectsStatus, renderProjectCards`, `index.html › #projects-status` / R8-2 ~ R8-5

**Q44. 빈 상태와 에러 상태는 뭐가 다른가요?**
- **답**: 에러는 요청이나 처리가 실패한 것이고, 빈 상태는 요청은 성공했는데 보여 줄 게 없는 것입니다. 사용자가 할 수 있는 행동도 달라서, 에러에는 '다시 시도' 버튼을 주고 빈 상태에는 안내 문구만 줍니다. 이 사이트에서 빈 상태는 저장소가 0개이거나 fork만 있어서 걸러진 뒤 0개일 때 만들어집니다. (`repos.length > 0`이면 success, 아니면 empty)
- **코드**: `js/projects.js › loadProjects` / R8-5

**Q45. '다시 시도' 버튼을 연타하면 어떻게 되나요?**
- **답**: 두 겹으로 막혀 있습니다. `loadProjects`의 첫 줄이 status가 이미 'loading'이면 바로 return합니다. 또 클릭하는 순간 상태가 loading으로 바뀌고 `renderProjectsStatus`가 에러 박스를 스피너로 교체해서, 두 번째로 누를 버튼 자체가 사라집니다. 그래서 요청은 한 번만 갑니다. 자동 점검 R8-4b가 재시도 후 요청 횟수를 확인합니다.
- **코드**: `js/projects.js › loadProjects` (첫 줄) / R8-4b

**Q46. GitHub API 레이트 리밋에 걸리면 어떻게 되나요?**
- **답**: 인증 없이 부르면 IP당 시간당 60회 제한이 있어서, 넘으면 403(드물게 429)이 옵니다. 이 응답도 `response.ok`가 false라서 에러로 던져지고, `describeError`가 "요청 한도(인증 없이 시간당 60회)를 넘었습니다. 잠시 후 다시 시도해 주세요."라고 안내합니다. 대비책으로 응답을 `localStorage`에 잠깐 캐시할 수 있고, 토큰을 쓰면 한도가 늘지만 브라우저 코드에 토큰을 넣으면 누구나 볼 수 있어서 서버나 서버리스 함수를 거쳐야 합니다. 같은 와이파이를 쓰면 IP를 공유해 한도를 함께 소모할 수도 있습니다.
- **코드**: `js/projects.js › describeError` / V25 / 시연: 3장 11단계

**Q47. CORS가 뭔가요? 별도 서버 없이 어떻게 호출되나요?**
- **답**: 브라우저는 다른 출처(`api.github.com`)로 보낸 요청의 응답을, 서버가 허용(CORS 헤더)할 때만 페이지의 JS에 넘겨줍니다. GitHub API가 브라우저에서의 호출을 허용하기 때문에 별도 서버 없이 페이지에서 바로 `fetch`할 수 있습니다. 서버가 허용하지 않는 API라면 `fetch`가 실패하고, 그때는 서버를 거치는 프록시가 필요합니다.
- **코드**: `js/projects.js › fetchRepos` / 개념 노트 11장

**Q48. `await`를 빼먹으면 어떻게 되나요?**
- **답**: `fetch(...)`가 돌려주는 것은 응답이 아니라 Promise입니다. `await` 없이 쓰면 `response.ok`가 `undefined`가 되어 항상 실패 분기로 가는 등 엉뚱하게 동작하고, `response.json()`도 Promise 상태로 남습니다. `await`는 `async` 함수 안에서만 쓸 수 있어서 `fetchRepos`와 `loadProjects`를 `async`로 선언했습니다.
- **코드**: `js/projects.js › fetchRepos, loadProjects`

### 4-6. 목표 ⑥ 이벤트 → 상태 → DOM, React 연결 (개념 노트 12장)

**Q49. 이벤트 → 상태 변경 → DOM 업데이트가 연결되는 과정을 하나 골라 설명해 주세요.**
- **답**: 다크 모드로 설명하겠습니다. 버튼 click이 `setTheme`을 부르고, `setTheme`이 `themeState.theme`를 바꾸고, 사용자가 직접 고른 것이니 `localStorage`에 저장한 뒤 `renderTheme`을 호출합니다. `renderTheme`은 상태만 읽어서 `<html>`의 `data-theme`와 버튼의 `aria-pressed`를 갱신하고, CSS가 `data-theme`를 보고 변수 값을 바꿔 전체 색이 바뀝니다. 이벤트가 상태를 바꾸고, 렌더링 함수가 상태를 화면에 반영한다는 세 단계가 분리되어 있습니다.
- **코드**: `js/theme.js › initTheme → setTheme → renderTheme` / R9-1

**Q50. React와 어떤 점이 연결되나요?**
- **답**: `setProjectsState(patch)`가 상태를 바꾼 뒤 곧바로 `renderProjects`를 호출하는 구조가 React의 `setState`와 같은 발상입니다. "화면은 상태의 결과이고, 화면을 직접 만지지 않고 상태를 바꾼다"는 선언적 UI의 기초입니다. 차이도 있습니다. 저는 렌더링 함수를 직접 부르고 `innerHTML`로 통째로 다시 그리지만, React는 렌더링 호출을 자동으로 하고 바뀐 부분만 DOM에 반영합니다. 상태가 늘수록 어디서 화면을 바꿨는지 추적하기 어려워지는 문제를 직접 겪었고, 그 해결책으로 React를 배울 이유가 생겼습니다.
- **코드**: `js/projects.js › setProjectsState, renderProjects` / 개념 노트 12장

**Q51. 상태를 객체 하나로 모은 이유는요?**
- **답**: 화면에 그려지는 모든 정보의 출처를 한 곳으로 만들기 위해서입니다. 디버깅할 때 Console에 `projectsState`만 찍어 보면 지금 화면이 왜 이렇게 보이는지 알 수 있습니다. 또 `isLoading`, `isError` 같은 불리언을 따로 두면 둘 다 true인 모순된 상태가 생길 수 있는데, `status` 문자열 하나(`idle`, `loading`, `success`, `empty`, `error`)로 두면 한 번에 하나의 상태만 가능합니다.
- **코드**: `js/projects.js › projectsState`, `js/form.js › contactState`

**Q52. 렌더링 함수를 세 개로 나눈 이유와, 필터 버튼을 매번 다시 안 만드는 이유는요?**
- **답**: 상태 메시지, 필터 버튼, 카드 목록은 관심사가 달라서 함수를 나눴고 `renderProjects`가 셋을 차례로 호출합니다. 필터 버튼은 매번 다시 만들면 키보드로 누른 버튼이 사라져 포커스를 잃습니다. 그래서 언어 목록이 바뀌었을 때만(`renderedFilterKey`로 비교) 버튼을 새로 만들고, 평소에는 `active` 클래스와 `aria-pressed`만 갱신합니다.
- **코드**: `js/projects.js › renderProjects, renderProjectFilters` / R8-*, B-1

**Q53. 폼 상태의 `touched`와 `submitted`는 뭔가요?**
- **답**: 폼 상태는 네 가지입니다. `errors`는 필드별 현재 에러, `touched`는 사용자가 이미 떠난 필드, `submitted`는 제출을 시도했는지, `success`는 마지막 제출이 성공했는지입니다. 처음부터 빨간 에러를 보여 주면 불친절해서, 에러 계산은 입력할 때마다 하되 화면에는 `touched`이거나 `submitted`일 때만 보여 줍니다. 그 판단이 `renderContactForm` 한 곳에 모여 있습니다.
- **코드**: `js/form.js › contactState, renderContactForm`

**Q54. 다크 모드가 새로고침해도 유지되는 원리는요?**
- **답**: 사용자가 토글을 누르면 `writeStorage`로 `localStorage`에 `theme` 키로 저장합니다. 다음에 페이지가 열릴 때 `getInitialTheme`이 저장값을 먼저 확인하고, 없을 때만 OS의 `prefers-color-scheme`을 따르고, 그것도 없으면 light입니다. 처음 값은 저장하지 않고(`persist: false`) 사용자가 직접 고른 것만 저장해서, 저장이 없는 동안은 OS 설정 변경을 따라갑니다. `localStorage` 접근은 사생활 보호 모드에서 예외가 날 수 있어서 `try/catch`로 감쌌습니다.
- **코드**: `js/theme.js › getInitialTheme, setTheme`, `js/utils.js › readStorage, writeStorage` / Application 탭 / R5-5, B-4 / 개념 노트 13장

**Q55. DOM을 직접 조작하는 방식의 한계는 무엇이고, 프레임워크가 왜 필요한가요?**
- **답**: 상태가 늘어나면 어느 코드가 어느 DOM을 바꾸는지 추적하기 어렵고, 상태를 바꾸고 렌더링 호출을 빼먹는 실수가 생깁니다. Console에서 `themeState.theme = 'dark'`만 하면 화면이 안 바뀌고 `renderTheme()`을 불러야 바뀌는 것이 그 예입니다. 또 `innerHTML`로 통째로 다시 그리면 바뀌지 않은 부분도 다시 만들고 포커스 같은 상태를 잃을 수 있어서, 저는 `renderedFilterKey` 같은 수동 최적화를 넣어야 했습니다. React 같은 도구는 "상태가 바뀌면 화면을 자동으로 맞춘다"를 대신해 주고 바뀐 부분만 반영합니다.
- **코드**: `js/projects.js › renderedFilterKey`, 3장 14단계 시연

**Q56. `Object.assign`으로 상태를 직접 고치는데, React의 불변성과는 다르지 않나요?**
- **답**: 맞습니다. `setProjectsState`는 `Object.assign`으로 기존 객체를 직접 수정합니다. React는 상태를 직접 고치지 않고 새 객체를 만들어 넘기고, 이전 값과 비교해 무엇이 바뀌었는지 판단합니다. 저는 상태를 바꾼 뒤 항상 전체를 다시 그리기 때문에 직접 수정해도 동작하지만, React의 방식은 아니라는 점을 알고 있습니다. 정렬 기능을 넣을 때 `[...visibleRepos].sort(...)`처럼 복사부터 하는 습관이 그 연습입니다.
- **코드**: `js/projects.js › setProjectsState` / V16

### 4-7. 접근성

**Q57. 접근성을 위해 어떤 것을 했나요?**
- **답**: 실제로 넣은 것을 말씀드리겠습니다. 본문 바로가기 링크(skip-link), 시맨틱 랜드마크와 제목 계층, label 연결, 키보드만으로 쓸 수 있는 기능(햄버거를 `Esc`로 닫기 포함), `:focus-visible` 포커스 표시, 상태를 알리는 aria 속성(`aria-expanded`, `aria-pressed`, `aria-invalid`, `aria-live`), 이미지 alt입니다. 그리고 동작 줄이기 설정(`prefers-reduced-motion`)을 CSS와 JS 양쪽에서 존중합니다. 다만 스크린리더로 실제로 전체를 확인해 본 범위는 [직접 해 본 만큼만 말하기. 안 해 봤다면 "아직 못 해 봤고 다음에 해 보려고 합니다"]입니다.
- **코드**: `index.html › .skip-link`, `css/style.css › :focus-visible, @media (prefers-reduced-motion)`, `js/utils.js › prefersReducedMotion`

**Q58. `aria-expanded`와 `aria-pressed`는 뭐가 다른가요?**
- **답**: `aria-expanded`는 "이 버튼이 제어하는 영역이 펼쳐졌는가"라서 햄버거 버튼에 쓰고, `aria-controls`로 대상(`#nav-menu`)을 알려 줍니다. `aria-pressed`는 켜짐/꺼짐을 가진 토글 버튼의 상태라서 다크 모드 버튼과 필터 버튼에 썼습니다. 다크 모드 버튼은 라벨을 "다크 모드"로 고정하고 `aria-pressed`만 바꿉니다. 라벨까지 바꾸면 상태가 이중으로 전달되어 혼란스럽기 때문입니다. 솔직히 햄버거 버튼은 `aria-expanded`와 라벨("메뉴 열기/닫기")을 둘 다 바꾸는데, 중복 안내가 될 수 있어 한쪽만 쓰는 편이 더 낫다는 의견도 있습니다.
- **코드**: `js/nav.js › syncToggleButton`, `js/theme.js › renderTheme`, `js/projects.js › renderProjectFilters`

**Q59. `role="status"`와 `aria-live="polite"`는 왜 넣었나요?**
- **답**: 화면 내용이 바뀌어도 스크린리더는 자동으로 읽어 주지 않습니다. 프로젝트 상태 영역(`#projects-status`)과 폼 결과(`#form-status`)에 `role="status" aria-live="polite"`를 줘서, 로딩 · 에러 · 성공 문구가 바뀔 때 지금 읽는 것을 끊지 않고 알리게 했습니다. 필드별 에러 문구는 live 영역이 아니라 `aria-describedby`로 입력창에 연결했고, 제출에 실패하면 첫 오류 필드로 포커스를 옮겨서 그 입력창의 설명으로 읽히게 했습니다.
- **코드**: `index.html › #projects-status, #form-status, #name-error`, `js/form.js › submit 핸들러`

**Q60. 키보드만으로 사용할 수 있나요? 포커스는 어떻게 관리했나요?**
- **답**: 모든 기능을 `button`과 `a` 같은 기본 포커스 가능 요소로 만들어서 `Tab`과 `Enter`로 동작합니다. 모바일 메뉴가 닫혀 있을 때는 `visibility: hidden`이라 `Tab` 순서에서 빠지고, 열면 들어옵니다. 앵커로 이동한 뒤에는 그 섹션에 `tabindex="-1"`을 주고 `focus({ preventScroll: true })`로 포커스를 옮기며, `Esc`로 메뉴를 닫으면 토글 버튼으로 포커스를 돌립니다. 필터 버튼을 다시 그리지 않는 것도 포커스 유지를 위해서입니다.
- **코드**: `js/nav.js › initNavigation, initSmoothScroll`, `css/style.css › .nav__menu, [tabindex="-1"]:focus`

**Q61. 동작 줄이기(`prefers-reduced-motion`)는 어떻게 처리했나요?**
- **답**: 움직임이 어지럼증을 유발하는 사용자가 있어서 OS 설정을 따릅니다. CSS는 `@media (prefers-reduced-motion: reduce)`에서 animation과 transition 시간을 거의 0으로 줄이고 `scroll-behavior`를 auto로 되돌립니다. JS는 `prefersReducedMotion()`으로 타자기 효과와 등장 애니메이션을 아예 건너뛰어서 모든 콘텐츠가 그냥 보이게 하고, 스크롤 이동도 즉시 이동으로 바꿉니다. 자동 점검 R3-10이 이 설정에서 숨겨진 요소가 없는지 확인합니다.
- **코드**: `css/style.css › @media (prefers-reduced-motion: reduce)`, `js/utils.js › prefersReducedMotion`, `js/effects.js › initRevealOnScroll, initTypingEffect` / R3-10

### 4-8. 보안, XSS

**Q62. 왜 `innerHTML`에 넣기 전에 `escapeHtml`을 거치나요?**
- **답**: `innerHTML`은 문자열을 HTML로 해석해서 넣기 때문에, GitHub에서 온 저장소 설명이 `<img src=x onerror=...>` 같은 문자열이면 실제 태그로 만들어져 스크립트가 실행될 수 있습니다(XSS). `escapeHtml`은 `& < > " '` 다섯 문자를 `&amp; &lt; &gt; &quot; &#39;`로 바꿔서 글자 그대로 보이게 합니다. 따옴표까지 바꾸는 이유는 속성값(예: `data-lang="…"`) 안에서 따옴표로 속성을 탈출하는 공격을 막기 위해서입니다. 자동 점검 SEC-1이 악성 문자열을 가짜 응답으로 넣어 실행되지 않는지 확인합니다.
- **코드**: `js/utils.js › escapeHtml`, `js/projects.js › createProjectCard, renderProjectsStatus` / SEC-1

**Q63. `toSafeUrl`과 `rel="noopener noreferrer"`는 왜 필요한가요?**
- **답**: `toSafeUrl`은 주소가 `http://` 또는 `https://`로 시작할 때만 통과시켜서 `javascript:` 같은 주소로 스크립트가 실행되는 것을 막습니다. 저장소의 `homepage` 값은 사용자가 입력하는 임의 문자열이라 특히 필요합니다. 외부 링크는 `target="_blank"`와 `rel="noopener noreferrer"`를 함께 써서, 새 탭이 `window.opener`로 원래 탭을 조작하지 못하게 합니다. 최신 브라우저는 기본으로 막기도 하지만 명시적으로 적었습니다.
- **코드**: `js/utils.js › toSafeUrl`, `js/projects.js › createProjectCard`, `index.html › footer 링크`

**Q64. `textContent`가 안전한데 왜 `innerHTML`을 썼나요?**
- **답**: `textContent`는 항상 글자로만 넣기 때문에 XSS에 안전하지만 태그 구조를 만들 수 없습니다. 카드 한 장이 `article`, `h3`, `a`, `ul` 등 여러 태그라서 템플릿 문자열이 읽기 쉬웠습니다. 대신 외부 값은 반드시 `escapeHtml`을 거치는 규칙을 지켜야 하고, 한 곳이라도 빠뜨리면 취약해진다는 단점을 알고 있습니다. 더 안전하게 하려면 `createElement`와 `textContent`로 만들거나 `<template>` 요소를 쓰는 방법이 있습니다. 푸터 연도처럼 텍스트만 바꿀 때는 `textContent`를 씁니다.
- **코드**: `js/effects.js › initFooterYear (textContent)`, `js/projects.js`

**Q65. API 키나 토큰을 코드에 넣어도 되나요?**
- **답**: 브라우저에서 실행되는 코드는 누구나 개발자 도구로 볼 수 있어서, 토큰이나 비밀 키를 넣으면 안 됩니다. 이 프로젝트는 인증이 필요 없는 공개 API만 사용합니다. 레이트 리밋 때문에 토큰이 필요해지면 서버나 서버리스 함수를 중간에 두고 토큰은 거기에 보관해야 합니다.
- **코드**: `js/config.js`(비밀 값 없음)

### 4-9. 성능

**Q66. 성능을 위해 고려한 점은 무엇인가요?**
- **답**: 외부 라이브러리와 웹폰트를 쓰지 않아 요청 수와 크기가 작습니다. 스크립트는 `defer`로 렌더링을 막지 않고, scroll 핸들러는 `requestAnimationFrame`과 `passive`로 가볍게 만들었으며, 등장 애니메이션은 scroll 대신 Intersection Observer를 썼습니다. 애니메이션은 opacity와 translate처럼 레이아웃을 다시 계산하지 않는 속성만 썼고, 이미지에는 width와 height를 줘서 레이아웃 이동을 줄였습니다. 저장소 목록은 `per_page=30`으로 제한했습니다. Lighthouse 같은 수치는 [제가 직접 측정한 값이 있을 때만] 말씀드리겠습니다. (측정하지 않았다면 "아직 측정하지 않았다"고 말하고 지어내지 않기)
- **코드**: `index.html › script defer`, `js/effects.js`, `css/style.css › .reveal`

**Q67. JS 파일을 8개로 나누면 요청이 늘어 느려지지 않나요?**
- **답**: 요청 수는 늘지만 파일이 각각 작고, 브라우저가 동시에 내려받은 뒤 `defer`로 순서대로 실행합니다. GitHub Pages가 HTTP/2를 쓰는 것으로 알고 있어 체감 차이는 작을 것으로 봅니다. 실제 영향은 Network 탭의 Waterfall로 볼 수 있고, Protocol 열(우클릭으로 표시)에서 h2 여부를 확인할 수 있습니다. 성능이 더 중요해지면 번들러로 합치고 압축하는 단계가 필요하지만, 이번에는 읽기 쉽게 파일을 나누는 것을 우선했습니다.
- **코드**: `index.html › script defer 8개`

**Q68. 카드가 수백 개라면 지금 방식은 괜찮을까요?**
- **답**: 지금은 필터를 누를 때마다 카드 전체를 `innerHTML`로 다시 만들기 때문에 수백 개가 되면 비효율적입니다. 이 프로젝트는 `per_page=30`으로 제한해서 문제가 없습니다. 개선한다면 페이지네이션이나 '더 보기'로 한 번에 그리는 수를 제한하거나, 바뀐 카드만 갱신하는 방식(키 기반 비교)이 필요하고, 그 문제를 자동으로 풀어 주는 것이 React의 가상 DOM 같은 도구라고 이해하고 있습니다.
- **코드**: `js/projects.js › renderProjectCards, fetchRepos(per_page)`

### 4-10. 배포, Git

**Q69. 어떻게 배포했나요?**
- **답**: GitHub 저장소의 `Settings → Pages`에서 Deploy from a branch로 `main` 브랜치의 루트(`/`)를 선택했습니다. 빌드 과정이 없는 정적 파일이라 저장소 그대로 `https://<아이디>.github.io/<저장소이름>/` 주소로 서비스됩니다. 푸시하면 잠시 뒤 반영됩니다. 배포 후에는 배포 URL에서 실제 GitHub API 응답으로 내 저장소 카드가 뜨는지 다시 확인했습니다. 자동 점검 도구는 그 부분(R10-5, R10-6)을 확인하지 못해서 수동으로 봤습니다.
- **코드**: `README.md › 배포` / 개념 노트 15장

**Q70. 왜 경로를 상대 경로로 썼나요?**
- **답**: GitHub Pages의 프로젝트 사이트는 `/저장소이름/` 아래에서 서비스됩니다. `href="/css/style.css"`처럼 슬래시로 시작하는 절대 경로를 쓰면 도메인 루트에서 파일을 찾아서 못 찾습니다. `css/style.css`처럼 상대 경로를 쓰면 현재 문서 위치를 기준으로 찾아서 로컬과 배포 환경 모두에서 동작합니다.
- **코드**: `index.html › link, script, img 경로` / R1-2

**Q71. 수정했는데 배포된 페이지에 반영이 안 되면 어떻게 확인하나요?**
- **답**: 원인을 나눠서 봅니다. 먼저 푸시가 됐는지, GitHub의 Pages 배포 상태가 끝났는지 봅니다. 그다음 브라우저 캐시를 의심해서 하드 리로드(`Ctrl+Shift+R`)나 시크릿 창으로 다시 엽니다. 배포에는 몇 분이 걸릴 수 있습니다. 참고로 저장소에 `.nojekyll` 파일이 있는데, Jekyll 처리를 건너뛰라는 표시 파일로 흔히 두는 것으로 알고 있습니다.
- **코드**: `.nojekyll`, `README.md › 배포`

**Q72. Git은 어떻게 사용했나요?**
- **답**: [본인이 실제로 한 방식으로 답하기]. 예: "기능이나 학습 단위로 나눠 커밋했고, 변형 과제 같은 실험은 별도 브랜치에서 해 본 뒤 버렸으며, `main`에는 확인이 끝난 것만 두었습니다. 커밋 메시지는 무엇을 왜 바꿨는지 한 줄로 적으려 했습니다." 실제로 하지 않은 것은 말하지 않습니다. 커밋 이력을 열어 보라는 요청이 있으면 `git log --oneline`으로 바로 보여 줄 수 있어야 합니다.
- **코드**: `git log --oneline`, `git status`

### 4-11. 설계 결정: "왜 A 대신 B?"

**Q73. 왜 React 대신 순수 JavaScript로 만들었나요?**
- **답**: 과제의 제약이기도 했지만, 저는 '이벤트 → 상태 → 화면' 원리를 라이브러리가 감춰 주기 전에 직접 구현해 보고 싶었습니다. 그래서 React가 자동으로 해 주는 일, 즉 렌더링 호출과 DOM 갱신이 무엇인지 알게 됐습니다. 다음에 React를 배울 때 무엇이 왜 편해지는지 구체적으로 비교할 수 있습니다.
- **코드**: `js/projects.js › setProjectsState`, `js/theme.js` / 개념 노트 12장

**Q74. 왜 Bootstrap이나 Tailwind 같은 CSS 프레임워크를 안 썼나요?**
- **답**: 프레임워크 CSS는 빠르게 결과를 얻지만 내부 동작을 감춥니다. 이번에는 Flexbox, Grid, CSS 변수, 미디어 쿼리를 직접 써 보는 것이 목적이라 쓰지 않았습니다. 대신 색과 간격을 변수(디자인 토큰)로 모아 일관성을 얻었고, 컴포넌트 이름은 `.card`, `.btn`, `.chip`처럼 역할 중심으로 지었습니다.
- **코드**: `css/style.css › :root` / C-1

**Q75. 왜 ES 모듈(`import`/`export`) 대신 전역 스크립트로 나눴나요?**
- **답**: 모듈을 쓰면 전역 이름 충돌과 로드 순서 의존이 사라지는 장점이 있습니다. 이 프로젝트는 파일 수가 적고 학습 단계를 고려해서, `defer` 순서에 의존하는 단순한 방식을 택했습니다. 단점은 같은 이름의 최상위 `const`를 두 파일에서 선언하면 에러가 난다는 것과, `index.html`의 스크립트 순서를 바꾸면 깨진다는 것입니다. `type="module"`은 `file://`로 직접 열면 브라우저에 따라 막히는 경우가 있어 서버(Live Server)가 필요한 것으로 알고 있고, React 같은 환경으로 옮기면 자연스럽게 모듈을 쓰게 됩니다.
- **코드**: `index.html › script defer`, `js/main.js`

**Q76. `data-*` 속성과 class는 어떻게 구분해 썼나요?**
- **답**: class는 스타일을 위한 이름이고, `data-*` 속성(`data-reveal`, `data-filter`, `data-action`)은 JS가 찾는 동작용 이름으로 나눴습니다. 그러면 디자인 때문에 클래스 이름을 바꿔도 JS가 깨지지 않습니다. `data-filter="JavaScript"`처럼 값을 실을 수도 있어서 JS에서는 `element.dataset.filter`로 읽습니다.
- **코드**: `index.html › [data-reveal]`, `js/projects.js › [data-filter], [data-action="retry"]`

**Q77. 기준값을 `config.js`에 모은 이유는요?**
- **답**: 60, 300, 0.2, 사용자 이름, 타임아웃, 저장 키를 코드 여기저기에 숫자로 흩어 두면 바꿀 때 놓치기 쉽습니다. 한 파일에 모으고 `Object.freeze`로 실수로 바뀌는 것을 막았습니다. 다만 `freeze`는 얕은 동결이라 배열(`typingPhrases`) 내부까지 막지는 않습니다. 또 한계도 있는데, `index.html`의 GitHub 링크(푸터, noscript)에는 아이디가 직접 적혀 있어서 `CONFIG`만 바꾸면 그 링크는 안 바뀝니다.
- **코드**: `js/config.js › CONFIG`, `index.html › 푸터 링크` / README 기준값 표

**Q78. `localStorage`, `sessionStorage`, 쿠키는 뭐가 다르고 왜 `localStorage`를 골랐나요?**
- **답**: `localStorage`는 브라우저를 닫아도 남고 서버로 자동 전송되지 않아서, 테마처럼 서버가 몰라도 되는 화면 설정에 적합합니다. `sessionStorage`는 탭을 닫으면 사라지고, 쿠키는 요청마다 서버로 전송되어 로그인처럼 서버가 알아야 하는 정보에 씁니다. 테마는 화면 설정이라 `localStorage`를 골랐습니다.
- **코드**: `js/utils.js › readStorage, writeStorage` / 개념 노트 13장

**Q79. `axios` 대신 `fetch`를 쓴 이유는요? `.then` 대신 `async/await`는요?**
- **답**: `fetch`는 브라우저에 내장되어 있어서 의존성이 없습니다. `axios`는 편의 기능이 많지만 라이브러리를 추가해야 하고, 기본적으로 HTTP 오류 상태에서 예외를 던지는 것으로 알고 있어서 `fetch`와 다르다는 점을 이해해 두었습니다. `async/await`는 코드가 위에서 아래로 읽혀서 흐름이 보이고, `try/catch`를 그대로 쓸 수 있어서 `.then` 체인보다 에러 처리가 명확했습니다.
- **코드**: `js/projects.js › fetchRepos, loadProjects`

### 4-12. 한계와 정직성

**Q80. 테마 깜빡임(FOUC)은 없나요?**
- **답**: 있을 수 있습니다. 모든 스크립트를 `defer`로 로드하기 때문에, HTML이 그려진 뒤에 `theme.js`가 실행되어 `data-theme`를 붙입니다. 저장된 테마가 다크인 사용자는 첫 화면이 아주 잠깐 라이트로 보였다가 바뀔 수 있고, body에 배경색 transition이 있어서 그 전환이 살짝 보일 수도 있습니다. [직접 재현해 본 결과를 덧붙이기] 해결 방법은 `<head>`에서 화면이 그려지기 전에 실행되는 아주 작은 인라인 스크립트로 `data-theme`를 먼저 지정하는 것입니다. 다만 그러면 "모든 스크립트를 defer로 로드"라는 규칙(자동 점검 R4-1)과 충돌할 수 있어서, 과제 요구사항과 어떻게 조율할지 확인이 필요합니다.
- **코드**: `js/theme.js › initTheme`, `index.html › script defer`, `css/style.css › body(transition)` / README 알려진 한계

**Q81. 문의 폼은 실제로 전송되나요?**
- **답**: 아니요. 데모 폼입니다. 검증과 성공 메시지까지만 구현했고 실제로 전송하지 않으며, 성공 메시지에도 그렇게 적어 두었습니다. 보너스로 Formspree나 EmailJS 같은 서비스를 연동할 수 있고, 그때는 `fetch`로 POST를 보내고 전송 중 · 성공 · 실패 상태를 `projectsState`처럼 추가하면 됩니다. 스팸과 키 노출, 사용량 제한은 함께 고려해야 합니다.
- **코드**: `js/form.js › initContactForm(submit)`, `README.md › 알려진 한계`

**Q82. 이 코드를 직접 작성한 건가요?**
- **답**: 사실 그대로 말합니다. 과정 규정에서 정한 방식대로 밝히면 됩니다. 예: "이 코드는 AI 도구의 도움을 받은 초안에서 출발했습니다. 저는 [파일/함수]를 직접 다시 써 보고, [변형 과제]를 바꿔 보면서 동작을 이해하려고 했습니다. 지금 이 부분을 열어서 설명하고 바꿔 보겠습니다." 중요한 것은 규정이 허용하는 범위를 미리 확인해 두는 것(학습 로드맵 5장)과, 이해한 만큼만 말하는 것입니다. 사실과 다르게 말하지 마세요.
- **코드**: 평가자가 고른 아무 함수. "왜 이렇게 썼는지" 답할 수 있는 곳으로

**Q83. 자동 점검 결과(PASS)를 믿어도 되나요?**
- **답**: 보조 근거일 뿐 코드 이해를 대신하지 못합니다. 정적 검사는 파일 내용을 정규식으로 보는 간이 점검이고, 브라우저 검사는 Playwright로 Chromium을 띄우되 GitHub API를 가짜 응답으로 대체합니다. 그래서 인터넷이나 레이트 리밋과 무관하게 네 가지 상태를 재현할 수 있다는 장점이 있지만, 반대로 실제 API 응답, 다른 브라우저, 스크린리더, 배포 환경은 확인하지 못합니다. 배포 URL 동작(R10-5)과 실제 응답(R10-6)은 제가 직접 확인했습니다.
- **코드**: `tools/verify.js`, `tools/lib.js` / 10장

**Q84. JavaScript가 꺼져 있으면 어떻게 되나요?**
- **답**: 콘텐츠는 대부분 보입니다. 스크롤 등장 애니메이션은 JS가 `.reveal` 클래스를 붙여야 숨겨지는 구조라서, JS가 없으면 숨겨지지 않고 그냥 보입니다. Projects 영역에는 `<noscript>` 안내와 GitHub 링크를 넣었습니다. 한계는 모바일 폭에서 메뉴가 JS 없이는 열리지 않는다는 점입니다. 모바일에서는 메뉴가 `visibility: hidden`이고 열기는 JS가 하기 때문에, 스크롤로는 이동할 수 있어도 메뉴로는 이동할 수 없습니다.
- **코드**: `index.html › noscript`, `js/effects.js › observeReveal`, `css/style.css › .nav__menu`

**Q85. 구형 브라우저에서도 동작하나요?**
- **답**: 최신 Chrome 기준으로 확인했습니다. `:has()` 선택자, `translate` 속성, `100svh`, `scroll-margin` 같은 비교적 최근 기능을 쓰고 대체 코드는 넣지 않았습니다. `:has()`는 모바일 메뉴가 열려 있을 때 헤더 배경을 채우는 규칙(`.site-header:has(.nav__menu.active)`) 한 곳에만 쓰고, 스크롤 배경 규칙(`.site-header.scrolled`)과 일부러 분리했습니다. 선택자 목록에 모르는 선택자가 하나라도 섞이면 규칙 전체가 무시되는 것으로 알고 있어서, 미지원 브라우저에서도 스크롤 배경은 동작하고 메뉴 열림 배경만 빠지게 하려는 것입니다. 지원 범위를 더 넓히려면 `@supports selector(:has(*))` 같은 기능 쿼리를 쓸 수 있습니다.
- **코드**: `css/style.css › .site-header.scrolled`, `.site-header:has(.nav__menu.active)`, `README.md`

**Q86. 이 프로젝트에서 가장 아쉬운 점은 무엇인가요?**
- **답**: 세 가지를 꼽겠습니다. 첫째, 테마 첫 화면 깜빡임처럼 실제 사용 경험에서 보이는 부분을 아직 해결하지 못했습니다. 둘째, 상태를 바꾸고 화면을 그리는 코드를 직접 호출하고 통째로 다시 그리는 방식이라 규모가 커지면 관리가 어렵습니다. 셋째, 자동 점검은 Chromium과 가짜 응답 기준이라 실제 환경 검증이 더 필요합니다. 개선한다면 스크롤스파이 추가, 응답 캐시, 폼 실제 전송, 그리고 React로 같은 페이지를 다시 만들어 보는 순서로 진행하고 싶습니다.
- **코드**: 6장 "알려진 한계와 개선 아이디어"

---

## 5. 모르는 질문과 라이브 코딩 요청에 대응하기

### 5-1. 모르는 질문을 받았을 때

**정직하게 인정하고 → 아는 범위에서 추론하고 → 코드나 DevTools로 함께 확인한다.** 이 세 단계가 얼버무리는 것보다 훨씬 좋은 인상을 줍니다.

| 단계 | 하는 일 | 이렇게 말한다 (예시) |
| --- | --- | --- |
| 1. 질문 확인 | 질문을 내 말로 되짚어 시간을 벌고 오해를 막는다 | "제가 이해한 질문은 '~하면 어떻게 되는가'인데, 맞을까요?" |
| 2. 정직하게 인정 | 모르는 부분을 분명히 말한다 | "그 부분은 제가 정확히 알지 못합니다." |
| 3. 아는 범위에서 추론 | 아는 것에서 출발해 가설을 세운다 | "다만 제가 아는 것은 ~이고, 그렇다면 ~일 것 같습니다." |
| 4. 함께 확인 | 코드, Console, DevTools로 검증을 제안한다 | "지금 Console에서 바로 실행해 확인해 봐도 될까요?" (자료 검색이 허용되는지는 평가자에게 물어본다) |
| 5. 기록 | 결과를 정리하고, 나중에 다시 보기로 한다 | "확인해 보니 ~였습니다. 이 부분은 평가 후에 개념 노트로 다시 정리하겠습니다." |

**어떤 질문에도 쓰는 3단 프레임: 정의 → 이 프로젝트에서의 예 → 코드 위치.**
예: "이벤트 위임이 뭔가요?" → (정의) 자식마다 리스너를 달지 않고 부모 하나에서 버블링된 이벤트를 받아 처리하는 방식입니다. → (예) 프로젝트 카드 영역의 다시 시도 버튼과 필터 버튼입니다. → (위치) `js/projects.js › initProjects`.

**피할 것**
- 모르면서 아는 척 지어내기 (꼬리 질문 한 번에 무너집니다)
- 아무 말 없이 오래 침묵하기 (생각 중이라고 소리 내어 말하세요)
- "AI가 짰어요" 하고 끝내기 (사실이라도 그 뒤에 이해한 내용이 붙어야 합니다)
- 방어적으로 반응하기 (틀린 지적이라도 먼저 "그렇게 볼 수도 있겠네요"로 시작)

**틀린 답을 한 뒤 알아차렸을 때**: 바로 정정하는 편이 낫습니다. "앞에서 ~라고 말씀드렸는데, 다시 생각해 보니 ~가 맞는 것 같습니다."

### 5-2. 라이브 코딩 요청에 대응하는 순서

"이 부분을 이렇게 바꿔 보세요"라는 요청은 코드를 **찾고, 예측하고, 확인하고, 설명하는** 능력을 봅니다. 결과가 완벽하지 않아도 이 순서를 지키면 좋은 평가를 받습니다.

1. **복창하고 범위를 확인한다.** "스크롤 탑 버튼이 나오는 기준을 600px로 바꾸라는 말씀이 맞나요?"
2. **어디를 열지 먼저 말한다.** "기준값은 `js/config.js`의 `scrollTopThreshold`에 있고, 읽는 곳은 `js/effects.js`의 `render`입니다." (학습 로드맵 4-3 치트시트)
3. **결과를 먼저 예측해서 말한다.** "300px에서 나오던 버튼이 600px 넘게 스크롤해야 나올 것입니다."
4. **한 번에 하나만, 작게 바꾼다.** 여러 개를 한꺼번에 바꾸지 않습니다.
5. **저장하고 확인한다.** Live Server가 새로고침하면, 화면과 DevTools(Elements, Console)로 결과를 봅니다.
6. **예측과 다르면 소리 내어 추론한다.** "안 바뀌었네요. 캐시일 수 있으니 하드 리로드해 보겠습니다. 또는 다른 곳에서 값을 덮어쓰는지 검색해 보겠습니다(`Ctrl+Shift+F`)."
7. **30초로 설명한다.** 무엇을 바꿨고 왜 그렇게 되는지.
8. **원복 여부를 묻거나 스스로 정리한다.** `git restore <파일>` 또는 `git diff`로 변경을 보여 준 뒤 되돌립니다.

**시간 관리**: ★ 요청은 5분, ★★는 15분 안에 끝내는 것이 목표입니다. 5분이 넘어가면 "현재 상황과 다음에 시도할 것"을 말로 설명하고 평가자와 방향을 조율하세요.

**시작 전 준비**: 창 B(로컬 Live Server)가 켜져 있는지, `git status`가 깨끗한지, VS Code의 `Ctrl+P`(파일 열기)와 `Ctrl+Shift+F`(전체 검색)가 익숙한지 확인합니다.

**자주 나오는 라이브 요청과 열 곳**

| 요청 예시 | 건드릴 곳 | 확인 방법 | 관련 과제 |
| --- | --- | --- | --- |
| 스크롤 탑 / 네비 배경 기준값을 바꿔 보세요 | `js/config.js › CONFIG.scrollTopThreshold / navScrolledThreshold` | 스크롤하며 Elements에서 클래스 관찰 | V01, V02 |
| 다크 모드 색을 바꿔 보세요 | `css/style.css › [data-theme="dark"]` | 토글 후 Styles 패널의 변수 값 | V05 |
| 카드 hover 효과를 바꿔 보세요 | `css/style.css › .card:hover` | 마우스 올리기, `:hov` 강제 | V06 |
| 검증 규칙이나 문구를 바꿔 보세요 | `js/form.js › fieldValidators` | 입력 후 `Tab`, 에러 문구 | V03, V04 |
| 로딩 상태를 보여 주세요 | `js/projects.js › loadProjects`에 `await sleep(2000)` 임시 삽입, 또는 Console 명령 | 새로고침 후 스피너 | V10 |
| 브레이크포인트를 바꿔 보세요 | `css/style.css › @media`, `js/nav.js › matchMedia` (두 곳) | 기기 툴바에서 폭 비교 | V12 |
| 열 수 / 카드 폭을 바꿔 보세요 | `css/style.css › .projects__grid` | 기기 툴바, grid 배지 | V13 |
| 애니메이션 시점을 바꿔 보세요 | `js/config.js › revealThreshold` | 스크롤하며 `is-visible` 관찰 | V14 |
| 카드를 정렬해 보세요 | `js/projects.js › renderProjectCards` | 카드 순서, `projectsState.repos` | V16 |
| 필터를 하나 추가해 보세요 | `js/projects.js › renderProjectFilters, renderProjectCards` | 버튼 생성과 동작 | V17 |
| 폼에 필드를 추가해 보세요 | `index.html › #contact-form`, `js/form.js › fieldValidators` | 입력 검증, Console 에러 여부 | V18 |
| 섹션과 메뉴를 추가해 보세요 | `index.html` | 메뉴 클릭 이동, 모바일 메뉴 | V19 |

**라이브 코딩에서 흔한 실수**
- 값만 바꾸고 저장을 안 함 (Live Server는 저장해야 새로고침됩니다)
- CSS 파일을 바꿨는데 캐시 때문에 안 보임 → `Ctrl+Shift+R`
- 선택자 오타로 `null` 에러 → Console 첫 줄의 에러 메시지를 소리 내어 읽기
- 여러 곳을 한꺼번에 바꿔 원인을 못 찾음 → 되돌리고 하나씩

---

## 6. 알려진 한계와 개선 아이디어

이 프로젝트의 약점을 **내가 먼저 정리해 두고, 먼저 말하는** 것을 권합니다.

### 6-1. 한계 목록

| # | 한계 | 현재 동작 / 원인 | 개선 아이디어 | 먼저 말할 때 한 줄 |
| --- | --- | --- | --- | --- |
| 1 | 문의 폼이 **실제로 전송되지 않음** | `js/form.js`가 검증과 성공 메시지까지만 처리하는 데모 폼 | Formspree / EmailJS 연동 (`fetch` POST + 전송 중 / 성공 / 실패 상태를 projects처럼 추가), 또는 서버리스 함수. 스팸 방지와 키 노출도 함께 고려 | "폼은 데모라서 전송하지 않고, 화면에도 그렇게 적어 두었습니다." |
| 2 | **테마 첫 화면 깜빡임(FOUC) 가능성** | 스크립트가 `defer`라서 HTML이 그려진 뒤 `data-theme`가 붙음. 저장된 테마가 다크면 첫 화면이 잠깐 라이트로 보일 수 있음 | `<head>`의 아주 작은 인라인 스크립트로 먼저 `data-theme` 지정. 단, "모든 스크립트가 defer" 규칙(verify R4-1)과 충돌할 수 있어 조율 필요. 초기 색을 `prefers-color-scheme` 미디어 쿼리로 보완하는 방법도 있으나 저장값이 있을 때는 여전히 필요 | "저장된 테마가 다크일 때 첫 화면이 잠깐 라이트로 보일 수 있습니다." |
| 3 | **GitHub API 인증 없음, 시간당 60회** | 짧은 시간에 새로고침을 반복하거나 같은 IP를 공유하면 403. 에러 상태 UI로 안내는 함 | 응답을 `localStorage`에 캐시(V25), 정적 JSON을 미리 생성, 서버리스 프록시 + 토큰(토큰은 브라우저 코드에 넣지 않는다) | "레이트 리밋은 에러 UI로 안내하지만, 캐시로 호출 자체를 줄이는 것이 다음 과제입니다." |
| 4 | **저장소 30개까지만** 표시 | `per_page=30`, 페이지네이션 없음 | '더 보기' 버튼 + `page` 파라미터 | "저장소가 30개를 넘으면 뒤는 안 보입니다." |
| 5 | **스크롤스파이 없음** | 지금 보는 섹션이 메뉴에서 강조되지 않음 | Intersection Observer + `aria-current` (V24) | "지금 어느 섹션인지 메뉴에서 알려 주는 기능은 아직 없습니다." |
| 6 | **자동 점검은 시뮬레이션 기반** | Playwright + Chromium + 가짜 API 응답, 정적 검사는 정규식 | 실제 배포 환경 수동 확인, 다른 브라우저, 스크린리더 실기 테스트, Lighthouse | "자동 점검은 보조 근거이고, 배포 URL과 실제 응답은 수동으로 확인했습니다." |
| 7 | **JS가 꺼지면 모바일 메뉴 불가** | 모바일 메뉴가 JS의 `active` 클래스로만 열림. (콘텐츠와 프로젝트 안내 `noscript`는 있음) | `<details>` 기반 메뉴 또는 `:target` / noscript 스타일로 점진적 향상 | "JS 없이는 모바일 메뉴가 열리지 않습니다." |
| 8 | **최신 브라우저 기준** | `:has()`, `translate`, `100svh`, `scroll-margin` 등 대체 코드 없음. `:has()`는 메뉴 열림 시 헤더 배경 규칙 한 곳에만 있고 스크롤 배경 규칙과 분리해 두어, 미지원 브라우저에서도 스크롤 배경은 동작함 | `@supports selector(:has(*))`, 지원 범위 결정 | "최신 Chrome 기준으로 확인했고, 구형 브라우저용 대체는 없습니다." |
| 9 | **전체 다시 그리기** | `renderProjectCards`가 `innerHTML`로 카드를 통째로 교체 | 페이지네이션, 키 기반 부분 갱신, 또는 React 같은 도구 | "지금 규모에서는 괜찮지만 카드가 많아지면 비효율입니다." |
| 10 | **전역 스코프와 스크립트 순서 의존** | ES 모듈이 아니라서 `index.html`의 `script` 순서에 의존하고, 최상위 이름이 충돌할 수 있음 | ES 모듈(`type="module"`)로 전환 | "파일 사이의 의존이 `script` 순서에 숨어 있습니다." |
| 11 | **값이 두 곳에 중복** | 브레이크포인트 768이 CSS와 `nav.js`에 있음. GitHub 아이디가 `CONFIG`와 `index.html` 링크(푸터, noscript)에 있음. 글자 수 안내가 JS와 placeholder에 있음 | 한 곳에서 관리하도록 정리, 링크는 JS에서 채우기 등 | "같은 값이 두 곳에 있는 부분이 있어서 하나만 고치면 어긋납니다." |
| 12 | **403을 전부 레이트 리밋으로 안내** | `describeError`가 403과 429를 같은 문구로 처리. 403의 다른 원인도 가능 | 응답 헤더(`x-ratelimit-remaining`)로 구분 | "403은 전부 요청 한도 문구로 안내합니다." |
| 13 | **상태를 직접 수정(mutation)** | `Object.assign`으로 상태 객체를 바로 고침. React의 불변 업데이트와 다름 | 새 객체를 만들어 교체하는 방식 | "상태를 직접 수정하는데, React 방식과는 다릅니다." |

### 6-2. 이 한계를 먼저 말하면 좋은 이유

1. **신뢰가 올라갑니다.** 자기 코드를 객관적으로 볼 수 있다는 신호입니다. 평가자가 약점을 먼저 찾아내는 것과, 내가 알고 있다고 말하는 것은 인상이 다릅니다.
2. **질문의 주도권을 내가 갖습니다.** "발견당하는" 대신 "인지하고 있는" 쪽이 됩니다.
3. **개선 아이디어가 곧 이해의 증명입니다.** "캐시를 넣겠다"에서 "왜 캐시가 필요한지, 어떻게 만들지"까지 이어지면 이해가 깊다는 뜻입니다.
4. **다른 정직성 질문에도 유리합니다.** "이 코드를 직접 썼나요?" 같은 질문에서도 일관된 태도가 됩니다.
5. **시간이 통제됩니다.** 한계를 1분에 정리해 두면 질의응답으로 자연스럽게 넘어갑니다.

**말하는 구조**: **한계 → 원인 → 개선 방향**, 한 개당 15초. 예: "테마 깜빡임이 있을 수 있습니다. 스크립트가 defer라서 HTML이 그려진 뒤에 테마가 적용되기 때문입니다. head에서 먼저 지정하는 방법이 있는데, 모든 스크립트를 defer로 한다는 규칙과 어떻게 맞출지가 고민입니다."

---

## 7. 평가자 입장에서 보는 체크 포인트

동료 평가자가 **처음 5분 안에** 확인하고 싶어 하는 것과, 그에 대응하는 신호입니다.

| 평가자가 확인하고 싶은 것 | 발표자가 보여 줄 신호 | 준비물 |
| --- | --- | --- |
| **정말 동작하는가** | 첫 30초 안에 배포 URL을 열고 실제 카드가 뜨는 것을 보여 준다 | 배포 URL, 시크릿 창, 콘솔 에러 없음 |
| **요구사항을 충족하는가** (반응형, 인터랙션, 4가지 상태) | 데모 시나리오를 빠르게 통과하고, 자동 점검 결과를 한 줄로 언급한다 | 3장 시나리오, `verify.js` 결과 캡처 |
| **구조를 이해하고 있는가** | 파일이 서로 어떻게 연결되는지(`main.js`가 조립, `defer` 순서)와 흐름도를 말로 설명한다 | 코드 지도, 열어 둔 파일 탭 |
| **"왜"에 답할 수 있는가** | 모든 설명이 "무엇 + 왜 + 코드 위치"로 끝난다 | 4장 Q&A 연습 |
| **코드를 바꿀 수 있는가** | 요청을 받으면 파일 위치를 바로 짚고, 예측하고, 확인한다 | 5장 라이브 코딩 순서, 로컬 서버 창 |
| **한계를 아는가** | 스스로 한계 2~3개와 개선 방향을 말한다 | 6장 목록 |
| **소통이 되는가** | 시간을 지키고, 질문을 되짚고, 모르는 것을 정직하게 인정한다 | 5장 대응 절차, 타이머 |

**평가자가 볼 때 좋은 신호 vs 나쁜 신호**

| 좋은 신호 | 나쁜 신호 |
| --- | --- |
| 화면에서 시작해 코드로 내려간다 | 코드를 처음부터 줄줄 읽는다 |
| 예측 후 확인한다 ("이렇게 될 겁니다") | 바꾸고 나서 "어? 왜 이러지"만 반복한다 |
| 함수 이름과 파일 이름으로 정확히 말한다 | "저기 위쪽에 있는 그거"라고 말한다 |
| 모르는 것을 구분해서 말한다 | 모르는 것을 지어낸다 |
| 시간 안에 핵심을 끝낸다 | 앞부분에 시간을 다 쓰고 뒤를 급하게 넘긴다 |

---

## 8. 피어 피드백 기록 양식

복사해서 회차마다 채웁니다. 회차 직후 15분 안에 쓰는 것이 좋습니다.

### 8-1. 회차 요약

| 항목 | 내용 |
| --- | --- |
| 회차 / 날짜 / 시간 | 예: 2회차 / 2026-__-__ / 18분 |
| 평가자 | |
| 준비한 주제 | |
| 실제로 다룬 학습 목표 (①~⑥) | |
| 잘 된 점 (2개) | 1. <br> 2. |
| 아쉬웠던 점 (2개) | 1. <br> 2. |
| 시연에서 문제가 생긴 곳 | |
| 다음 회차 전에 할 것 (3개 이내) | 1. <br> 2. <br> 3. |

### 8-2. 질문 로그

| # | 받은 질문 (원문 그대로) | 관련 학습 목표 | 내 답 (요약) | 답변 품질 (상 / 중 / 하) | 못 한 부분 / 보완할 것 | Q&A 뱅크 번호 (없으면 추가) |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

### 8-3. 피드백과 액션

| # | 받은 피드백 (원문) | 분류 (A 이해 / B 전달 / C 시연 / D 코드) | 원인 추정 | 처방 (구체적으로) | 언제까지 | 완료 |
| --- | --- | --- | --- | --- | --- | :---: |
| 1 | | | | | | [ ] |
| 2 | | | | | | [ ] |
| 3 | | | | | | [ ] |

**예시 (참고용)**

| # | 받은 피드백 | 분류 | 원인 추정 | 처방 | 언제까지 | 완료 |
| --- | --- | --- | --- | --- | --- | :---: |
| 1 | "이벤트 위임 설명이 추상적이었다" | B | 개념 정의만 말하고 화면 예시가 없었음 | Elements에서 필터 버튼이 다시 만들어지는 모습을 보여 주며 60초로 다시 녹음 | 다음 회차 전날 | [ ] |
| 2 | "새로고침하면 화면이 잠깐 깜빡인다" | D / A | `defer` 때문에 테마가 늦게 적용됨을 설명하지 못함 | 원인 설명 스크립트 준비, 개선 여부는 과제 규칙 확인 후 결정 | 다음 회차 전 | [ ] |
| 3 | "라이브 수정에서 파일 찾는 데 오래 걸렸다" | C | 위치가 머릿속에 정리되어 있지 않음 | 학습 로드맵 4-3 치트시트를 눈 감고 말하기 3회 | 다음 회차 전 | [ ] |

---

## 9. 발표 전날 / 당일 체크리스트

### 발표 전날 (D-1)

**배포와 동작**
- [ ] 배포 URL 접속 확인 (PC와 휴대폰 각각)
- [ ] **시크릿 창 또는 캐시 삭제 후 확인**: DevTools Application 탭에서 Clear site data(메뉴 이름은 버전에 따라 다름), 하드 리로드 `Ctrl+Shift+R`
- [ ] 배포 URL에서 카드가 **내 저장소**로 표시된다 (샘플이 아님). `js/config.js › githubUsername` 확인
- [ ] Console에 빨간 에러가 없다
- [ ] 다크 모드, 햄버거, 폼, 필터, 스크롤 탑이 배포 URL에서 모두 동작한다

**레이트 리밋 대비**
- [ ] 브라우저 주소창에 `https://api.github.com/rate_limit`을 열어 남은 횟수(`remaining`)를 확인한다 (이 확인은 한도를 소모하지 않는 것으로 알려져 있다). 또는 Network 탭에서 `repos` 요청의 응답 헤더 `x-ratelimit-remaining`을 본다
- [ ] 리허설을 여러 번 반복했다면 남은 횟수가 충분한지 확인한다. 발표 직전에 새로고침을 수십 번 하지 않는다
- [ ] 한도가 걸렸을 때의 재현 방법을 준비했다: Console 명령 `setProjectsState({ status: 'error', repos: [], errorMessage: describeError({ status: 403 }) })`
- [ ] 예비 화면 준비: `images/screenshots/state-loading.png`, `state-error.png`, `state-empty.png` (샘플 응답으로 촬영한 화면이라는 점을 밝히고 사용)
- [ ] 발표 장소가 학교나 캠퍼스 공용 네트워크라면 IP를 공유한 사람들과 한도를 함께 쓸 수 있음을 기억한다. 휴대폰 핫스팟은 IP가 달라 한도 상태도 다를 수 있다

**코드와 검증**
- [ ] `git status`가 깨끗하고, 최신 커밋이 원격에 올라가 있다
- [ ] `node tools/verify.js` 실행 결과를 캡처했다 (요약 줄 `PASS n / FAIL n`과 "자동으로 확인할 수 없는 항목" 3개까지)
- [ ] 필요하면 `node tools/screenshots.js <배포 URL>`로 배포 URL 기준 스크린샷을 다시 찍었다
- [ ] 로컬에서 Live Server가 잘 열린다 (창 B)
- [ ] 코드 변경 시연 후 되돌리는 명령을 안다 (`git restore <파일>`)

**발표 준비**
- [ ] 5분 / 15분 스크립트를 타이머를 켜고 한 번 이상 리허설했다
- [ ] 예상 질문 중 **못 답하는 것이 5개 이하**다
- [ ] Console 명령 메모(3장)와 열어 둘 파일 탭 목록을 준비했다
- [ ] 큰 코드 변경은 하지 않는다 (작은 수정이라면 `verify.js`와 배포 URL 재확인까지)

### 발표 당일

**장비**
- [ ] 노트북 충전기 연결, **절전 모드와 화면 보호기를 끔**
- [ ] 알림 끄기(방해 금지 모드), 메신저와 메일 창 닫기
- [ ] 화면 공유를 미리 테스트했다 (공유할 창 선택, 소리, 해상도)
- [ ] 브라우저 확대 비율 100%, DevTools 글자 크기 키움, 북마크 바와 불필요한 탭 정리
- [ ] 네트워크 상태 확인 (예비 회선: 휴대폰 핫스팟)

**시작 30분 전**
- [ ] 창 A(배포 URL, 시크릿), 창 B(로컬), VS Code, 메모장을 순서대로 배치
- [ ] 창 A에서 Local Storage `theme`이 비어 있는지 확인 (깨끗한 시작)
- [ ] 배포 URL을 한 번 열어 카드가 뜨는지 마지막 확인 (여러 번 새로고침하지 않기)
- [ ] 물, 타이머, 스크립트 핵심 단어 종이 준비

**시작 직전 (1분)**
- [ ] 오프닝 첫 두 문장을 소리 내어 읽었다
- [ ] 첫 화면(Hero)이 떠 있는 상태로 시작한다

### 발표 후 (15분 안에)
- [ ] 8장 양식(회차 요약, 질문 로그, 피드백)을 채웠다
- [ ] 커버 매트릭스(1-3)를 갱신했다
- [ ] 코드를 바꿨다면 `git status`로 원복 여부를 확인했다

---

## 10. 검증 도구 소개: `node tools/verify.js`를 발표에서 활용하는 법

### 10-1. 무엇을 하는 도구인가

```bash
node tools/verify.js            # 정적 검사 + 브라우저(Playwright) 검사
node tools/verify.js --static   # 정적 검사만 (Node.js만 있으면 실행됨)
```

| 종류 | 무엇을 하나 | 필요한 것 |
| --- | --- | --- |
| 정적 검사 | `index.html`, `css/style.css`, `js/*.js`, `README.md`를 읽어 규칙을 정규식으로 점검 (예: 시맨틱 태그 존재, `defer`, `var` 미사용, `addEventListener`) | Node.js |
| 브라우저 검사 | Playwright로 Chromium을 띄워 실제로 클릭, 스크롤, 입력 후 결과 확인 (예: 스크롤 299px과 300px에서 버튼, 다크 모드 저장, 폼 검증, 4가지 상태) | Playwright, Chromium |

- 브라우저 검사에서 GitHub API는 **가짜 응답으로 대체**됩니다. 그래서 인터넷이나 레이트 리밋과 무관하게 로딩 / 성공 / 에러(500, 403, 404, 네트워크 실패) / 빈 상태를 모두 재현합니다.
- Playwright가 없으면 브라우저 검사는 건너뛰고 `WARN`으로 알려 줍니다.
- 결과가 `FAIL`이면 종료 코드가 1입니다.

### 10-2. 출력 읽는 법

```text
[PASS] R5-3  스크롤 탑 버튼: 299px 숨김 / 300px 표시 / 클릭 시 맨 위로
...
■ 요약
PASS 66  /  FAIL 0  /  WARN 0  /  INFO 0

■ 자동으로 확인할 수 없는 항목 (직접 확인)
 - R10-5  배포된 GitHub Pages URL 에서 모든 기능이 동작하는가 (브라우저로 직접 접속)
 - R10-6  실제 GitHub API 응답(본인 저장소)이 카드로 표시되는가 (배포 URL 에서 확인)
 - R11    데스크톱/모바일/다크모드 스크린샷 제출 (배포 URL 기준으로 다시 촬영 권장)
```

| 표시 | 의미 |
| --- | --- |
| `PASS` | 점검 통과 |
| `FAIL` | 실패. 원인이 "내 코드"인지 "검사의 고정 기준값"인지 구분한다 (학습 로드맵 4-4) |
| `WARN` | 확인 못 했거나 주의 (예: Playwright 없음, `max-width` 쿼리 발견) |
| `INFO` | 참고 (예: 보너스 항목 미구현) |

항목 번호(`R2-1`, `R5-3` 등)는 `docs/02-evaluation-checklist.md`와 1:1로 대응합니다. 위 숫자는 이 문서를 작성한 시점(정적 39개 + 브라우저 27개)의 결과이며, 코드를 바꾸면 개수도 바뀝니다.

### 10-3. 발표에서 이렇게 활용한다

**한 줄로 언급하기 (10~15초)**

> 요구사항은 자동 점검 스크립트로도 확인했습니다. 정적 검사와 브라우저 검사를 합쳐 모두 통과했고, 배포 URL 동작과 실제 API 응답처럼 스크립트가 확인하지 못하는 항목은 제가 직접 확인했습니다.

**항목을 코드와 연결하기 (근거 삼아 설명)**

| 자동 점검 항목 | 이렇게 이어 말한다 | 코드 위치 |
| --- | --- | --- |
| R2-1 시맨틱 태그 | "이 검사는 태그 존재만 봅니다. 왜 이렇게 나눴는지는 제가 설명드리겠습니다." | `index.html` |
| R3-5 / R3-5b Grid | "카드 열 수가 375px에서 1열, 768px에서 2열, 1280px에서 3열인지 실제로 측정합니다." | `css/style.css › .projects__grid` |
| R5-3 / R5-4 기준값 | "299px과 300px, 59px과 60px에서 동작이 갈리는지 확인합니다. 이 기준값은 config.js에 있습니다." | `js/config.js`, `js/effects.js › render` |
| R5-5 다크 모드 | "토글, 저장, 새로고침 후 유지까지 한 흐름으로 확인합니다." | `js/theme.js` |
| R8-4 / R8-4b 에러 | "500, 403, 404, 네트워크 실패를 가짜 응답으로 만들어 문구와 재시도 버튼을 확인합니다." | `js/projects.js › describeError` |
| SEC-1 XSS | "악성 문자열이 들어와도 실행되지 않고 글자로만 보이는지 확인합니다." | `js/utils.js › escapeHtml` |

### 10-4. 자동 점검은 보조 근거일 뿐이다

- **코드 이해를 대체하지 못합니다.** 통과했다는 사실은 "규칙을 만족한다"이지 "설명할 수 있다"가 아닙니다.
- **정규식 기반 간이 점검**이라 우회되거나 오탐할 수 있습니다. 예를 들어 문자열 안의 단어를 보고 통과시키는 항목이 있습니다.
- **시뮬레이션 환경**입니다. Chromium 한 종류, 가짜 API 응답, 로컬 서버 위에서 검사합니다. 배포 환경, 다른 브라우저, 스크린리더는 확인하지 못합니다.
- **기준값이 고정된 항목**이 있어서, 정상적인 변경(기준값 수정)도 FAIL이 될 수 있습니다.
- 평가에서 `FAIL`이 있다면 숨기지 말고 **원인을 설명**하세요. 그 설명이 오히려 이해를 보여 줍니다.

### 10-5. 관련 도구: 스크린샷

```bash
node tools/screenshots.js                 # 로컬 서버 + 샘플 응답으로 촬영 (테스트 화면)
node tools/screenshots.js <배포 URL>       # 배포된 사이트를 실제 API 응답으로 촬영 (제출용 권장)
```

`images/screenshots/`에 데스크톱, 모바일, 다크 모드, 모바일 햄버거 메뉴 화면이 저장됩니다. 로딩 / 에러 / 빈 상태 화면(`state-*.png`)은 샘플 응답 모드에서만 생성됩니다. 샘플로 찍은 사진은 "테스트 화면"이므로, 제출 전에는 배포 URL 기준으로 다시 찍어 교체하는 것을 권합니다.

---

### 마무리 메모

- 이 문서의 대본, 답변, 체크리스트는 **내 것으로 바꿔야** 힘이 생깁니다. 특히 Q&A는 내 경험(변형 과제를 해 본 것, 실제로 겪은 에러)을 한 문장씩 덧붙이면 훨씬 자연스럽고 설득력 있습니다.
- 연습은 **소리 내어, 시간을 재고, 화면을 보며** 하세요. 눈으로만 읽는 연습은 실전에서 거의 도움이 되지 않습니다.
- 학습 순서와 변형 과제는 `docs/00-study-plan.md`, 개념 복습은 `docs/01-concept-notes.md`, 요구사항 대응표는 `docs/02-evaluation-checklist.md`를 참고하세요.
