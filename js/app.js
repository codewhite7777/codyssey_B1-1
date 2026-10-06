"use strict";

// defer로 HTML 파싱 후 실행되므로 아래 요소를 선택할 수 있습니다.
const statusMessage = document.querySelector("#script-status");
statusMessage.textContent = "JavaScript 연결 확인 완료";
