import { h, render } from 'preact';
import HeroAction from "./heroAction";

const element = document.querySelector('.heroActionComponent');


const userID = element.dataset.user;
const slug = element.dataset.slug;

render(<HeroAction
    userID={userID.length > 0 ? userID : false} slug={slug.length > 0 ? slug : false} />
    , element);

