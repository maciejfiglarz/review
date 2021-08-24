import {emailValid} from "./validation";

export default class ForgotPassword {
    constructor(sortDesktop) {
        this.inits = document.querySelectorAll('.forgot-password__init');
        this.frame = document.querySelector('.forgot-password');
        this.close = document.querySelector('.forgot-password__close');
        this.cover = document.querySelector('.cover');
        this.button = document.querySelector('.forgot-password__button');
        this.text = document.querySelector('.forgot-password__text');
        this.content = document.querySelector('.forgot-password__content');
        this.loader = document.querySelector('.forgot-password__loader');
        this.success = document.querySelector('.forgot-password__success');
        this.error = document.querySelector('.forgot-password__error');
        this.info = document.querySelector('.forgot-password__info');
        this.init();
        this.initClickButton();
        this.initCloseFrame();
    }

    init() {
        this.inits.forEach(init => {
            init.addEventListener('click', event => {
                event.preventDefault();
                this.frame.classList.remove('display-none');
                this.cover.classList.remove('display-none');
            })
        });
    }

    initClickButton() {
        this.button.addEventListener('click', (event) => {
            const email = this.text.value;

            if (email.length > 0) {
                const formData = new FormData();
                formData.append("email", email);
                this.hideInfo();
                if (this.isEmailValid(email)) {
                    $.ajax({
                        url: '/api-forgot-password',
                        data: formData,
                        type: "post",
                        contentType: false,
                        processData: false,
                        cache: false,
                        dataType: "json",
                        beforeSend: () => {
                            this.showLoader();
                            this.hideContent();
                        },
                        success: data => {
                            this.hideLoader();
                            const {status} = data;

                            if (status) {
                                this.showSuccess();
                                this.hideLoader();
                            } else {
                                this.showContent();
                                this.hideLoader();
                                this.showError('Takiego adresu email nie ma w naszej bazie');
                            }
                        }
                    });
                }else {
                    this.showError('Podany email jest niepoprawny');
                }
            }
        });
    }
    hideInfo(){
        this.info.classList.add('display-none');
    }
    showError(msg){
        this.error.classList.remove('display-none');
        this.error.innerText = msg;
    }
    initCloseFrame() {
        this.close.addEventListener('click', () => {
            this.closeFrame();
        })
    }

    showSuccess() {
        this.success.classList.remove('display-none');
    }

    closeFrame() {
        this.frame.classList.add('display-none');
        this.text.value = '';
        this.button.dataset.id = 0;
        this.cover.classList.add('display-none');
    }

    showLoader() {
        this.loader.classList.remove('display-none');
    }

    hideLoader() {
        this.loader.classList.add('display-none');
    }

    hideContent() {
        // this.content.classList.add('display-none');
        this.content.style.opacity = '0';
    }

    showContent() {
        this.content.style.opacity = '1';
    }

    isEmailValid(email) {
        return emailValid(email);
    }


}