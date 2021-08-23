import { h, render } from 'preact';

const ContentLink = ({ data }) => {
    const {
        linkDescriptionOryginal,
        linkSiteNameOryginal,
        linkTitleOryginal,
        linkUrlOryginal,
        imageUrl, title, description } = data;

    const backgroundImageStyle = {
        backgroundImage: `url("${imageUrl}")`
    };

    return (
        <a target="_blank" href={linkUrlOryginal} class="post--content--link">
            <div class="image" style={backgroundImageStyle}></div>
            <div class="content">
                <h3 class="title">{title}</h3>
                <h3 class="site">{linkSiteNameOryginal}</h3>
                <p class="description">{description}</p>
            </div>
        </a>
        )
};

export default ContentLink;


