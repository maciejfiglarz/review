import { singsCounter } from "./../helper/post/common";
import ClassicEditor from "./../lib/ckeditor";
import EmbedHelper from "./../helper/post/embed";
import "../../css/ckeditor.css";
import {
  isValidStringMaxLength,
  isValidStringMinLength,
} from "./../lib/validation";
import { NewPostHelper } from "./../helper/post/new-post-helper";

window.addEventListener("DOMContentLoaded", (event) => {
  new Select(singsCounter);
  new NewPost();
  new Categories();

  singsCounter(
    document.querySelector("#create_post_form_title"),
    document.querySelector(".field-label__counter--title", 250)
  );
  singsCounter(
    document.querySelector("#create_post_form_description"),
    document.querySelector(".field-label__counter--description", 750)
  );
});

class Select {
  constructor(singsCounter) {
    this.singsCounter = singsCounter;
    this.select = document.querySelector(".create-select");
    this.init = this.select.querySelector(".create-select__init");
    this.label = this.select.querySelector(".create-select__init-label");
    this.initIcon = this.select.querySelector(".create-select__init-icon i");
    this.dropdown = this.select.querySelector(".create-select__dropdown");
    this.childAction = this.select.querySelectorAll(
      ".create-select__item--action"
    );
    this.items = this.select.querySelectorAll(".create-select__item");
    this.childs = this.select.querySelectorAll(".create-select__wrap-child");
    this.childItems = this.select.querySelectorAll(
      ".create-select__item-child"
    );
    this.childWrap = this.select.querySelectorAll(".create-select__wrap-child");
    this.typePost = this.select.querySelector("#type-post");
    this.typeData = this.select.querySelector("#type-data");
    this.textareaDescription = document.querySelector(
      "#create_post_form_description"
    );
    this.clipboardPosts = document.querySelectorAll(".create__post-clipboard");

    this.currentTypePost = "graphic";
    this.initClick();
    this.initChildClick();
    this.initChoiceClick();
  }

  initCKEditor(editor) {

    ClassicEditor.create(editor)
      .then((editor) => {
        window.editor = editor;
      })
      .catch((err) => {
        console.error(err.stack);
      });
  }

  initChoiceClick() {
    this.childItems.forEach((child) => {
      child.addEventListener("click", (event) => {
        const typePost = event.currentTarget.dataset.type;
        const typeData = event.currentTarget.dataset.child;
        const text = event.currentTarget.innerText.trim();
        this.setLabelInit(typePost, text);
        this.setIconInit(typeData);
        this.resetAfterHide();
        this.dropdown.classList.toggle("display-none");
        this.setForm(typePost, typeData);
      });
    });
  }

  setForm(typePost, typeData) {
    const data = {
      disc: "imageFromDisc",
      youtube: "youtubeLink",
      link: "imageFromLink",
    };
    this.typePost.value = typePost;
    this.typeData.value = data[typeData];

    const event = new Event("change");
    this.typePost.dispatchEvent(event);
    this.typeData.dispatchEvent(event);

    this.clearClipBoards();
  
    if (this.currentTypePost != typePost) {
      this.switchDescriptionTextarea(typePost);
    }
    this.currentTypePost = typePost;
  }
  clearClipBoards() {
    this.clipboardPosts.forEach((clipboard) => {
      clipboard.innerHTML = "";
    });
  }
  switchDescriptionTextarea(typePost) {
    let descriptionWrap = document.querySelector(".description-wrap");

    let oldTextarea = document.querySelector(".textarea-description--old");

    let cloneTextarea = document.querySelector(".textarea-description--clone");
    let newTextarea = cloneTextarea.cloneNode(true);

    newTextarea.classList.remove("textarea-description--clone");
    newTextarea.classList.remove("display-none");
    newTextarea.classList.add("textarea-description--old");
    newTextarea.setAttribute("name", "description");
    newTextarea.dataset.id = "create_post_form_description";

    descriptionWrap.innerHTML = "";
    descriptionWrap.appendChild(newTextarea);

    // newTextarea.value = "new";
    // oldTextarea.value = "old";
    // cloneTextarea.value = "clone";

    // console.log('n',newTextarea, 'o',oldTextarea,'c',cloneTextarea );

    const limit = document.querySelector(
      ".field-label__counter--description-limit"
    );

    if (typePost == "graphic") {
      limit.innerText = "750";
      newTextarea.setAttribute("maxlength", 750);
      newTextarea.dataset.type = "graphic";
      newTextarea.classList.remove("textarea-description--ckeditor");
      this.setSignCounterForNewTextarea(newTextarea, 750);
      newTextarea.classList.remove(".ckeditor");
    } else if (typePost == "news") {
      limit.innerText = "750";
      newTextarea.setAttribute("maxlength", 750);
      newTextarea.dataset.type = "news";
      newTextarea.classList.remove("textarea-description--ckeditor");
      this.setSignCounterForNewTextarea(newTextarea, 750);
      newTextarea.classList.remove(".ckeditor");
    } else if (typePost == "post") {
      limit.innerText = "10000";
      newTextarea.setAttribute("maxlength", 10000);
      newTextarea.dataset.type = "post";
      newTextarea.classList.add("textarea-description--ckeditor");
      newTextarea.classList.add(".ckeditor");
      this.setSignCounterForNewTextarea(newTextarea, 10000);
      this.initCKEditor(newTextarea);
    }
  }

  setSignCounterForNewTextarea(newTextarea, limit) {
    this.singsCounter(
      newTextarea,
      document.querySelector(".field-label__counter--description", limit)
    );
  }

  setLabelInit(type, text) {
    const info = {
      post: "Post",
      graphic: "Grafika",
      news: "Z ostatniej chwili",
    };

    this.label.innerText =
      info[type] + ": " + text.charAt(0).toLowerCase() + text.substring(1);
  }

  setIconInit(type) {
    const iconClass = {
      link: ["fas", "fa-link"],
      youtube: ["fab", "fa-youtube"],
      disc: ["fas", "fa-cloud-upload-alt"],
    };

    this.initIcon.className = "";
    this.initIcon.classList.add(iconClass[type][0]);
    this.initIcon.classList.add(iconClass[type][1]);
  }

  initClick() {
    this.init.addEventListener("click", (event) => {
      this.dropdown.classList.toggle("display-none");
      this.init.classList.toggle("create-select__init--selected");

      if (!this.init.classList.contains("create-select__init--selected")) {
        this.resetAfterHide();
      }
    });
  }

  initChildClick() {
    this.childAction.forEach((element) => {
      element.addEventListener("click", (event) => {
        const element = event.currentTarget;
        const id = element.dataset.id;
        const currentChild = this.select.querySelector(`#child-${id}`);

        element.classList.toggle("create-select__item--selected");

        this.childAction.forEach((child) => {
          if (child != element) {
            child.classList.remove("create-select__item--selected");
          }
        });

        currentChild.classList.toggle("display-none");

        this.childWrap.forEach((child) => {
          if (currentChild != child) {
            child.classList.add("display-none");
          }
        });
      });
    });
  }

  resetAfterHide() {
    this.init.classList.remove("create-select__init--selected");
    this.items.forEach((item) => {
      item.classList.remove("create-select__item--selected");
    });
    this.childs.forEach((item) => {
      item.classList.add("display-none");
    });
  }
}

class Categories {
  constructor() {
    this.initClick();
  }

  initClick() {
    document
      .querySelectorAll(".create-categories__item")
      .forEach((category) => {
        category.addEventListener("click", () => {
          this.afterClick(category);
        });
      });
  }

  afterClick(category) {
    this.toggleSelectedClass(category);
    this.toggleFormField(category);
  }

  toggleSelectedClass(category) {
    category.classList.toggle("create-categories__item--active");
  }

  toggleFormField(category) {
    const checkbox = document.querySelector(
      `input[type="checkbox"][value="newCategory-${category.id}"]`
    );
    if (category.classList.contains("create-categories__item--active")) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  }
}

class NewPost extends NewPostHelper {
  constructor() {
    super();
    this.fileUploaded = null;
    this.temponaryImageID = null;

    this.inputFile = document.querySelector("#file");
    this.clipboards = document.querySelectorAll(".create__post-clipboard");
    this.inputDiscTemponaryImage = document.querySelector(
      "#disc_temponaryImage"
    );

    this.postPreloaders = document.querySelectorAll(".create__post-preloader");

    //functional fields
    this.title = document.querySelector(".field-wrap--title");
    this.description = document.querySelector(".field-wrap--description");
    this.typePostOptions = document.querySelectorAll(".create__post-option");

    this.data = {
      temponaryImageID: null,
      fileUploaded: null,
      selectType: "imageFromDisc",
      isConfirm: false,
      youtubeID: null,
    };

    this.captchaSlider = document.querySelector(".create__captcha-slider");
    this.captchaCounter = document.querySelector(".create__captcha-counter");
    this.defaultCaptcha = 0;

    this.initEvents();
    this.fetchCurrentCaptcha();
  }

  fetchCurrentCaptcha() {
    $.ajax({
      url: "/api-fetch-current-captcha",
      data: "",
      type: "post",
      contentType: false,
      processData: false,
      cache: false,
      dataType: "json",
      success: (data) => {
        this.defaultCaptcha = data["captcha"];
      },
    });
  }

  initEvents() {
    this.uploadImageFromDisc();
    this.fetchYoutubeField();
    this.initUploadImageFromUrl();
    this.initSubmit();
    this.initMenageTypePost();
    this.initCaptchaSlider();
  }

  initCaptchaSlider() {
    this.captchaSlider.oninput = () => {
      this.captchaCounter.innerText = this.captchaSlider.value;
    };
  }

  initSubmit() {
    const form = document.querySelector('form[name="create_post_form"]');
    form.addEventListener("submit", (e) => {
      if (!this.isSubmitValid()) {
        e.preventDefault();
      }
    });
  }

  isSubmitValid() {
    const selectedType = document.querySelector("#type-post").value;
    const selectedData = document.querySelector("#type-data").value;
    const title = document.querySelector('textarea[name="title"]').value;
    const description = document.querySelector('textarea[name="description"]')
      .value;
    const descriptionType = document.querySelector(
      'textarea[name="description"]'
    ).dataset.type;
    const isConfirm = document.querySelector(
      'input[type="checkbox"][name="isConfirm"]'
    ).checked;

    let errors = {};

    
    this.clearAllErrors();

    if (!this.validFileAdded()) {
      this.showErrorFrame("emptyFile", "file");
      errors["emptyFile"] = true;
    }

    if (title.length == 0) {
      this.showErrorFrame("emptyTitle", "title");
      errors["emptyTitle"] = true;
    }

    if (!isConfirm) {
      this.showErrorFrame("notConfirm", "isConfirm");
      errors["notConfirm"] = true;
    }

    if (!isValidStringMaxLength(title, 250)) {
      errors["titleTooLong"] = true;
      this.showErrorFrame("titleTooLong", "title");
    }

    if (
      !isValidStringMaxLength(
        description,
        descriptionType == "graphic" ? 750 : 10000
      )
    ) {
      this.showErrorFrame(
        descriptionType == "graphic"
          ? "descriptionTooLongGraphic"
          : "descriptionTooLongPost",
        "description"
      );
      errors["descriptionToLong"] = true;
    }

    if (!this.validFileAdded()) {
      this.showErrorFrame("emptyFile", "file");
      errors["emptyFile"] = true;
    }

    if (this.defaultCaptcha != this.captchaSlider.value) {
      this.showErrorFrame("captcha", "captcha");
      errors["captcha"] = true;
    }

    if (Object.keys(errors).length == 0) {
      return true;
    }

    return false;
  }


  
  uploadImageFromDisc() {
    this.inputFile.addEventListener("change", (event) => {
      const file = document.querySelector("[type=file]").files[0];
      const url = "/upload-temponary-image";
      const formData = new FormData();
      formData.append("file", file);
      this.post(url, formData);
    });
  }

  fetchYoutubeField() {
    const linkYoutube = document.querySelector("#form__post-youtube");
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
          this.setData("youtubeID", youtubeID);
          this.post(url, formData);

          // Do przemyślenia

          // const youtubeFrame = this.createYoutubeEmbed(youtubeID);
          // this.clipboard.innerHTML = youtubeFrame;4
        } else {
          setTimeout(() => {
            this.showErrorFrame("youtubeError", "file");
          }, 1000);
        }
      });
    });
  }

  initUploadImageFromUrl() {
    const url = "/upload-link-thumbnail";
    const linkUrl = document.querySelector("#form__post-link");
    let timeout = null;
    linkUrl.onkeydown = (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const value = linkUrl.value;

        if (this.checkUrlIsImage(value)) {
          const formData = new FormData();
          formData.append("url", linkUrl.value);
          this.post(url, formData);
        } else {
          this.showErrorFrame("imageExtensionError", "file");
        }
      });
    };
  }

  post(url, formData) {
    // do zmiany na fetch
    $.ajax({
      url: url,
      data: formData,
      type: "post",
      contentType: false,
      processData: false,
      cache: false,
      dataType: "json",
      beforeSend: () => {
        this.beforeUpload();
      },
      success: (data) => {
        this.afterUpload(data);
      },
    });
  }

  afterUpload(data) {
    const {
      status,
      fileUploaded,
      isImage,
      temponaryImageID,
      isValidSize,
    } = data;

    if (status) {
      if (!isImage) {
        this.showErrorFrame("imageExtensionError", "file");
      } else if (!isValidSize) {
        this.showErrorFrame("fileSizeError", "file");
      } else if (fileUploaded) {
        const image = this.createImage(fileUploaded);
        this.clipboards.forEach((clipboard) => {
          clipboard.innerHTML = image;
        });

        this.data.fileUploaded = fileUploaded;
        this.data.temponaryImageID = temponaryImageID;
        this.setData("fileUploaded", fileUploaded);
        this.setData("temponaryImageID", temponaryImageID);
        this.hideErrorFrame("file");
      }
    } else {
      this.showErrorFrame("unknownError", "file");
    }

    this.hidePreloader();
  }

  
  beforeUpload() {
    this.showPreloader();
    this.hideErrorFrame("file");
    this.clipboards.forEach((clipboard) => {
      clipboard.innerHTML = "";
    });
    this.inputDiscTemponaryImage.value = "";
  }
}

