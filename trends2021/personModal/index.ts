import Creator, { createDefaultContainer } from '../../lib/components/creator';

const containerSelector = '.personModal';
const triggerSelector = '.triggerPersonModal';
const triggers = document.querySelectorAll(triggerSelector);
const componentShell = Creator.createTriggered(
    () => createDefaultContainer(containerSelector),
    async () => await import('./personModal'),
);
triggers.forEach((trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        let target = e.target as HTMLElement;
        target = target.classList.contains("triggerPersonModal") ? target : target.closest(".triggerPersonModal");

        componentShell.ready((item) => {
            item.api.show(target.dataset.id);
        });
    });
}))


