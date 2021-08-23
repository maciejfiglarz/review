import { h, render, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Post from "./Post";
import useApi from '../../lib/api/useApi';

const PostSingle = ({ postID }) => {
    const [isFetched, setIsFetched] = useState(false);
    const [post, setPost] = useState(false);

    useEffect(() => {
        const [fetch] = useApi();
        console.log('ddd');
        fetch(`/api-fetch-post/${postID}`, {}, 'get')
            .then(({ post }) => {
                setPost(post);
            })
            .catch((error) => {

                console.log(error);
            }).finally(() => {
                setIsFetched(true);
            });
    }, [])



    return (
        <Fragment>
            {isFetched && (
                <Post isSingle={true} data={post} isSingle={true} />
            )}
        </Fragment>
    );
}

const element = document.querySelector('.singlePostComponent');


if (element) {
    const id = element.dataset.id;
    render(<PostSingle postID={id} />, element);
}
