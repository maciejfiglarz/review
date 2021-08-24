export default class WorkspaceHelper {
  constructor() {
    this.fromDisc = ["graphicImageDisc", "postImageDisc", "newsImageDisc"];
    this.fromLink = ["graphicImageLink", "postImageLink", "newsImageLink"];
    this.fromYoutube = ["graphicYoutube", "postYoutube"];

    this.initSwitcher("graphic");
    this.initSwitcher("post");
    this.initSwitcher("news");

    this.fromDisc.forEach((name) => {
      this.uploadImageFromDisc(name);
      this.initCloseBtn(name);
    });
    this.fromLink.forEach((name) => {
      this.uploadImageFromLink(name);
      this.initCloseBtn(name);
    });
    this.fromYoutube.forEach((name) => {
      this.uploadImageFromYoutube(name);
      this.initCloseBtn(name);
    });
  }
  insertWorkspace(el) {
    el.addEventListener("input", (e) => {
      const workspaceClass = el.dataset.workspace;
      document.querySelector(`.${workspaceClass}`).innerText = el.value;
    });
  }

  uploadImageFromDisc(name) {
    const inputFile = document.querySelector(`input[name='${name}']`);

    inputFile.addEventListener("change", (event) => {
      // const file = document.querySelector("[type=file]").files[0];
      this.showLoader();
      const file = inputFile.files[0];
      const url = "/upload-temponary-image";
      const formData = new FormData();
      formData.append("file", file);
      // loader.classList.remove("display-none");
      fetch(url, {
        method: "post",
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          const {
            status,
            fileUploaded,
            isImage,
            temponaryImageID,
            isValidSize,
            
          } = response;

          if (status) {
            if (!isImage) {
              this.showErrorFrame("imageExtensionError", name);
            } else if (!isValidSize) {
              this.showErrorFrame("fileSizeError", name);
            } else if (fileUploaded) {
              if (name == "newsImageDisc" || name == "newsImageLink") {
                const clipboard = document.querySelector(
                  `.creator-news__workspace-photo--cover`
                );
                clipboard.style.backgroundImage = `url('upload/temponary-image/${fileUploaded}')`;
                clipboard.style.backgroundSize = "cover";
                clipboard.style.backgroundPosition = "center";
              } else {
                const image = this.createImage(fileUploaded);
                const clipboard = document.querySelector(
                  `.creator-workspace__insert--${name}`
                );
                clipboard.innerHTML = image;
              }

              // this.data.fileUploaded = fileUploaded;
              // this.data.temponaryImageID = temponaryImageID;
              // this.setData("fileUploaded", fileUploaded);
              // this.setData("temponaryImageID", temponaryImageID);
              this.hideErrorFrame(name);
              this.hideUploader(name);
              this.showClose(name);

              document.querySelector(
                `input[name='${name}TemponaryImageID']`
              ).value = temponaryImageID;
        
            }
          } else {
            this.showErrorFrame("unknownError", name);
          }
          this.hideLoader();
        });
    });
  }

  uploadImageFromLink(name) {
    const url = "/upload-link-thumbnail";
    const linkUrl = document.querySelector(`input[name='${name}']`);
    let timeout = null;
    linkUrl.addEventListener("change", (event) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const value = linkUrl.value;
        if (this.checkUrlIsImage(value)) {
          const formData = new FormData();
          formData.append("url", linkUrl.value);
          fetch(url, {
            method: "post",
            body: formData,
          })
            .then((response) => response.json())
            .then((response) => {
              const {
                status,
                fileUploaded,
                isImage,
                temponaryImageID,
                isValidSize,
              } = response;

              if (status) {
                if (!isImage) {
                  this.showErrorFrame("imageExtensionError", name);
                } else if (!isValidSize) {
                  this.showErrorFrame("fileSizeError", name);
                } else if (fileUploaded) {
                  if (name == "newsImageDisc" || name == "newsImageLink") {
                    const clipboard = document.querySelector(
                      `.creator-news__workspace-photo--cover`
                    );
                    clipboard.style.backgroundImage = `url('upload/temponary-image/${fileUploaded}')`;
                    clipboard.style.backgroundSize = "cover";
                    clipboard.style.backgroundPosition = "center";
                  } else {
                    const image = this.createImage(fileUploaded);
                    const clipboard = document.querySelector(
                      `.creator-workspace__insert--${name}`
                    );
                    clipboard.innerHTML = image;
                  }

                  // this.data.fileUploaded = fileUploaded;
                  // this.data.temponaryImageID = temponaryImageID;
                  // this.setData("fileUploaded", fileUploaded);
                  // this.setData("temponaryImageID", temponaryImageID);
                  this.hideErrorFrame(name);
                  this.hideUploader(name);
                  this.showClose(name);
                  linkUrl.value = "";
                  document.querySelector(
                    `input[name='${name}TemponaryImageID']`
                  ).value = temponaryImageID;
                }
              } else {
                this.showErrorFrame("unknownError", name);
              }
            });
        } else {
          this.showErrorFrame("imageExtensionError", name);
        }
      });
    });
  }

  uploadImageFromYoutube(name) {
    const linkYoutube = document.querySelector(`input[name='${name}']`);
    const url = "/upload-youtube-thumbnail";
    let timeout = null;
    linkYoutube.addEventListener("change", () => {
      // linkYoutube.onkeydown = e => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const youtubeID = this.youtubeParser(linkYoutube.value);

        if (youtubeID) {
          const formData = new FormData();
          formData.append("youtubeID", youtubeID);
          // this.setData("youtubeID", youtubeID);

          fetch(url, {
            method: "post",
            body: formData,
          })
            .then((response) => response.json())
            .then((response) => {
              const {
                status,
                fileUploaded,
                isImage,
                temponaryImageID,
                isValidSize,
              } = response;

              if (status) {
                if (!fileUploaded) {
                  this.showErrorFrame("youtubeError", name);
                } else if (fileUploaded) {
                  const image = this.createImage(fileUploaded);
                  const clipboard = document.querySelector(
                    `.creator-workspace__insert--${name}`
                  );
                  clipboard.innerHTML = image;

                  // this.data.fileUploaded = fileUploaded;
                  // this.data.temponaryImageID = temponaryImageID;
                  // this.setData("fileUploaded", fileUploaded);
                  // this.setData("temponaryImageID", temponaryImageID);
                  this.hideErrorFrame(name);
                  this.hideUploader(name);
                  this.showClose(name);
                  linkYoutube.value = "";
                  document.querySelector(
                    `input[name='${name}TemponaryImageID']`
                  ).value = temponaryImageID;
                  document.querySelector(
                    `input[name='${name}ID']`
                  ).value = youtubeID;
                }
              } else {
                this.showErrorFrame("youtubeError", name);
              }
            });
        } else {
          setTimeout(() => {
            this.showErrorFrame("youtubeError", name);
          }, 1000);
        }
      });
    });
  }

  initSwitcher(type) {
    const tabs = document.querySelectorAll(`.creator-${type}__tools-item`);
    const contents = document.querySelectorAll(`.creator-${type}__content`);
    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const tab = e.currentTarget;
        const name = tab.dataset.name;
        clearTabs(tabs, "creator-workspace__tools-item");
        tab.classList.add("creator-workspace__tools-item--active");
        clearContents(contents);
        console.log("initSwitcher", `creator-${type}__content--${name}`);
        document
          .querySelector(`.creator-${type}__content--${name}`)
          .classList.remove("display-none");
        document.querySelector(`input[name='${type}ContentType']`).value = name;
      });
    });
    const clearTabs = (tabs, name) => {
      tabs.forEach((tab) => {
        tab.classList.remove(`${name}--active`);
      });
    };

    const clearContents = (contents) => {
      contents.forEach((content) => {
        content.classList.add("display-none");
      });
    };
  }

  initCloseBtn(name) {
    document
      .querySelector(`.creator-workspace__close--${name}`)
      .addEventListener("click", (e) => {
        this.showUploader(name);
        this.hideClose(name);
        if (name == "newsImageDisc" || name == "newsImageLink") {
          const clipboard = document.querySelector(
            `.creator-news__workspace-photo--cover`
          );
          clipboard.style.backgroundImage = `none`;
          document.querySelector(
            `input[name='${name}TemponaryImageID']`
          ).value = "";
        } else {
          const clipboard = document.querySelector(
            `.creator-workspace__insert--${name}`
          );
          clipboard.innerHTML = "";
          document.querySelector(
            `input[name='${name}TemponaryImageID']`
          ).value = "";
        }
      });
  }
  hideUploader(name) {
    document
      .querySelector(`.creator-workspace__uploader--${name}`)
      .classList.add("display-none");
  }
  showUploader(name) {
    document
      .querySelector(`.creator-workspace__uploader--${name}`)
      .classList.remove("display-none");
  }
  hideClose(name) {
    document
      .querySelector(`.creator-workspace__close--${name}`)
      .classList.add("display-none");
  }
  showClose(name) {
    document
      .querySelector(`.creator-workspace__close--${name}`)
      .classList.remove("display-none");
  }
  showLoader() {
    const loaders = document.querySelectorAll(`.creator-workspace__loader`);

    loaders.forEach((loader) => {
      loader.classList.remove("display-none");
    });
    document
    .querySelector(`.creator-graphic__workspace-options`)
    .classList.add("display-none");
  }
  hideLoader() {
    const loaders = document.querySelectorAll(`.creator-workspace__loader`);
    loaders.forEach((loader) => {
      setTimeout(() => {
        loader.classList.add("display-none");
        document
        .querySelector(`.creator-graphic__workspace-options`)
        .classList.remove("display-none");
      }, 2000);
 
    });
    
  }
}
