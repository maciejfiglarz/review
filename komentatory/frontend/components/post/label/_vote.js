import { Fragment, h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import useApi from "../../../lib/api/useApi";
import bodyService from "./../../../lib/body";

const Vote = ({ data }) => {
    const { id, voteScore: voteScoreDefault, voteUp: voteUpDefault, voteDown: voteDownDefault, vote, isLogged } = data;

    console.log('post', data.id, data.vote);

    const [voted, setVoted] = useState(null);
    const [voteScore, setVoteScore] = useState(0);
    const [voteUp, setVoteUp] = useState(0);
    const [voteDown, setVoteDown] = useState(0);
    const [isLoaded, setIsloaded] = useState(false);

    useEffect(() => {

        setVoted(vote);
        setVoteScore(voteScoreDefault);
        setVoteUp(voteUpDefault);
        setVoteDown(voteDownDefault);


    }, []);


    const onClickVote = (type) => {

        if (!isLogged) {
            bodyService.initGuard();
        } else {

            if (type != voted) {

                if (voted != "up" && voted != "down") {
                    if (type == "up") {
                        setVoteUp(voteUp + 1);
                    } else if (type == "down") {
                        setVoteDown(voteDown + 1);
                    }
                } else if (voted == "up" && type == "down") {
                    setVoteUp(voteUp - 1);
                    setVoteDown(voteDown + 1);
                } else if (voted == "down" && type == "up") {
                    setVoteUp(voteUp + 1);
                    setVoteDown(voteDown - 1);
                }
                setVoted(type);
                const [fetch] = useApi();

                fetch(`/api-vote-post/post-${id}/action-${type}`, {}, 'post')
                    .then(response => {
                        console.log('vote', response);
                    })
                    .catch((error) => {
                        console.log('vote', error);
                    }).finally(() => {
                        // setIsLoading(false);
                    });
            } else {
                if (type == "down") {
                    setVoteDown(voteDown - 1);
                } else if (type == "up") {
                    setVoteUp(voteUp - 1);
                }
                setVoted(null);
                // console.log('remove', type);
                fetch(`/api-vote-post-remove/post-${id}/action-${type}`, {}, 'post')
                    .then(response => {
                        console.log('voteremove', response);
                    })
                    .catch((error) => {
                        console.log('voteremove', error);
                    }).finally(() => {
                        // setIsLoading(false);
                    });
            }
        }
    }

    return (
        <div class="post--label--vote">

            {/* {isLoaded && ( */}
            <Fragment>
                <button onClick={() => onClickVote('up')} class={`button -up ${voted == 'up' ? '-voted' : ''} `} type="button">

                    <i class="fas fa-thumbs-up icon"></i>
                    <span class="label">{voteUp}</span>
                </button>
                <button onClick={() => onClickVote('down')} class={`button -down ${voted == 'down' ? '-voted' : ''} `} type="button">

                    <i class="fas fa-thumbs-down icon -down"></i>
                    <span class="label">{voteDown}</span>
                </button>
            </Fragment>
            {/* )} */}


        </div>
    )
}

export default Vote;


