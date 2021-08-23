import "./post.scss";
import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
// import "./post.scss";
import Content from "./content";
import Header from "./header";
import Label from "./label";
import SingleComment from "../comment/single/Single";

const Post = ({ data, isSingle }) => {
    return (
        <article class="post--component">
            <Header data={data} />
            <Content data={data} />
            <Label data={data} isSingle={isSingle} />
            {isSingle && (
                <SingleComment type="post" postID={data.id} />
            )}
        </article>
    )
}
export default Post;

