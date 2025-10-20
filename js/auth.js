// js/auth.js

// 회원가입 처리
function signup(event) {
  event.preventDefault();

  const id = document.getElementById("signup-id").value.trim();
  const pw = document.getElementById("signup-password").value.trim();

  if (!id || !pw) {
    alert("아이디와 비밀번호를 입력하세요.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[id]) {
    alert("이미 존재하는 아이디입니다.");
    return;
  }

  users[id] = { password: pw };
  localStorage.setItem("users", JSON.stringify(users));

  alert("회원가입 성공! 로그인 페이지로 이동합니다.");
  window.location.href = "/auth/login.html";
}

// 로그인 처리
function login(event) {
  event.preventDefault();

  const id = document.getElementById("login-id").value.trim();
  const pw = document.getElementById("login-password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[id] || users[id].password !== pw) {
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", id);

  alert(`${id}님 환영합니다!`);
  window.location.href = "/index.html";
}

// 로그아웃 처리
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "/index.html";
}
