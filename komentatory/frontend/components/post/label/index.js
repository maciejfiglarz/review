import { h, render } from 'preact';
import Vote from "./_vote";
import Action from "./_action";

const Label = ({ data,isSingle }) => {
    const { id } = data;
    return (
        <div class="post--label">
            <Vote data={data} />
            <Action isSingle={isSingle }  data={data} />
        </div>
    )
}

export default Label;


