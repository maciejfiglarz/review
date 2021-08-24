export default () => {
  shareTwitter();
  shareFacebook();
  copyLink();
};

const shareTwitter = () => {
  document.addEventListener("click", (e) => {
    let element = event.target;
    if (element.tagName != "BUTTON") {
      element = element.parentElement;
    }
    if (element) {
      if (element.classList.contains("single-label__share-icon--twitter")) {
        const title = element.dataset.title;
        const url = element.dataset.url;
        window.open(
          "https://twitter.com/share?url=" + url + "&text=" + title,
          "",
          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
        );
      }
    }
  });
};

const shareFacebook = () => {
  document.addEventListener("click", (e) => {
    let element = event.target;
    if (element.tagName != "BUTTON") {
      element = element.parentElement;
    }
    if (element) {
      if (element.classList.contains("single-label__share-icon--facebook")) {
        const title = element.dataset.title;
        const url = element.dataset.url;
        window.open(
          url,
          "",
          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
        );
      }
    }
  });
};

const copyLink = () => {
  document.addEventListener("click", (event) => {
    let element = event.target;
    if (element.tagName != "BUTTON") {
      element = element.parentElement;
    }
    if (element) {
      if (element.classList.contains("single-label__share-icon--link")) {
        const id = element.dataset.id;

        const icon = element.querySelector("i");
        // const text = element.querySelector("span");

        icon.className = "";
        icon.classList.add("fas");
        icon.classList.add("fa-copy");
        // text.innerText = "Skopiowano";

        const input = document.querySelector(`#url-${id}`);

        input.select();
        document.execCommand("copy");
        window.getSelection();
      }
    }
  });
};
// const showMore = () => {
//   document.addEventListener("click", (event) => {
//     let element = event.target;
//     if (element.tagName != "BUTTON") {
//       element = element.parentElement;
//     }
//     if (element) {
//       if (element.classList.contains("single-label__dropdown-init")) {
//         const dropdown = element.nextElementSibling;
//         dropdown.classList.remove("display-none");
//       }
//     }
//   });

//   window.addEventListener("click", (e) => {
//     const element = e.target;
//     if (element) {
//       if (
//         !element.classList.contains("single-label__dropdown-init") &&
//         !element.classList.contains("fas fa-ellipsis-h")
//       ) {
//         const dropdowns = document.querySelectorAll(".single-label__dropdown");
//         dropdowns.forEach((dropdown) => {
//           dropdown.classList.add("display-none");
//         });
//       }
//     }
//   });
// };
