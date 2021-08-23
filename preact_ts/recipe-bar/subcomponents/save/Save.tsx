import { h } from 'preact';

import iconList from '../../../../../images/recipebar/icon-list.svg';
import iconBook from '../../../../../images/recipebar/icon-books.svg';
import iconPlanner from '../../../../../images/recipebar/icon-planer.svg';

export type Props = {
    readonly isOpenSaveLabel: boolean;
    readonly setIsOpenSaveLabel: any;
};

const Save = ({ isOpenSaveLabel, setIsOpenSaveLabel }: Props) => {
    return (
        <div class={`recipe--bar--save ${isOpenSaveLabel ? '-show' : ''}`}>
            <button class="close" onClick={() => setIsOpenSaveLabel(false)} type="button">
                <i class="icon-close" />
            </button>
            <h5 class="title">Zapisz do</h5>
            <div class="item">
                <img class="icon--list" src={iconList} />
                <div class="label">Do listy</div>
            </div>
            <div class="item">
                <img class="icon--book" src={iconBook} />
                <div class="label">Do książki</div>
            </div>
            <div class="item">
                <img class="icon--planner" src={iconPlanner} />
                <div class="label">Do planera</div>
            </div>
        </div>
    );
};

export default Save;
