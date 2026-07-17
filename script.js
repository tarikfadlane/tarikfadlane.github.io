// Ensure DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggling ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference for theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    const toggleTheme = () => {
        htmlElement.classList.toggle('dark');
        const isDark = htmlElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    if(themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if(themeToggleBtnMobile) themeToggleBtnMobile.addEventListener('click', toggleTheme);

    // --- Mobile Menu Drawer ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark text-2xl"></i>';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            mobileMenu.classList.add('translate-x-full');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-2xl"></i>';
            document.body.style.overflow = ''; // Restore scrolling
        }
    };

    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // --- Dynamic Year for Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if(currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Project Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    // Re-trigger animation
                    card.style.animation = 'none';
                    card.offsetHeight; /* trigger reflow */
                    card.style.animation = 'fadeIn 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });



    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.fade-in-up');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible to only animate once
            }
        });
    };

    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Procedural SVG Generator for Projects ---
    const generateProjectVisual = (category) => {
        let svgContent = '';
        let glowColor = '';
        
        switch(category) {
            case 'frontend':
                glowColor = 'rgba(16, 185, 129, 0.4)'; // emerald-500
                svgContent = `
                    <svg width="100%" height="100%" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <linearGradient id="front-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#10b981" stop-opacity="0.8"/>
                                <stop offset="100%" stop-color="#059669" stop-opacity="0.2"/>
                            </linearGradient>
                            <filter id="glow-front" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="8" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <!-- Grid Background -->
                        <pattern id="grid-front" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" stroke-width="0.5" stroke-opacity="0.15"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid-front)" />
                        <!-- Abstract Wireframe -->
                        <g filter="url(#glow-front)" class="animate-pulse-glow" transform="translate(40, -20)">
                            <rect x="200" y="120" width="380" height="260" rx="16" fill="url(#front-grad)" stroke="#10b981" stroke-width="2"/>
                            <rect x="230" y="150" width="320" height="40" rx="8" fill="#10b981" fill-opacity="0.3"/>
                            <rect x="230" y="210" width="100" height="140" rx="8" fill="#10b981" fill-opacity="0.2"/>
                            <rect x="350" y="210" width="200" height="140" rx="8" fill="#10b981" fill-opacity="0.1"/>
                        </g>
                        <!-- Decorative Wave -->
                        <path d="M0,450 Q200,350 400,450 T800,450" fill="none" stroke="#10b981" stroke-width="3" stroke-opacity="0.5" class="animate-dash" />
                    </svg>
                `;
                break;
            case 'backend':
                glowColor = 'rgba(139, 92, 246, 0.4)'; // violet-500
                svgContent = `
                    <svg width="100%" height="100%" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <filter id="glow-back" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="8" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <!-- Network Lines -->
                        <g stroke="#8b5cf6" stroke-width="2" stroke-opacity="0.5" class="animate-dash">
                            <line x1="250" y1="250" x2="400" y2="120" />
                            <line x1="400" y1="120" x2="550" y2="250" />
                            <line x1="550" y1="250" x2="400" y2="380" />
                            <line x1="400" y1="380" x2="250" y2="250" />
                            <line x1="250" y1="250" x2="550" y2="250" />
                            <line x1="400" y1="120" x2="400" y2="380" />
                        </g>
                        <!-- Nodes -->
                        <g filter="url(#glow-back)" fill="#8b5cf6" class="animate-pulse-glow">
                            <circle cx="250" cy="250" r="14" />
                            <circle cx="400" cy="120" r="18" />
                            <circle cx="550" cy="250" r="14" />
                            <circle cx="400" cy="380" r="18" />
                            <circle cx="400" cy="250" r="10" fill="#ddd6fe" />
                        </g>
                        <!-- Concentric decoration -->
                        <circle cx="400" cy="250" r="180" fill="none" stroke="#8b5cf6" stroke-width="1.5" stroke-opacity="0.2" stroke-dasharray="15 15" class="animate-spin-slow"/>
                    </svg>
                `;
                break;
            case 'fullstack':
                glowColor = 'rgba(59, 130, 246, 0.4)'; // blue-500
                svgContent = `
                    <svg width="100%" height="100%" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <filter id="glow-full" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="10" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <!-- Stacked Isomorphic Layers -->
                        <g filter="url(#glow-full)" transform="translate(400, 250) scale(1.4)" class="animate-pulse-glow">
                            <!-- Bottom Layer (Database/Backend) -->
                            <path d="M-120,60 L0,120 L120,60 L0,0 Z" fill="#1e40af" fill-opacity="0.3" stroke="#3b82f6" stroke-width="2"/>
                            <!-- Middle Layer (API/Logic) -->
                            <path d="M-120,20 L0,80 L120,20 L0,-40 Z" fill="#2563eb" fill-opacity="0.5" stroke="#60a5fa" stroke-width="2" class="animate-dash"/>
                            <!-- Top Layer (Frontend) -->
                            <path d="M-120,-20 L0,40 L120,-20 L0,-80 Z" fill="#3b82f6" fill-opacity="0.7" stroke="#bfdbfe" stroke-width="2"/>
                            
                            <!-- Connecting lines -->
                            <line x1="0" y1="40" x2="0" y2="120" stroke="#bfdbfe" stroke-width="2" stroke-dasharray="4 4" />
                            <line x1="-120" y1="-20" x2="-120" y2="60" stroke="#bfdbfe" stroke-width="2" stroke-opacity="0.5"/>
                            <line x1="120" y1="-20" x2="120" y2="60" stroke="#bfdbfe" stroke-width="2" stroke-opacity="0.5"/>
                        </g>
                    </svg>
                `;
                break;
            case 'data':
                glowColor = 'rgba(244, 63, 94, 0.4)'; // rose-500
                svgContent = `
                    <svg width="100%" height="100%" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <filter id="glow-data" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="8" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <!-- Circular Data Rings -->
                        <g transform="translate(400, 250)" filter="url(#glow-data)">
                            <!-- Outer Ring -->
                            <circle cx="0" cy="0" r="140" fill="none" stroke="#f43f5e" stroke-width="3" stroke-opacity="0.3" />
                            <circle cx="0" cy="0" r="140" fill="none" stroke="#f43f5e" stroke-width="4" stroke-dasharray="700" stroke-dashoffset="200" stroke-linecap="round" class="animate-spin-slow"/>
                            
                            <!-- Middle Ring -->
                            <circle cx="0" cy="0" r="100" fill="none" stroke="#fb7185" stroke-width="8" stroke-opacity="0.2" />
                            <circle cx="0" cy="0" r="100" fill="none" stroke="#fb7185" stroke-width="8" stroke-dasharray="450" stroke-dashoffset="300" stroke-linecap="round" style="animation: slow-spin 8s linear infinite reverse; transform-origin: center;"/>
                            
                            <!-- Inner Core -->
                            <circle cx="0" cy="0" r="60" fill="#e11d48" fill-opacity="0.6" class="animate-pulse-glow" />
                            
                            <!-- Center Dot -->
                            <circle cx="0" cy="0" r="18" fill="#fff" />
                        </g>
                        <!-- Chart Lines -->
                        <path d="M50,450 L200,380 L350,420 L500,280 L650,340 L800,180" fill="none" stroke="#f43f5e" stroke-width="4" stroke-opacity="0.6" class="animate-dash" />
                    </svg>
                `;
                break;
            default:
                svgContent = `<svg width="100%" height="100%" viewBox="0 0 800 500"><rect width="100%" height="100%" fill="#333"/></svg>`;
        }
        
        return { svgContent, glowColor };
    };

    // Inject SVGs into project cards
    const visualContainers = document.querySelectorAll('.project-visual');
    visualContainers.forEach(container => {
        const card = container.closest('.project-card');
        if(card) {
            const category = card.getAttribute('data-category');
            const { svgContent, glowColor } = generateProjectVisual(category);
            
            container.innerHTML = svgContent;
            // Apply dynamic drop shadow to the container for ambient glow
            container.style.filter = `drop-shadow(0 0 25px ${glowColor})`;
        }
    });

});
