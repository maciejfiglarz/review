import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import logo from "./../../images/cms_logo.png"
import arrowLeftIcon from "./../../images/cms_arrow-left.svg";

const Navigation = () => {
    const [isArticleOpen, setIsArticleOpen] = useState(false);
    const [isPostOpen, setIsPostOpen] = useState(false);
    const [page, setPage] = useState("");
    const [subpage, setSubpage] = useState("");
    const [params, setParams] = useState({ page: "", subpage: "" });
    const bodyClasslist = document.body.classList;

    useEffect(() => {
        const bodyClasslistValue = bodyClasslist.value;
        if (bodyClasslistValue) {
            const params = bodyClasslistValue.split('-');
            setPage(params[0]);
            setSubpage(params[1]);
        }
    }, [])
    const onClickClose = () => {
        bodyClasslist.remove('-navigation-opened');
    }

    return (
        <div class="navigation--component">
            <a href="/" class="navigation--header">
                <div class="logo"><img src={logo} /></div>
                <div onClick={() => onClickClose()} class="close">
                    <img src={arrowLeftIcon} class="icon" />
                </div>
            </a>
            <div class="navigation--list">

                <a href="/cms/quiz" class={`item subitem ${page == 'quiz' ? '-active' : ''}`}>Wskazówki</a>
                <a href="/cms/uzytkownicy" class={`item subitem ${page == 'user' ? '-active' : ''}`}>Użytkownicy</a>
                <a href="/cms/strony" class={`item subitem ${page == 'page' ? '-active' : ''}`}>Strony</a>
    
            </div>
        </div>
    )
}
export default Navigation;

