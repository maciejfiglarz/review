import './authModal.scss';
import { h, Fragment } from "preact";
import {useState} from "preact/hooks";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";
import ThankYou from "./thankYou";

import {FormMode} from "./types";

const AuthModal = (props: { api: any, container: HTMLElement }) => {

    const [mode, setMode] = useState<FormMode>('login');
    const { api, container } = props;
    const [closeDisabled, setCloseDisabled] = useState(false);

    const bodyClassToggle = (toggle:boolean) => {
        (toggle) ? document.body.classList.add('-with-auth-modal') : document.body.classList.remove('-with-auth-modal')
    }

    const show = (mode: FormMode) => {
        container.classList.add('-show');
        bodyClassToggle(true);
        setMode(mode);
    }

    const hide = () => {
        if (closeDisabled) return;
        container.classList.remove('-show');
        bodyClassToggle(false);
    }

    const onSubmitted = () => setMode('thank-you');

    api({ show, hide, mode });

    const content = () => {
        switch (mode) {
            case "login":
                return <LoginForm {...{setCloseDisabled, onSubmitted}}/>;
            case "signup":
                return <SignupForm {...{setCloseDisabled, onSubmitted}} />;
            case "thank-you":
                return <ThankYou />;
        }
    }

    return (
        <>
            <button type="button" class="close btn--close" onClick={hide}><span class="icon icon-close"/></button>
            {content()}
        </>
    );

}

export default AuthModal;
export { FormMode }