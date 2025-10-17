// Form validation and submission handling
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.querySelector('input[name="remember"]').checked;

    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        return;
    }

    try {
        // TODO: Implement actual API call
        const response = await mockLoginAPI(email, password);
        if (response.success) {
            window.location.href = '/dashboard'; // Redirect to dashboard
        } else {
            showError('general', 'Invalid email or password');
        }
    } catch (error) {
        showError('general', 'An error occurred. Please try again later.');
    }
}

async function handleSignup(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate input
    if (!username || username.length < 3) {
        showError('username', 'Username must be at least 3 characters long');
        return;
    }

    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        return;
    }

    if (password.length < 8) {
        showError('password', 'Password must be at least 8 characters long');
        return;
    }

    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        return;
    }

    try {
        // TODO: Implement actual API call
        const response = await mockSignupAPI(username, email, password);
        if (response.success) {
            window.location.href = '/login.html'; // Redirect to login page
        } else {
            showError('general', response.message);
        }
    } catch (error) {
        showError('general', 'An error occurred. Please try again later.');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(fieldId, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    const field = document.getElementById(fieldId);
    const existingError = field.parentElement.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    field.parentElement.appendChild(errorDiv);
}

// Mock API functions (Replace with actual API calls)
async function mockLoginAPI(email, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Login successful'
            });
        }, 1000);
    });
}

async function mockSignupAPI(username, email, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Account created successfully'
            });
        }, 1000);
    });
}