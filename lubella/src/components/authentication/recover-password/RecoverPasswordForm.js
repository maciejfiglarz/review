import { Fragment, h, render } from 'preact';
import { useState, useRef } from 'preact/hooks';
import { displayError, isUserEmailExist, clearErrors } from "./../../../lib/form/validation";
import { renderRow } from "./../../../lib/form/fields";

import useApi from '../../../lib/api/useApi';


const RecoverePasswordForm = ({ setIsSending, setType }) => {
    const [email, setEmail] = useState("");
    const [isSucces, setIsSuccess] = useState(false);
    const emailRef = useRef(null);

    const isValid = async () => {
        let isValid = true;
        clearErrors([emailRef]);

        if (!email.length) {
            displayError(emailRef, "Pole nie może zostać puste");
            isValid = false;
        } else if (! await isUserEmailExist(email)) {
            displayError(emailRef, "Tego adresu nie ma w naszej bazie");
            isValid = false;
        }
        return isValid;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (await isValid()) {
            setIsSending(true);
            const [fetch] = useApi();
            fetch('/api-recover-password', { email }, 'post')
                .then((response) => {
                    // if (response.url) {
                    //     location.href = response.url;
                    // }
                    setType("password-success");
                })
                .catch((error) => {

                    setIsSending(false);
                }).finally(() => {
                    setIsSending(false);
                });
        }

    }



    return (

        <Fragment>
            <h3 class="title">Zapomniałeś hasła?</h3>

            <h5 class="info"><span class="line">Wpisz swój adres email.</span>
            </h5>
            <form class="form--component" onSubmit={handleSubmit}>
                {renderRow(emailRef, setEmail, email, "email", 'Email*')}

                <input id={`cta__zapomnialem-hasla-wyslij`} type="submit" class="btn--primary -mt15" value="Wyślij" />
            </form>
        </Fragment>
    )
}
export default RecoverePasswordForm;