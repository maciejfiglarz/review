import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

import Save from './subcomponents/save/Save';

import shareIcon from '../../../images/recipebar/icon-share.svg';

const RecipeBarMobile = () => {
    const [isOpenSaveLabel, setIsOpenSaveLabel] = useState<boolean>(false);

    return (
        <Fragment>
            <div class={`recipe--bar--cover  ${isOpenSaveLabel ? '-show' : ''}`}></div>
            <div class={`recipe--bar--mobile`}>
                <button class="btn btn--primary -no-hover -action" type="button">
                    <span class="icon-thumb -thumb"></span>
                </button>
                <button onClick={() => setIsOpenSaveLabel(true)} class="btn btn--primary -no-hover -save" type="button">
                    Zapisz do
                </button>
                <button class="btn btn--primary -no-hover -action" type="button">
                    <img class="icon--share -share" src={shareIcon} />
                </button>
            </div>
            <Save isOpenSaveLabel={isOpenSaveLabel} setIsOpenSaveLabel={setIsOpenSaveLabel} />
        </Fragment>
    );
};

export default RecipeBarMobile;
