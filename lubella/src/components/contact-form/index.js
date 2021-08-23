import { h, render } from 'preact';
import ContactForm from "./ContactForm";

const element = document.querySelector('.contactFormComponent');
const user = element.dataset.user;
const email = user ? element.dataset.email : '';
const name = user ? element.dataset.name : '';

render(<ContactForm
    isLogged={user ? true : false} name={name} email={email} />
    , element);