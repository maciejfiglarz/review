import { h, Fragment } from 'preact';
import { IComment } from '../../../../types';
import './Comment.scss';

import CommentsReplies from '../comments-replies/CommentsReplies';
import CommentContent from '../comment-content/CommentContent';

type Props = {
    readonly comment: IComment;
};

const Comment = (props: Props) => {
    return (
        <Fragment>
            <div class="comments--list">
                <CommentContent comment={props.comment} />
            </div>
            <CommentsReplies />
        </Fragment>
    );
};
export default Comment;
