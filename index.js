const bodyRect = document.body.getBoundingClientRect();
const scrollToCoursesSection = document.querySelector('.scroll-to-courses');
const scrollToCoursesSectionFromBigButton = document.querySelector('header>button');
const scrollToAboutMeSection = document.querySelector('.scroll-to-about-me');
const scrollToRecipesSection = document.querySelector('.scroll-to-recipes');

const headerSection = document.querySelector('header');
const headerRect = headerSection.getBoundingClientRect();

const coursesSection = document.getElementById('courses');
const coursesRect = coursesSection.getBoundingClientRect();

const recipesHeader = document.querySelector('.recipes-header');
const recipesHeaderRect = recipesHeader.getBoundingClientRect();

// NAVBAR HIDING MECHANISM

const navbar = document.getElementById('banner');
const contact = document.getElementById('contact');
let prevScrollPosition = window.scrollY;
const navbarPositionToHide = window.innerHeight;

window.addEventListener('scroll', () => {
    let currentScrollPosition = window.scrollY;

    if (currentScrollPosition > prevScrollPosition && currentScrollPosition >= navbarPositionToHide) {
        navbar.style.top = '-85px';
        contact.style.top = '25px';
    } else {
        navbar.style.top = '0';
        contact.style.top = '110px';
    }
    prevScrollPosition = currentScrollPosition;

    // COURSES ANIMATIONS - MOVE FROM LEFT OR RIGHT SIDE

    let offersList = [...document.querySelectorAll('div.course')];

    let options = {
        rootMargin: '-10%',
        treshold: 0.0
    }

    const showItem = entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animation-on-scroll');
            }
        })
    }

    let observer = new IntersectionObserver(showItem, options);

    offersList.forEach(item => observer.observe(item));

    // PICTURE "CHUDOWICZ" MOVING ANIMATION

    const aboutMeSectionPosition = coursesRect.bottom - bodyRect.top;
    const chudowiczPicture = document.querySelector('#about-me img');

    if (currentScrollPosition >= aboutMeSectionPosition) {
        chudowiczPicture.style.bottom = '40px';
        chudowiczPicture.style.right = '-75px';
    }
})

// NAVBAR LINKS - SMOOTH SCROLLING TO CHOSEN SECTION

const coursesSectionPosition = headerRect.bottom - bodyRect.top;

scrollToCoursesSection.addEventListener('click', () => {
    window.scrollTo(0, coursesSectionPosition)
})

scrollToCoursesSectionFromBigButton.addEventListener('click', () => {
    window.scrollTo(0, coursesSectionPosition)
})

const aboutMeSectionPosition = coursesRect.bottom - bodyRect.top;

scrollToAboutMeSection.addEventListener('click', () => {
    window.scrollTo(0, aboutMeSectionPosition)
})

const recipesSectionPosition = recipesHeaderRect.top - bodyRect.top;

scrollToRecipesSection.addEventListener('click', () => {
    window.scrollTo(0, recipesSectionPosition)
})

