import CreatorHelper from "./../CreatorHelper";
export default class GraphicWorkspace extends CreatorHelper {
  constructor() {
    super();
    this.listeningFields();
    this.titleTopSwitcher();
    this.colorSwitcher();
    this.uploadImageFromDisc();
  }
  listeningFields() {
    const titleTop = document.querySelector("textarea[name='graphicTitleTop']");
    const title = document.querySelector("textarea[name='graphicTitle']");
    const description = document.querySelector(
      "textarea[name='graphicDescription']"
    );

    this.insertWorkspace(titleTop);
    this.insertWorkspace(title);
    this.insertWorkspace(description);
  }
  insertWorkspace(el) {
    el.addEventListener("input", (e) => {
      const workspaceClass = el.dataset.workspace;

      document.querySelector(`.${workspaceClass}`).innerText = el.value;
    });
  }
  titleTopSwitcher() {
    const switcher = document.querySelector("input[name='isGraphicTitleTop']");
    const titleTopWorkspace = document.querySelector(
      ".creator-graphic__workspace-title--top"
    );
    switcher.addEventListener("click", (e) => {
      const titleTop = document.querySelector(".textarea--title-top");
      titleTop.classList.toggle("display-none");
      titleTopWorkspace.classList.toggle("display-none");
    });
  }
  colorSwitcher() {
    const titleTopWorkspace = document.querySelector(
      ".creator-graphic__workspace-title--top"
    );
    const titleWorkspace = document.querySelector(
      ".creator-graphic__workspace-title--bottom"
    );

    const colors = document.querySelectorAll(
      ".creator-graphic__workspace-color"
    );
    colors.forEach((element) => {
      element.addEventListener("click", (e) => {
        const color = e.target.dataset.color;
        titleTopWorkspace.style.color = color;
        titleWorkspace.style.color = color;
      });
    });
  }
  uploadImageFromDisc() {
    const inputFile = document.querySelector("input[name='graphicImage']");
    const loader = document.querySelector(".creator-graphic__workspace-loader");
    inputFile.addEventListener("change", (event) => {
      const file = document.querySelector("[type=file]").files[0];
      const url = "/upload-temponary-image";
      const formData = new FormData();
      formData.append("file", file);
      loader.classList.remove('display-none');
      fetch(url, {
        method: "post",
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {

          this.afterUpload(response);
          loader.classList.add('display-none');
        });
    });
  }
  afterUpload(data) {
    const { body } = data;
    const {
      status,
      fileUploaded,
      isImage,
      temponaryImageID,
      isValidSize,
    } = data;

    if (status) {
      if (!isImage) {
        this.showErrorFrame("imageExtensionError", "graphicImage");
      } else if (!isValidSize) {
        this.showErrorFrame("fileSizeError", "graphicImage");
      } else if (fileUploaded) {
        const image = this.createImage(fileUploaded);
        this.clipboards.forEach((clipboard) => {
          clipboard.innerHTML = image;
        });

        this.data.fileUploaded = fileUploaded;
        this.data.temponaryImageID = temponaryImageID;
        this.setData("fileUploaded", fileUploaded);
        this.setData("temponaryImageID", temponaryImageID);
        this.hideErrorFrame("graphicImage");
      }
    } else {
      this.showErrorFrame("unknownError", "file");
    }

  }

}
