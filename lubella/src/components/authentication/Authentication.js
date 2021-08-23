import { Fragment, h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import RegisterForm from "./register-form/RegisterForm";
import LoginForm from "./login-form/LoginForm";
import RecoverePasswordForm from "./recover-password/RecoverPasswordForm";

import Modal from "./../modal/Modal";


const Authentication = ({ isLogged, user, slug, name, content, isIndependent, authInitType, setAuthInitType }) => {
    const [type, setType] = useState(authInitType && authInitType.length > 0 ? authInitType : false);
    const [isOpen, setIsOpen] = useState(authInitType && authInitType.length > 0 ? true : false);
    // const [type, setType] = useState(false);
    // const [isOpen, setIsOpen] = useState(false);

    const [isSending, setIsSending] = useState(false);
    const [hashUrl, setHashUrl] = useState(false);


    // const [type, setType] = useState('password');
    // const [isOpen, setIsOpen] = useState('true');


    // useEffect(() => {
    //     console.log('xxxxxxxxxx', authInitType, authInitType && authInitType.length > 0);
    //     if (authInitType && authInitType.length > 0) {
    //         setIsOpen(true);
    //         setType(authInitType);
    //         setIsOpen(true);
    //         console.log('type', isOpen);

    //     }
    // }, [authInitType]);

    // console.log('type', isOpen);
    const handleClick = (type) => {
        // const toggledIsOpen = !isOpen;
        setType(type);
        setIsOpen(!isOpen);
        clearInitType();
    }

    const clearInitType = () => {
        if (!isOpen && setAuthInitType) {
            setAuthInitType("");
        }
    }

    useEffect(() => {
        clearInitType();
        if (isOpen) {
            if (type == "register") {
                setHashUrl("#zaloz-konto");
            }
            if (type == "login") {
                setHashUrl("#zaloguj-sie");
            }
            if (type == "password" || type == "password-success") {
                setHashUrl("#odzyskaj-haslo");
            }
        } else {
            setHashUrl(false);
        }
    }, [isOpen])


    const renderActions = () => (
        isLogged ? (
            <div class="action">
                <a class="btn" href={`/profil-${user}/${slug}`}>konto</a>
                <a class="btn" href={`/logout`}>wyloguj</a>
            </div>
        ) : (
            <div class="action">
                <button id={`cta__zaloguj-gora`} onClick={() => handleClick('register')} class="btn">Załóż konto</button>
                <button id={`cta__zaloz-konto-gora`} onClick={() => handleClick('login')} class="btn">Zaloguj się</button>
            </div>
        )

    )

    return (
        <div class="authentication--component">
            <Modal isOpen={isOpen} isSending={isSending} setIsOpen={setIsOpen} isFlex={type != "register" ? true : false} hashUrl={hashUrl} >
                {type == "register" && (
                    <RegisterForm setType={setType} setIsOpen={setIsOpen} setIsSending={setIsSending} uniqueId={`cta__zaloz-konto-popup`} />
                )}
                {type == "login" && (
                    <LoginForm setType={setType} setIsOpen={setIsOpen} setIsSending={setIsSending} uniqueId={`cta__zaloguj-popup`} />
                )}
                {type == "password" && (
                    <RecoverePasswordForm setType={setType} setIsOpen={setIsOpen} setIsSending={setIsSending} />
                )}
                {type == "password-success" && (
                    <Fragment>
                        <h3 class="title">Wiadomość wysłana!</h3>
                        <h5 class="info">Na Twóją skrzynkę została wysłana wiadomość z&nbsp;linkiem, który umożliwi Ci zmianę hasła.</h5>
                    </Fragment>
                )}
                {type == "hero-guard" && (
                    <Fragment>
                        <h3 class="title">Weź udział w naszej zabawie!</h3>

                        <h5 class="info">
                            <span class="line"><span class="yellow">Zaloguj się</span> lub <span class="yellow">Załóż konto</span>,</span>
                            <span class="line">by odebrać nagrodę gwarantowaną,</span>
                            <span class="line">walczyć o Mystery Box</span>
                            <span class="line">oraz nagrodę główną.</span>
                        </h5>
                        <div class="wrap">
                            <button id="cta__zaloguj-wez-udzial" onClick={() => setType('login')} class="button btn--primary">Zaloguj się</button>
                            <button id="cta__zaloz-konto-wez-udzial" onClick={() => setType('register')} class="button btn--primary">Załóż konto</button>
                        </div>
                    </Fragment>
                )}
            </Modal>

            { !isIndependent && (renderActions())}


        </div>
    )
}
export default Authentication;
