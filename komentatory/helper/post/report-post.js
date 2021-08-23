export default class ReportPost {
  constructor(sortDesktop) {
    this.inits = document.querySelectorAll(".single-bar__report-post");
    this.frame = document.querySelector(".report-post");
    this.close = document.querySelector(".report-post__close");
    this.cover = document.querySelector(".cover");
    this.button = document.querySelector(".report-post__button");
    this.textarea = document.querySelector(".report-post__textarea");
    this.init();
    this.initClickButton();
    this.initCloseFrame();
  }

  init() {
    document.addEventListener("click", (event) => {
      let element = event.target;
      if (element.tagName != "DIV") {
        element = element.parentElement;
      }
      if(element){
      if (element.classList.contains("report__init")) {
        const postID = element.dataset.id;
        this.button.dataset.id = postID;
        this.frame.classList.remove("display-none");
        this.cover.classList.remove("display-none");
      }
    }
    });
  }

  initClickButton() {
    this.button.addEventListener("click", (event) => {
      let postID = event.target.dataset.id;
      const msg = this.textarea.value;

      if (msg.length > 0) {
        const formData = new FormData();
        formData.append("postID", postID);
        formData.append("msg", msg);
        $.ajax({
          url: "/api-report-post",
          data: formData,
          type: "post",
          contentType: false,
          processData: false,
          cache: false,
          dataType: "json",
          beforeSend: () => {},
          success: (data) => {},
        });
        this.closeFrame();
      }
    });
  }

  initCloseFrame() {
    this.close.addEventListener("click", () => {
      this.closeFrame();
    });
  }
  closeFrame() {
    this.frame.classList.add("display-none");
    this.textarea.value = "";
    this.button.dataset.id = 0;
    this.cover.classList.add("display-none");
  }
}
