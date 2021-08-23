export class Comment {
  constructor(singsCounter) {
    this.singsCounter = singsCounter;
    this.newComment = document.querySelector(".comment-new--main");

    this.newButton = document.querySelector(".comment-new__button-new");
    this.newTextarea = document.querySelector(".comment-new__textarea");
    this.newCounter = document.querySelector(
      ".comment-new__counter--current-new"
    );

    this.list = document.querySelector(".comment-list");

    this.initEvents();
  }

  initEvents() {
    this.initNew();
    this.initShowReply();
    this.initReply();
    this.initCounter();
  }

  initCounter() {
    // const counterContener = document.querySelector('.comment-new__textarea-new');
    // const fieldContener = document.querySelector('.comment-new__counter--current-new');
    const newComments = document.querySelectorAll(".comment-new");
    newComments.forEach(newComment => {
     
      const counterContener = newComment.querySelector(
       ".comment-new__counter--current"
      );
      const fieldContener = newComment.querySelector(
        "textarea"
      );

      this.singsCounter(fieldContener,counterContener ,1000);
    });

    // singsCounter();
  }

  initShowReply() {
    const replyButtons = document.querySelectorAll(
      ".comment-list__item-action--reply"
    );
    replyButtons.forEach(reply => {
      this.addEventClickToReplyAction(reply);
    });
  }

  addEventClickToReplyAction(reply) {
    reply.addEventListener("click", event => {
      const commentId = event.target.dataset.id;
      const authorUsername = event.target.dataset.username;
      this.showNewCommentReply(commentId, authorUsername);
    });
  }

  initReply() {
    const replyNewButtons = document.querySelectorAll(
      ".comment-new__button-reply"
    );
    replyNewButtons.forEach(reply => {
      this.addEventClickToReplyButton(reply);
    });
  }

  addEventClickToReplyButton(reply) {
    const url = "/api-add-new-comment";
    reply.addEventListener("click", event => {
      const postId = event.target.dataset.id;
      const commentId = event.target.dataset.comment;

      const textarea = event.target.parentNode.parentNode.querySelector(
        "textarea"
      ).value;
      const newComment = event.target.parentNode.parentNode.parentNode;

      if (this.validTextarea(newComment)) {
        const formData = new FormData();
        formData.append("postId", postId);
        formData.append("commentId", commentId);
        formData.append("text", textarea);
        this.postReply(url, formData, newComment);
      }
    });
  }
  postReply(url, formData, newComment) {
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
        this.beforeReplyPost(newComment);
      },
      success: data => {
        this.afterReplyPost(data, newComment);
      }
    });
  }
  beforeReplyPost(newComment) {
    newComment.querySelector("textarea").style.opacity = "0.6";
  }
  afterReplyPost(data, newComment) {
    const { status, commentId } = data;
    const commentReply = document
      .querySelector(`#comment-reply-${commentId}`)
      .querySelector(".comment-reply__list");
    const textarea = newComment.querySelector("textarea");
    if (status) {
      const item = this.prepareItemComment(data, true);

      commentReply.appendChild(item, commentReply.firstChild);
      this.initShowReply();
    }

    textarea.value = "";
    textarea.style.opacity = "1";
    newComment.classList.add("display-none");
  }

  initNew() {
    const url = "/api-add-new-comment";
    this.newButton.addEventListener("click", event => {
      const postId = event.target.dataset.id;
      const text = this.newTextarea.value;

      if (this.validTextarea(this.newComment)) {
        const formData = new FormData();
        formData.append("postId", postId);
        formData.append("text", text);
        this.post(url, formData);
      }
    });
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
        this.beforePost();
      },
      success: data => {
        this.afterPost(data);
      }
    });
  }
  beforePost() {
    this.newComment.style.opacity = "0.6";
  }

  afterPost(data) {
    const { status } = data;
    if (status) {
      const item = this.prepareItemComment(data);
      const commentNew = this.prepareNewReplyComment(data);
      this.list.insertBefore(commentNew, this.list.firstChild);
      this.list.insertBefore(item, this.list.firstChild);


      this.initShowReply();
      this.initNew();
      this.initReply();
    }
    this.resetNewTextarea();
    this.newCounter.innerText = 0;
    this.newComment.style.opacity = "1";
  }

  validTextarea(commentNew) {
    const text = commentNew.querySelector("textarea").value;
    const errorFrame = commentNew.querySelector(".comment-new__error");
    if (text.length < 1) {
      // this.showErrorFrameTextarea(errorFrame, "Komentarz jest pusty!");
      return false;
    } else if (text.length > 1000) {
      // this.showErrorFrameTextarea(errorFrame, "Komentarz jest za długi!");
      return false;
    }
    // this.hideErrorFrameTextarea(errorFrame);
    return true;
  }

  showErrorFrameTextarea(errorFrame, msg) {
    errorFrame.innerText = msg;
    errorFrame.classList.remove("display-none");
  }

  hideErrorFrameTextarea(errorFrame) {
    errorFrame.innerText = "";
    errorFrame.classList.add("display-none");
  }

  resetNewTextarea() {
    this.newTextarea.value = "";
  }

  prepareItemComment(data, isReply = false) {
    const { authorProfileUrl, authorUsername, text, commentId, postId } = data;
    let item = document.createElement("div");
    const replyClass = isReply ? "comment-list__item--reply" : "";
    item.innerHTML = `<div class="comment-list__item ${replyClass}">
    <div class="comment-list__item-avatar" style="background:url('${this.getAuthorAvatarUrl()}');background-size: cover;"></div>
    <div class="comment-list__item-info">
        <div class="comment-list__item-author">
            <a class="comment-list__item-author" href="${authorProfileUrl}">${authorUsername} ${commentId}</a>
            -
            0
            punktów -
            teraz
        </div>
        <div class="comment-list__item-text">${text}</div>
        <div class="comment-list__item-action">
            <span data-id="${commentId}" data-username="${authorUsername}"  class="comment-list__item-action-item comment-list__item-action--reply">
                <i class="fas fa-reply"></i>
                Odpowiedz</span>
            <span class="comment-list__item-action--up">
                <i class="fas fa-angle-up comment-list__item-action-item comment-list__item-action-item--icon"></i>
            </span>
            <span class="comment-list__item-action--down">
                <i class="fas fa-angle-down comment-list__item-action-item comment-list__item-action-item--icon"></i>
            </span>
        </div>
    </div>
</div>

</div>
`;
    return item;
  }

  prepareNewReplyComment(data) {
    const { authorProfileUrl, authorUsername, text, commentId, postId } = data;

    let item = document.createElement("div");
    item.innerHTML = `
    
    <div id="comment-reply-${commentId}" class="comment-reply">
    <div class="comment-reply__list">
    </div>
    
    <div
      id="comment-new-${commentId}" class="comment-new comment-new--reply display-none">
      <div class="comment-new__error-wrap">
			<div class="comment-new__error display-none"></div>
		</div>
      <div class="comment-new__avatar" style="background:url('${this.getAuthorAvatarUrl()}');background-size: cover;"></div>
      <div class="comment-new__text">
        <textarea maxlength="500" class="comment-new__textarea comment-new__textarea-reply" placeholder="Zostaw komentarz..."></textarea>
        <div class="comment-new__action">
          <div class="comment-new__counter">
            <span class="comment-new__counter--current comment-new__counter--current-reply">0</span>/1000</div>
          <div data-id="${postId}" data-comment="${commentId}" class="comment-new__button comment-new__button-reply">Dodaj</div>
        </div>
      </div>
    </div>`;
    return item;
  }

  showNewCommentReply(id, authorUsername) {
    const commentNew = document.querySelector(`#comment-new-${id}`);
    const textarea = commentNew.querySelector(".comment-new__textarea");
    commentNew.classList.remove("display-none");
    textarea.value = `@${authorUsername} `;
    textarea.focus();
  }
  hideNewCommentReply(id) {
    document.querySelector(`#comment-new-${id}`).classList.add("display-none");
  }
  getAuthorAvatarUrl() {
    return document.querySelector(`.header-label__avatar`).dataset.url;
  }
}
