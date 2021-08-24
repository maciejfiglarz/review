import Creator, { createDefaultContainer } from '../../lib/components/creator';
import {FormMode} from "./types";

const containerSelector = '.auth--modal';

const signupTriggers = document.querySelectorAll('.signupTrigger');
const loginTriggers = document.querySelectorAll('.loginTrigger');

const componentShell = Creator.createTriggered(
    () => createDefaultContainer(containerSelector),
    async () => await import('./authModal'),
);

const bindTrigger = (trigger: Element, modalFormMode: FormMode) => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const text = target.textContent;
        target.textContent  = 'loading...';
        componentShell.ready((item) => {
            item.api.show(modalFormMode);
            target.textContent = text;
        });
    });
}

signupTriggers.forEach((trigger => bindTrigger(trigger, 'signup')));
loginTriggers.forEach((trigger => bindTrigger(trigger, 'login')));