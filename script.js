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

// Clean Carousel Functionality - Zero Margins/Padding
class CleanCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
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

        // Indicator navigation
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
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
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', () => this.stopAutoPlay());
            carouselWrapper.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }

    goToSlide(index) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');

        // Update current slide
        this.currentSlide = index;

        // Handle wraparound
        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        } else if (this.currentSlide >= this.slides.length) {
            this.currentSlide = 0;
        }

        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');

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
        const carouselViewport = document.querySelector('.carousel-viewport');
        if (!carouselViewport) return;

        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let isSwiping = false;
        let startTime = 0;

        // Touch start
        carouselViewport.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
            isSwiping = false;
            this.stopAutoPlay(); // Pause autoplay during touch

            // Add visual feedback
            carouselViewport.style.transition = 'none';
        }, { passive: false });

        // Touch move - detect if it's a swipe
        carouselViewport.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;

            endX = e.touches[0].clientX;
            endY = e.touches[0].clientY;

            const diffX = Math.abs(endX - startX);
            const diffY = Math.abs(endY - startY);

            // If horizontal movement is greater than vertical, it's a swipe
            if (diffX > diffY && diffX > 10) {
                isSwiping = true;
                e.preventDefault(); // Prevent scrolling

                // Add subtle drag feedback
                const translateX = (endX - startX) * 0.3;
                carouselViewport.style.transform = `translateX(${translateX}px)`;
            }
        }, { passive: false });

        // Touch end
        carouselViewport.addEventListener('touchend', (e) => {
            const endTime = Date.now();
            const touchDuration = endTime - startTime;

            // Reset transform
            carouselViewport.style.transform = '';
            carouselViewport.style.transition = '';

            if (!isSwiping) {
                this.startAutoPlay(); // Resume autoplay if not swiping
                return;
            }

            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;

            const diffX = startX - endX;
            const diffY = Math.abs(startY - endY);

            // Minimum swipe distance (30px) and not too vertical
            const minSwipeDistance = 30;
            const maxVerticalThreshold = 50;

            if (Math.abs(diffX) > minSwipeDistance && diffY < maxVerticalThreshold) {
                // Fast swipe or long swipe
                if (Math.abs(diffX) > 100 || touchDuration < 300) {
                    if (diffX > 0) {
                        this.nextSlide(); // Swipe left - next
                    } else {
                        this.prevSlide(); // Swipe right - previous
                    }
                } else if (Math.abs(diffX) > minSwipeDistance) {
                    // Slower, longer swipe
                    if (diffX > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            }

            // Small delay before resuming autoplay
            setTimeout(() => {
                this.startAutoPlay();
            }, 500);
        }, { passive: false });

        // Prevent context menu on long press
        carouselViewport.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CleanCarousel();
});

// Performance optimization: Reduce animations on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Floating Particles Generator
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 20; // Reduced for performance
    const colors = ['#ff6b35', '#f7931e', '#14b8a6'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            background: ${color};
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

// Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.feature-card, .section-header, .about-text, .about-visual').forEach(el => {
    animateOnScroll.observe(el);
});
