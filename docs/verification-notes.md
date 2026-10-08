# 실제 검증 범위와 실행 이력

웹사이트는 HTML/CSS/JavaScript만 사용합니다. Python/Playwright는 자동 검증 전용이며 배포 브랜치에 포함하지 않습니다.

## 최종 결과 · 2026-10-08

- GitHub Pages 배포 성공: https://github.com/codewhite7777/codyssey_B1-1/actions/runs/37714065893
- 원본 및 배포본 검증 전체 성공: https://github.com/codewhite7777/codyssey_B1-1/actions/runs/37714325255
- 공개 URL: https://codewhite7777.github.io/codyssey_B1-1/
- 원본: `main`, 게시 파일: `gh-pages` 루트. 게시 커밋: `cc7e427e1989745563572d09b45f14b512fade90`.
- Chrome 155.0.8059.39에서 정적 검사 34/34, 원본 기능 검사 33/33, 배포본 기능 검사 33/33 통과. 건너뛴 검사 없음.
- 배포된 HTML/CSS/JS/프로필 이미지 4개가 검사한 원본과 SHA-256까지 일치함.
- 공개 URL에서 실제 GitHub API 비인증 200 응답, 저장소 6개 표시, localStorage 저장 및 새로고침 복원, 폼 검증 확인.
- 제출용 데스크톱/모바일/다크 모드 스크린샷은 실제 공개 사이트에서 촬영함.

현재 결과는 `docs/reports/`와 최신 **Verify portfolio** 실행을 기준으로 확인합니다. 게시 자체는 GitHub 기본 **pages build and deployment**가 담당합니다. 이전 커스텀 워크플로의 deploy/verify-deployed 단계는 더 이상 현재 기준이 아닙니다.

## 첫 실행과 수정 이력

첫 코드 커밋 `d9a09905b93c650d323a9e8400cc847d75d5c9d5`, 실행 https://github.com/codewhite7777/codyssey_B1-1/actions/runs/37713497219

첫 실행에서 정적 검사와 모의 API를 사용하는 Chrome 기능 검사는 통과했지만 실제 GitHub 익명 API가 403을 반환했습니다. 웹사이트는 에러 화면을 표시했고, 실제 API 성공 및 스크린샷 단계는 실패하여 배포하지 않았습니다. 실패를 성공으로 처리하지 않았습니다.

그 뒤 실제 API는 비인증 200으로 성공했습니다. Pages 최초 설정이 없는 상태에서 커스텀 배포가 실패했으나, 검증한 정적 파일로 gh-pages 브랜치를 구성한 후 기본 Pages 게시가 성공했습니다. 최종 실행에서 공개 URL의 동작과 파일 일치를 다시 검증했습니다.

## CI 전용 인증 재시도 범위

공유 CI 서버에서 익명 요청이 403/429를 응답하면, `tests/live_check.py`는 검증에 한해 Actions 단기 토큰을 정확한 저장소 목록 API 요청에 더할 수 있습니다. 응답을 모의 생성하지 않고 실제 GitHub 네트워크 요청을 계속합니다.

토큰은 웹사이트 소스·배포 파일·스크린샷·보고서에 넣지 않습니다. 일반 방문자는 비인증 요청을 사용합니다. 인증 사용 여부는 `live.json`, `deployed-live.json`의 `api_auth`, 응답 코드는 `api_responses`에 기록합니다. 최종 원본 및 배포 검증에서는 인증 재시도를 사용하지 않았습니다.

## 검증 범위 밖

사용자 PC의 VS Code/Live Server 설치·실행은 확인하지 않았습니다. 자동 검증은 GitHub 실행 환경의 실제 Chrome과 여러 화면 너비에서 수행했습니다. 기능 동작 검증은 학습자가 자신의 말로 코드를 설명할 수 있는지 확인하는 평가를 대신하지 않습니다.
