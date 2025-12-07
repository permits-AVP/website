document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Simple animation for the button icon could go here
        });
    }

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.hero-content, .glass-card, .timeline-item, .contact-container');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        // Add stagger delay for cards
        if (el.classList.contains('glass-card')) {
            el.style.transitionDelay = `${index % 4 * 0.1}s`;
        }
        observer.observe(el);
    });

    // Add visible class styles dynamically via JS or assume CSS handles it? 
    // Let's add a style block for the 'visible' class to ensure it works without modifying CSS file again
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Mobile Menu Active State */
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 80px;
                left: 0;
                width: 100%;
                background: rgba(5, 5, 16, 0.95);
                backdrop-filter: blur(20px);
                padding: 2rem;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                animation: slideDown 0.3s ease-out;
            }
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        }
    `;
    document.head.appendChild(style);

    // --- Mouse Parallax Effect for Orbs ---
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const orb1 = document.querySelector('.orb-1');
        const orb2 = document.querySelector('.orb-2');

        if (orb1) orb1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        if (orb2) orb2.style.transform = `translate(-${x * 30}px, -${y * 30}px)`;
    });

    // --- Form Submission ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const formData = {
                name: contactForm.querySelector('input[placeholder="Name"]').value,
                email: contactForm.querySelector('input[placeholder="Email"]').value,
                service: contactForm.querySelector('select').value,
                message: contactForm.querySelector('textarea').value
            };

            // Simulate form submission for static site demo
            setTimeout(() => {
                alert('Request submitted successfully! We will contact you shortly.');
                contactForm.reset();
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});
