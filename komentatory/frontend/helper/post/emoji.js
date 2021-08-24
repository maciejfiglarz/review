const checkVotesForPost = (postID) => {
  console.log(postID);
  const votedEmoji = document.querySelectorAll(
    `.single-emoji__item.single-emoji__item--voted[data-id='${postID}']`
  );
  // console.log(
  //   "votedEmoji",
  //   votedEmoji.length,
  //   parseInt(votedEmoji.length) >= 3
  // );
  return parseInt(votedEmoji.length) >= 2 ? false : true;
};

export const voteEmoji = () => {
  document.addEventListener("click", (e) => {
    let element = event.target;
    if (element.tagName != "DIV") {
      element = element.parentElement;
    }

    if (element.classList.contains("single-emoji__item-icon")) {
      const item = element.parentNode;
      const postID = item.dataset.id;
      const type = item.dataset.type;
      const isVoted = item.classList.contains("single-emoji__item--voted");
      const counter = item.querySelector(".single-emoji__counter");
      const isValidNumberVotes = checkVotesForPost(item.dataset.id);

      if (!isVoted) {
        if (isValidNumberVotes) {
          item.classList.add("single-emoji__item--voted");
        }
      } else {
        item.classList.remove("single-emoji__item--voted");
      }
      if (isValidNumberVotes || isVoted) {
        let counterValue = parseInt(counter.innerText);
        counter.innerText = isVoted ? counterValue - 1 : counterValue + 1;
      }
      if (isValidNumberVotes || isVoted) {
        const url = isVoted ? "/api-remove-emoji-vote" : "/api-emoji-vote";
        const formData = new FormData();
        formData.append("postID", postID);
        formData.append("type", type);

        fetch(url, {
          method: "post",
          body: formData,
        })
          .then((response) => response.json())
          .then((response) => {

          });
      }
    }

    // if (element.classList.contains("single-emoji__item-icon")) {
    //   const isVoted = element.classList.contains(
    //     "single-emoji__item-icon--active"
    //   );
    //   const counter = element.parentElement.querySelector(
    //     ".single-emoji__counter"
    //   );

    //   const postID = element.parentElement.dataset.id;
    //   const type = element.parentElement.dataset.type;

    //   console.log("isVoted", isVoted, postID, type);

    //   element.classList.toggle("single-emoji__item-icon--active");

    //   let counterValue = parseInt(counter.innerText);
    //   counter.innerText = isVoted ? counterValue - 1 : counterValue + 1;

    //   const formData = new FormData();
    //   formData.append("postID", postID);
    //   formData.append("type", type);

    //   const url = isVoted ? "/api-remove-emoji-vote" : "/api-emoji-vote";

    //   fetch(url, {
    //     method: "post",
    //     body: formData,
    //   })
    //     .then((response) => response.json())
    //     .then((response) => {
    //       console.log("responseIsVoted", response);
    //     });
    // }
  });
};
// emojiItems.forEach((emojiItem) => {
//   emojiItem.addEventListener("click", (e) => {
//     const currentEmojiItem = e.currentTarget;
//     const isVoted = currentEmojiItem.classList.contains(
//       "single-emoji__item--active"
//     );
//     const postID = currentEmojiItem.dataset.id;
//     const type = currentEmojiItem.dataset.type;
//     const counter = currentEmojiItem.querySelector(".single-emoji__counter");

//     let counterValue = parseInt(counter.innerText);
//     counter.innerText = isVoted ? counterValue - 1 : counterValue + 1;

//     const formData = new FormData();
//     formData.append("postID", postID);
//     formData.append("type", type);

//     const url = isVoted ? "/api-remove-emoji-vote" : "api-emoji-vote";

//     fetch(url, {
//       method: "post",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((response) => {
//         console.log("responseIsVoted", response);
//       });
//     currentEmojiItem.classList.toggle("single-emoji__item--active");
//   });
// });
