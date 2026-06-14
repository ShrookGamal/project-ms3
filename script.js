document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const nLinks = document.querySelectorAll('.n-link');
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        nLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
    const toggleMenu = (isOpen) => {
        if (isOpen) {
            sidebar.classList.add('active');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
        } else {
            sidebar.classList.remove('active');
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    openMenu.addEventListener('click', () => toggleMenu(true));
    closeMenu.addEventListener('click', () => toggleMenu(false));
    overlay.addEventListener('click', () => toggleMenu(false));
    document.querySelectorAll('.sidebar-links a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        const heroImg = document.querySelector('.hero-image');
        if(heroImg) {
            heroImg.style.transform = `scale(${1 + scrollValue * 0.0002})`;
        }
    });
});

const handleAboutAnimation = () => {
    const aboutSection = document.querySelector('.about-ultra');
    const aboutContent = document.querySelector('.about-content');
    const counters = document.querySelectorAll('.num');
    let started = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutContent.classList.add('active');
                if (!started) {
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-val');
                        let count = 0;
                        const updateCount = () => {
                            const speed = target / 100;
                            if (count < target) {
                                count += speed;
                                counter.innerText = Math.ceil(count);
                                setTimeout(updateCount, 20);
                            } else {
                                counter.innerText = target + "+";
                            }
                        };
                        updateCount();
                    });
                    started = true;
                }
            }
        });
    }, { threshold: 0.4 });

    observer.observe(aboutSection);
};
handleAboutAnimation();
const animateServices = () => {
    const cards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
};

animateServices();
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                        item.classList.add('hide');
                    }
                }
            });
        });
    });
});
const whyCards = document.querySelectorAll('.why-card');

whyCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.querySelector('.card-inner').style.transform = 
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.querySelector('.card-inner').style.transform = 
            `rotateX(0deg) rotateY(0deg)`;
    });
});