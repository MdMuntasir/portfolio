// Theme Management
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;
let cursorScale = 1;
let followerScale = 1;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animate() {
    // Main cursor follows immediately
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;

    // Follower has delay
    followerX += (mouseX - followerX) * 0.2;
    followerY += (mouseY - followerY) * 0.2;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    cursor.style.transform = `translate(-50%, -50%) scale(${cursorScale})`;

    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;
    cursorFollower.style.transform = `translate(-50%, -50%) scale(${followerScale})`;

    requestAnimationFrame(animate);
}

animate();

// Cursor interactions
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .contact-item, .highlight-item, .timeline-content');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorScale = 1.8;
        followerScale = 1.5;
    });

    el.addEventListener('mouseleave', () => {
        cursorScale = 1;
        followerScale = 1;
    });
});

// Terminal Typing Animation
const typedText = document.querySelector('.typed-text');
const cursorBlink = document.querySelector('.cursor-blink');
const terminalOutput = document.querySelector('.terminal-output');

const commands = [
    'whoami',
    'cat skills.txt',
    'git log --projects',
    'echo "Building the future with AI"'
];

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeCommand() {
    const currentCommand = commands[commandIndex];

    if (isWaiting) {
        return;
    }

    if (!isDeleting && charIndex <= currentCommand.length) {
        typedText.textContent = currentCommand.substring(0, charIndex);
        charIndex++;

        if (charIndex > currentCommand.length) {
            isWaiting = true;

            // Show output after typing completes on first command
            if (commandIndex === 0) {
                setTimeout(() => {
                    terminalOutput.style.display = 'block';
                }, 500);
            }

            setTimeout(() => {
                isDeleting = true;
                isWaiting = false;
            }, 2000);
        }

        setTimeout(typeCommand, 100);
    } else if (isDeleting && charIndex > 0) {
        typedText.textContent = currentCommand.substring(0, charIndex - 1);
        charIndex--;

        setTimeout(typeCommand, 50);
    } else {
        isDeleting = false;
        commandIndex = (commandIndex + 1) % commands.length;

        setTimeout(typeCommand, 500);
    }
}

// Start typing animation after page load
window.addEventListener('load', () => {
    setTimeout(typeCommand, 1000);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateOnScroll = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .contact-item');

animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add parallax effect to hero section
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');

    if (hero && scrollY < window.innerHeight) {
        const terminalWindow = document.querySelector('.terminal-window');
        if (terminalWindow) {
            terminalWindow.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    }

    lastScrollY = scrollY;
});

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent-primary)';
        }
    });
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add glow effect to skill items on hover
const skillItems = document.querySelectorAll('.skill-item');

// Skill items hover is now handled by CSS only

// Animate stats counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target === Infinity ? '∞' : Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(start);
        }
    }, 16);
}

// Trigger counter animation when stats are in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text === '∞') return;

                const target = parseInt(text.replace('+', ''));
                stat.textContent = '0';
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console Easter Egg
console.log('%c👋 Hello, curious developer!', 'color: #ffffff; font-size: 20px; font-weight: bold;');
console.log('%cI see you\'re checking out the code. Like what you see?', 'color: #d0d0d0; font-size: 14px;');
console.log('%cLet\'s build something amazing together!', 'color: #ffffff; font-size: 14px;');
console.log('%cEmail: cto.nector.iot@gmail.com', 'color: #a0a0a0; font-size: 12px;');

// Performance: Reduce animations on mobile
if (window.innerWidth <= 768) {
    document.querySelectorAll('*').forEach(el => {
        el.style.transition = 'none';
    });

    setTimeout(() => {
        document.querySelectorAll('*').forEach(el => {
            el.style.transition = '';
        });
    }, 100);
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            themeToggle.click();
        }
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Preload critical images
const imageUrls = [
    // Add any critical images here
];

imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
});

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--accent-gradient);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Add tooltip functionality
const addTooltips = () => {
    const elementsWithTitles = document.querySelectorAll('[title]');

    elementsWithTitles.forEach(el => {
        const title = el.getAttribute('title');
        el.removeAttribute('title');
        el.setAttribute('data-tooltip', title);

        el.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: var(--bg-tertiary);
                color: var(--text-primary);
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.85rem;
                border: 1px solid var(--border-color);
                z-index: 10000;
                pointer-events: none;
                white-space: nowrap;
            `;

            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

            this.tooltipElement = tooltip;
        });

        el.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
};

addTooltips();
