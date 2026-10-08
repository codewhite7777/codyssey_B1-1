# LINK의 포트폴리오 · 코디세이 B1-1

순수 HTML, CSS, JavaScript로 만든 반응형 자기소개 웹사이트입니다. 사용자 이벤트 → 상태 변경 → DOM 갱신 흐름을 메뉴, 다크 모드, 프로젝트 조회, 문의 폼에 적용했습니다.

- 저장소: https://github.com/codewhite7777/codyssey_B1-1
- GitHub Pages 주소: https://codewhite7777.github.io/codyssey_B1-1/
- **배포 상태는 Actions의 `deploy`와 `verify-deployed` 성공 여부를 기준으로 확인합니다. 위 주소만으로 배포 완료를 의미하지 않습니다.**

## 사용 기술과 구성

웹사이트 실행에는 외부 라이브러리, 프레임워크, 빌드 또는 패키지 설치가 필요 없습니다. HTML, CSS, 브라우저 표준 JavaScript API만 사용합니다.

```text
index.html                 시맨틱 문서, 6개 콘텐츠 영역, 문의 폼
css/style.css              모바일 퍼스트, Flexbox/Grid, 테마, 애니메이션
js/app.js                  CONFIG, STATE, 이벤트, render 함수, GitHub API
images/profile.svg         사진 대신 사용하는 LINK 모노그램
images/screenshots/        실제 브라우저에서 캡처한 제출용 화면
.vscode/                   Live Server 권장 확장과 포트 설정
tests/                     검증용 스크립트 (웹사이트에서 사용하지 않음)
docs/reports/              검증 실행 결과 (CI 성공 후 생성)
.github/workflows/         브라우저 검증 → Pages 배포 → 배포본 검증
```

프로필 이미지는 실제 인물 사진이 아닌 이니셜 이미지입니다. 확인되지 않은 개인 경력이나 연락처는 기재하지 않았습니다.

## 구현한 필수 기능

| 요구사항 | 구현 위치 |
| --- | --- |
| Hero / About / Skills / Projects / Contact / Footer | `index.html` |
| 시맨틱 태그, 앵커, alt, label 연결 | `index.html`, 동적 카드의 `article` |
| CSS 변수, 별도 다크 변수, hover / transition / shadow | `css/style.css` |
| Flexbox 내비게이션, Grid auto-fit / minmax 카드 | `.nav-layout`, `.projects-grid` |
| 모바일 퍼스트, 768px / 1024px | CSS 미디어 쿼리 |
| 햄버거 메뉴, 모바일/데스크톱 전환, Escape | `initNavigation`, `renderMenu` |
| 부드러운 이동, 맨 위로 버튼, 내비게이션 배경 | `initNavigation`, `updateScrollState`, `renderScroll` |
| 다크 모드 저장과 복원 | `initTheme`, `toggleTheme`, `renderTheme` |
| 스크롤 애니메이션 | `initReveal` |
| 입력·제출 시 필수값/이메일 검사 | `initForm`, `validateField`, `renderForm` |
| GitHub 요청과 네 가지 UI 상태, 재시도 | `loadProjects`, `renderProjects` |
| 화살표 함수, 템플릿 리터럴, 구조분해, map / forEach | `js/app.js` |

`var`, HTML의 `onclick`, 인라인 `style`은 사용하지 않습니다. `innerHTML` 카드 생성 전에 외부 텍스트를 이스케이프하고 링크는 HTTPS GitHub 주소만 허용합니다.

## 동작 기준과 범위

| 기준 | 값 |
| --- | --- |
| 내비게이션 배경 변경 | `scrollY >= 60px` |
| 맨 위로 버튼 표시 | `scrollY >= 300px` |
| 반응형 브레이크포인트 | 768px, 1024px |
| Intersection Observer threshold | 0.2 (대상 면적 20%) |
| 요청 타임아웃 | 10초 |
| GitHub 표시 범위 | 최근 업데이트된 공개 저장소 최대 6개 |
| 테마 저장 키 | `codyssey-b1-1-theme` |
| 최초 테마 | 라이트, 유효한 저장값이 있으면 복원 |

요청 주소는 `https://api.github.com/users/codewhite7777/repos?sort=updated&direction=desc&per_page=6`입니다. 모든 저장소를 페이지네이션으로 수집하는 기능은 포함하지 않습니다. 전체 저장소 링크는 별도로 제공합니다.

GitHub 비인증 API의 기본 제한은 IP 기준 시간당 60회입니다. 403/429, 다른 HTTP 오류, 네트워크 단절, JSON 오류, 타임아웃을 에러 화면과 재시도로 처리합니다. 평가 중에는 실제 호출 한도를 소진하지 말고 자동 검증의 모의 응답을 사용합니다.

문의 폼은 **학습용**입니다. 이름/이메일/메시지의 공백과 형식을 검사하고 성공 안내를 표시하지만 실제 전송이나 영구 저장은 하지 않습니다. 이메일 형식 검사는 주소의 실제 존재 여부를 확인하는 기능이 아닙니다. 입력 길이 상한은 이름 80자, 이메일 254자, 메시지 3000자이며, 공백이 아닌 최소 한 글자면 필수값 조건을 만족합니다.

언어별 필터, 타이핑 효과, 실제 이메일 전송, 시스템 다크 모드 감지는 선택 항목이므로 제외했습니다. 사용자의 동작 감소 설정은 애니메이션과 부드러운 이동에 반영합니다.

## 로컬 실행

VS Code에서 저장소 폴더를 열고 추천 확장인 **Live Server (Ritwick Dey)**를 설치합니다. `index.html`에서 **Open with Live Server**를 사용합니다. 기본 설정 포트는 5500입니다. 사용자 PC에서의 확장 설치와 실행 여부는 별도 확인 사항입니다.

## 검증과 배포

1. `tests/static_checks.py`: 파일 구성과 필수 문법 검사.
2. `tests/browser_checks.py`: 실제 Chrome에서 모의 API 응답으로 로딩·성공·403/429·404·500·빈 상태, 재시도, 타임아웃, XSS 방어, 테마 저장, 메뉴, 320~1440px, 폼, 스크롤을 검사.
3. `tests/live_check.py`: 원본 HTML/CSS/JS를 HTTP로 열고 **실제 GitHub API**로 프로젝트를 표시하며 데스크톱/모바일/다크 모드 화면을 캡처.
4. 모든 사전 검증 성공 후 `deploy`가 GitHub Pages에 배포.
5. `verify-deployed`가 배포된 URL에서 실제 API 및 기능 검증을 다시 실행.

Python의 Playwright는 **자동 검증에만 쓰는 개발 도구**이며 웹사이트에 포함되거나 브라우저로 전송되지 않습니다. 검증 스크립트는 `requirements-dev.txt`를 사용합니다.

GitHub Pages 최초 설정이 필요한 경우 저장소 **Settings → Pages → Build and deployment → Source: GitHub Actions**로 지정합니다. 이후 Actions의 **Verify portfolio and deploy → Run workflow**를 실행할 수 있습니다. Pages 최초 활성화는 저장소 관리 권한이 필요한 별도 설정입니다.

실행 결과는 `docs/reports/` 및 해당 Actions 실행의 `portfolio-verification`, `deployed-verification` 산출물을 기준으로 확인합니다. 파일만 작성된 상태, 모의 응답 검증, 실제 API 검증, 배포본 검증은 서로 구분합니다.

## 제출용 스크린샷

아래 파일은 실제 GitHub API 검증이 성공한 CI에서 생성됩니다. 모의 프로젝트 데이터가 담긴 로컬 미리보기는 제출용 이미지로 사용하지 않습니다.

### 데스크톱
![데스크톱 포트폴리오](images/screenshots/desktop.png)

### 모바일
![모바일 포트폴리오](images/screenshots/mobile.png)

### 다크 모드
![다크 모드 포트폴리오](images/screenshots/dark.png)

## 평가에서 설명할 코드 위치

`STATE`는 특별한 예약어가 아니라 상태 객체의 이름입니다. 개별 변수로도 구현할 수 있지만 관련 상태를 찾기 쉽게 모았습니다. 상태 변경만으로 화면이 자동 변경되지 않으므로 `renderTheme`, `renderMenu`, `renderProjects`, `renderForm`이 DOM을 갱신합니다.

API 흐름은 `loadProjects` → loading 렌더링 → `fetch`/`response.ok`/JSON 확인 → success·empty·error 상태 변경 → `renderProjects`입니다. 카드 변환은 `items.map(projectCard).join("")`에서 이루어집니다.

기능이 실제로 동작하는지와 작성자가 그 기능을 설명할 수 있는지는 별개입니다. 상세 학습과 평가 개념 설명은 완성·검증 후 채팅에서 진행합니다.
