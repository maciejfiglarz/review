import { h, render } from 'preact';
import { useState } from 'preact/hooks';

const Action = ({ data, isSingle }) => {
    const { absoluteUrl,commentNumber } = data;
    const url = "https://www.onet.pl/";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);


    const popup = (url, w = 550, h = 285) => {
        const left = screen.width / 2 - w / 2;
        const top = screen.height / 2 - h / 2;
        window.open(
            url,
            '_blank',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=${w}px, height=${h}px, top=${top}px, left=${left}px)`,
        );
    };
    const fbShare = () => {
        popup('https://www.facebook.com/sharer/sharer.php?u=' + url);
        setIsModalOpen(false);
    }

    const twitterShare = () => {
        popup('https://twitter.com/intent/tweet?url=' + url, 550, 350);
        setIsModalOpen(false);
    }
    const copyToClipboard = () => {
        navigator.clipboard.writeText(url)
        setIsModalOpen(false);

    }


    return (
        <div class="post--label--action">

            <div class={`modal ${isModalOpen ? '-show' : ''}`}>
                <button onClick={() => fbShare()} class="button" type="button"><i class="fab fa-facebook-f"></i></button>
                <button onClick={() => twitterShare()} class="button" type="button"><i class="fab fa-twitter"></i></button>
                <button onClick={() => copyToClipboard()} class="button" type="button"><i class="fas fa-link"></i></button>
            </div>

            <div class={`modal ${isMoreOpen ? '-show' : ''}`}>
                <div class="">Zgłoś</div>
            </div>


            {!isSingle && (
                <a href={absoluteUrl} class="button" type="button"><i class="fas fa-comment icon"></i><span class="value">{commentNumber }</span></a>
            )}

            <button onClick={() => setIsModalOpen(!isModalOpen)} class="button" type="button"><i class="fas fa-share icon"></i></button>
            <button onClick={() => setIsMoreOpen(!isMoreOpen)} class="button" type="button"><i class="fas fa-ellipsis-h init"></i></button>
        </div>
    )
}

export default Action;

