import "./navigation.scss";

import { h, render } from 'preact';
import NavigationGuard from "./guard/NavigationGuard";

const element = document.querySelector('.navigationGuardComponent');
const userID = element.dataset.userid;
const slug = element.dataset.slug;

render(<NavigationGuard
    userID={userID} slug={slug} />
    , element);


