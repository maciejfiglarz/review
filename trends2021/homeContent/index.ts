import "./homeContent.scss";


window.addEventListener('DOMContentLoaded', () => {
    initAccordion();
});

const initAccordion = () => {


    const titles = document.querySelectorAll<HTMLInputElement>(".home--list--item .title");

    titles.forEach((title) => {
        title.addEventListener('click', (e) => {
            if (isMobile()) {
                const currentEl = e.currentTarget as HTMLInputElement;
                const wrap = currentEl.parentElement.parentElement;
                if (!wrap.classList.contains('-active')) {
                    clearAllSections();
                    wrap.classList.add('-active');
                } else {
                    wrap.classList.remove('-active');
                }
            }
        });

    });

}

const clearAllSections = () => {
    const sections = document.querySelectorAll<HTMLInputElement>(".home--list--item");
    sections.forEach(section => {
        section.classList.remove('-active');
    });
}

const isMobile = () => {
    return window.matchMedia('(max-width: 768px)').matches;
}