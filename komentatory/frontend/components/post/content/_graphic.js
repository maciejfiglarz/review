import { h, render } from 'preact';

const ContentGraphic = ({ imageUrl, absoluteUrl }) => (<a href={absoluteUrl}><img src={imageUrl} /></a>);

export default ContentGraphic;


