import "./header.scss";

import "./../../components/menu";

// @ts-ignore
window.addEventListener('DOMContentLoaded', (event) => {
    headerScroll();
});

// const scrollDown = () => {}
// const scrollUp = () => {}

const headerScroll = () => {
    let position = 0;
    let lastPosition = 0;
    let ticking = false;

    document.addEventListener('scroll', () => {
        position = window.scrollY;

        const body = document.body,
            html = document.documentElement,
            hero = document.querySelector('.fadingHero');
        const height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

        const fadeStart = window.innerHeight;
        const fadeEnd = 3*fadeStart;

        if (!ticking) {
            window.requestAnimationFrame(function () {
                //minimize header if scrolled more than 50px
                if (position > 50) {
                    document.body.classList.add("_scrolled");
                } else {
                    document.body.classList.remove("_scrolled");
                }

                //hide header when wcrolling down and scrolled more than 15% of content; show header when scrolling up
                if (position > lastPosition && Math.round(100 * position / height) > 15  ){
                    document.body.classList.add("_scrolled15");
                } else {
                    document.body.classList.remove("_scrolled15");
                }
                lastPosition = position <= 0 ? 0 : position;

                //fade out hero if scrolled more than window height
                if ( hero !== null ){
                    let opacity = 0;

                    if ( position <= fadeStart ) {
                        opacity = 1;
                    } else if ( position > fadeStart && position <= fadeEnd ) {
                        opacity = (fadeEnd / position) -1;
                    }

                    hero.setAttribute("style", "opacity:" + opacity);
                }

                ticking = false;
            });
            ticking = true;
        }
    });
}

