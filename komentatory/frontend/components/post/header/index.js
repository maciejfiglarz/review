import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Label from "./_label";
import Observer from "./_observer";

const Header = ({ data }) => {
    const { isGraphic, isNews, isPost, isYoutube, isLink, imageUrl,id } = data;


    return (
        <div class="post--header">
            <Label data={data}/>
            <Observer data={data}/>
        </div>
    )
}

export default Header;


