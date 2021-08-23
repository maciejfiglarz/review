import "./modal.scss";

import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
// import windowScroll from '../../helpers/windowBlockScroll';
import iconClose from "./../../images/cms_icon-close.png";
import Loader from "./../loader/Loader";


const Modal = ({ children, isOpen, setIsOpen, isFlex, isSending }) => {

    useEffect(() => {
        setIsOpen(isOpen);
        // if (isOpen) {
        //     windowScroll.init();
        // } else {
        //     windowScroll.remove();
        // }
    }, [isOpen]);


    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <Fragment>
            {isOpen && (
                <div class={`modal--component   ${isFlex ? "-flex" : ""}`}>
                    <div onClick={() => closeModal()} class="modal--background"></div>
                    <div class="modal--content">
                        <div class="modal--body">


                            {isSending && (
                                <div class="modal--loader"><Loader /></div>
                            )}
                            <button class="modal--close btn--close" onClick={() => closeModal()}>
                                <img src={iconClose} />
                            </button>
                            <div class={`${!isFlex ? "modal--body--scroll" : ""}`}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Modal;
