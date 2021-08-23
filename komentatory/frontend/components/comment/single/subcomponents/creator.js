
import { h, render } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { Fragment } from 'react';
import emptyAvatar from "~/images/empty-avatar.jpg";
import useApi from "~/lib/api/useApi";
import bodyService from "~/lib/body";


const Creator = ({ postID, comments, setComments, parentID, authorMarked, replyOpened, setReplyOpened, isLogged, user }) => {
    const [text, setText] = useState("");
    // const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const textRef = useRef(null);
    const [authorMarkerID, setAuthorMarkerID] = useState(null);
    console.log('user',user,isLogged);
    useEffect(() => {
        if (authorMarked) {
            setAuthorMarkerID(authorMarked.authorID);
            // textRef.current.querySelector('span').innerText = `${authorMarked.author}`;
            // setText(`<span class="author">${authorMarked} <span class="close">x</span></span>`);

            setTimeout(() => {
                textRef.current.querySelector('.text').focus();
            }, 100)
        }

    }, [])

    const clearHtml = (e) => {
        e.preventDefault();
        var text = e.clipboardData.getData("text/plain");

        document.execCommand("insertHTML", false, text);
    }

    function removeUserMarked(html) {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;

    }

    function stripHtml(html) {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html.trim();
        return tmp.textContent || tmp.innerText || "";
    }

    const insertReplyComment = () => {
        if (comments.length > 0) {

            console.log('all', comments);


            const indexArray = comments.findIndex(item => item.id == 72);

            //72
            comments[indexArray].replies = { ...comments[indexArray].replies, ...{ "test": 6677 } };
            console.log(comments, comments[indexArray].replies);
        }

    }


    const isValid = () => {
        let isValid = true;
        if (text.length == 0) {
            // setError("Musisz wpisać treść komentarza");
            setIsError(true);
            isValid = false;
        } else if (text.length < 2) {
            // setError("Komentarz musi zabierać conajmniej 5 znaków");
            setIsError(true);
            isValid = false;
        } else {
            // setError("Komentarz nie może zawierać więcej niż 1000 znaków");
            setIsError(false);
        }
        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLogged) {
            bodyService.initGuard();
        } else {
            if (isValid()) {
                setIsSending(true);
                const [fetch] = useApi();
                const data = { text: stripHtml(text), authorMarkerID };
                // console.log('striphtml', stripHtml(text));
                const url = typeof parentID == 'number'
                    ? `/api-create-reply-comment/post-${postID}/comment-${parentID}`
                    : `/api-create-comment/post-${postID}`;

                fetch(url, data, 'post')
                    .then(response => {
                        const { comment } = response;
                        // const commentArray = Object.values(comments);
                        console.log('parentID', parentID);
                        if (parentID) {
                            const indexArray = comments.findIndex(item => item.id == parentID);
                            comments[indexArray].replies = { ...comments[indexArray].replies, ...comment };
                            const updateComments = comments;
                            setComments([...updateComments]);

                            console.log('hhhhhhhhhhhhh', updateComments);
                        } else {
                            const commentArray = Object.values(comment);
                            setComments([...commentArray, ...comments]);
                        }
                        setAuthorMarkerID(null);
                        setText("");
                        if (parentID) {
                            delete replyOpened[parentID];

                            setReplyOpened(replyOpened);
                        }
                        textRef.current.querySelector('.text').innerHTML = "";
                        console.log('textWrap', textRef.current.querySelector('.text'));
                        // console.log(textRef, textRef.current.innerHTML, textRef.current);
                    })
                    .catch((error) => {
                        console.log(error);
                    }).finally(() => {
                        setIsSending(false);
                    });

            }
        }

    }

    console.log('text', text);

    // insertReplyComment();
    return (
        <div data-parent={parentID} class={`comment--creator--component`}>
            {isSending && (
                <div class="cover"></div>
            )}
            <div class="avatar" style={{ backgroundImage: `url(${isLogged && user ? user.avatar : emptyAvatar})` }}>
                {/* <img src={emptyAvatar} /> */}
            </div>
            <form onSubmit={handleSubmit} class="content">
                {/* <textarea onChange={(e) => setText(e.target.value)} class={`textarea--field textarea ${isError ? '-error' : ''}`}>{text}</textarea> */}
                <div onClick={() => textRef.current.querySelector('.text').focus()} ref={textRef} class="textarea textarea--field" >
                    {authorMarkerID && (
                        <Fragment>
                            <span onClick={() => setAuthorMarkerID(null)} class="author">{authorMarked.author} <span class="close">X</span></span> &nbsp;
                        </Fragment>
                    )}
                    <span class="text"
                        onPaste={(e) => clearHtml(e)}
                        onInput={(e) => setText(e.currentTarget.innerText)} contentEditable> </span>

                </div>
                <div class="bottom">
                    <div class=""></div>
                    <input value="Dodaj" class="btn--secondary button" type="submit" />
                </div>
            </form>
        </div>
    )
}
export default Creator;

