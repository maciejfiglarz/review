import {
  resizeYoutubeFrame,
  showComment,
  showYoutubeFrame,
} from "./../helper/post/common";
import { fbShare } from "../lib/facebook";
import { Vote } from "./../helper/post/vote";
import Report from "../lib/Report";
import initShares from "./../helper/post/social";
import { voteEmoji } from "./../helper/post/emoji";

import dropdownList from "./../helper/post/dropdown-list";

const sorter = () => {
  const prepareUrl = (id, type) => {};
  const list = document.querySelector(".sorter-categories");
  if (list) {
    const items = document.querySelectorAll(".sorter-categories__item");
    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        const el = e.currentTarget;
        const type = el.dataset.type;
        const id = el.dataset.id;

      });
    });
  }
};

window.addEventListener("DOMContentLoaded", (event) => {
  const vote = new Vote();
  showYoutubeFrame();

  new Report();
  initShares();
  resizeYoutubeFrame();
  // voteEmoji();
  sorter();
  dropdownList();
});

window.addEventListener("load", () => {
  resizeYoutubeFrame();
 
});
