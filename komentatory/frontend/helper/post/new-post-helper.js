export class NewPostHelper {
  /* common */
  getHostname() {
    return `http://${window.location.hostname}:${window.location.port}`;
  }

  checkUrlIsImage(url) {
    if (url.match(/\.(jpeg|jpg|png)$/)) {
      return true;
    }
    return false;
  }

  getError(name) {
    return this.errors[name];
  }

  setData(name, value) {
    this.data[name] = value;
  }

  getData(name) {
    const data = this.data[name];
    if (typeof data === "undefined") {
      return null;
    }
    return data;
  }

  validFileAdded() {
    if(this.getData("temponaryImageID")) {
      return true;
    }
    return false;
  }
  validIssetTitleOrDescription(title, description) {}

  getImageFile() {
    const file = document.querySelector("[type=file]").files[0];
    const formData = new FormData();
    return formData.append("file", file);
  }

  showErrorFrame(msg, type) {
    const errorMsg = this.getError(msg);
    const errorWrap = document.querySelector(`.field-error--${type}`);
    const errorFrame = errorWrap.querySelector(`.field-error__frame--${type}`);

    errorFrame.innerText = errorMsg;
    errorWrap.classList.remove("display-none");
  }

  getError(msg) {
    const errors = {
      imageExtensionError: "Załączony plik musi mieć rozszerzenie jpg lub png",
      fileSizeError: "Wybrane zdjęcie jest za duże",
      unknownError: "Coś poszło nie tak. Spróbuj ponownie!",
      youtubeError: "Podany link do filmy Youtube jest niepoprawny",
      emptyFile: "Musisz dodać jakiś materiał",
      emptyTitle: "Musisz dodać tytuł",
      notConfirm: "Musisz potwierdzić regulamin",
      titleTooLong: "Tytuł może zawierać maksimum 250 znaków",
      descriptionTooLongGraphic: "Opis dla grafiki może zawierać maksimum 750 znaków",
      descriptionTooLongPost: "Opis dla postu może zawierać maksimum 10 000 znaków",
      captcha: "Nie jesteś człowiekiem?"
    };
    return errors[msg];
  }

  hideErrorFrame(type) {
    const errorWrap = document.querySelector(`.field-error--${type}`);
    const errorFrame = errorWrap.querySelector(`.field-error__frame--${type}`);
    errorWrap.classList.add("display-none");
    errorFrame.innerText = "";
  }

  clearAllErrors() {
    const errors = document.querySelectorAll(".field-error");
    errors.forEach(error => {
      error.classList.add("display-none");
      error.querySelector(".field-error__frame").innerText = "";
    });
  }

  createImage(fileUploaded) {
    return `<img class='' src="${this.getRouteToTemponaryFile()}${fileUploaded}"/>`;
  }

  createYoutubeEmbed(youtubeID) {
    return `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${youtubeID}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }

  showPreloader() {
    this.postPreloaders.forEach(loader=>{
        loader.style.display = "block";
    })
  }

  hidePreloader() {
    this.postPreloaders.forEach(loader=>{
        loader.style.display = "none";
    })
  }

  getRouteToTemponaryFile() {
    return this.getHostname() + "/upload/temponary-image/";
  }

  initMenageTypePost() {
    const selectType = document.querySelector("#type-data");


    selectType.addEventListener("change", e => {


      this.hideAllActionFields();
      const type = e.target.value;
      this.showActionField(type);

      this.setData("selectType", type);
      this.clearDataAfterChangeTypePost();
      this.clearClipboard();
    });

  }

  getCurrentTypePost() {
    return document.querySelector("#type-post").value;
  }

  hideAllActionFields() {
    this.typePostOptions.forEach(option => {
      option.style.display = "none";
    });
  }

  showActionField(type) {
    document.querySelector(`.create__post-option--${type}`).style.display =
      "block";
  }

  clearDataAfterChangeTypePost() {
    const linkYoutube = document.querySelector("#form__post-youtube");
    const linkUrl = document.querySelector("#form__post-link");

    linkYoutube.value = "";
    linkUrl.value = "";
    this.setData("fileUploaded", null);
    this.setData("temponaryImageID", null);
    this.setData("youtubeID", null);

    this.hideErrorFrame("file");
  }

  clearClipboard() {
    document.querySelector(".create__post-clipboard").innerHTML = "";
  }

  youtubeParser(url) {
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[7].length == 11) {
      return match[7];
    } else {
      return false;
    }
  }
}
