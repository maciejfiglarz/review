import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { voteEmoji, unvoteEmoji } from "../../../services/post";

import happyIcon from "./../../../../../images/emoji/happy.svg";
import loveIcon from "./../../../../../images/emoji/love.svg";
import boringIcon from "./../../../../../images/emoji/sleepy.svg";
import angryIcon from "./../../../../../images/emoji/angry.svg";

// import cryIcon from "./../../../../../images/emoji/cry.png";
// import smileIcon from "./../../../../../images/emoji/smile.png";
// import likeIcon from "./../../../../../images/emoji/like.png";

const Vote = ({ data }) => {
    const { id, emoji: emojiDefault, emojiVoted, emojiScore: emojiScoreDefault } = data;
    const [voted, setVoted] = useState(0);
    const [defaultVoted, setDefaultVoted] = useState("");
    const [emojiScore, setEmojiScore] = useState(0);
    const [emojiModal, setEmojiModal] = useState({});
    const { angry, boring, happy, love } = emojiModal.length ? emojiModal : emojiDefault;
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (id == 23) {
        console.log('yyyy', data);
        console.log('vvv', defaultVoted);
    }

    useEffect(() => {
        if (emojiVoted) {
            setVoted(emojiVoted);
            setDefaultVoted(emojiVoted);
        }
        setEmojiScore(emojiScoreDefault);
        setEmojiModal(emojiDefault);

    }, []);

    const refreshEmojiModal = (name, operator) => {

        const emoji = Object.keys(emojiModal).map(key => {
            if (voted) {

            }
            if (key == name) {
                emojiModal[key] = operator == "up" ? emojiModal[key] + 1 : emojiModal[key] - 1;
            }
            return emojiModal[key];
        })
        console.log('emoji', emoji);
    }

    const onClickVote = (name) => {
        if (name == voted) {
            setVoted(null);
            if (isDefaultVoted) {
                setEmojiScore(emojiScore - 1)
                unvoteEmoji({ postID: id, type: name });
                refreshEmojiModal(name, 'down');
            }
        } else {
            setVoted(name);
            setEmojiScore(emojiScore + 1)
            voteEmoji({ postID: id, type: name });
            refreshEmojiModal(name, 'up');
        }
    }

    return (
        <div class="post--label--vote">
            <div class={`modal ${isModalOpen ? '-show' : ''}`} onMouseLeave={() => setIsModalOpen(false)}>
                <button onClick={() => onClickVote('love')} class={`button ${voted == 'love' ? '-voted' : ''}`} type="button"><img src={loveIcon} /><div class="number">{love}</div></button>
                <button onClick={() => onClickVote('happy')} class={`button ${voted == 'happy' ? '-voted' : ''}`} type="button"><img src={happyIcon} /><div class="number">{happy}</div></button>
                <button onClick={() => onClickVote('boring')} class={`button ${voted == 'boring' ? '-voted' : ''}`} type="button"><img src={boringIcon} /><div class="number">{boring}</div></button>
                <button onClick={() => onClickVote('angry')} class={`button ${voted == 'angry' ? '-voted' : ''}`} type="button"><img src={angryIcon} /><div class="number">{angry}</div></button>
                {/* <button class="button" type="button"><img src={cryIcon} /><div class="number">0</div></button> */}
                {/* <button class="button" type="button"><img src={smileIcon} /><div class="number">0</div></button> */}
                {/* <button class="button" type="button"><img src={likeIcon} /><div class="number">0</div></button> */}
            </div>
            <button onClick={() => setIsModalOpen(!isModalOpen)} class={`button ${voted ? '-voted' : ''} `} type="button">
                {/* {voted ? <img class="icon" src={votedIcon} />
                    : <i class="fas fa-thumbs-up icon"></i>
                }  */}
                <i class="fas fa-thumbs-up icon"></i>
                <span class="label">{emojiScore}</span>
            </button>
        </div>
    )
}

export default Vote;


