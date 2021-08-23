import "./articleSingle.scss";
import "../../components/sidebar/main";
import "../../components/sidebar/categories";

import { h, render } from 'preact';
import ListPosts from "./../../modules/ListPosts";
import SingleComment from "./../../components/comment/single/Single";



const Index = ({ userID }) => {

  return (
    <div><ListPosts type={"profile"} userID={userID} /></div>
  );
}

const element = document.getElementById('listPostsComponent');
const userID = element.dataset.user;

render(<Index userID={userID} />, element);



// const commentElement = document.getElementById('singleCommentComponent');

// render(<SingleComment type="article" id={data.id} />, commentElement);


import EmbedHelper from "../../lib/embed";
import {
  singsCounter,
  showYoutubeFrame,
  resizeYoutubeFrame,
} from "../../lib/article";

window.addEventListener("DOMContentLoaded", (event) => {
  showYoutubeFrame();
  // switchComment();
  new EmbedHelper();
});

window.addEventListener("load", () => {
  resizeYoutubeFrame();
});

// import {
//   singsCounter,
//   showYoutubeFrame,
//   resizeYoutubeFrame,
// } from "../helper/post/common";

// import ListPosts from "../../componen";
// import EmbedHelper from "./../helper/post/embed";

// const Index = () => {
//   return (
//     <div><ListPosts type={"index"}  /></div>
//   );
// }

// // render(<Index />, document.getElementById('listPostsComponent'));

// window.addEventListener("DOMContentLoaded", (event) => {
//   showYoutubeFrame();
// // switchComment();
// new EmbedHelper();
// });

// window.addEventListener("load", () => {
//   resizeYoutubeFrame();
// });