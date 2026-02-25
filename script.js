// ─── Style configuration ────────────────────────────────────────────────────

const STYLES = ['cli', 'professional', 'retro'];

const styleConfig = {
    cli: {
        stylesheet: 'cli_style/styles.css',
        logo: '<span class="terminal-prompt">$</span> muntasir.dev',
        aboutTitle: '<span class="terminal-prompt">$</span> cat about.txt',
        skillsTitle: '<span class="terminal-prompt">$</span> ls -la skills/',
        skillsSubtitle: 'Technologies and tools I work with',
        projectsTitle: '<span class="terminal-prompt">$</span> git log --projects',
        projectsSubtitle: 'Featured projects from my GitHub portfolio',
        experienceTitle: '<span class="terminal-prompt">$</span> history --work',
        contactTitle: '<span class="terminal-prompt">$</span> connect --with muntasir',
        contactSubtitle: "Let's build something amazing together",
        footerText: '<span class="terminal-prompt">$</span> Built by Muntasir Hossain',
        footerCopyright: '© 2026 Muntasir Hossain. Software Engineer.',
        typing: {
            items: ['whoami', 'cat skills.txt', 'git log --projects', 'echo "Building efficient solutions"'],
            targetId: 'cli-typed',
            outputSelector: '.terminal-output',
        },
    },
    professional: {
        stylesheet: 'professional_style/styles.css',
        logo: 'muntasir.dev',
        aboutTitle: 'About Me',
        skillsTitle: 'Skills',
        skillsSubtitle: 'Technologies and tools I work with',
        projectsTitle: 'Projects',
        projectsSubtitle: 'Featured projects from my GitHub portfolio',
        experienceTitle: 'Experience',
        contactTitle: 'Get In Touch',
        contactSubtitle: "Let's build something amazing together",
        footerText: 'Built by Muntasir Hossain',
        footerCopyright: '© 2026 Muntasir Hossain. Software Engineer.',
        typing: null,
    },
    retro: {
        stylesheet: 'retro_style/styles.css',
        logo: '🎮 MUNTASIR.DEV',
        aboutTitle: '<span class="section-icon">📖</span> ABOUT ME',
        skillsTitle: '<span class="section-icon">⚡</span> POWER-UPS & SKILLS',
        skillsSubtitle: 'My Tech Arsenal',
        projectsTitle: '<span class="section-icon">🎯</span> ACHIEVEMENTS & PROJECTS',
        projectsSubtitle: 'Level Completed!',
        experienceTitle: '<span class="section-icon">🏆</span> EXPERIENCE POINTS',
        contactTitle: '<span class="section-icon">💬</span> JOIN MY PARTY',
        contactSubtitle: "Let's team up and build something epic!",
        footerText: '<span class="game-icon">🎮</span> Crafted by Muntasir Hossain',
        footerCopyright: '© 2026 Muntasir Hossain • Software Engineer • Game On!',
        typing: {
            items: ['PLAYER: MUNTASIR', 'LOADING SKILLS...', 'READY TO CODE!', 'MISSION: BUILD APPS'],
            targetId: 'retro-typed',
            outputSelector: '.game-output',
        },
    },
};

// ─── Light/dark theme ────────────────────────────────────────────────────────

const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
const savedColorTheme = localStorage.getItem('colorTheme') || 'dark';
html.setAttribute('data-theme', savedColorTheme);

themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('colorTheme', next);
});

// ─── Style switching ─────────────────────────────────────────────────────────

let currentStyle = localStorage.getItem('portfolioStyle') || 'cli';

function applyStyle(styleName, animate = false) {
    const config = styleConfig[styleName];
    if (!config) return;

    const doSwitch = () => {
        // Update body attribute
        document.body.dataset.style = styleName;

        // Swap stylesheet
        document.getElementById('theme-stylesheet').href = config.stylesheet;

        // Update dynamic text
        document.getElementById('nav-logo').innerHTML = config.logo;
        document.getElementById('about-title').innerHTML = config.aboutTitle;
        document.getElementById('skills-title').innerHTML = config.skillsTitle;
        document.getElementById('skills-subtitle').textContent = config.skillsSubtitle;
        document.getElementById('projects-title').innerHTML = config.projectsTitle;
        document.getElementById('projects-subtitle').textContent = config.projectsSubtitle;
        document.getElementById('experience-title').innerHTML = config.experienceTitle;
        document.getElementById('contact-title').innerHTML = config.contactTitle;
        document.getElementById('contact-subtitle').textContent = config.contactSubtitle;
        document.getElementById('footer-text').innerHTML = config.footerText;
        document.getElementById('footer-copyright').textContent = config.footerCopyright;

        // Update carousel active state
        document.querySelectorAll('.carousel-item').forEach(item => {
            item.classList.toggle('active', item.dataset.style === styleName);
        });

        // Reset and restart typing animation
        stopTyping();
        if (config.typing) {
            // Reset output visibility
            const output = document.querySelector(config.typing.outputSelector);
            if (output) output.style.display = 'none';
            const target = document.getElementById(config.typing.targetId);
            if (target) target.textContent = '';
            setTimeout(startTyping, 600);
        }

        currentStyle = styleName;
        localStorage.setItem('portfolioStyle', styleName);
    };

    if (animate) {
        document.body.classList.add('style-fading');
        setTimeout(() => {
            doSwitch();
            document.body.classList.remove('style-fading');
        }, 180);
    } else {
        doSwitch();
    }
}

// ─── Carousel navigation ─────────────────────────────────────────────────────

document.getElementById('carousel-prev').addEventListener('click', () => {
    const idx = STYLES.indexOf(currentStyle);
    applyStyle(STYLES[(idx - 1 + STYLES.length) % STYLES.length], true);
});

document.getElementById('carousel-next').addEventListener('click', () => {
    const idx = STYLES.indexOf(currentStyle);
    applyStyle(STYLES[(idx + 1) % STYLES.length], true);
});

document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('click', () => {
        if (item.dataset.style !== currentStyle) {
            applyStyle(item.dataset.style, true);
        }
    });
});

// ─── Typing animation ────────────────────────────────────────────────────────

let typingTimeout = null;
let typingState = { index: 0, char: 0, deleting: false, waiting: false };

function stopTyping() {
    clearTimeout(typingTimeout);
    typingTimeout = null;
    typingState = { index: 0, char: 0, deleting: false, waiting: false };
}

function startTyping() {
    const config = styleConfig[currentStyle];
    if (!config || !config.typing) return;

    const { items, targetId, outputSelector } = config.typing;
    const target = document.getElementById(targetId);
    const output = document.querySelector(outputSelector);
    if (!target) return;

    typingState = { index: 0, char: 0, deleting: false, waiting: false };

    function tick() {
        const { index, char, deleting, waiting } = typingState;
        const current = items[index];

        if (waiting) return;

        if (!deleting) {
            target.textContent = current.substring(0, char + 1);
            typingState.char++;

            if (typingState.char > current.length) {
                typingState.char = current.length;
                typingState.waiting = true;

                // Show output panel on first command
                if (index === 0 && output) {
                    setTimeout(() => { output.style.display = 'block'; }, 500);
                }

                typingTimeout = setTimeout(() => {
                    typingState.deleting = true;
                    typingState.waiting = false;
                    typingTimeout = setTimeout(tick, 50);
                }, 2000);
                return;
            }
            typingTimeout = setTimeout(tick, 100);
        } else {
            target.textContent = current.substring(0, char - 1);
            typingState.char--;

            if (typingState.char <= 0) {
                typingState.char = 0;
                typingState.deleting = false;
                typingState.index = (index + 1) % items.length;
                typingTimeout = setTimeout(tick, 500);
                return;
            }
            typingTimeout = setTimeout(tick, 50);
        }
    }

    typingTimeout = setTimeout(tick, 1000);
}

// ─── Custom cursor ───────────────────────────────────────────────────────────

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;
let cursorScale = 1, followerScale = 1;

document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;
    followerX += (mouseX - followerX) * 0.2;
    followerY += (mouseY - followerY) * 0.2;

    if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        cursor.style.transform = `translate(-50%, -50%) scale(${cursorScale})`;
    }
    if (cursorFollower) {
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
        cursorFollower.style.transform = `translate(-50%, -50%) scale(${followerScale})`;
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .project-card, .skill-category, .contact-item, .highlight-item, .timeline-content').forEach(el => {
    el.addEventListener('mouseenter', () => { cursorScale = 1.8; followerScale = 1.5; });
    el.addEventListener('mouseleave', () => { cursorScale = 1; followerScale = 1; });
});

// ─── Smooth scroll ───────────────────────────────────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.nav').offsetHeight;
            window.scrollTo({ top: target.offsetTop - navHeight - 20, behavior: 'smooth' });
        }
    });
});

// ─── Scroll: nav active state ────────────────────────────────────────────────

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--accent-primary)' : '';
    });
});

// ─── Scroll: parallax hero widget ────────────────────────────────────────────

window.addEventListener('scroll', () => {
    if (window.scrollY >= window.innerHeight) return;
    const widget = document.querySelector('.terminal-window') || document.querySelector('.game-console');
    if (widget && getComputedStyle(widget).display !== 'none') {
        widget.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
});

// ─── Scroll: fade-in animations ──────────────────────────────────────────────

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.project-card, .skill-category, .timeline-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// ─── Stats counter ───────────────────────────────────────────────────────────

function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const inc = target / (duration / 16);
    const timer = setInterval(() => {
        start += inc;
        if (start >= target) {
            el.textContent = Math.ceil(target);
            clearInterval(timer);
        } else {
            el.textContent = Math.ceil(start);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(stat => {
                if (stat.textContent === '∞') return;
                const target = parseInt(stat.textContent.replace('+', ''));
                stat.textContent = '0';
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ─── Project card tilt ───────────────────────────────────────────────────────

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

// ─── Button ripple ───────────────────────────────────────────────────────────

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
            width:${size}px; height:${size}px;
            left:${e.clientX - rect.left - size / 2}px;
            top:${e.clientY - rect.top - size / 2}px;
            position:absolute; border-radius:50%;
            background:rgba(255,255,255,0.5);
            transform:scale(0); animation:ripple 0.6s ease-out;
            pointer-events:none;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

// ─── Scroll progress bar ─────────────────────────────────────────────────────

const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position:fixed; top:0; left:0; height:3px;
    background:var(--accent-gradient, var(--accent-primary));
    width:0%; z-index:9999; transition:width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = `${(window.scrollY / total) * 100}%`;
});

// ─── Keyboard shortcuts ──────────────────────────────────────────────────────

document.addEventListener('keydown', e => {
    const active = document.activeElement;
    if (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') return;

    // T → toggle light/dark
    if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey) {
        themeToggle.click();
    }
    // ← / → → cycle style
    if (e.key === 'ArrowLeft') document.getElementById('carousel-prev').click();
    if (e.key === 'ArrowRight') document.getElementById('carousel-next').click();
});

// ─── Init ────────────────────────────────────────────────────────────────────

window.addEventListener('load', () => {
    // Apply saved style (no fade on initial load)
    applyStyle(currentStyle, false);
    startTyping();

    // Fade in page
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.4s ease';
        document.body.style.opacity = '1';
    });
});

// ─── Console easter egg ──────────────────────────────────────────────────────

console.log('%c👋 Hello, curious developer!', 'color:#fff; font-size:18px; font-weight:bold;');
console.log('%cPress ← → to switch styles. Press T to toggle dark/light.', 'color:#aaa; font-size:13px;');
console.log('%cEmail: cto.nector.iot@gmail.com', 'color:#888; font-size:12px;');
