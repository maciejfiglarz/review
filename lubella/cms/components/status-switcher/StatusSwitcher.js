import "./statusSwitcher.scss";
import { h, render, Component } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import articleServices from "../../services/article";


const StatusSwitcher = ({ type, id, value, setValue, label }) => {

    const onClick = () => {
        if (type == "article") {
            articleServices.toggleStatus(id);
        }
        setValue(!value);
    }
    return (
        <div class="status--switcher">
            {label && (
                <div class="title">{label}: </div>
            )}
            <div class="status--content">
                <div class={`item -accept ${value ? "-active" : ""}`}>
                    <i onClick={onClick} class="far fa-check-circle icon"></i>
                </div>
                <div class={`item -reject ${!value ? "-active" : ""}`}>
                    <i onClick={onClick} class="fas fa-minus-circle icon"></i>
                </div>
            </div>
        </div>
    )
}

export default StatusSwitcher;