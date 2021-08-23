import { Fragment, h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import LoginButtons from "./../login-buttons/LoginButtons";
import AgeValidator from "./subcomponents/AgeValidator";

import Modal from "./../../modal/Modal";
import useApi from '../../../lib/api/useApi';
import { displayError, isEmailNotAvailable, clearErrors } from "./../../../lib/form/validation";
import { renderRow } from "./../../../lib/form/fields";


const RegisterForm = ({ isOpen, setIsOpen, setType, setIsSending, uniqueId }) => {
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [isValidAge, setIsValidAge] = useState("");
    const [isAgreement, setIsAgreement] = useState(false);

    const firstNameRef = useRef(null);
    const secondNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const secondPasswordRef = useRef(null);
    const ageRef = useRef(null);
    const agreementRef1 = useRef(null);
    const agreementRef2 = useRef(null);


    const isValid = async () => {
        let isValid = true;
        clearErrors([firstNameRef, secondNameRef, emailRef, emailRef, passwordRef, secondPasswordRef]);

        let refToScroll = null;



        if (!firstName.length) {
            displayError(firstNameRef, "Pole nie może zostać puste");
            isValid = false;
            if (!refToScroll) {
                refToScroll = firstNameRef;
            }
        }
        if (!secondName.length) {
            displayError(secondNameRef, "Pole nie może zostać puste");
            isValid = false;
            if (!refToScroll) {
                refToScroll = secondNameRef;
            }
        }

        if (!email.length) {
            displayError(emailRef, "Pole nie może zostać puste");
            isValid = false;
        } else if (await isEmailNotAvailable(email)) {
            displayError(emailRef, "Ten adres jest już zajęty");
            isValid = false;
            if (!refToScroll) {
                refToScroll = emailRef;
            }
        }

        let isPasswordValid = false;
        if (!password.length) {
            displayError(passwordRef, "Pole nie może zostać puste");
            isValid = false;
            if (!refToScroll) {
                refToScroll = passwordRef;
            }
        } else if (password.length < 8) {
            displayError(passwordRef, "Pole powinno zawierać min. 8 znaków");
            isValid = false;
            if (!refToScroll) {
                refToScroll = passwordRef;
            }
        } else {
            isPasswordValid = true;
        }
        if (isPasswordValid && !secondPassword.length) {
            displayError(secondPasswordRef, "Pole nie może zostać puste");
            isValid = false;
            if (!refToScroll) {
                refToScroll = secondPasswordRef;
            }
        } else if (isPasswordValid && password != secondPassword) {
            displayError(secondPasswordRef, "Podane hasła muszą być takie same");
            isValid = false;
            if (!refToScroll) {
                refToScroll = secondPasswordRef;
            }
        }

        if (typeof isValidAge != "boolean") {
            // displayError(ageRef, "Musisz zaznaczyć jedną z odpowiedzi");
            const row = ageRef.current;

            // row.querySelector(".w").classList.remove('-error');
            // const input = row.querySelector('input');
            const error = row.querySelector('.error');
            // if (input) {
            //     input.classList.add('-error');
            // }

            error.innerText = "Musisz zaznaczyć jedną z odpowiedzi";
            isValid = false;
            if (!refToScroll) {
                refToScroll = ageRef;
            }
        } else {
            const row = ageRef.current;
            const error = row.querySelector('.error');
            error.innerText = "";
        }

        if (typeof isValidAge == "boolean" && !isAgreement) {
            if (agreementRef1.current) {
                displayError(agreementRef1, "Musisz potwierdzić akceptację regulaminu");

            }
            if (agreementRef2.current) {
                displayError(agreementRef2, "Musisz potwierdzić akceptację regulaminu");

            }
            if (!refToScroll) {
                refToScroll = ageRef;
            }
            isValid = false;
        } else {
            let row = agreementRef1.current;
            if (row) {
                const error = row.querySelector('.error');
                row.classList.remove('-error');
                error.innerText = "";
            }


            let row1 = agreementRef2.current;
            if (row1) {
                const error1 = row1.querySelector('.error');
                row1.classList.remove('-error');
                error1.innerText = "";
            }


        }

        const scroll = document.querySelector('.modal--body--scroll');
        if (!isValid && scroll && refToScroll) {
            scroll.scrollTo({
                behavior: "smooth",
                top: refToScroll.current.offsetTop - 70
            });
        }

        return isValid;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (await isValid()) {
            setIsSending(true);
            const data = { firstName, secondName, email, password, isValidAge, isAgreement };
            const [fetch] = useApi();
            fetch('/register', data, 'post')
                .then((response) => {
                    if (response.url) {
                        location.href = response.url;
                    }

                })
                .catch((error) => {
                    console.log('register',error);
                    setIsSending(false);
                }).finally(() => {
                    setIsSending(false);
                });
        }


    }

    return (
        <Fragment>
            <LoginButtons />
            <form class="form--component" onSubmit={handleSubmit}>
                {renderRow(firstNameRef, setFirstName, firstName, "text", 'Imię*')}
                {renderRow(secondNameRef, setSecondName, secondName, "text", 'Nazwisko*')}
                {renderRow(emailRef, setEmail, email, "email", 'Email*')}
                <div class="password--wrap">
                    <div class="info">Min. 8 znaków</div>
                    {renderRow(passwordRef, setPassword, password, "password", 'Hasło*')}
                </div>

                {renderRow(secondPasswordRef, setSecondPassword, secondPassword, "password", 'Powtórz hasło*')}
                <AgeValidator agreementRef2={agreementRef2} agreementRef1={agreementRef1} isAgreement={isAgreement} setIsAgreement={setIsAgreement} ageRef={ageRef} isValidAge={isValidAge} setIsValidAge={setIsValidAge} />

                <input id={uniqueId ? uniqueId : ""} type="submit" class="btn--primary bt15" value="Załóż konto" />
                <div class="required">*pola obowiązkowe</div>
            </form>
        </Fragment>
    )
}
export default RegisterForm;
