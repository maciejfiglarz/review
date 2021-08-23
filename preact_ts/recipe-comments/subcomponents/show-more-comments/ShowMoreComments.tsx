import { h, Fragment } from 'preact';
import './ShowMoreComments.scss';
import { IComment } from '../../../../types';

type Props = {
    readonly comments: IComment[];
    readonly commentsPerPage: number;
    readonly showMoreCounter: number;
    readonly setShowMoreCounter: (arg: number) => void;
};

const ShowMoreComments = (props: Props) => {
    const { comments, commentsPerPage, showMoreCounter, setShowMoreCounter } = props;

    const handleShowMoreComments = () => {
        setShowMoreCounter(showMoreCounter + commentsPerPage);
    };

    return (
        <Fragment>
            <div class="show--more--comments">
                {showMoreCounter < comments.length && (
                    <button type="button" class="btn--primary mx-auto button" onClick={handleShowMoreComments}>
                        Więcej komentarzy <i class="icon-arrow-down icon"></i>
                    </button>
                )}
            </div>
        </Fragment>
    );
};

export default ShowMoreComments;
