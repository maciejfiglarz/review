import { Fragment, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import printIcon from '../../../images/recipebar/icon-print.svg';
import planIcon from '../../../images/recipebar/icon-plan.svg';
import moreIcon from '../../../images/recipebar/icon-more.svg';

import AddToCookbook from '../cookbook/subcomponents/add-to-cookbook/AddToCookbook';
import RecipeLike from '../recipe-like/RecipeLike';
import RecipeTool from './subcomponents/recipe-tool/RecipeTool';
import RecipeSend from '../recipe-send/RecipeSend';

const RecipeBarDesktop = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const fakeRef = useRef<HTMLDivElement>(null);
    const elementRef = useRef<HTMLDivElement>(null);
    const [scrollDir, setScrollDir] = useState<string>('down');

    const header = document.querySelector<HTMLDivElement>('.mainHeader');

    useEffect(() => {
        const rootMargin = window.innerWidth >= 1280 ? `-120px` : `-10px`;

        let observerOptions = {
            root: null,
            rootMargin: rootMargin,
            threshold: [0],
        };
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting === true) {
                setIsVisible(false);
                setScrollDir('down');
            } else {
                setIsVisible(true);
                setScrollDir('down');
            }
        }, observerOptions);

        const element = fakeRef.current;
        observer.observe(element);
    }, []);

    useEffect(() => {
        const threshold = 0;
        const element = elementRef.current;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll);

        const compactBars = () => {
            element.classList.add('-up');
            header.classList.add('-up');
        };
        const removeCompactBars = () => {
            element.classList.remove('-up');
            header.classList.remove('-up');
        };

        if (isVisible) {
            if (scrollDir == 'up') {
                compactBars();
            } else {
                removeCompactBars();
            }
        } else {
            removeCompactBars();
        }

        return () => window.removeEventListener('scroll', onScroll);
    }, [scrollDir]);

    return (
        <Fragment>
            <div ref={fakeRef} class="reciper--bar--fake"></div>
            <div
                ref={elementRef}
                class={`recipe--bar justify-between recipeBarScrolled ${isVisible ? '-scrolled' : ''}`}
            >
                <div class={`inner ${isVisible ? 'container' : ''}`}>
                    <h2 class="title">Beza z malinami i polewą owocową pod chmurką...</h2>
                    <div class={`recipe--bar--action ${isVisible ? '-scrolled' : ''}`}>
                        <RecipeLike />
                        <AddToCookbook />
                        <RecipeSend />
                        <RecipeTool icon={printIcon} iconClass="-print" title={'Drukuj'} counter={554} />
                        <RecipeTool icon={planIcon} iconClass="-plan" title={'Zaplanuj'} counter={543} isNew={true} />
                        <img class="more" src={moreIcon} alt="Więcej" />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default RecipeBarDesktop;
