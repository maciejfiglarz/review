// import { Comment } from "./../helper/post/comment";
// import { switchComment } from "./../helper/post/comment-switch";
import {
  singsCounter,
  showYoutubeFrame,
  resizeYoutubeFrame,
} from "./../helper/post/common";
// import { Vote } from "../helper/post/vote";
// import { scrollToCommentSinglePost } from "../helper/post/scroll";
// import { ads } from "../helper/post/ads.js";
// import Report from "../lib/Report";
// import MorePosts from "./../helper/post/MorePosts";
import EmbedHelper from "./../helper/post/embed";
import initShares from "./../helper/post/social";
// import { voteEmoji } from "./../helper/post/emoji";
// import dropdownList from "./../helper/post/dropdown-list";

window.addEventListener("DOMContentLoaded", (event) => {
  
  // new Comment(singsCounter);
  // const counterContener = document.querySelector(".comment-new__textarea-new");
  // const fieldContener = document.querySelector(
  //   ".comment-new__counter--current-new"
  // );
  // scrollToComment();
  // new Vote();
  // new Report();

  // new MorePosts();
  showYoutubeFrame();
  // switchComment();
  new EmbedHelper();
  initShares();
  // voteEmoji();
  // scrollToCommentSinglePost();
  // dropdownList();

});

window.addEventListener("load", () => {
  resizeYoutubeFrame();
});


import { h, render } from 'preact';

import ListPosts from "./../frontend/modules/ListPosts";

const Index = () => {
  return (
    <div><ListPosts type={"index"}  /></div>
  );
}

render(<Index />, document.getElementById('listPostsComponent'));

