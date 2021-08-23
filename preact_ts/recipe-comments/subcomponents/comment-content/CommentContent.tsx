import { h, Fragment } from 'preact';

import { IComment } from '../../../../types';

import './CommentContent.scss';

import maleAvatar from '../../../../../../public/images/icon-avatar-m.svg';
import femaleAvatar from '../../../../../../public/images/icon-avatar-f.svg';

type Props = {
    readonly comment: IComment;
};

const CommentContent = (props: Props) => {
    const { author, gender, avatar, date, comment } = props.comment;

    return (
        <Fragment>
            <div class="comment--content--container">
                <div class="comment--avatar--container">
                    {avatar ? (
                        <img src={`/images/${avatar}`} alt={author} />
                    ) : (
                        <img
                            src={`${gender == 'f' ? maleAvatar : femaleAvatar}`}
                            alt={author}
                            class="comment--avatar"
                        />
                    )}
                </div>

                <div class="comment--content">
                    <div class="comment--header">
                        <span class="author">{author}</span>
                        <span class="date">{date}</span>
                    </div>
                    <div class="comment--entry">
                        <p class="comment">{comment}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CommentContent;
