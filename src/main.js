document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок
    lucide.createIcons();

    // 2. Хедер и Скролл
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.style.padding = window.scrollY > 50 ? '12px 0' : '20px 0';
        header.style.background = window.scrollY > 50 ? 'rgba(10, 11, 16, 0.95)' : 'rgba(10, 11, 16, 0.7)';
    });

    // 3. Мобильное меню
    const burger = document.querySelector('.burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    burger.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // 4. Эффект появления при скролле (Intersection Observer)
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger эффект для карточек в сетках
                if (entry.target.classList.contains('benefit-card') || entry.target.classList.contains('blog-card')) {
                    const cards = Array.from(entry.target.parentElement.children);
                    const index = cards.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 5. Эффект печатающегося текста
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const text = typewriterElement.innerText;
        typewriterElement.innerText = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                typewriterElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        };
        setTimeout(type, 1000);
    }

    // 6. Капча и Форма
    let captchaResult = 0;
    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 9) + 1;
        const n2 = Math.floor(Math.random() * 9) + 1;
        captchaResult = n1 + n2;
        const q = document.getElementById('captcha-question');
        if (q) q.innerText = `${n1} + ${n2}`;
    };
    generateCaptcha();

    const phoneInput = document.getElementById('user_phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    const contactForm = document.getElementById('ai-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const ans = parseInt(document.getElementById('captcha_answer').value);
            const msg = document.getElementById('form-message');
            
            if (ans !== captchaResult) {
                msg.innerText = "Ошибка капчи!";
                msg.className = "form-message error";
                generateCaptcha();
                return;
            }

            const btn = document.getElementById('submit-btn');
            btn.disabled = true;
            btn.innerText = "Отправка...";

            setTimeout(() => {
                msg.innerText = "Успешно! Мы свяжемся с вами.";
                msg.className = "form-message success";
                contactForm.reset();
                generateCaptcha();
                btn.disabled = false;
                btn.innerText = "Запросить доступ";
            }, 1500);
        });
    }

    // 7. Cookie Popup Logic
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookies_accepted')) {
        setTimeout(() => cookiePopup.classList.add('active'), 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookies_accepted', 'true');
        cookiePopup.classList.remove('active');
    });
});