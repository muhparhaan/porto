document.addEventListener('DOMContentLoaded', () => {
    // ===== SOUND EFFECT ON NAV HOVER =====
    const hoverSound = new Audio('hover.mp3');
    hoverSound.volume = 0.3; // Atur volume jika perlu
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Agar suara bisa diputar berulang tanpa delay
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });

    // ===== LOADER SCRIPT =====
    const loaderText = document.getElementById('loader-text');
    const mainContent = document.getElementById('main-content');
    const texts = [
        'INITIALIZING SYSTEM...',
        'CONNECTING TO UNILA GRID...',
        'LOADING STUDENT PROFILE: 2315061083...',
        'DECRYPTING PERSONAL DATA...',
        'CONNECTION ESTABLISHED. WELCOME.'
    ];
    let textIndex = 0;
    
    const interval = setInterval(() => {
        textIndex++;
        if (textIndex < texts.length) {
            loaderText.textContent = texts[textIndex];
        } else {
            clearInterval(interval);
            const loader = document.getElementById('loader');
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.classList.add('hidden');
                mainContent.classList.remove('hidden');
                mainContent.style.opacity = '1';
                // Start typewriter after loader is gone
                startTypewriter();
            }, 500); // Match CSS transition
        }
    }, 800);

    // ===== TYPEWRITER EFFECT (UPDATED) =====
    const typewriterElement = document.querySelector('.typewriter-text');
    // PHRASES ARE NOW UPDATED WITH YOUR PERSONAL INFO
    const phrases = [
        'Muhammad Farhan',
        'Teknik Informatika',
        'Universitas Lampung'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function startTypewriter() {
        // Prevent error if element not found
        if (!typewriterElement) return;

        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            // Deleting text
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            setTimeout(() => isDeleting = true, 2500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        const typingSpeed = isDeleting ? 75 : 120;
        setTimeout(startTypewriter, typingSpeed);
    }
    
    // ===== SCROLL FADE-IN EFFECT =====
    const sections = document.querySelectorAll('.section-container');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

});