import { h, render } from 'preact';
import Authentication from "./Authentication";
import "./authentication.scss";

const element = document.querySelector('.authenticationComponent');
const user = element.dataset.user;
const name = element.dataset.name;
const slug = element.dataset.slug;
const content = element.cloneNode(true);


render(<Authentication
    isLogged={user ? true : false}
    slug={slug}
    name={name}
    user={user}
    content={content}
    isIndependent={false} />
    , document.querySelector('.authenticationComponent'));