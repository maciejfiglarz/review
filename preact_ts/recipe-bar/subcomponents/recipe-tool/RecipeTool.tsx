import { h } from 'preact';

import './RecipeTool.scss';

type Props = {
    readonly icon: string;
    readonly title: string;
    readonly counter?: number;
    readonly isNew?: boolean;
    readonly iconClass?: string;
};

const RecipeTool = ({ icon, title, counter, isNew, iconClass }: Props) => (
    <div class="recipe--tool">
        <div class={`icon ${iconClass}`}>
            <img src={icon} alt={title} />
        </div>
        <div class="content">
            {isNew && <div class="new">Nowość</div>}
            <div class="label">{title}</div>
            <div class="counter">{counter}</div>
        </div>
    </div>
);

export default RecipeTool;
