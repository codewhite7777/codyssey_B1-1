# B1-1 · 나를 소개하는 웹페이지 처음부터 만들기

외부 라이브러리 없이 순수 HTML, CSS, JavaScript로 만드는 코디세이 포트폴리오 과제입니다.

## 현재 단계

**1-1단계: HTML · CSS · JavaScript 파일 연결과 DOM 텍스트 변경**

현재는 학습용 시작 코드이며 제출 가능한 완성본이 아닙니다. 상세 학습 설명과 이해 점검은 채팅에서 진행하고, 이 README에는 실행 방법과 구현 현황을 기록합니다.

## 사용 기술

- HTML: 문서 구조
- CSS: 외부 스타일시트와 기본 CSS 변수
- JavaScript: `defer`, `const`, `querySelector`, `textContent`
- 개발 환경: VS Code + Live Server

## 폴더 구조

```text
codyssey_B1-1/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
│   └── .gitkeep
├── .gitignore
└── README.md
```

`images/.gitkeep`는 나중에 프로필 이미지와 스크린샷을 넣을 폴더를 저장소에 유지하기 위한 빈 파일입니다. 실제 이미지는 아직 없습니다.

## 로컬 실행

처음 가져오는 경우:

```bash
git clone https://github.com/codewhite7777/codyssey_B1-1.git
cd codyssey_B1-1
```

VS Code에서 폴더 전체를 열고, Ritwick Dey의 Live Server 확장을 설치합니다. `index.html`을 우클릭하여 **Open with Live Server**를 실행합니다.

브라우저에서 확인할 예상 결과:

- 제목과 학습 안내가 표시됩니다.
- 외부 CSS로 배경색, 글자색, 여백이 적용됩니다.
- 상태 문구가 `JavaScript 실행 전입니다.`에서 `JavaScript 연결 확인 완료`로 바뀝니다.

## 단계별 진행

| 단계 | 작업 범위 | 현재 상태 |
| --- | --- | --- |
| 1-1 | 폴더 구성, 파일 연결, 첫 DOM 변경 | 코드 작성 및 제한된 검사 완료. 실제 브라우저 확인 필요 |
| 1-2 | Hero, About, Skills, Projects, Contact, Footer와 시맨틱 구조 | 미구현 |
| 2 | Flexbox, Grid, 모바일 퍼스트, 768px·1024px 분기 | 미구현 |
| 3 | 햄버거 메뉴, 부드러운 스크롤, 맨 위로 버튼, 스크롤 배경 변경 | 미구현 |
| 4 | 상태 객체, 다크 모드, localStorage 저장·복원 | 미구현 |
| 5 | 문의 폼 필수값·이메일 검증, 입력 피드백, 성공 안내 | 미구현 |
| 6 | GitHub API와 로딩·성공·에러·빈 상태, 재시도 | 미구현 |
| 7 | Intersection Observer, 통합 검증 | 미구현 |
| 8 | GitHub Pages 배포, 제출용 스크린샷, 피어 평가 준비 | 미구현 |

선택 기능은 필수 구현 이후 검토합니다. 문의 폼의 실제 이메일 전송은 선택 기능이며, 전송을 구현하지 않은 상태에서 전송 완료라고 안내하지 않습니다.

## 실제 검증 범위

- `node --check js/app.js`: JavaScript 문법 검사 통과.
- 정적 검사: 외부 파일 경로와 존재 여부, `defer`, 고유한 선택 대상, `lang`, viewport, 단일 h1, 인라인 스타일·이벤트 및 `var` 미사용 등 11개 항목 통과.
- 모의 DOM 객체를 사용한 텍스트 변경 로직 검사 통과. 실제 브라우저 DOM 검증은 아닙니다.
- 작업 환경의 Chromium에서 로컬 HTTP 접속 시 `ERR_BLOCKED_BY_ADMINISTRATOR`가 발생했습니다. 실제 화면 렌더링, CSS 적용, 화면 너비별 동작은 아직 검증하지 못했습니다.
- 사용자 PC의 VS Code / Live Server 실행 여부는 확인하지 않았습니다.

## 배포 URL

아직 배포하지 않았습니다. 실제 GitHub Pages 배포와 접속 검증 후 URL을 기록합니다.

## 스크린샷

데스크톱 / 모바일 / 다크 모드 스크린샷은 각 기능 구현 및 브라우저 검증 이후 추가합니다.
