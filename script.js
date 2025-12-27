// Custom Cursor (only on non-touch devices)
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
} else {
    // Hide cursor on touch devices
    document.querySelector('.cursor').style.display = 'none';
    document.querySelector('.cursor-follower').style.display = 'none';
    document.body.style.cursor = 'auto';

    // Add simple touch handlers to give immediate feedback on tap
    document.querySelectorAll('.feature-card, .social-link, .action-btn').forEach(el => {
        el.addEventListener('touchstart', () => el.classList.add('tap-active'), { passive: true });
        el.addEventListener('touchend', () => el.classList.remove('tap-active'), { passive: true });
        el.addEventListener('touchcancel', () => el.classList.remove('tap-active'), { passive: true });
    });

    // Prevent some mobile browsers from keeping hover states
    document.body.classList.add('no-hover');
}

// Cursor interactions (only on non-touch devices)
if (!isTouchDevice) {
    const cursor = document.querySelector('.cursor');
    const interactiveElements = document.querySelectorAll('a, .feature-card, .action-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.classList.add('cursor--active');
        });
        
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.classList.remove('cursor--active');
        });
    });
}

// Animated Mesh Background with Interactive Lines
const meshBackground = document.getElementById('meshBackground');
const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.opacity = '0.3';
meshBackground.appendChild(canvas);

/* background gradient video/canvas removed per user request */

const ctx = canvas.getContext('2d');
let animationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create animated gradient lines
const lines = [];
const lineCount = 8;

for (let i = 0; i < lineCount; i++) {
    lines.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        vx1: (Math.random() - 0.5) * 0.5,
        vy1: (Math.random() - 0.5) * 0.5,
        vx2: (Math.random() - 0.5) * 0.5,
        vy2: (Math.random() - 0.5) * 0.5,
        color: i % 2 === 0 ? 'rgba(255, 107, 53, 0.15)' : 'rgba(20, 184, 166, 0.15)'
    });
}

function animateLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    lines.forEach(line => {
        // Update positions
        line.x1 += line.vx1;
        line.y1 += line.vy1;
        line.x2 += line.vx2;
        line.y2 += line.vy2;
        
        // Bounce off edges
        if (line.x1 < 0 || line.x1 > canvas.width) line.vx1 *= -1;
        if (line.y1 < 0 || line.y1 > canvas.height) line.vy1 *= -1;
        if (line.x2 < 0 || line.x2 > canvas.width) line.vx2 *= -1;
        if (line.y2 < 0 || line.y2 > canvas.height) line.vy2 *= -1;
        
        // Draw gradient line
        const gradient = ctx.createLinearGradient(line.x1, line.y1, line.x2, line.y2);
        gradient.addColorStop(0, line.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
    });
    
    // Draw connections between nearby lines
    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            const dx = (lines[i].x1 + lines[i].x2) / 2 - (lines[j].x1 + lines[j].x2) / 2;
            const dy = (lines[i].y1 + lines[i].y2) / 2 - (lines[j].y1 + lines[j].y2) / 2;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 300) {
                ctx.strokeStyle = `rgba(255, 107, 53, ${0.1 * (1 - distance / 300)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo((lines[i].x1 + lines[i].x2) / 2, (lines[i].y1 + lines[i].y2) / 2);
                ctx.lineTo((lines[j].x1 + lines[j].x2) / 2, (lines[j].y1 + lines[j].y2) / 2);
                ctx.stroke();
            }
        }
    }
    
    animationId = requestAnimationFrame(animateLines);
}

animateLines();

// Pause animation when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animationId);
    } else {
        animateLines();
    }
});

// Parallax effect on scroll (if content is scrollable)
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translate(${scrollY * speed}px, ${scrollY * speed * 0.5}px)`;
    });
});

// Mouse parallax effect
document.addEventListener('mousemove', (e) => {
    const mouseXPercent = (e.clientX / window.innerWidth) * 100;
    const mouseYPercent = (e.clientY / window.innerHeight) * 100;
    
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseXPercent - 50) * speed;
        const y = (mouseYPercent - 50) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add glow effect to brand name on hover
const brandName = document.querySelector('.brand-name');
if (brandName) {
    brandName.addEventListener('mouseenter', () => {
        brandName.style.textShadow = '0 0 30px rgba(255, 107, 53, 0.5)';
    });

    brandName.addEventListener('mouseleave', () => {
        brandName.style.textShadow = 'none';
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Performance optimization: Reduce animations on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

