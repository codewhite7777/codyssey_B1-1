# LINK의 포트폴리오 · 코디세이 B1-1

순수 HTML, CSS, JavaScript로 만든 반응형 자기소개 웹사이트입니다. 사용자 이벤트 → 상태 변경 → DOM 갱신을 메뉴, 다크 모드, 프로젝트 조회, 문의 폼에 적용했습니다.

- **배포 사이트:** https://codewhite7777.github.io/codyssey_B1-1/
- **GitHub 저장소:** https://github.com/codewhite7777/codyssey_B1-1
- **원본 코드:** `main` / **배포 파일:** `gh-pages`의 루트

**2026-10-08 검증:** Google Chrome 155.0.8059.39에서 정적 검사 34/34, 원본 파일 기능 검사 33/33, 공개 배포본 기능 검사 33/33 통과. 배포 파일 4개의 원본 일치 확인. 실제 공개 사이트에서 GitHub API 비인증 200 응답, 테마 저장·복원, 폼 검증 확인.

- 배포 성공 실행: https://github.com/codewhite7777/codyssey_B1-1/actions/runs/37714065893
- 최종 검증 실행: https://github.com/codewhite7777/codyssey_B1-1/actions/runs/37714325255

## 사용 기술과 파일 역할

웹사이트 실행에는 패키지 설치, 빌드, 외부 프레임워크가 필요 없습니다. React, Vue, jQuery, Bootstrap, Tailwind를 사용하지 않습니다.

```text
index.html                 시맨틱 문서, 여섯 콘텐츠 영역, 문의 폼
css/style.css              모바일 퍼스트, Flexbox/Grid, 테마, 애니메이션
js/app.js                  CONFIG, STATE, 이벤트, render 함수, GitHub API
images/profile.svg         실제 인물 사진이 아닌 LINK 이니셜 프로필
images/screenshots/        실제 사이트의 데스크톱/모바일/다크 모드 화면
.vscode/                   Live Server 권장 확장과 포트 설정
tests/                     자동 검증 전용 Python 스크립트
docs/reports/              실제 실행 결과
.github/workflows/         원본 파일 및 공개 배포 사이트 검증
```

Python/Playwright는 **검증용 개발 도구**이며 웹사이트 실행에 쓰이지 않고 `gh-pages`에도 포함되지 않습니다. 사용자 정보는 확인된 이름 LINK와 GitHub 계정만 사용하며 확인되지 않은 경력·연락처를 만들지 않았습니다.

## 필수 요구사항 구현 위치

| 요구사항 | 코드 위치 |
| --- | --- |
| Hero / About / Skills / Projects / Contact / Footer | `index.html` |
| 시맨틱 태그, 앵커, 이미지 alt, label의 for-id 연결 | HTML 및 동적 카드의 `article` |
| CSS 색상·글꼴·간격 변수, 별도 다크 변수 | `:root`, `[data-theme="dark"]` |
| Flexbox 내비게이션 / Grid auto-fit·minmax 카드 | `.nav-layout`, `.projects-grid` |
| 모바일 퍼스트, 768px·1024px 분기 | CSS 미디어 쿼리 |
| 버튼·카드 hover / transition / box-shadow | CSS 공통 버튼·카드 규칙 |
| 햄버거 메뉴, active 토글, Escape, 화면 크기 전환 | `initNavigation`, `renderMenu` |
| 부드러운 이동, 맨 위로 버튼, 내비게이션 배경 | `initNavigation`, `updateScrollState`, `renderScroll` |
| 다크 모드 전환·저장·새로고침 시 복원 | `initTheme`, `toggleTheme`, `renderTheme` |
| Intersection Observer 스크롤 애니메이션 | `initReveal` |
| 필수값·이메일 검사, 입력 즉시 오류 갱신 | `initForm`, `validateField`, `renderForm` |
| GitHub API, 로딩·성공·에러·빈 상태, 재시도 | `loadProjects`, `renderProjects` |
| 화살표 함수·템플릿 리터럴·구조분해·map·forEach | `js/app.js` |

외부 JS를 `defer`로 연결하며 `var`, HTML `onclick`, 인라인 `style`은 사용하지 않습니다. 외부 텍스트를 이스케이프한 후 카드 HTML을 만들고, 저장소 링크는 HTTPS GitHub 주소만 허용합니다.

## 동작 기준과 의도적인 범위

| 항목 | 기준 |
| --- | --- |
| 내비게이션 배경 변경 | `scrollY >= 60px` |
| 맨 위로 버튼 표시 | `scrollY >= 300px` |
| 반응형 브레이크포인트 | 768px / 1024px |
| Intersection Observer threshold | 0.2, 대상 요소 면적의 20% |
| 요청 타임아웃 | 10초 |
| GitHub 목록 | 최근 업데이트된 공개 저장소 최대 6개 |
| 테마 저장 키 | `codyssey-b1-1-theme` |
| 최초 테마 | 라이트. 유효한 저장값이 있으면 복원 |

GitHub 요청은 `https://api.github.com/users/codewhite7777/repos?sort=updated&direction=desc&per_page=6`을 사용합니다. 전체 페이지 수집은 하지 않으며 전체 저장소 링크를 별도로 제공합니다. 비인증 기본 호출 제한은 IP 기준 시간당 60회입니다. 403/429·다른 HTTP 오류·네트워크 실패·JSON 오류·타임아웃을 에러 UI와 재시도로 처리합니다.

문의 폼은 **학습용**입니다. 이름·이메일·메시지의 공백과 형식을 검사하되 실제 전송이나 영구 저장은 하지 않습니다. 이메일 형식 검사는 주소의 존재 확인이 아닙니다. 입력 길이 상한은 이름 80자, 이메일 254자, 메시지 3000자입니다.

언어별 필터링, 타이핑 효과, 실제 이메일 전송, 시스템 다크 모드 감지는 선택 항목이므로 제외했습니다. 보조적인 키보드 접근성과 동작 감소 설정은 반영했습니다.

## 실제 검증 결과

최신 결과는 `docs/reports/` 및 Actions의 **Verify portfolio** 실행에서 확인합니다. 첫 실패 기록을 삭제하지 않고 이후 재검증 결과와 구분합니다.

| 검증 | 결과 파일 |
| --- | --- |
| 필수 구조·문법 34개 | `static.json` |
| 원본 파일의 Chrome 기능 검사 33개 | `browser.json` |
| 원본 파일과 실제 GitHub API | `live.json` |
| 공개 배포 파일 4개의 SHA-256 원본 일치 | `published-files.json` |
| 배포 URL에서 실제 API·테마 복원·폼·스크린샷 | `deployed-live.json` |
| 배포 URL에서 정상·오류·경계조건 33개 | `deployed-browser.json` |

브라우저 검사는 320·390·767·768·1024·1440px, 메뉴·스크롤 기준값, 테마 저장/복원/저장소 실패, 필수값·이메일 수정, API 오류·빈 상태·재시도·10초 타임아웃, 외부 HTML 삽입 방어 등을 다룹니다. 오류 상황은 API 응답을 통제하여 검사하고, 실제 API 접속은 별도 검사로 구분합니다.

공유 CI IP에서 익명 요청이 403/429를 응답하면 **검증 요청에만** Actions 단기 토큰으로 재시도할 수 있습니다. 사용 여부는 각 `live.json`의 `api_auth`에 기록합니다. 응답은 실제 GitHub에서 받으며 토큰을 웹사이트·배포 파일·보고서에 넣지 않습니다. 일반 방문자의 웹사이트는 인증 없는 요청을 사용합니다. 최종 배포 검증에서는 토큰 재시도를 사용하지 않았습니다.

## 실행 및 배포

VS Code에서 저장소 폴더를 열고 추천 확장 **Live Server (Ritwick Dey)**를 설치한 뒤 `index.html`에서 **Open with Live Server**를 선택합니다. 설정 포트는 5500입니다. 사용자 PC의 확장 설치와 실행 여부를 자동 검증한 것은 아닙니다.

배포는 GitHub Pages의 **`gh-pages` 브랜치 / 루트(`/`)** 방식입니다. `main`은 소스·문서·검증 기록을 보관하고 `gh-pages`는 검증된 HTML/CSS/JS/이미지만 보관합니다. GitHub의 **pages build and deployment**가 게시를 담당합니다.

`main` 코드만 바꾸면 배포 파일이 자동으로 갱신되는 구조는 아닙니다. 런타임 수정 후에는 소스 검증을 마치고 변경된 정적 파일을 `gh-pages`에 반영한 뒤 **Verify portfolio**를 다시 실행합니다. 배포본이 최신 소스와 다르면 파일 해시 검사가 실패하도록 구성했습니다.

최초 시도한 커스텀 배포는 Pages 미설정으로 실패했으며, 이후 `gh-pages` 방식으로 전환했습니다. 과거 실패한 실행 대신 현재 배포 및 최신 검증 실행을 확인합니다.

## 제출용 스크린샷

모의 데이터가 아닌 실제 공개 사이트와 GitHub 데이터를 사용합니다.

### 데스크톱
![데스크톱 포트폴리오](images/screenshots/desktop.png)

### 모바일
![모바일 포트폴리오](images/screenshots/mobile.png)

### 다크 모드
![다크 모드 포트폴리오](images/screenshots/dark.png)

## 평가 개념의 코드 위치

`STATE`는 예약어가 아니라 상태 객체의 이름입니다. 개별 변수도 가능하지만 관련 상태를 찾기 쉽게 묶었습니다. 상태 변경 후 `renderTheme`, `renderMenu`, `renderProjects`, `renderForm`이 DOM에 반영합니다.

GitHub 흐름은 `loadProjects` → loading 표시 → fetch/HTTP 성공 여부/JSON 검사 → success·empty·error 상태 변경 → `renderProjects`입니다. 카드 변환은 `items.map(projectCard).join("")`에서 이루어집니다.

구현 완료와 학습자의 설명 능력은 별개입니다. 상세 평가 개념은 완성·검증된 실제 코드로 채팅에서 학습합니다.
