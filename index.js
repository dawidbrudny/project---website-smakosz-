const wrapper = document.querySelector('.wrapper');

// NAVBAR
const navbarWrapper = document.querySelector('.navbar-wrapper')
const navbar = document.querySelector('.navbar');
const navbarPositionToHide = window.innerHeight;
const logo = document.querySelector('.logo');
const navigation = document.querySelector('nav');
const navigationLinks = document.querySelectorAll('.navigation__link');

// BURGER MENU
const burgerContainerFlex = document.querySelector('.burger__flex-container');
const burgerContainer = document.querySelector('.burger__icon-container');
const burgerIcon = document.querySelector('.burger__icon');

// HEADER

const headerBtn = document.querySelector('.header__panel-button');

// COURSES
const courses = document.querySelectorAll('.course');
const coursesImage = document.querySelectorAll('.course__image');
const coursesTitle = document.querySelectorAll('.course__title');
const coursesText = document.querySelectorAll('.course__text');
const coursesButton = document.querySelectorAll('.course__button');

// ABOUT ME
const aboutMeSection = document.querySelector('.about-me');
const aboutMeRect = aboutMeSection.getBoundingClientRect();
const bodyRect = document.body.getBoundingClientRect();
const aboutMePosition = aboutMeRect.top - bodyRect.top - 100;
const chudowiczImage = document.querySelector('.about-me__image-chudowicz');

// RECIPES
const recipesSection = document.querySelector('.recipes');
const recipesRect = aboutMeSection.getBoundingClientRect();
const recipesPosition = recipesRect.top - bodyRect.top;
const recipes = document.querySelectorAll('.recipe');
const recipesImage = document.querySelectorAll('.recipe__image');

// KEEP MOVING
const keepMovingContainer = document.querySelector('.keep-moving__container');

// SHOPPING
const shoppingContainer = document.querySelectorAll('.shopping__container');
const shoppingContainerBiggerDevices = document.querySelector('.shopping__container-version--bigger-devices');
const shoppingCounter = document.querySelectorAll('.shopping__counter');
const shoppingPriceCounter = document.querySelectorAll('.shopping__price-counter');
const shoppingPrice = document.querySelectorAll('.shopping__price');

let counter = 0;
let price = 0;

// HEADER PANEL BUTTON ANIMATIONS AND MOUSEMOVE FUNCTION

window.addEventListener('load', () => {

    setTimeout(() => {
        const addClass = (item, className) => {
            item.classList.add(className);
        }

        const removeClass = (item, className) => {
            item.classList.remove(className);
        }

        addClass(headerBtn, 'header__panel-button-state--active');
        addClass(headerBtn, 'header__panel-button-state--enable-animation');

        const removeAndAddClass = (item, className) => {
            item.addEventListener('mousemove', () => {
                removeClass(item, className);
            })
    
            item.addEventListener('mouseout', () => {
                addClass(item, className);
            })
        }

        removeAndAddClass(headerBtn, 'header__panel-button-state--enable-animation');
    }, 300)
})

// SCROLL ANIMATIONS

let prevScrollPosition = window.scrollY;
let flagForKeepMovingIcon = false;

window.addEventListener('scroll', () => {

    // NAVBAR & SHOPPING ICON (HIDE AND SHOW DESKTOP ANIMATION)

    let currentScrollPosition = window.scrollY;
    
    if (currentScrollPosition > prevScrollPosition && currentScrollPosition >= navbarPositionToHide) {
        navbar.style.transform = 'translate(0, -130%)';
        shoppingContainerBiggerDevices.classList.add('shopping__container--navbar-moving');
    } else {
        navbar.style.transform = 'translate(0, 0)';
        shoppingContainerBiggerDevices.classList.remove('shopping__container--navbar-moving');
    }
    prevScrollPosition = currentScrollPosition;

    if (window.innerWidth >= 1440) {

        // COURSE MOVE DESKTOP ANIMATION

        let options = {
            rootMargin: '-10%',
            treshold: 0.0
        }
        
        const showItem = (className, item) => {

            const showItem = entries => {
                entries.forEach(entry => {
                        if(entry.isIntersecting) {
                            entry.target.classList.add(className);
                        }          
                })
            }
        
            let observer = new IntersectionObserver(showItem, options);
        
            item.forEach(item => observer.observe(item));
        }

        showItem('course__animation-on-scroll', courses) 

        // "CHUDOWICZ" IMAGE SCROLL DESKTOP ANIMATION
        
        if (currentScrollPosition >= aboutMePosition) {
            chudowiczImage.style.right = '-5%';
            chudowiczImage.style.bottom = '-5%';
        }

        // RECIPE APPEAR DESKTOP ANIMATION

        showItem('recipe__animation-on-scroll', recipes);

        // KEEP MOVING ICON HIDE AND SHOW FUNCTION
        const recipesActivated = document.querySelectorAll('.recipe__animation-on-scroll');

        const removeAndAddClass = (item, className1, className2) => {
            item.classList.remove(className1);
            item.classList.add(className2);
        }

        if (currentScrollPosition >= recipesPosition && flagForKeepMovingIcon) {
            keepMovingContainer.style.transform = 'scale(100%)';
        } else {
            keepMovingContainer.style.transform = 'scale(0)';
        }

        if (recipesActivated.length > 0) {
            removeAndAddClass(
                keepMovingContainer,
                'keep-moving__container-state--disabled',
                'keep-moving__container-state--active'
            )
            flagForKeepMovingIcon = true;
        }

        if (recipesActivated.length >= recipes.length) {
            removeAndAddClass(
                keepMovingContainer,
                'keep-moving__container-state--active',
                'keep-moving__container-state--disabled'
            )
            flagForKeepMovingIcon = false;
        }
    }
})

// BURGER MENU CLICK

let flag = false;

const addClass = () => {
    navbar.classList.add('navbar__state--active');
        navigation.classList.add('navigation__state--active');
        // navigation.classList.add('navigation__animation');
        burgerIcon.classList.add('burger__icon-state--clicked');
        document.body.style.overflowY = 'hidden';

        flag = !flag;
}

const removeClass = () => {
    navbar.classList.remove('navbar__state--active');
        navigation.classList.remove('navigation__state--active');
        // navigation.classList.remove('navigation__animation');
        burgerIcon.classList.remove('burger__icon-state--clicked');
        document.body.style.overflowY = 'auto';

        flag = !flag;
}

burgerContainer.addEventListener('click', () => {

    if (!flag) {
        addClass();
    } else {
        removeClass();
    }

})

// NAVIGATION LINKS CLICK

navigationLinks.forEach(link => link.addEventListener('click', () => {
    removeClass();
}))


// COURSES MOUSEMOVE DESKTOP ANIMATION

courses.forEach((course, id) => course.addEventListener('mousemove', () => {
    if (window.innerWidth >= 1440) {

        coursesImage[id].style.transform = 'scale(105%)';
        coursesTitle[id].style.color = 'black';
        coursesText[id].style.color = 'black';
    }
}))

courses.forEach((course, id) => course.addEventListener('mouseout', () => {
    if (window.innerWidth >= 1440) {

        coursesImage[id].style.transform = 'scale(100%)';
        coursesTitle[id].style.color = 'var(--color-gray-text)';
        coursesText[id].style.color = 'var(--color-gray-text)';
    }
}))

// SHOPPING AND COURSE BUTTON "SIGN IN/BUY IT" CLICK

let coursesData = [
    course1 = {
        price: Number(350)
    },
    course2 = {
        price: Number(250)
    },
    course3 = {
        price: Number(450)
    }
]

coursesButton.forEach((button, id) => button.addEventListener('click', () => {
    price = price + coursesData[id].price;
    counter++;

    const orientation = window.screen.orientation.angle;
    if (orientation === 90) {
        navbar.style.transform = 'translate(0, 0)';
    }

    shoppingContainer.forEach(item => {
        item.classList.remove('shopping__container-state--disabled');
        item.classList.add('shopping__container-state--active');

        shoppingPrice.forEach(item => item.innerHTML = price.toFixed(2));
        shoppingPriceCounter.forEach(item => {
            item.classList.remove('shopping__price-counter-state--disabled');
            item.classList.add('shopping__price-counter-state--active');
        });
        shoppingCounter.forEach(item => {
            item.innerHTML = counter;
            item.classList.remove('shopping__counter-state--disabled');
            item.classList.add('shopping__counter-state--active');
        });
    })
}))

// ABOUT ME BLOG BUTTON DESKTOP ANIMATION

const aboutMeButton = document.querySelector('.about-me__blog-button');
aboutMeButton.addEventListener('mousemove', () => {
    if (window.innerWidth >= 1440) {
        chudowiczImage.style.bottom = '-4%';
        chudowiczImage.style.right = '-4%';
    }
})

aboutMeButton.addEventListener('mouseout', () => {
    if (window.innerWidth >= 1440) {
        chudowiczImage.style.bottom = '-5%';
        chudowiczImage.style.right = '-5%';
    }
})