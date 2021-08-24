export const accessBlock = () => {
    const accessBlock = document.querySelector(".access-block");
    const accessBlockInit = document.querySelectorAll(".access-block__init");
    const accessBlockClose = document.querySelector(".access-block__close");
    const accessBlockCover = document.querySelector(".access-block__cover");

    const list = document.querySelector('.initClick');
    if (list) {
        list.addEventListener('click', (event) => {
            let element = event.target;
            if (element.tagName != 'DIV') {
                element = element.parentElement;
            }
            if (element.classList.contains('access-block__init')) {
                event.preventDefault();
                accessBlock.classList.remove("display-none");
                accessBlockCover.classList.remove("display-none");

            }
        });
    }

    accessBlockInit.forEach(element => {
        element.addEventListener("click", () => {
            accessBlock.classList.remove("display-none");
            accessBlockCover.classList.remove("display-none");
        });
    });


    accessBlockClose.addEventListener("click", () => {
        accessBlock.classList.add("display-none");
        accessBlockCover.classList.add("display-none");
    });
};

