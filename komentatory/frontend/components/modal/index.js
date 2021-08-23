import "./modal.scss"
import bodyService from "./../../lib/body";

window.addEventListener('DOMContentLoaded', (event) => {

    const closes = document.querySelectorAll('.modal--close');
    closes.forEach(close => {
        close.addEventListener('click', () => {
            bodyService.closeModal();
        });
    });

    const modalBackground = document.querySelector('.modal--background');
    if (modalBackground) {
    }
    modalBackground.addEventListener('click', () => {
        bodyService.closeModal();
    });



});

