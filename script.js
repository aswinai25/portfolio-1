// Smooth scrolling navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar active state on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    // Update active nav links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
            });
            const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.style.color = 'var(--primary)';
            }
        }
    });
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.gap = '0';
        navMenu.style.background = 'rgba(10, 14, 39, 0.95)';
        navMenu.style.padding = '2rem';
        navMenu.style.borderBottom = '1px solid var(--border-color)';
        navMenu.style.zIndex = '999';
    });
}

// Initialize Leaflet map
function initMap() {
    const map = L.map('map').setView([8.5885, 77.5733], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
    }).addTo(map);
    
    // Add marker for Kanyakumari
    L.marker([8.5885, 77.5733]).addTo(map)
        .bindPopup('<b>Kanyakumari, Tamil Nadu</b>')
        .openPopup();
}

// Initialize map when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    initMap();
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            // Create mailto link
            const mailtoLink = `mailto:a67662185@gmail.com?subject=Portfolio Inquiry from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${name}%0AEmail: ${email}`;
            
            // Open mailto link
            window.location.href = mailtoLink;
            
            // Reset form
            contactForm.reset();
            
            // Show success message (optional)
            alert('Thank you for your message! Opening your email client...');
        }
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

// Observe elements for animation
document.querySelectorAll('.journey-card, .project-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Skill bar animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = bar.style.width;
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.hero-image, .hero-content');
    
    parallaxElements.forEach(el => {
        if (el.classList.contains('hero-image')) {
            el.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
});

// Mouse move glow effect on profile card
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    document.addEventListener('mousemove', (e) => {
        const glowRing = profileCard.querySelector('.glow-ring');
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > -100 && x < rect.width + 100 && y > -100 && y < rect.height + 100) {
            glowRing.style.boxShadow = `
                0 0 30px rgba(0, 212, 255, 0.5), 
                inset 0 0 30px rgba(0, 212, 255, 0.2),
                ${(x - rect.width / 2) * 0.1}px ${(y - rect.height / 2) * 0.1}px 50px rgba(0, 212, 255, 0.3)
            `;
        }
    });
}

// Responsive calculations
function updateResponsive() {
    if (window.innerWidth <= 768) {
        document.querySelector('.nav-menu').style.display = 'none';
    } else {
        document.querySelector('.nav-menu').style.display = 'flex';
    }
}

window.addEventListener('resize', updateResponsive);

// Dark mode (already dark, but for future light mode support)
function initTheme() {
    const isDark = localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme');
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

initTheme();

// Add typing animation to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize on page load
window.addEventListener('load', () => {
    updateResponsive();
    
    // Check if local profile JPG image exists
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        // Try to load local profile-aswin.jpg
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status === 200) {
                profileImage.src = 'profile-aswin.jpg';
                console.log('Profile image loaded successfully');
            }
        };
        xhr.onerror = () => {
            console.log('Local profile image not found. Using fallback.');
            // Fallback to placeholder if local image not found
            profileImage.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80';
        };
        xhr.open('HEAD', 'profile-aswin.jpg');
        xhr.send();
    }
    
    // Optional: uncomment to enable typing animation
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     typeWriter(heroTitle.querySelector('.gradient-text'), 'Aswin', 100);
    // }
});

// Prevent default form submission for contact form
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                console.log('Form submitted:', { name, email, message });
                alert('Thank you for reaching out! I will get back to you soon.');
                contactForm.reset();
            }
        });
    }
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll();
