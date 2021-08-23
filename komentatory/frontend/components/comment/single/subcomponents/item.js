import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';


const Item = ({ comment, setReplyOpened, replyOpened, parentID }) => {
    const { id, text, author, authorID, authorAvatar, authorLink, date, userMarkedName, userMarkedLink } = comment;


    // console.log(userMarkedName, comment);

    const onClickOpenReply = () => {
        let currentID = typeof parentID == 'number' ? parentID : id;
        if (!(currentID in replyOpened)) {
            const obj = {};
            obj[currentID] = { author, authorID };
            // console.log('obj', obj);
            setReplyOpened({ ...replyOpened, ...obj });
        };
    }

    return (
        <div class="comment--single--item">
            <div style={{ backgroundImage: `url(${authorAvatar})` }} class="avatar"></div>
            <div class="content">
                <div class="top">
                    <h5 class="name">{author}</h5>
                    <h5 class="date"> · {date}</h5>
                </div>
                <div class="text">{parentID && userMarkedName && userMarkedLink && (<a class="author" href={userMarkedLink}>{userMarkedName}</a>)} {text}</div>
                <div class="bottom">Lubię to · <span onClick={() => onClickOpenReply()}>Odpowiedź</span></div>
            </div>
        </div>
    )
}
export default Item;

