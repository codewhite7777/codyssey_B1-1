# 실제 검증 범위와 환경 제한

웹사이트 실행 코드는 HTML/CSS/JavaScript만 사용합니다. Python과 Playwright는 자동 검증 전용이며 배포 파일에 포함하지 않습니다.

## 2026-10-08 첫 GitHub Actions 실행

코드 커밋 `d9a09905b93c650d323a9e8400cc847d75d5c9d5`, 실행 https://github.com/codewhite7777/codyssey_B1-1/actions/runs/37713497219

- 정적 검사 34/34 통과.
- Google Chrome 155.0.8059.39에서 원본 파일을 HTTP로 열어 기능 검사 33/33 통과, 건너뛴 검사 없음.
- 정상/오류/빈 상태 등의 API 응답은 이 33개 검사에서 통제된 모의 데이터 사용.
- 실제 네이티브 localStorage 저장과 새로고침 후 테마 유지 확인.
- 모의 응답을 사용하지 않은 실제 GitHub API 요청은 403 응답. 웹사이트가 에러 상태를 표시함.
- 실제 API 성공 화면과 제출용 스크린샷 검증은 첫 실행에서 실패했으며 배포 단계는 실행되지 않음.

## CI 전용 인증 재시도

공유 CI 서버의 익명 요청이 403/429를 응답하면, `tests/live_check.py`는 자동 검증에 한해 Actions 단기 토큰으로 재시도합니다. 대상은 정확히 본인 저장소 목록 API로 제한하며, 응답을 만들어 주지 않고 실제 GitHub 네트워크 요청을 계속합니다.

토큰은 웹사이트 JavaScript, 배포 파일, 스크린샷, 검증 보고서에 넣지 않습니다. 원래 웹사이트 방문자는 계속 인증 없는 요청을 사용합니다. 실제 실행에서 인증을 사용했는지는 `docs/reports/live.json`의 `api_auth`로 구분하고, 익명/인증 응답 코드는 `api_responses`에 기록합니다. 검증 도구의 인증을 비인증 성공 검증이라고 표현하지 않습니다.

이후 실행 결과가 첫 실행 기록보다 최신입니다. 배포까지 완료했는지는 Actions의 `deploy` 및 `verify-deployed` 결과를 별도로 확인합니다. Pages를 아직 활성화하지 않은 저장소는 Settings → Pages → Source: GitHub Actions 설정이 필요합니다.
