// Custom Cursor (compatible with static hosting)
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
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

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, .feature-card, .action-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor--active');
            });

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor--active');
            });
        });
    }
} else {
    // Hide cursor on touch devices
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    if (cursor) cursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';
}

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

// Scroll Progress Indicator
const scrollProgressBar = document.querySelector('.scroll-progress-bar');

function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    if (scrollProgressBar) {
        scrollProgressBar.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('load', updateScrollProgress);

// Navigation functionality
const navbar = document.querySelector('.navbar');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Mobile menu toggle
if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
        const isOpen = navLinks.classList.contains('mobile-open');
        mobileMenuToggle.innerHTML = `<span class="material-icons">${isOpen ? 'close' : 'menu'}</span>`;
    });

    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            navLinks.classList.remove('mobile-open');
            mobileMenuToggle.innerHTML = '<span class="material-icons">menu</span>';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('mobile-open');
            mobileMenuToggle.innerHTML = '<span class="material-icons">menu</span>';
        }
    });
}

// Change navbar style on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveNavLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Enhanced scroll effects
function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Parallax effect for background elements
    const meshBackground = document.querySelector('.mesh-background');
    if (meshBackground) {
        meshBackground.style.transform = `translateY(${rate * 0.1}px)`;
    }

    // Dynamic navbar shadow based on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const shadowOpacity = Math.min(scrolled / 200, 0.3);
        navbar.style.boxShadow = `0 4px 20px rgba(0, 0, 0, ${shadowOpacity})`;
    }

    updateActiveNavLink();
}

window.addEventListener('scroll', updateScrollEffects);

// Simple fade-in animation for feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.2}s`;

    // Trigger animation after a short delay
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
});

// Newsletter form handling (prevent default for demo)
document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('.newsletter-input');
    if (input?.value) {
        alert('Thank you for subscribing! We\'ll notify you when Throtl launches.');
        input.value = '';
    }
});

// Phone Mockup Carousel Functionality
class PhoneCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000; // 4 seconds

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        // Set up event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        // Touch/swipe support
        this.initTouchSupport();

        // Start autoplay
        this.startAutoPlay();

        // Pause autoplay on hover
        const phoneContainer = document.querySelector('.phone-mockup-container');
        if (phoneContainer) {
            phoneContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
            phoneContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }

    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');

        // Update current slide
        this.currentSlide = index;

        // Handle wraparound
        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        } else if (this.currentSlide >= this.slides.length) {
            this.currentSlide = 0;
        }

        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');

        // Reset autoplay timer
        this.resetAutoPlay();
    }

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }

    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    initTouchSupport() {
        const phoneScreen = document.querySelector('.phone-screen');
        if (!phoneScreen) return;

        let startX = 0;
        let endX = 0;

        phoneScreen.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.stopAutoPlay(); // Pause autoplay during touch
        });

        phoneScreen.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            // Minimum swipe distance
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide(); // Swipe left
                } else {
                    this.prevSlide(); // Swipe right
                }
            }

            this.startAutoPlay(); // Resume autoplay
        });
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PhoneCarousel();
});

// Performance optimization: Reduce animations on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}
