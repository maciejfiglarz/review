const body = {
    closeModal: (element) => {
        document.querySelector('body').classList.remove('_guard', '_modal');
    },
    initGuard: () => {
        document.querySelector('body').classList.add('_guard', '_modal');
    },
    addClass: (className) => {
        document.querySelector('body').classList.add(className);
    },
    removeClass: (className) => {
        document.querySelector('body').classList.remove(className);
    },
    toggleClass: (className) => {
        document.querySelector('body').classList.remove(className);
    }
}


export default body;



