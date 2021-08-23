import "./index.scss";
import "./../components/Toast";

const hideLoader = () => {
    setTimeout(() => {
        document.querySelector('body').classList.add('-loaded');
    }, 500);
}

const manegeNavigation = () => {
    const navigationInit = document.querySelector('.navigationTrigger');
    navigationInit.addEventListener('click', () => {
        document.querySelector('body').classList.add('-navigation-opened');
    })
}

document.addEventListener('DOMContentLoaded', (event) => {
    hideLoader();
    manegeNavigation();
});

