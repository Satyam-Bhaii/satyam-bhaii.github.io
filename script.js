// Interactive effects and animations
document.addEventListener('DOMContentLoaded', function() {
    // Draggable Terminal Functionality
    const terminal = document.getElementById('draggable-terminal');
    const terminalHeader = document.getElementById('terminal-header');
    const minimizeBtn = document.getElementById('minimize-btn');
    const terminalBody = document.getElementById('terminal-body');

    if (terminal && terminalHeader) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        // Load saved position from localStorage
        const savedPosition = localStorage.getItem('terminalPosition');
        if (savedPosition) {
            const pos = JSON.parse(savedPosition);
            terminal.style.left = pos.x + 'px';
            terminal.style.top = pos.y + 'px';
        }

        terminalHeader.addEventListener('mousedown', dragStart);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('mousemove', drag);

        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === terminalHeader || terminalHeader.contains(e.target)) {
                isDragging = true;
            }
        }

        function dragEnd() {
            initialX = currentX;
            initialY = currentY;

            isDragging = false;

            // Save position to localStorage
            const rect = terminal.getBoundingClientRect();
            const pos = {
                x: rect.left,
                y: rect.top
            };
            localStorage.setItem('terminalPosition', JSON.stringify(pos));
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();

                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, terminal);
            }
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }
    }

    // Create custom cursor elements
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    const cursorTrail = document.createElement('div');
    cursorTrail.classList.add('cursor-trail');
    document.body.appendChild(cursorTrail);

    // Create scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.classList.add('scroll-progress');
    document.body.appendChild(scrollProgress);

    // Track mouse position for cursor and trail
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update main cursor position
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Animate the trail to follow the cursor with a delay
    function animateTrail() {
        // Calculate the difference between cursor and trail positions
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;

        // Move the trail towards the cursor with easing (increased responsiveness for smaller cursor)
        trailX += dx * 0.4;
        trailY += dy * 0.4;

        // Update trail position
        cursorTrail.style.left = `${trailX}px`;
        cursorTrail.style.top = `${trailY}px`;

        requestAnimationFrame(animateTrail);
    }

    animateTrail();

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, .work-link, .social-link, .feature-card, .work-card, .stat-card, .contact-card, .nav-links a');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');

            // Add glow effect based on element type
            if (element.classList.contains('feature-card')) {
                if (element.classList.contains('purple-glow')) {
                    element.style.boxShadow = '0 20px 40px rgba(138, 43, 226, 0.4)';
                } else if (element.classList.contains('blue-glow')) {
                    element.style.boxShadow = '0 20px 40px rgba(30, 144, 255, 0.4)';
                } else if (element.classList.contains('teal-glow')) {
                    element.style.boxShadow = '0 20px 40px rgba(0, 128, 128, 0.4)';
                }
            } else if (element.classList.contains('work-card')) {
                element.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
            } else if (element.classList.contains('stat-card')) {
                element.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
            } else if (element.classList.contains('contact-card')) {
                element.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.2)';
            } else if (element.classList.contains('btn-primary')) {
                element.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.7)';
            } else if (element.classList.contains('btn-secondary')) {
                element.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.4)';
            } else if (element.classList.contains('nav-links')) {
                element.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.5)';
            }
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');

            // Remove glow effect based on element type
            if (element.classList.contains('feature-card')) {
                element.style.boxShadow = 'none';
            } else if (element.classList.contains('work-card')) {
                element.style.boxShadow = 'none';
            } else if (element.classList.contains('stat-card')) {
                element.style.boxShadow = 'none';
            } else if (element.classList.contains('contact-card')) {
                element.style.boxShadow = 'none';
            } else if (element.classList.contains('btn-primary')) {
                element.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
            } else if (element.classList.contains('btn-secondary')) {
                element.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.2)';
            } else if (element.classList.contains('nav-links')) {
                element.style.boxShadow = 'none';
            }
        });
    });

    // Add scroll progress bar functionality
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const scrollPercentRounded = Math.round(scrollPercent * 100);

        scrollProgress.style.width = `${scrollPercentRounded}%`;
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add hover effects to work cards
    const workCards = document.querySelectorAll('.work-card');

    workCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });

    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .hero-title, .hero-subtitle, .hero-buttons, .work-card, .stat-card, .contact-card, .about-description').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add button ripple effects
    const buttons = document.querySelectorAll('button, .work-link, .social-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            // Position the ripple
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            // Add ripple to button
            button.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';

        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Add cursor blink effect after typing is complete
                const cursor = document.createElement('span');
                cursor.innerHTML = '|';
                cursor.style.opacity = '1';
                cursor.style.animation = 'blink 1s infinite';
                cursor.style.marginLeft = '10px';
                heroTitle.appendChild(cursor);
            }
        }

        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }

    // Add typing animation to section titles on pages that need it
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        if (!title.classList.contains('animated-title')) {
            title.classList.add('animated-title');
            const originalText = title.textContent;
            title.textContent = '';

            let i = 0;
            function typeSectionTitle() {
                if (i < originalText.length) {
                    title.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeSectionTitle, 30);
                }
            }

            // Start typing after a delay
            setTimeout(typeSectionTitle, 500);
        }
    });

    // Add CSS for cursor blink animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Add ripple effect CSS
    const rippleCSS = document.createElement('style');
    rippleCSS.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleCSS);

    // Add floating animation to feature card icons
    const icons = document.querySelectorAll('.card-icon i, .contact-icon');
    icons.forEach(icon => {
        // Add random floating animation
        function floatAnimation() {
            const x = Math.random() * 20 - 10;
            const y = Math.random() * 20 - 10;

            icon.style.transform = `translate(${x}px, ${y}px)`;

            setTimeout(() => {
                icon.style.transform = 'translate(0, 0)';
            }, 1000);
        }

        // Apply floating animation periodically
        setInterval(floatAnimation, 3000);
    });

    // Add parallax effect to background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const cubes = document.querySelectorAll('.floating-cube');

        cubes.forEach((cube, index) => {
            const speed = 0.5 - (index * 0.1);
            const yPos = -(scrolled * speed);
            cube.style.transform = `translateY(${yPos}px) rotateX(${scrolled * 0.1}deg) rotateY(${scrolled * 0.1}deg)`;
        });
    });

    // Add enhanced particle background effect
    createParticleBackground();

    function createParticleBackground() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particles = [];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Add glow effect
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        function initParticles() {
            for (let i = 0; i < 80; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            const maxDistance = 100;

            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const distance = Math.sqrt(
                        Math.pow(particles[a].x - particles[b].x, 2) +
                        Math.pow(particles[a].y - particles[b].y, 2)
                    );

                    if (distance < maxDistance) {
                        const opacity = 1 - distance/maxDistance;
                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            connectParticles();

            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        // Handle resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Form submission handling for Formspree
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Show a temporary message while form is being submitted
            const messageDiv = document.getElementById('form-message');
            if (messageDiv) {
                messageDiv.textContent = 'Sending message...';
                messageDiv.className = 'form-message';
                messageDiv.style.display = 'block';
            }

            // Form will be handled by Formspree
            // The page will reload after submission due to the form action
        });
    }

    // Check if form was submitted successfully (Formspree redirects back)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const messageDiv = document.getElementById('form-message');
        if (messageDiv) {
            messageDiv.textContent = 'Thank you for your message! I will get back to you soon.';
            messageDiv.className = 'form-message success';
            messageDiv.style.display = 'block';

            // Auto-hide after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinksArray = document.querySelectorAll('.nav-links a');

    navLinksArray.forEach(link => {
        if (currentPage === '' && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        } else if (currentPage === link.getAttribute('href')) {
            link.classList.add('active');
        } else if (currentPage.includes('pages/') && link.getAttribute('href').includes(currentPage.replace('pages/', ''))) {
            link.classList.add('active');
        }
    });

    // Add floating effect to elements
    const floatingElements = document.querySelectorAll('.floating-element, .cpu-illustration, .developer-avatar');
    floatingElements.forEach(element => {
        element.classList.add('floating-element');
    });

    // Add enhanced animations to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add enhanced animations to work cards
    const workCardsAll = document.querySelectorAll('.work-card');
    workCardsAll.forEach((card, index) => {
        // Add staggered animation delay
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});