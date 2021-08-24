import "./contact-form.scss";

import { h, Fragment } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import windowScroll from '../../helpers/windowBlockScroll';
import iconClose from "../../images/icons/icon-close.png";
import Loader from "../loader/Loader";
import LoginForm from "../authentication/login-form/LoginForm";
import Modal from "../modal/Modal";

import { displayError, isEmailNotAvailable, clearErrors } from "../../lib/form/validation";
import { renderRow, renderTextarea } from "../../lib/form/fields";
import useApi from "../../lib/api/useApi";
import effects from '../../lib/effects';

const ContactForm = ({ isLogged }) => {

    const [isSending, setIsSending] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenList, setIsOpenList] = useState(false);


    const [name, setName] = useState("");
    const [topic, setTopic] = useState("-- wybierz temat --");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    const [isAgreement, setIsAgreement] = useState(false);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const topicRef = useRef(null);
    const contentRef = useRef(null);
    const agreementRef = useRef(null);


    const titleRef = useRef(null);
    const sectionFirstRef = useRef(null);
    const sectionSecondRef = useRef(null);
    const bottomRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        effects.fadeIn([titleRef.current, sectionFirstRef.current, sectionSecondRef.current, bottomRef.current]);
    }, [])

    useEffect(() => {
        setIsOpenList(false);
    }, [topic])





    const isValid = async () => {
        let isValid = true;
        clearErrors([nameRef, emailRef, topicRef, contentRef, agreementRef]);

        if (!name.length) {
            displayError(nameRef, "Pole nie może zostać puste");
            isValid = false;
        }

        if (!email.length) {
            displayError(emailRef, "Pole nie może zostać puste");
            isValid = false;
        }
        if (topic == "-- wybierz temat --") {
            const row = topicRef.current;
            row.querySelector(".contact--selector--input").classList.add('-error');
            const error = row.querySelector('.error');
            error.innerText = "Musisz wybrać temat wiadomości";
            isValid = false;
        } else {
            const row = topicRef.current;
            row.querySelector(".contact--selector--input").classList.remove('-error');
            const error = row.querySelector('.error');
            error.innerText = "";

        }
        if (!content.length) {
            displayError(contentRef, "Pole nie może zostać puste");
            isValid = false;
        }
        if (!isAgreement) {
            displayError(agreementRef, "Musisz potwierdzić akceptację regulaminu");
            isValid = false;
        }

        return isValid;
    }

    const clearForm = () => {
        setName("");
        setContent("");
        setTopic("-- wybierz temat --");
        setEmail("");
        setIsAgreement(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (await isValid()) {
            setIsSending(true);
            const data = { name, email, content, topic };
            const [fetch] = useApi();
            fetch('/api-contact-form', data, 'post')
                .then((response) => {
                    clearForm();
                    setIsOpen(true);
                })
                .catch((error) => {

                    setIsSending(false);

                }).finally(() => {
                    setIsSending(false);
                });
        }
    }



    return (<Fragment>
        <Modal isOpen={isOpen} isSending={isSending} setIsOpen={setIsOpen} isFlex={true}>
            <h3 class="title">Dziękujemy.<span class="line">Odezwiemy się wkrótce.</span></h3>
        </Modal>
        <div class="contact--component">
            <form onSubmit={handleSubmit} class="contact--form container">
                <div ref={titleRef} class="main--title -bright fadeInTrigger">
                    <h1 class="text contact--title -break-md-down">
                        <span class="white">Masz pytania? </span>
                        <span class="white">napisz do nas</span>
                    </h1>
                </div>
                <div class="contact--section--wrap">
                    <div ref={sectionFirstRef} class="contact--section -left fadeInTrigger">
                        {renderRow(nameRef, setName, name, "text", 'Imię*', name)}
                        {renderRow(emailRef, setEmail, email, "email", 'Email*', email)}
                        <div ref={topicRef} class="form--row contact--selector">
                            <input value={topic} type="hidden" />
                            <div onClick={() => setIsOpenList(!isOpenList)} class="contact--selector--input">{topic}</div>
                            <div class="info"><div class="label">Temat*</div>
                                <div class="error"></div>
                            </div>
                            <div class={`contact--selector--list ${isOpenList ? '-open' : ''}`}>
                                <div onClick={() => setTopic("zasady dotyczące udziału w konkursie")} class="contact--selector--item">zasady dotyczące udziału w konkursie</div>
                                <div onClick={() => setTopic("zasady wyłaniania zwycięzców")} class="contact--selector--item">zasady wyłaniania zwycięzców</div>
                                <div onClick={() => setTopic("jak dodać pracę konkursową?")} class="contact--selector--item">jak dodać pracę konkursową?</div>
                                <div onClick={() => setTopic("problemy techniczne")} class="contact--selector--item">problemy techniczne</div>
                                <div onClick={() => setTopic("reklamacje")} class="contact--selector--item">reklamacje</div>
                                <div onClick={() => setTopic("inne")} class="contact--selector--item">inne</div>

                            </div>
                        </div>

                    </div>

                    <div ref={sectionSecondRef} class="contact--section -right fadeInTrigger">
                        {renderTextarea(contentRef, setContent, content, 'Treść wiadomości*')}
                    </div>
                </div>
                <div ref={bottomRef} class="fadeInTrigger">

                    <div ref={agreementRef} class="checkbox--component">
                        <input type="checkbox" class="input" id="agreement1" onClick={() => setIsAgreement(!isAgreement)} checked={isAgreement} />
                        <label for="agreement1" class="label">
                            <span
                                class="text">Wyrażam zgodę na przetwarzanie przez Grupę Maspex Sp. z o.o. z siedzibą w Wadowicach, adres: 34-100 Wadowice, ul. Legionów 37, danych osobowych w zakresie podanym w formularzu kontaktowym w celu przekazania odpowiedzi na moją wiadomość/zapytanie. Zgoda może być w każdym czasie odwołana. Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej wycofaniem. Wysyłając niniejszy formularz zapytania jednocześnie potwierdzam iż zapoznałam/łem się z informacjami o zasadach przetwarzania danych osobowych zawartymi w <a class="link" target="_black" href="/politykaprywatnosci.pdf">Polityce Prywatności.*</a></span>
                        </label>
                        <div class="error"></div>
                    </div>

                    <button id="cta__formularz-kontaktowy" class={`btn--primary contact--button ${isSending ? '-sending' : ''}`} disabled={isSending ? true : false}>Wyślij</button>
                </div>
            </form>
        </div>
    </Fragment >
    );
};

export default ContactForm;