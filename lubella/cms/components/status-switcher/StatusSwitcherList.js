import "./statusSwitcher.scss";
import { h, render, Component } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import checkIcon from "./../../images/cms_check.svg"
import uncheckIcon from "./../../images/cms_uncheck.svg"

import useApi from "./../../lib/api/useApi";
import { ToastContainer, toast } from 'react-toastify';

// import postServices from "../../services/post";


const StatusSwitcherList = ({ type, id, label, listValue: listValueDefault }) => {

    const [value, setValue] = useState(false);

    const onClick = () => {
        // if (type == "post-list-waitingroom") {
        //     postServices.toggleStatus(id, 'isWaitingRoom');
        // } else if (type == "post-list-accepted") {
        //     postServices.toggleStatus(id, 'isAccepted');
        // } else if (type == "post-list-deleted") {
        //     postServices.toggleStatus(id, 'isDeleted');
        // }
        console.log(`/cms/api-tip-toggle-status/${id}`);

        const [fetch] = useApi();
        fetch(`/cms/api-tip-toggle-status/${id}`, {}, 'get')
            .then((response) => {
                console.log('response',response);
                // if (response.url) {
                //     location.href = response.url;
                // }
                setValue(!value);
                toast.success("Status został zmieniony");
            })
            .catch((error) => {
                // toast.error({ text: 'Wystąpił błąd podczas rejestracji' });
                console.log(error);
                toast.error("Coś poszło nie tak");
            });

        setValue(!value);
    }

    useEffect(() => {
        setValue(listValueDefault);
    }, []);


    return (
        <div class="status--switcher">
            {label && (
                <div class="title">{label}: </div>
            )}
            <div class="status--content">
                <div class={`item -accept ${value ? "-active" : ""}`}>
                    <img class="icon" onClick={onClick} src={checkIcon} />
                </div>
                <div class={`item -reject ${!value ? "-active" : ""}`}>
                    <img class="icon" onClick={onClick} src={uncheckIcon} />
                </div>
            </div>
        </div>
    )
}

export default StatusSwitcherList;