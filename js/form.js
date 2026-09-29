// form.js — Contact 폼 유효성 검사
// 흐름: 입력(input)/포커스 이탈(focusout)/제출(submit) → contactState(상태) 변경 → renderContactForm()

// 이메일 형식: "공백/@ 아닌 글자 + @ + 도메인 + . + 2글자 이상"
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// 필드별 검사 함수. 문제가 있으면 에러 문구를, 통과하면 빈 문자열('')을 돌려준다.
const fieldValidators = {
  name: (value) => {
    const text = value.trim();
    if (!text) return '이름을 입력해 주세요.';
    if (text.length < 2) return '이름은 2자 이상 입력해 주세요.';
    return '';
  },
  email: (value) => {
    const text = value.trim();
    if (!text) return '이메일을 입력해 주세요.';
    if (!EMAIL_PATTERN.test(text)) return '이메일 형식이 올바르지 않습니다. (예: name@example.com)';
    return '';
  },
  message: (value) => {
    const text = value.trim();
    if (!text) return '메시지를 입력해 주세요.';
    if (text.length < 10) return '메시지는 10자 이상 입력해 주세요.';
    return '';
  },
};

const FIELD_NAMES = Object.keys(fieldValidators); // ['name', 'email', 'message']

// 상태
//  errors    : 필드별 현재 에러 문구
//  touched   : 사용자가 이미 건드린(떠난) 필드인가 — 타이핑 도중 성급하게 에러를 보여 주지 않기 위해
//  submitted : 제출을 시도한 적이 있는가 — 시도했다면 모든 에러를 보여 준다
//  success   : 마지막 제출이 성공했는가
const contactState = { errors: {}, touched: {}, submitted: false, success: false };

// 렌더링: 상태 → 에러 메시지 표시/숨김, 입력창 빨간 테두리, 성공 메시지
function renderContactForm(form) {
  FIELD_NAMES.forEach((fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);
    const errorBox = document.querySelector(`#${fieldName}-error`);
    const isVisible = contactState.submitted || contactState.touched[fieldName];
    const message = isVisible ? contactState.errors[fieldName] ?? '' : '';

    errorBox.textContent = message; // 에러 문구는 입력창 바로 아래에 표시
    input.classList.toggle('is-invalid', Boolean(message));
    input.setAttribute('aria-invalid', String(Boolean(message)));
  });

  const statusBox = document.querySelector('#form-status');
  statusBox.textContent = contactState.success
    ? '입력하신 내용이 확인되었습니다. 감사합니다! (데모 폼이라 실제 전송은 하지 않습니다)'
    : '';
  statusBox.classList.toggle('is-success', contactState.success);
}

function initContactForm() {
  const form = document.querySelector('#contact-form');

  // input: 글자를 칠 때마다 그 필드만 다시 검사
  form.addEventListener('input', (event) => {
    const { name, value } = event.target; // 구조분해 할당
    if (!FIELD_NAMES.includes(name)) return;

    contactState.errors[name] = fieldValidators[name](value);
    contactState.success = false;
    renderContactForm(form);
  });

  // focusout: 필드를 떠나는 순간부터 그 필드의 에러를 보여 준다. (focus와 달리 버블링됨)
  form.addEventListener('focusout', (event) => {
    const { name, value } = event.target;
    if (!FIELD_NAMES.includes(name)) return;

    contactState.touched[name] = true;
    contactState.errors[name] = fieldValidators[name](value);
    renderContactForm(form);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // 기본 동작(페이지 새로고침 + 주소창에 값 붙이기)을 막는다.

    const values = Object.fromEntries(new FormData(form)); // { name, email, message }
    contactState.submitted = true;
    FIELD_NAMES.forEach((fieldName) => {
      contactState.errors[fieldName] = fieldValidators[fieldName](values[fieldName] ?? '');
    });

    const firstInvalidField = FIELD_NAMES.find((fieldName) => contactState.errors[fieldName]);
    if (firstInvalidField) {
      contactState.success = false;
      renderContactForm(form);
      form.querySelector(`[name="${firstInvalidField}"]`).focus(); // 고칠 곳으로 바로 이동
      return;
    }

    // 모두 통과: 입력값을 비우고 상태를 초기화한 뒤 성공 메시지를 보여 준다.
    form.reset();
    contactState.errors = {};
    contactState.touched = {};
    contactState.submitted = false;
    contactState.success = true;
    renderContactForm(form);
  });
}
