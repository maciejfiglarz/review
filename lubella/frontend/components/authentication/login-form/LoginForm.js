import { Fragment, h, render } from 'preact';
import { useState, useRef } from 'preact/hooks';

import Modal from "../../modal/Modal";
import useApi from '../../../lib/api/useApi';

import { displayError, isEmailNotAvailable, clearErrors } from "../../../lib/form/validation";
import { renderRow } from "../../../lib/form/fields";
import LoginButtons from '../login-buttons/LoginButtons';

const LoginForm = ({ setType, setIsSending, uniqueId }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid()) {
            setIsSending(true);
            const data = { email, password };
            const [fetch] = useApi();
            fetch('/login', data, 'post')
                .then((response) => {
                    setError("");
                    if (response.url) {
                        location.href = response.url;
                    }

                })
                .catch((error) => {
                    setError("Podany email lub hasło są nieprawidłowe");
                    setIsSending(false);
                }).finally(() => {
                    setIsSending(false);
                });
        }
    }

    const isValid = () => {
        let isValid = true;
        // clearErrors([emailRef, passwordRef]);
        setError("");

        if (!email.length || !password.length) {
            // displayError(emailRef, "Pole nie może zostać puste");
            setError("Musisz wpisać email i hasło");
            isValid = false;
        }
        return isValid;
    }

    return (
        <Fragment>
            <LoginButtons />
            <form class="form--component" onSubmit={handleSubmit}>
                {error.length > 0 && (
                    <div class="error">{error}</div>
                )}
                {renderRow(emailRef, setEmail, email, "email", 'Email*')}
                <div class="recover--password">
                    {renderRow(passwordRef, setPassword, password, "password", 'Hasło*')}
                    <div id={`cta__zapomniales-hasla`} onClick={() => setType('password')} class="recover--init">Zapomniałeś hasla?</div>
                </div>

                <input id={uniqueId ? uniqueId : ""} type="submit" class="btn--primary" value="Loguj" />
                <div class="required">*pola obowiązkowe</div>
            </form>
        </Fragment>
    )
}
export default LoginForm;