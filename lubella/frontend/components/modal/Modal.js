import "./modal.scss";

import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import windowScroll from '../../helpers/windowBlockScroll';
import iconClose from "../../images/icons/icon-close.png";
import Loader from "../loader/Loader";


const Modal = ({ children, isOpen, setIsOpen, isFlex, isSending, IsFleOn, hashUrl, scrollClass }) => {

    useEffect(() => {
        if (isOpen) {
            windowScroll.init();
        } else {
            windowScroll.remove();
        }
    }, [isOpen]);

    useEffect(() => {

        if (isOpen) {
            replaceHashUrl();
        } else {
            clearHashUrl();
        }
    }, [hashUrl, isOpen]);

    const closeModal = () => {
        setIsOpen(false);
    };
    useEffect(() => {
       document.querySelector('body').classList.add('_modal-loaded');
    }, []);


    const replaceHashUrl = () => {
        if (hashUrl) {
            window.history.replaceState(null, '', window.location.href.split('?')[0].split('#')[0] + hashUrl);
        }

    }
    const clearHashUrl = () => {
        if (hashUrl) {
            let newHash = '';
            window.history.replaceState(null, '', window.location.href.split('?')[0].split('#')[0] + newHash);
        }
    }

    return (
        <Fragment>
            {/* {isOpen && ( */}
            <div class={`modal--component   ${isOpen ? '-show' : ''}   ${isFlex ? "-flex" : ""} `}>
                <div onClick={() => closeModal()} class="modal--background"></div>
                <div class="modal--content">
                    <div class="modal--body">


                        {isSending && (
                            <div class="modal--loader"><Loader /></div>
                        )}
                        <button class="modal--close btn--close" onClick={() => closeModal()}>
                            <img src={iconClose} />
                        </button>
                        <div class={`${!isFlex ? "modal--body--scroll" : ""} ${scrollClass ? scrollClass : ""}`}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}
        </Fragment>
    );
};

export default Modal;
