import { h } from "preact";
const Item = ({ data }) => {
    const { title, href, category, color } = data;

    return (
        <a href={href} class={`link -${color}`}>
            <div class="category">{category}</div>
            <h3 class="title">{title}</h3>
        </a>
    );
}

export default Item;