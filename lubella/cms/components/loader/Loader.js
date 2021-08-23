import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import "./loader.scss";


const Loader = () => {

    return (
        <div class="loader--wrap">
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default Loader;



