// Header include + auth UI management
document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('site-header');
  if (!headerContainer) return;

  // Load header HTML and insert
  fetch('/includes/header.html')
    .then(res => {
      if (!res.ok) throw new Error('header include load failed');
      return res.text();
    })
    .then(html => {
      headerContainer.innerHTML = html;
      bindAuthUI();
    })
    .catch(err => {
      // Fallback: insert a minimal header if include fails
      headerContainer.innerHTML = `
        <nav class="site-header-nav">
          <div class="brand"><a href="/index.html">Miogun</a></div>
          <ul class="main-nav">
            <li><a href="/index.html">Home</a></li>
            <li><a href="/about.html">About</a></li>
            <li><a href="/projects.html">Projects</a></li>
            <li><a href="/contact.html">Contact</a></li>
            <li><a href="/board.html">Board</a></li>
          </ul>
          <div id="auth-actions" class="auth-actions">
            <a id="login-link" class="auth-btn" href="/auth/login.html">로그인</a>
            <a id="signup-link" class="auth-btn" href="/auth/signup.html">회원가입</a>
          </div>
        </nav>`;
      bindAuthUI();
    });

  function bindAuthUI() {
    const authActions = document.getElementById('auth-actions');
    if (!authActions) return;

    // Render auth UI based on localStorage "authUser"
    const authUserJson = localStorage.getItem('authUser');
    if (authUserJson) {
      let user;
      try { user = JSON.parse(authUserJson); } catch(e){ user = null; }
      if (user && user.username) {
        authActions.innerHTML = `
          <span class="welcome">안녕하세요, ${escapeHtml(user.username)}</span>
          <button id="logout-btn" class="auth-btn">로그아웃</button>
        `;
        const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('authUser');
          // Optionally remove token if stored
          localStorage.removeItem('authToken');
          bindAuthUI(); // re-render
          // If on a protected page, redirect to home
          if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
            window.location.href = '/index.html';
          }
        });
        return;
      }
    }

    // Default: show 로그인 / 회원가입
    authActions.innerHTML = `
      <a id="login-link" class="auth-btn" href="/auth/login.html">로그인</a>
      <a id="signup-link" class="auth-btn" href="/auth/signup.html">회원가입</a>
    `;
    // no extra handlers needed for links
  }

  // Basic XSS escape helper for display-only
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
});
