document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. ELEGANT PRELOADER
    // ==========================================================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 800); // Fluid 0.8s hold time
        });
    }


    // ==========================================================================
    // 2. SCROLL PROGRESS BAR
    // ==========================================================================
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = scrollPercent + '%';
        });
    }


    // ==========================================================================
    // 3. CURSOR EFFECT (Desktop Only)
    // ==========================================================================
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-follower');

    if (window.innerWidth > 1024 && cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Smoothened lag effect for the outer ring
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });

        // Toggle state when hovering interactive elements
        const hoverables = document.querySelectorAll('a, button, .skill-card, .project-card, .nav-item');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
        });
    }


    // ==========================================================================
    // 4. MICRO-INTERACTIVE BUTTON RIPPLE EFFECT
    // ==========================================================================
    const rippleButtons = document.querySelectorAll('.btn, .nav-control-btn, .social-icon-btn');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });


    // ==========================================================================
    // 5. STICKY GLASSMORPHISM NAVBAR & ACTIVE SECTION LINK TRACKER
    // ==========================================================================
    const navbar = document.querySelector('.navbar');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    if (navbar) {
        window.addEventListener('scroll', () => {
            // Sticky transition class
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Detect active section on scroll (FIXED: pageYOffset -> window.scrollY)
            let currentSection = '';
            sections.forEach(sec => {
                const secTop = sec.offsetTop;
                if (window.scrollY >= secTop - 120) {
                    currentSection = sec.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSection}`) {
                    item.classList.add('active');
                }
            });
        });
    }


    // ==========================================================================
    // 6. REFINED SMOOTH ANCHOR LINK NAVIGATION (Lenis Emulated)
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                const navLinks = document.querySelector('.nav-links');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                }

                // Smooth scroll calculation offset for Sticky Navbar
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ==========================================================================
    // 7. PREMIUM INTERSECTION OBSERVER ANIMATIONS (Stagger Delay Loaded)
    // ==========================================================================
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Trigger animation
                entry.target.classList.add('active-reveal');
                
                // Unobserve after visual trigger to save browser performance
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    // Capture and apply smooth fade/slidup delay systematically
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    revealElements.forEach((el, index) => {
        // Assign elegant incremental delay values
        const delay = (index % 3) * 150;
        el.style.transitionDelay = `${delay}ms`;
        animationObserver.observe(el);
    });


    // ==========================================================================
    // 8. THEME TOGGLE CONTROLLER (Local Storage Synchronized & Fixed)
    // ==========================================================================
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        const savedTheme = localStorage.getItem('theme') || 'light';

        const setTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Icon change with micro rotation
            if (theme === 'dark') {
                themeBtn.innerHTML = '<i class="fa-solid fa-sun" style="transform: rotate(180deg); transition: transform 0.6s;"></i>';
            } else {
                themeBtn.innerHTML = '<i class="fa-solid fa-moon" style="transform: rotate(0deg); transition: transform 0.6s;"></i>';
            }
        };

        // Apply init state
        setTheme(savedTheme);

        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }


    // ==========================================================================
    // 9. INSTANT TRANSLATION MODULE (Sempurna & Aman dengan Proyek Multibahasa)
    // ==========================================================================
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        const savedLang = localStorage.getItem('lang') || 'EN';

        const translations = {
            EN: {
                home: "Home",
                about: "About",
                skills: "Skills",
                projects: "Projects",
                contact: "Contact",
                welcome: "Hello, I am",
                subtitle: "Information Systems Student",
                desc: "I am an Information Systems student at Soegijapranata Catholic University with a strong passion for Web Development, UI/UX Design, and digital solutions. I enjoy transforming ideas into modern, responsive, and user-friendly websites. Through various academic and personal projects, I continuously refine my skills in both frontend and backend development, prioritizing clean design, seamless user experience, and efficient system implementation.",
                about_title: "About Me",
                quick_bio: "Quick Bio",
                name: "Name",
                univ: "University",
                major: "Major",
                period: "Period",
                focus: "Focus & Interests",
                available: "Available",
                available_desc: "For Internship, Full-Time, and Collaboration",
                skills_title: "Skills",
                featured_projects: "Featured Projects",
                view_project_btn: "View Project",
                project_descriptions: [
                    "An interactive catalog website showcasing the richness of traditional Batak recipes with a modern design touch.",
                    "An online laundry service management system integrating real-time order tracking and workflow using PHP and MySQL.",
                    "A UI/UX and frontend project visualizing a smart water station system with responsive temperature and size selection features."
                ],
                get_touch: "Get in Touch",
                work_together: "Let's Work Together",
                cta_desc: "I am open to internship opportunities, freelance gigs, or any interesting collaboration in web development and digital solutions. Feel free to connect if you have a project or a role in mind!",
                contact_me: "Contact Me",
                all_rights: "All Rights Reserved."
            },
            ID: {
                home: "Beranda",
                about: "Tentang",
                skills: "Keahlian",
                projects: "Proyek",
                contact: "Kontak",
                welcome: "Halo, Saya",
                subtitle: "Mahasiswa Sistem Informasi",
                desc: "Saya adalah mahasiswa Sistem Informasi di Universitas Katolik Soegijapranata dengan hasrat kuat dalam Pengembangan Web, Desain UI/UX, dan solusi digital. Saya senang mengubah ide menjadi situs web yang modern, responsif, dan ramah pengguna. Melalui berbagai proyek akademik dan pribadi, saya terus mengasah keterampilan saya dalam pengembangan frontend dan backend, memprioritaskan desain bersih, pengalaman pengguna yang mulus, dan implementasi sistem yang efisien.",
                about_title: "Tentang Saya",
                quick_bio: "Biodata Singkat",
                name: "Nama",
                univ: "Universitas",
                major: "Jurusan",
                period: "Periode",
                focus: "Fokus & Minat",
                available: "Tersedia",
                available_desc: "Untuk Magang, Pekerjaan Penuh Waktu, dan Kolaborasi",
                skills_title: "Keahlian",
                featured_projects: "Proyek Pilihan",
                view_project_btn: "Lihat Proyek",
                project_descriptions: [
                    "Sebuah website katalog interaktif yang menyajikan kekayaan resep tradisional Batak dengan sentuhan desain modern.",
                    "Sistem manajemen jasa laundry online yang mengintegrasikan alur pemesanan dan pelacakan status secara real-time menggunakan PHP dan MySQL.",
                    "Proyek UI/UX dan frontend yang memvisualisasikan sistem stasiun air pintar dengan fitur pemilihan suhu dan ukuran yang responsif."
                ],
                get_touch: "Hubungi Saya",
                work_together: "Mari Bekerja Sama",
                cta_desc: "Saya terbuka untuk peluang magang, proyek lepas, atau kolaborasi menarik lainnya dalam pengembangan web dan solusi digital. Jangan ragu untuk terhubung jika Anda memiliki proyek atau peran tertentu!",
                contact_me: "Hubungi Saya",
                all_rights: "Hak Cipta Dilindungi."
            }
        };

        const applyTranslation = (lang) => {
            localStorage.setItem('lang', lang);
            
            // Mempertahankan Ikon jika ada di tombol bahasa
            const icon = langBtn.querySelector('i');
            if (icon) {
                langBtn.innerHTML = '';
                langBtn.appendChild(icon);
                langBtn.appendChild(document.createTextNode(' ' + lang));
            } else {
                langBtn.innerText = lang;
            }

            // 1. Menerjemahkan Menu Navigasi
            const navLinksList = document.querySelectorAll('.nav-item');
            navLinksList.forEach(item => {
                const href = item.getAttribute('href');
                if (href === '#home') item.innerText = translations[lang].home;
                if (href === '#about') item.innerText = translations[lang].about;
                if (href === '#skills') item.innerText = translations[lang].skills;
                if (href === '#projects') item.innerText = translations[lang].projects;
                if (href === '#contact') item.innerText = translations[lang].contact;
            });

            // 2. Terjemahan bagian Hero (Home)
            const heroWelcome = document.querySelector('.hero-welcome');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroDesc = document.querySelector('.hero-desc');
            
            if (heroWelcome) heroWelcome.innerText = translations[lang].welcome;
            if (heroSubtitle) heroSubtitle.innerText = translations[lang].subtitle;
            if (heroDesc) heroDesc.innerText = translations[lang].desc;

            // 3. Terjemahan bagian About
            const aboutTitle = document.querySelector('#about .section-title');
            const aboutBioHeader = document.querySelector('.about-info-card h3');
            const interestsTitle = document.querySelector('.interests-title');
            const statCardHeader = document.querySelector('.stat-card h3');
            const statCardDesc = document.querySelector('.stat-card p');

            if (aboutTitle) aboutTitle.innerText = translations[lang].about_title;
            if (aboutBioHeader) aboutBioHeader.innerText = translations[lang].quick_bio;
            if (interestsTitle) interestsTitle.innerText = translations[lang].focus;
            if (statCardHeader) statCardHeader.innerText = translations[lang].available;
            if (statCardDesc) statCardDesc.innerText = translations[lang].available_desc;
            
            // Menerjemahkan isi tabel biodata (Ditambahkan Pengecekan Aman/Optional Chaining)
            const infoRows = document.querySelectorAll('.info-table tr');
            if (infoRows.length >= 4) {
                const label1 = infoRows[0].querySelector('td:first-child strong');
                const label2 = infoRows[1].querySelector('td:first-child strong');
                const label3 = infoRows[2].querySelector('td:first-child strong');
                const label4 = infoRows[3].querySelector('td:first-child strong');

                if (label1) label1.innerText = translations[lang].name;
                if (label2) label2.innerText = translations[lang].univ;
                if (label3) label3.innerText = translations[lang].major;
                if (label4) label4.innerText = translations[lang].period;
            }

            // 4. Terjemahan bagian Skills
            const skillsTitle = document.querySelector('#skills .section-title');
            if (skillsTitle) skillsTitle.innerText = translations[lang].skills_title;

            // 5. Terjemahan bagian Projects
            const projectsTitle = document.querySelector('#projects .section-title');
            if (projectsTitle) projectsTitle.innerText = translations[lang].featured_projects;
            
            const projectDescTexts = document.querySelectorAll('.project-desc-text');
            projectDescTexts.forEach((pText, idx) => {
                if (translations[lang].project_descriptions[idx]) {
                    pText.innerText = translations[lang].project_descriptions[idx];
                }
            });

            document.querySelectorAll('.btn-project').forEach(btn => {
                btn.innerHTML = `${translations[lang].view_project_btn} <i class="fa-solid fa-arrow-up-right-from-square"></i>`;
            });

            // 6. Terjemahan bagian Contact
            const contactTitle = document.querySelector('#contact .section-title');
            if (contactTitle) contactTitle.innerText = translations[lang].get_touch;

            // 7. Terjemahan bagian CTA
            const ctaHeader = document.querySelector('.cta-container h2');
            const ctaDescElement = document.querySelector('.cta-container p');
            const ctaBtn = document.querySelector('.btn-cta');

            if (ctaHeader) ctaHeader.innerText = translations[lang].work_together;
            if (ctaDescElement) ctaDescElement.innerText = translations[lang].cta_desc;
            if (ctaBtn) ctaBtn.innerText = translations[lang].contact_me;

            // 8. Footer Rights
            const footerText = document.querySelector('.footer-bottom p');
            if (footerText) {
                footerText.innerHTML = `&copy; 2026 Septi Maria Hutapea. ${translations[lang].all_rights}`;
            }
        };

        // Terapkan bahasa default saat halaman dimuat
        applyTranslation(savedLang);

        // Event listener untuk tombol Bahasa
        langBtn.addEventListener('click', () => {
            const activeLang = localStorage.getItem('lang') || 'EN';
            applyTranslation(activeLang === 'EN' ? 'ID' : 'EN');
        });
    }


    // ==========================================================================
    // 10. FLOATING BACK TO TOP BUTTON
    // ==========================================================================
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
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


    // ==========================================================================
    // 11. MOBILE TOGGLE MENU BAR ENGINE
    // ==========================================================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
});