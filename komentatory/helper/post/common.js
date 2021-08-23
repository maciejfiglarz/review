// export const showOptions = () => {
//   document.addEventListener("click", (event) => {
//     let element = event.target;
//     // if (element.tagName != "BUTTON") {
//     //   element = element.parentElement;
//     // }
//     if (element) {
//       if (element.classList.contains("single-header__dropdown-init")) {
//         const dropdown = element.nextElementSibling;
//         dropdown.classList.remove("display-none");
//       }
//     }
//   });

//   window.addEventListener("click", (e) => {
//     const element = e.target;
//     if (element) {
//       if (
//         !element.classList.contains("single-header__dropdown-init") &&
//         !element.classList.contains("fas fa-ellipsis-h")
//       ) {
//         const dropdowns = document.querySelectorAll(".single-header__dropdown");
//         dropdowns.forEach((dropdown) => {
//           dropdown.classList.add("display-none");
//         });
//       }
//     }
//   });
// };

export const resizeYoutubeFrame = () => {
  const frames = document.querySelectorAll(".single-graphic__youtube");
  const preFrames = document.querySelectorAll(".single-graphic__pre-youtube");
  // document.addEventListener('load',()=>{
  resizeFrame(frames);
  resizePreFrame(preFrames);
  // });

  window.addEventListener("resize", function (event) {
    resizeFrame(frames);
    resizePreFrame(preFrames);
  });
};

export const resizeFrame = (frames) => {
  frames.forEach((frame) => {
    resizeFrameSingle(frame);
  });
};

export const resizeFrameSingle = (frame) => {

  const defaultHeightTitleTop = frame.dataset.top;
  const currentWidthTitleTop = frame.offsetWidth;
  const scale = currentWidthTitleTop / 600;

  frame.style.top = defaultHeightTitleTop * scale + "px";
  frame.height = 345 * scale;
};

export const resizePreFrame = (frames) => {
  frames.forEach((frame) => {
    resizePreFrameSingle(frame);
  });
};

export const resizePreFrameSingle = (frame) => {
  const defaultHeightTitleTop = frame.dataset.top;
  const currentWidthTitleTop = frame.offsetWidth;
  const scale = currentWidthTitleTop / 600;

  frame.style.top = defaultHeightTitleTop * scale + "px";
  frame.style.height = `${349 * scale}px`;
};

export const showMobileInfo = () => {
  document.querySelectorAll(".single-info__button--more").forEach((item) => {
    item.addEventListener("click", (event) => {
      const element = event.currentTarget;
      const icon = element.querySelector("i");
      const id = element.dataset.id;
      const singleBar = element.parentNode.parentNode.parentNode;
      const singleInfo = singleBar.querySelector(`#single-info-${id}`);
      const singleSource = singleBar.querySelector(`#single-source-${id}`);
      const singleWrap = singleBar.querySelector(`#single-wrap-${id}`);

      element.classList.toggle("single-info__button--visable");

      if (element.classList.contains("single-info__button--visable")) {
        singleInfo.style.display = "flex";
        singleSource.style.display = "block";
        singleWrap.classList.remove("display-none");
        icon.classList.add("single-info__button-dropicon--rotated");
      } else {
        singleInfo.style.display = "none";
        singleSource.style.display = "none";
        singleWrap.classList.add("display-none");
        icon.classList.remove("single-info__button-dropicon--rotated");
      }
    });
  });
};

export const showYoutubeFrame = (id) => {
  const list = document.querySelector(".initClick");
  list.addEventListener("click", (event) => {
    let youtubeFrame = event.target;
    if (youtubeFrame.tagName != "DIV") {
      youtubeFrame = youtubeFrame.parentElement;
    }
    if (youtubeFrame.classList.contains("single-image__wrap-youtube")) {
      const youtubeID = youtubeFrame.dataset.id;
      const top = youtubeFrame.dataset.top;

      const embed = `<iframe width="100%" data-top=${top} class="single-graphic__youtube" src="https://www.youtube.com/embed/${youtubeID}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      youtubeFrame.classList.add("display-none");
      // youtubeFrame.style.top = 0;
      // youtubeFrame.style.height = "auto";
      console.log('showYoutubeFrame', youtubeFrame,  youtubeFrame.nextElementSibling );
      const parentElement = youtubeFrame.parentElement;
      parentElement.innerHTML = embed;
      resizeFrameSingle(
        parentElement.querySelector(
          ".single-graphic__youtube"
        )
      );
    }
  });

  // });
};

export const singsCounter = (fieldContener, counterContener, maxString) => {
  singsCounterAction(fieldContener, counterContener, maxString);
  fieldContener.addEventListener("keyup", (e) => {
    singsCounterAction(fieldContener, counterContener, maxString);
  });
};

const singsCounterAction = (fieldContener, counterContener, maxString) => {
  let singsNumber = fieldContener.value.length;
  counterContener.innerText = singsNumber;
  const subString = fieldContener.value.substring(0, maxString - 1);

  if (singsNumber >= maxString) {
    fieldContener.value = subString;
    singsNumber = maxString;
  }
};
