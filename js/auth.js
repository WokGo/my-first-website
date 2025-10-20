// auth.js - form handling and mock auth (updates localStorage to represent session)
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  if (signupForm) signupForm.addEventListener('submit', handleSignup);
});

async function handleLogin(e) {
  e.preventDefault();
  clearError('login-general-error');
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const remember = document.getElementById('remember')?.checked;

  if (!validateEmail(email)) return showError('login-general-error', '유효한 이메일을 입력하세요.');
  if (!password || password.length < 6) return showError('login-general-error', '비밀번호를 확인하세요.');

  try {
    // TODO: Replace mock with real API call
    const res = await mockLoginAPI(email, password);
    if (res.success) {
      // Save "session" in localStorage (for demo). Replace with secure token storage via backend.
      const user = { username: res.username || email.split('@')[0], email };
      localStorage.setItem('authUser', JSON.stringify(user));
      if (res.token) localStorage.setItem('authToken', res.token);
      // Redirect to dashboard or previous page
      window.location.href = '/index.html';
    } else {
      showError('login-general-error', res.message || '로그인 실패');
    }
  } catch (err) {
    showError('login-general-error', '서버 오류가 발생했습니다. 다시 시도해주세요.');
  }
}

async function handleSignup(e) {
  e.preventDefault();
  clearError('signup-general-error');
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirmPassword').value;

  if (!username || username.length < 3) return showError('signup-general-error', '사용자 이름은 3자 이상이어야 합니다.');
  if (!validateEmail(email)) return showError('signup-general-error', '유효한 이메일을 입력하세요.');
  if (!password || password.length < 8) return showError('signup-general-error', '비밀번호는 최소 8자 이상이어야 합니다.');
  if (password !== confirmPassword) return showError('signup-general-error', '비밀번호가 일치하지 않습니다.');

  try {
    // TODO: Replace mock with real API call
    const res = await mockSignupAPI(username, email, password);
    if (res.success) {
      // Optionally auto-login, here redirect to login page
      window.location.href = '/auth/login.html';
    } else {
      showError('signup-general-error', res.message || '회원가입 실패');
    }
  } catch (err) {
    showError('signup-general-error', '서버 오류가 발생했습니다. 다시 시도해주세요.');
  }
}

// Helpers
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function showError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'block';
  el.textContent = msg;
}
function clearError(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'none';
  el.textContent = '';
}

// Mock APIs (replace with fetch to your backend)
async function mockLoginAPI(email, password) {
  await new Promise(r => setTimeout(r, 600));
  // simple demo rule: any password 'password' or length>=6 succeeds
  if (password.length >= 6) {
    return { success: true, username: email.split('@')[0], token: 'demo-token' };
  }
  return { success: false, message: '잘못된 인증 정보' };
}
async function mockSignupAPI(username, email, password) {
  await new Promise(r => setTimeout(r, 800));
  // demo success
  return { success: true, message: '회원가입이 완료되었습니다' };
}
