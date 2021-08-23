import { h, render, Fragment } from 'preact';
import CategoryObserver from "./categoryObserver";

// const renderObserver = () { }





window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.categoryObserverComponent');

    elements.forEach(element => {
        const isLogged = element.dataset.logged;
        const categoryID = element.dataset.category;
        const observed = element.dataset.observed;
        // console.log(element,isLogged);
        render(<CategoryObserver isDefaultObserved={observed} isLogged={isLogged} categoryID={categoryID} />, element);
    });

});