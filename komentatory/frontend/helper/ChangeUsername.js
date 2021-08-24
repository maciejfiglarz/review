export default class ReportPost {
    constructor() {
        this.frame = document.querySelector('.change-username');
        this.cover = document.querySelector('.cover');
        this.init();
    }

    init() {
        if (this.frame) {
            const button = this.frame.querySelector('.change-username__button');
            const input = this.frame.querySelector('.change-username__input');
            const errorFrame = this.frame.querySelector('.change-username__error');
            const loader = this.frame.querySelector('.change-username___loader');
            const content = this.frame.querySelector('.change-username__content');
            const warning = this.frame.querySelector('.change-username__warning');

            button.addEventListener('click', () => {
                const formData = new FormData();
                formData.append("username", input.value);
                $.ajax({
                    url: '/api-change-username',
                    data: formData,
                    type: "post",
                    contentType: false,
                    processData: false,
                    cache: false,
                    dataType: "json",
                    beforeSend: () => {
                        this.showLoader(loader);
                        this.hideContent(content);
                        this.cover.classList.remove('display-none');
                    },
                    success: data => {
                        const {status, error} = data;
                        if (status) {
                            this.frame.classList.add('display-none');
                            this.cover.classList.add('display-none');
                        } else {
                            warning.classList.add('display-none');
                            errorFrame.classList.remove('display-none');
                            errorFrame.querySelector('span').innerText = error;
                            this.hideLoader(loader);
                            this.showContent(content);

                        }
                    }
                });
            });
        }

    }

    showLoader(loader) {
        loader.classList.remove('display-none');
    }
    hideLoader(loader) {
        loader.classList.add('display-none');
    }
    showContent(content) {
        content.classList.remove('display-none');
    }
    hideContent(content) {
        content.classList.add('display-none');
    }
    showCover(){
        this.cover.classList.remove('display-none');
    }
    hideCover(){
        this.cover.classList.add('display-none');
    }
}


