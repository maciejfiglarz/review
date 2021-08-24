export default () => {
  document.addEventListener("click", (e) => {
    let element = event.target;

    if (element.tagName != "DIV") {
      element = element.parentElement;
    }
    if (element.classList.contains("single-label__action-button--dropdown")) {
      const parent = element.parentNode.parentNode.parentNode;
      const share = parent.querySelector(`.single-label__share-wrap`);
      share.classList.toggle("display-none");
    }
  });

};
