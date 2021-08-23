import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

import './CommentsReplies.scss';

import CommentContent from '../comment-content/CommentContent';
import LikeComment from '../like-comment/LikeComment';
import AddComment from '../add-comment/AddComment';

import commentActiveIcon from '../../../../../../public/images/icon-comment-a.svg';
import commentIcon from '../../../../../../public/images/icon-comment.svg';

const CommentsReplies = () => {
    const [commentReplies, setCommentReplies] = useState([]);
    const [showReplies, setShowReplies] = useState<boolean>(false);

    return (
        <Fragment>
            <div class="comment--footer">
                <div class="counter" onClick={() => setShowReplies(!showReplies)}>
                    <img src={`${showReplies ? commentActiveIcon : commentIcon}`} alt="comment" class="comment" />
                    <span>{commentReplies.length}</span>
                    <i class={`icon-arrow-down -arrow ${showReplies ? '-up' : ''}`} />
                </div>
                <div class="like--component">
                    <LikeComment author="smaker_01" />
                    <span class="reply" onClick={() => setShowReplies(true)}>
                        Odpowiedz
                    </span>
                </div>
            </div>
            <div class={`comment--divider ${showReplies ? '-active' : ''}`} />
            {showReplies && (
                <div class="comment--replies">
                    {commentReplies.map((comment) => (
                        <div class="comment--reply">
                            <CommentContent comment={comment} />
                            <div class="like--component">
                                <LikeComment author={comment.author} />
                                <span class="reply" onClick={() => setShowReplies(true)}>
                                    Odpowiedz
                                </span>
                            </div>
                            <div class="comment--divider mt-8" />
                        </div>
                    ))}
                    <AddComment
                        comments={commentReplies}
                        onAddComment={(newComment) => setCommentReplies(newComment)}
                        label="Odpowiedz"
                    />
                </div>
            )}
        </Fragment>
    );
};
export default CommentsReplies;
