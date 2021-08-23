// import "./index.scss";

// const hideLoader = () => {
//     setTimeout(() => {
//         document.querySelector('body').classList.add('-loaded');
//     }, 500);
// }

document.addEventListener('DOMContentLoaded', (event) => {

    manegeNavigation();
    fadeInElements();
    headerScroll(); 

});

const headerScroll = () => {
    let position = 0;
    let lastPosition;
    let ticking = false;

    document.addEventListener('scroll', () => {
        position = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function () {
                if (position > 20) {
                    document.body.classList.add("_scrolled");
                } else {
                    document.body.classList.remove("_scrolled");
                }

                lastPosition = position <= 0 ? 0 : position;

                ticking = false;
            });
            ticking = true;
        }
    });
}


const fadeInElements = () => {
    const elements = document.querySelectorAll(".fadeInTrigger")
    elements.forEach(img => {
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fadeIn")
                }
            })
        }

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        }
        const myObserver = new IntersectionObserver(callback, options)
        myObserver.observe(img)
    });


}


const manegeNavigation = () => {
    const navigationInit = document.querySelector('.navigationTrigger');
    navigationInit.addEventListener('click', () => {
        document.querySelector('body').classList.toggle('_navigation-opened');
    })
}

