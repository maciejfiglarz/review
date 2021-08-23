
import "./index.scss";
import "./../../common/index";

import "./../../modules/header";
import "./../../modules/footer";
import "./../../modules/hero";
import "./../../modules/quiz";

import "./../../components/authentication";
import "./../../components/heroAction";
import "./../../components/reward";
import "./../../components/navigation";

import "./../../components/step";
import "./../../components/guard";
import "./../../components/contact-form";

import { acceptCookies, initUserSession } from "./../../lib/cookies";


window.addEventListener('DOMContentLoaded', (event) => {
    menageVideo();
    navigationMenage();

    setTimeout(() => {
        updateScrollHash();
    }, 100);

    initFakeFadeIn();

    heroPacksEffect();
    initShake();
    acceptCookies();
});

const initShake = () => {
    const inits = document.querySelectorAll('.-initShake');
    inits.forEach(init => {
        setTimeout(() => {
            init.classList.add('shakeElement');
        }, 1500);
    });
}

const initFakeFadeIn = () => {
    const triggers = document.querySelectorAll('.fakeFadeInTrigger');
    triggers.forEach(trigger => {

        setTimeout(() => {
            trigger.classList.add('fakeFadeIn');
            trigger.classList.remove('fakeFadeInTrigger');

            // trigger.classList.add('fakeFadeInTrigger');

        }, 100);

    });
}

const navigationMenage = () => {
    const menu = document.querySelector('.navigation--menu');
    const items = menu.querySelectorAll('.item');
    const body = document.querySelector('body');

    items.forEach(item => {
        item.addEventListener('click', () => {
            body.classList.remove('_navigation-opened');
        });
    });
}


const menageVideo = () => {
    const section = document.querySelector('.hero--player');
    const foreground = section.querySelector('.foreground');
    const videos = section.querySelectorAll('.video');

    foreground.addEventListener('click', () => {
        foreground.classList.add('display-none');
        videos.forEach(video => {

            video.classList.remove('display-none');
            video.setAttribute('src','https://www.youtube.com/embed/dWhT5ZqPzSw?autoplay=1')
        });

    });

}

const heroPacksEffect = () => {
    const elements = document.querySelectorAll('.first--step--box,.second--step--box,.hero--packs');
    elements.forEach(img => {
        const callback = (entries, observer) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    const element = entry.target;

                    if (element.classList.contains('first--step--box') && !element.classList.contains('arrowEffect')) {
                        element.classList.add('arrowEffect');
                    } else if (element.classList.contains('first--step--box') && element.classList.contains('arrowEffect')) {
                        element.classList.remove('arrowEffect');
                    }

                    if (element.classList.contains('second--step--box') && !element.classList.contains('arrowEffect')) {
                        element.classList.add('arrowEffect');
                    } else if (element.classList.contains('second--step--box') && element.classList.contains('arrowEffect')) {
                        element.classList.remove('arrowEffect');
                    }

                    if (element.classList.contains('hero--packs') && !element.classList.contains('-packs-effect')) {
                        element.classList.add('-packs-effect');
                    } else if (element.classList.contains('hero--packs') && element.classList.contains('-packs-effect')) {
                        element.classList.remove('-packs-effect');
                    }

                }
            })
        }

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1
        }
        const myObserver = new IntersectionObserver(callback, options)
        myObserver.observe(img)
    });

}

const updateScrollHash = () => {
    const scrollSections = document.querySelectorAll('.sectionTrigger');
    let lastHash;
    let scrollTimeout;


    const getSectionIdInViewport = () => {
        let lastSection;

        scrollSections.forEach((scrollSection) => {
            if (scrollSection.getBoundingClientRect().y - 200 <= 0) {
                lastSection = scrollSection.id;
            }
        });

        return lastSection;
    };

    const setSectionHash = () => {
        let newHash = getSectionIdInViewport();
        // console.log('has', newHash);
        newHash = newHash == "index" || newHash == undefined ? "" : '#' + newHash;
        if (lastHash !== newHash) {
            try {
                window.history.replaceState(null, '', window.location.href.split('?')[0].split('#')[0] + newHash);
            } catch (e) { }
        }
    };

    setSectionHash();

    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            setSectionHash();
        }, 50);
    });


}
