import "./guard.scss";

import { h, Fragment } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import windowScroll from '../../helpers/windowBlockScroll';
import iconClose from "./../../images/icons/icon-close.png";
import Loader from "./../loader/Loader";
import LoginForm from "./../authentication/login-form/LoginForm";
import Authentication from "./../../components/authentication/Authentication";


import effects from '../../lib/effects';

const Guard = ({ userId }) => {

    const loginRef = useRef(null);
    const registerRef = useRef(null);
    const [authInitType, setAuthInitType] = useState("");

    const [type, setType] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);



    useEffect(() => {
        effects.fadeIn([loginRef.current, registerRef.current]);
    }, [])


    const renderAuthentication = () => (<Authentication isIndependent={true} authInitType={authInitType} setAuthInitType={setAuthInitType} />);

    return (

        <Fragment>
            
            {authInitType.length > 0 && (
                renderAuthentication()
            )}



            <div class="guard--component">
                <div ref={loginRef} class="guard--section fadeInTrigger">
                    <h3 class="guard--title">Mam konto</h3>
                    <LoginForm setType={setAuthInitType} setIsOpen={setIsOpen} setIsSending={setIsSending} uniqueId="cta__zaloguj-sie-stopka" />
                </div>

                <div ref={registerRef} class="guard--section fadeInTrigger">
                    <h3 class="guard--title">Nie mam konta</h3>
                    <button id="cta__zaloz-konto-stopka" onClick={() => setAuthInitType("register")}  class="btn--primary">Załóż konto</button>
                </div>

            </div>
        </Fragment>
    );
};

export default Guard;
