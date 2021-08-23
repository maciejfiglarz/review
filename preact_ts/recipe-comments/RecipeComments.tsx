import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { IComment } from '../../types';

import './RecipeComments.scss';

import AddComment from './subcomponents/add-comment/AddComment';
import ShowMoreComments from './subcomponents/show-more-comments/ShowMoreComments';
import SortComments from './subcomponents/sort-comments/SortComments';
import Comment from './subcomponents/comment/Comment';

const RecipeComments = () => {
    const commentsPerPage = 10;

    const [comments, setComments] = useState<IComment[]>([]);
    const [showMoreCounter, setShowMoreCounter] = useState<number>(commentsPerPage);

    return (
        <Fragment>
            <SortComments comments={comments} onSetComments={(sortedComments) => setComments(sortedComments)} />
            <div class="recipe--comments">
                <AddComment
                    comments={comments}
                    onAddComment={(newComment) => setComments(newComment)}
                    label="Dodaj komentarz"
                />
                {comments &&
                    comments.slice(0, showMoreCounter).map((comment) => <Comment key={comment.id} comment={comment} />)}
            </div>
            <ShowMoreComments
                comments={comments}
                commentsPerPage={commentsPerPage}
                showMoreCounter={showMoreCounter}
                setShowMoreCounter={setShowMoreCounter}
            />
        </Fragment>
    );
};

export default RecipeComments;
