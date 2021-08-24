import "./guard.scss";

import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Authentication from "./../../../components/authentication/Authentication";

import bodyService from "./../../../lib/body";

const NavigatiorGuard = ({ userID, slug }) => {
    const [authInitType, setAuthInitType] = useState("");

    useEffect(() => {
        if (authInitType.length > 0) {
            bodyService.removeClass("_navigation-opened");
            bodyService.removeClass("_modal-opened");
        }
    }, [authInitType]);



    return (

        <Fragment>
            {authInitType.length > 0 && (
                <Authentication isIndependent={true} authInitType={authInitType} setAuthInitType={setAuthInitType} />
            )}

            <div class="navigation--guard">
                {userID ? (
                    <Fragment>

                        <li class="item">
                            <a class="btn--primary" href={`/profil-${userID}/${slug}`}>Konto</a>
                        </li>
                        <li class="item">
                            <a class="btn--primary" href="/logout">Wyloguj się</a>
                        </li>
                    </Fragment>

                ) : (
                    <Fragment>
                        <li class="item">
                            <button id="cta__zaloguj-menu-mobilne" onClick={() => setAuthInitType("login")} class="btn--primary">Zaloguj się</button>
                        </li>
                        <li class="item">
                            <button id="cta__zaloz-menu-mobilne" onClick={() => setAuthInitType("register")} class="btn--primary">Założ konto</button>
                        </li>
                    </Fragment>
                )}

            </div>
        </Fragment >
    );
};

export default NavigatiorGuard;




