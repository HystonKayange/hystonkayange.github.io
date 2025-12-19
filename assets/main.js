/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(sectionsClass) {
            if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
                sectionsClass.classList.add('active-link')
            }else{
                sectionsClass.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== DARK/LIGHT MODE TOGGLE ====================*/
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    themeIcon.classList.remove('bx-sun');
    themeIcon.classList.add('bx-moon');
} else {
    // Default to dark mode
    body.classList.add('dark-mode');
    themeIcon.classList.remove('bx-moon');
    themeIcon.classList.add('bx-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
        localStorage.setItem('theme', 'light');
    }
});

/*==================== BACK TO TOP BUTTON ====================*/
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

sr.reveal('.home__data, .skills__subtitle, .skills__text', {});
sr.reveal('.intro__summary, .skills__img', {delay: 400});
sr.reveal('.home__social-icon', { interval: 200});
sr.reveal('.skills__data, .work__img, .contact__input', {interval: 200});
sr.reveal('.project__card', {interval: 300, origin: 'bottom'});
sr.reveal('.education__card', {interval: 200, origin: 'left'});
sr.reveal('.publication__card', {interval: 200, origin: 'right'});
sr.reveal('.section-title', {origin: 'top', distance: '40px'});

/*==================== ABSTRACT POPUP ====================*/
function showAbstract(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'block';
}

function closeAbstract(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
}

// Close modal when clicking outside content
window.addEventListener('click', function (e) {
    const modals = document.querySelectorAll('.abstract-modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

/*==================== CONTACT FORM ====================*/
const form = document.querySelector('.contact__form');
const formModal = document.getElementById('formSuccessModal');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(() => {
            form.reset();
            formModal.classList.add('show');
        }).catch(() => {
            alert("There was a problem sending your message. Please try again.");
        });
    });
}

function closeSuccessModal() {
    formModal.classList.remove('show');
}

/*==================== IMAGE GALLERY MODAL ====================*/
document.addEventListener("DOMContentLoaded", function () {
    const imgThumbnails = document.querySelectorAll('.work__img img');
    const imgModal = document.getElementById('imgModal');
    const imgModalContent = document.getElementById('imgModalContent');
    const closeImg = document.getElementById('closeImg');

    if (imgThumbnails && imgModal && imgModalContent) {
        imgThumbnails.forEach(img => {
            img.parentElement.addEventListener("click", (e) => {
                e.preventDefault();
                imgModal.style.display = "block";
                imgModalContent.src = img.src;
            });
        });

        if (closeImg) {
            closeImg.addEventListener("click", () => {
                imgModal.style.display = "none";
            });
        }

        window.addEventListener("click", (e) => {
            if (e.target === imgModal) {
                imgModal.style.display = "none";
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imgModal.style.display === 'block') {
                imgModal.style.display = 'none';
            }
        });
    }
});

/*==================== SMOOTH SCROLL FOR ALL ANCHOR LINKS ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/*==================== TYPING ANIMATION FOR HEADER (Optional Enhancement) ====================*/
// Uncomment below if you want a typewriter effect on the role
/*
const roles = ['AI Research Engineer', 'Machine Learning Engineer', 'Full-Stack Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const pauseTime = 2000;

function typeRole() {
    const roleElement = document.querySelector('.home__title');
    if (!roleElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    // Update only if you want dynamic typing (advanced)

    setTimeout(typeRole, isDeleting ? deleteSpeed : typeSpeed);
}
*/
