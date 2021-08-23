import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import ContentGraphic from "./_graphic";
import ContentPost from "./_post";
import ContentLink from "./_link";


const Content = ({ data }) => {
    const { isGraphic,
        isNews,
        isPost,
        isYoutube,
        description,
        isLink,
        imageUrl,
        title, id,
        youtubeID,
        absoluteUrl } = data;
    // console.log(isLink, data);
    return (
        <div class="post--content">
            {isGraphic && (
                <ContentGraphic absoluteUrl={absoluteUrl} imageUrl={imageUrl} />
            )}

            {isPost && (
                <ContentPost absoluteUrl={absoluteUrl} imageUrl={imageUrl} description={description} title={title} youtubeID={youtubeID} />
            )}
            {isLink && (
                <ContentLink data={data} imageUrl={imageUrl} />
            )}

        </div>
    )
}

export default Content;


