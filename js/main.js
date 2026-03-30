/**
 * EQUIS — Freelance Equine Photography Portfolio
 * JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- INITIALIZATION ---
    initTheme();
    initDir();
    initMobileMenu();
    initScrollEffects();
    initGalleryFilter();
    initPromoPopup();
    initAOS();
    initBackToTop();
    initHeroScroll();
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// --- THEME TOGGLE ---
function initTheme() {
    const themeToggle = document.querySelectorAll('.theme-toggle');
    const html = document.documentElement;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('equis_theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    themeToggle.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('equis_theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });
}

function updateThemeIcons(theme) {
    const icons = document.querySelectorAll('.theme-toggle i');
    icons.forEach(icon => {
        if (theme === 'dark') {
            icon.setAttribute('data-lucide', 'sun');
        } else {
            icon.setAttribute('data-lucide', 'moon');
        }
    });
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// --- RTL TOGGLE ---
function initDir() {
    const dirToggle = document.querySelectorAll('.dir-toggle');
    const html = document.documentElement;

    // Load saved direction
    const savedDir = localStorage.getItem('equis_dir') || 'ltr';
    html.setAttribute('dir', savedDir);
    updateDirIcons(savedDir);

    dirToggle.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            
            html.setAttribute('dir', newDir);
            localStorage.setItem('equis_dir', newDir);
            updateDirIcons(newDir);
        });
    });
}

function updateDirIcons(dir) {
    const icons = document.querySelectorAll('.dir-toggle i');
    icons.forEach(icon => {
        if (dir === 'rtl') {
            icon.setAttribute('data-lucide', 'align-left');
        } else {
            icon.setAttribute('data-lucide', 'align-right');
        }
    });
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// --- MOBILE MENU ---
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.querySelector('.mobile-drawer');
    const overlay = document.querySelector('.drawer-overlay');
    const drawerLinks = document.querySelectorAll('.mobile-drawer a');

    if (!hamburger || !drawer || !overlay) return;

    const toggleMenu = () => {
        drawer.classList.toggle('open');
        overlay.classList.toggle('visible');
        document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
        
        // Animate hamburger if needed (Lucide changes icon or CSS class)
        const icon = hamburger.querySelector('i');
        if (icon && typeof lucide !== 'undefined') {
            if (drawer.classList.contains('open')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        }
    };

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    drawerLinks.forEach(link => link.addEventListener('click', toggleMenu));
}

// --- SCROLL EFFECTS ---
function initScrollEffects() {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-drawer a');

    if (!header) return;

    // Header scroll background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current) && current !== "") {
                link.classList.add("active");
            }
        });
    });
}

// --- GALLERY FILTER ---
function initGalleryFilter() {
    const tabs = document.querySelectorAll('.filter-tab');
    const items = document.querySelectorAll('.gallery-item');

    if (tabs.length === 0 || items.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            items.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 350);
                }
            });
        });
    });
}

// --- PROMO POPUP ---
function initPromoPopup() {
    const modal = document.querySelector('.promo-modal');
    const closeBtns = document.querySelectorAll('.close-promo, .promo-overlay, .promo-dismiss');
    
    if (!modal) return;

    const isDismissed = localStorage.getItem('equis_promo_dismissed');

    if (!isDismissed) {
        setTimeout(() => {
            modal.classList.add('show');
        }, 4000);
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('show');
            localStorage.setItem('equis_promo_dismissed', 'true');
        });
    });
}

// --- ANIMATIONS ON SCROLL (AOS) ---
function initAOS() {
    if (typeof IntersectionObserver === 'undefined') return;
    if (document.querySelectorAll('[data-aos]').length === 0) return;

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// --- BACK TO TOP ---
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- HERO SCROLL INDICATOR ---
function initHeroScroll() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}
