import { h } from "preact";
import './switcher.scss';

const Switcher = () => {
    return (
        <div class="switcher--component">
            <div class="item -small">A</div>
            <div class="item -middle">A</div>
            <div class="item -large">A</div>

            <div class="item -color -black-on-white">A</div>
            <div class="item -color -black-on-yellow">A</div>
            <div class="item -color -white-on-black">A</div>
        </div>
    );
}

export default Switcher;