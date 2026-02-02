// Инициализация иконок Lucide
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Эффект смены прозрачности хедера при скролле
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(10, 11, 16, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(10, 11, 16, 0.7)';
        }
    });
    // Эффект печатающегося текста (Typewriter)
function initTypewriter() {
    const textElement = document.getElementById('typewriter');
    const text = textElement.innerText;
    textElement.innerText = '';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            textElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    
    // Запускаем через небольшую паузу после загрузки
    setTimeout(type, 1200);
}

// Плавное появление элементов при скролле
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    
    // В будущем будем добавлять класс .reveal всем новым секциям
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
    // (Добавьте это в уже существующий DOMContentLoaded)
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => observer.observe(el));
});
