export const scrollToCommentSinglePost = () => {
  const single = document.querySelector(".single-main");
  const commentIcon = single.querySelector(
    ".single-label__share-icon--comment"
  );
  const commentWrap = single.querySelector(".comment");
  commentIcon.addEventListener("click", (event) => {
    event.preventDefault();
    commentWrap.scrollIntoView();
  });
};
