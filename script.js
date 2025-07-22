// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

// Mobile Navigation Functions
function toggleMobileMenu() {
    const isMenuOpen = navLinks.classList.contains('active');
    navLinks.classList.toggle('active', !isMenuOpen);
    navOverlay.classList.toggle('active', !isMenuOpen);
    document.body.classList.toggle('menu-open', !isMenuOpen);
    menuToggle.innerHTML = !isMenuOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
}

function closeMobileMenu() {
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = ''; // <-- Add this line
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}


// Event Listeners for Mobile Menu
menuToggle.addEventListener('click', toggleMobileMenu);
navOverlay.addEventListener('click', closeMobileMenu);
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Smooth Scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (navLinks.classList.contains('active')) {
            closeMobileMenu();
        }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Current Year in Footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Particles.js Initialization
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 70, density: { enable: true, value_area: 800 } },
                color: { value: "#00d9ff" },
                shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
                opacity: { 
                    value: 0.5, 
                    random: true, 
                    anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } 
                },
                size: { 
                    value: 3, 
                    random: true, 
                    anim: { enable: false, speed: 40, size_min: 0.1, sync: false } 
                },
                line_linked: { 
                    enable: true, 
                    distance: 150, 
                    color: "#00d9ff", 
                    opacity: 0.2, 
                    width: 1 
                },
                move: { 
                    enable: true, 
                    speed: 2, 
                    direction: "none", 
                    random: false, 
                    straight: false, 
                    out_mode: "out", 
                    bounce: false, 
                    attract: { enable: false, rotateX: 600, rotateY: 1200 } 
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
}

// Scroll Animation Functions
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.profile-card, .skill-item, .project-card, .experience-card, .footer-contact'
    );
    
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    checkAnimation();
}

function checkAnimation() {
    const windowHeight = window.innerHeight;
    const windowTop = window.scrollY;
    const windowBottom = windowTop + windowHeight;

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        const elementBottom = elementTop + element.offsetHeight;

        if (elementBottom >= windowTop && elementTop <= windowBottom) {
            element.classList.add('visible');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    setupScrollAnimations();
    
    // Event listeners for scroll and resize
    window.addEventListener('scroll', checkAnimation);
    window.addEventListener('resize', checkAnimation);
    
    // Debounce resize events for better performance
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkAnimation, 250);
    });
    
});