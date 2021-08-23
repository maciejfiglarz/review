import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

import { IComment } from '../../../../types';

import './AddComment.scss';

import maleAvatar from '../../../../../../public/images/icon-avatar-m.svg';
import femaleAvatar from '../../../../../../public/images/icon-avatar-f.svg';
import addPicture from '../../../../../../public/images/icon-add-pic.svg';

type Props = {
    readonly comments: IComment[];
    readonly onAddComment: (arg) => void;
    readonly label?: string;
};
const AddComment = ({ comments, onAddComment, label }: Props) => {
    const commentMinLength = 3;
    console.log('label', label);
    const [comment, setComment] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>(null);

    const dummyData = {
        author: 'smaker_01',
        gender: 'f',
        avatar: null,
    };

    const handleAddComment = () => {
        if (comment.length < commentMinLength) {
            setErrorMsg('Komentarz powinien zawierać co najmniej 3 znaki.');
            return;
        } else {
            setErrorMsg(null);
        }

        const now = new Date();
        const dateStamp = `${now.getDate()}.${now.getMonth()}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

        const id = () => {
            return '_' + Math.random().toString(36).substr(2, 9);
        };

        onAddComment([
            ...comments,
            {
                ...dummyData,
                id: id(),
                date: dateStamp,
                comment: comment,
            },
        ]);

        setComment('');
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    return (
        <Fragment>
            <div class="comment--form">
                <div class="avatar">
                    {dummyData.avatar ? (
                        <img src={`/images/${dummyData.avatar}`} alt={dummyData.author} />
                    ) : (
                        <img
                            src={`${dummyData.gender == 'f' ? maleAvatar : femaleAvatar}`}
                            alt={dummyData.author}
                            class="comment--avatar"
                        />
                    )}
                </div>
                <form action="" class="form">
                    <input
                        id="comment"
                        name="content"
                        class={`form--input ${errorMsg ? '-error' : ''}`}
                        type="text"
                        value={comment}
                        placeholder="Wpisz komentarz"
                        onChange={(e) => handleCommentChange(e)}
                    />
                    <img src={addPicture} alt="picture" class="picture" />
                    <div class="error--message">{errorMsg}</div>
                    <div class="comment--btn--container">
                        <button type="button" class="btn--primary mx-auto" onClick={handleAddComment}>
                            {label}
                        </button>
                    </div>
                </form>
            </div>
            <div class="comment--divider -first" />
        </Fragment>
    );
};

export default AddComment;
