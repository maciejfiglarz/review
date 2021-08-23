import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

import './LikeComment.scss';

import likeIcon from '../../../../../../public/images/icon-like.svg';
import likedIcon from '../../../../../../public/images/icon-liked.svg';

type Props = {
    readonly author: string;
};

const LikeComment = ({ author }: Props) => {
    const [likes, setLikes] = useState([]);
    const [showLikes, setShowLikes] = useState<boolean>(false);

    return (
        <Fragment>
            <img
                src={`${likes.length > 0 ? likedIcon : likeIcon}`}
                alt="like"
                class="like"
                onClick={() => setLikes([author])}
            />
            <span class="counter">{likes.length}</span>
            <i
                class="icon-arrow-down -arrow"
                onMouseOver={() => setShowLikes(true)}
                onMouseLeave={() => setShowLikes(false)}
            >
                {likes.length > 0 && (
                    <ul class={`likes--list--modal ${showLikes ? '-show' : '-hide'}`}>
                        {likes.map((like) => (
                            <li key={like} class="item">
                                {like}
                            </li>
                        ))}
                    </ul>
                )}
            </i>
        </Fragment>
    );
};
export default LikeComment;
