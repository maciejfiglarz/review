import CreatorHelper from "./CreatorHelper";

export default class Creator extends CreatorHelper {
  constructor() {
    super();
    this.form = document.querySelector("form[name='creator'");
    this.handleSubmit();
    this.defaultCaptcha = "";
    this.setCurrentCaptcha();
    this.switcherMain();
  }
  handleSubmit() {
    this.form.addEventListener("submit", (e) => {
      // e.preventDefault();
      if (!this.isSubmitValid()) {
        e.preventDefault();
  
      }
    });
  }
  isSubmitValid() {
    const type = this.getType();

    if (type == "graphic") {
      return this.isValidGraphic();
    }
    if (type == "post") {
      return this.isValidPost();
    }
    if (type == "news") {
      return this.isValidNews();
    }
    if (type == "link") {
      return this.isValidLink();
    }
  }
  isValidLink() {
    const title = document.querySelector('textarea[name="linkTitle"]').value;

    const linkTitleOryginal = document.querySelector(
      'input[name="linkTitleOryginal"]'
    ).value;
    const linkDescriptionOryginal = document.querySelector(
      'input[name="linkDescriptionOryginal"]'
    ).value;
    const linkSiteNameOryginal = document.querySelector(
      'input[name="linkSiteNameOryginal"]'
    ).value;
    this.clearAllErrors();

    let errors = {};
    if (title.length == 0) {
      this.showErrorFrame("emptyTitle", "linkTitle");
      errors["linkTitle"] = true;
    }

    if (
      linkTitleOryginal.length == 0 &&
      linkDescriptionOryginal.length == 0 &&
      linkSiteNameOryginal.length == 0
    ) {
      this.showErrorFrame("emptyTitle", "linkWorkspace");
      errors["linkWorkspace"] = true;
    }

    this.isValidCommon(errors);

    if (Object.keys(errors).length == 0) {
      return true;
    }
    return false;
  }
  isValidNews() {
    const title = document.querySelector('textarea[name="newsTitle"]').value;
    const description = document.querySelector(
      'textarea[name="newsDescription"]'
    ).value;
    let uploaderType = this.getUploaderType("news");
    const uploaderValue = this.form.querySelector(
      `input[name='${uploaderType}TemponaryImageID']`
    ).value;

    this.clearAllErrors();

    let errors = {};

    if (title.length == 0) {
      this.showErrorFrame("emptyTitle", "newsTitle");
      errors["newsTitle"] = true;
    }

    if (description.length == 0) {
      this.showErrorFrame("emptyDescription", "newsDescription");
      errors["newsDescription"] = true;
    }

    if (uploaderValue.length == 0) {
      this.showErrorFrame("emptyFile", "newsWorkspace");
      errors["newsWorkspace"] = true;
    }
    this.isValidCommon(errors);
    if (Object.keys(errors).length == 0) {
      return true;
    }
    return false;
  }
  isValidPost() {
    const title = document.querySelector('textarea[name="postTitle"]').value;
    let uploaderType = this.getUploaderType("post");
    const uploaderValue = this.form.querySelector(
      `input[name='${uploaderType}TemponaryImageID']`
    ).value;

    this.clearAllErrors();
    let errors = {};

    if (title.length == 0) {
      this.showErrorFrame("emptyTitle", "postTitle");
      errors["postTitle"] = true;
    }

    if (uploaderValue.length == 0) {
      this.showErrorFrame("emptyFile", "postWorkspace");
      errors["postWorkspace"] = true;
    }
    this.isValidCommon(errors);

    if (Object.keys(errors).length == 0) {
      return true;
    }
    return false;
  }
  isValidGraphic() {
    const title = document.querySelector('textarea[name="graphicTitle"]').value;
    const isTitleTop = document.querySelector('input[name="isGraphicTitleTop"]')
      .checked;
    const titleTop = document.querySelector('textarea[name="graphicTitleTop"]')
      .value;
    let uploaderType = this.getUploaderType("graphic");
    const uploaderValue = this.form.querySelector(
      `input[name='${uploaderType}TemponaryImageID']`
    ).value;

    this.clearAllErrors();

    let errors = {};
    // if (isTitleTop) {
    //   if (titleTop.length == 0) {
    //     this.showErrorFrame("emptyTitle", "graphicTitleTop");
    //     errors["graphicTitleTop"] = true;
    //   }
    // }
    // if (title.length == 0) {
    //   this.showErrorFrame("emptyTitle", "graphicTitle");
    //   errors["graphicTitle"] = true;
    // }
    if (title.length == 0 && titleTop.length == 0) {
      this.showErrorFrame("emptyTitleGraphic", "graphicTitle");
      errors["graphicTitle"] = true;
    }

    if (uploaderType == "graphicImageDisc") {
      uploaderType = this.form.querySelector(
        "input[name='graphicImageDiscTemponaryImageID']"
      ).value;
    }
    if (uploaderValue.length == 0) {
      this.showErrorFrame("emptyFile", "graphicWorkspace");
      errors["graphicWorkspace"] = true;
    }

    this.isValidCommon(errors);

    if (Object.keys(errors).length == 0) {
      return true;
    }

    return false;
  }

  isValidCommon(errors) {
    const isConfirm = document.querySelector('input[name="isConfirm"]').checked;
    // const isSuperiorCategory = document.querySelector('select[name="superiorCategory"]').value;
    const category = document.querySelector('input[name="categoryID"]').value;

    if (!isConfirm) {
      this.showErrorFrame("notConfirm", "isConfirm");
      errors["notConfirm"] = true;
    }
    if (category == "") {
      this.showErrorFrame("notCategory", "isCategory");
      errors["notCategory"] = true;
    }

    // if (isSuperiorCategory == "empty") {
    //   this.showErrorFrame("notCategory", "isCategory");
    //   errors["notCategory"] = true;
    // }
    if (this.defaultCaptcha != parseInt(this.getCaptchaValue())) {
      this.showErrorFrame("captcha", "captcha");
      errors["captcha"] = true;
    }
    return errors;
  }

  getCaptchaValue() {
    return document.querySelector(".creator-captcha__slider").value;
  }
  getUploaderType(name) {
    return this.form.querySelector(
      `.creator-${name}__tools-item.creator-workspace__tools-item--active`
    ).dataset.name;
  }
  getType() {
    return this.form.querySelector(
      ".creator-switcher__menu-tab.creator-switcher__menu-tab--active"
    ).dataset.name;
  }
  setCurrentCaptcha() {
    fetch("/api-fetch-current-captcha", {
      method: "post",
    })
      .then((response) => response.json())
      .then((response) => {
        const { captcha } = response;
        this.defaultCaptcha = captcha;
      });
  }
}
