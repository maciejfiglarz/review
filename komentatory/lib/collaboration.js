import {getCookie,setCookie} from "./cookies";

export const collaboration = () => {

    let isLogged = document.querySelector('input[name=isLogged]');
    let collaborationFrame = document.querySelector('.collaboration');
    let close = collaborationFrame.querySelectorAll('.collaboration__close--action');
    let cover = document.querySelector('.cover');
    let closeAction = collaborationFrame.querySelectorAll('.collaboration__close--action');
    let isCookies = getCookie('collaboration');
    let isIncluded  = window.location.href.includes("dodaj-post");
    isLogged = isLogged == 'true' ? true : false;

    if (!isLogged) {
        if(!isIncluded ) {
            if (isCookies !== 'hidden') {

                setTimeout(function () {
                    collaborationFrame.classList.remove('display-none');
                    cover.classList.remove('display-none');
                }, 15000);
            }
        }

    }

    closeAction.forEach(close => {
        close.addEventListener('click', event => {
            collaborationFrame .classList.add('display-none');
            cover.classList.add('display-none');
            setCookie('collaboration','hidden');
        });

    });

};
