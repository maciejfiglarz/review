import "./guard.scss";

import { h, Fragment } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';

import Authentication from "./../../components/authentication/Authentication";


import effects from '../../lib/effects';

const HeroAction = ({ userID, slug }) => {


    const [type, setType] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [authInitType, setAuthInitType] = useState("");
    const [extraClass, setExtraClass] = useState("");

    useEffect(()=>{
        setExtraClass('shakeElement');
    },[]);
    
    return (
        <Fragment >

            {authInitType.length > 0 && (
                <Authentication isIndependent={true} authInitType={'hero-guard'} setAuthInitType={setAuthInitType} />
            )}



            {userID ? (
                <a href={`/profil-${userID}/${slug}`} id="cta__wez-udzial-zalogowany" class={`button btn--secondary -small ${extraClass}`}>Weź udział</a>
            ) : (
                <button onClick={() => setAuthInitType("hero-guard")} id="cta__wez-udzial" class={`button btn--secondary -small ${extraClass}`}>Weź udział</button>
            )}



        </Fragment >
    );
};

export default HeroAction;
