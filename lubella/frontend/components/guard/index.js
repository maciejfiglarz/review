import { h, render } from 'preact';
import Guard from "./Guard";

const element = document.querySelector('.guardComponent');
const user = element.dataset.user;
if(!user){
    render(<Guard />
        , element);
}
