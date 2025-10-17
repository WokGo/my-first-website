document.addEventListener('DOMContentLoaded', () => {
    // 모바일 메뉴 토글
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 컨택트 폼 제출 처리
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // 폼 제출 메시지 (실제로는 서버로 전송해야 함)
            alert('메시지가 전송되었습니다!\n\n' + 
                  `이름: ${formData.name}\n` +
                  `이메일: ${formData.email}\n` +
                  `메시지: ${formData.message}`);
            
            // 폼 초기화
            contactForm.reset();
        });
    }
});
