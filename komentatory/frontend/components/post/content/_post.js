import { h, render, Fragment } from 'preact';
import { useState } from 'preact/hooks';
const ContentPost = ({ imageUrl, title, description, youtubeID, absoluteUrl }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const prepareDescription = (text) => {
        if (text) {
            const words = text.split(" ");
            if (words.length > 50 && !isExpanded) {
                text = words.slice(0, 50);
                text = text.join(" ");
            }
            return (
                <p class="description">
                    {text}
                    {(!isExpanded) && (
                        <Fragment>...
                            <div class={`more ${isExpanded ? '-show' : ''}`} onClick={() => setIsExpanded(true)} type="button">pokaż więcej</div>
                        </Fragment>
                    )}
                </p>
            )
        }
    }
    return (
        <Fragment>
            <a href={absoluteUrl} class="title">{title}</a>
            {prepareDescription(description)}
            {youtubeID ? (
                <div class="youtube">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${youtubeID}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={title}
                    />
                </div>
            ) : (
                <a href={absoluteUrl} class="image">
                    <img src={imageUrl} />
                </a>
            )
            }
        </Fragment>)
};

export default ContentPost;


