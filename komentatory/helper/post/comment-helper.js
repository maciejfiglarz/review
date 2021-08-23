export class CommentHelper {
    validTextarea(text) {

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


    resetCurrentTextarea() {
        this.currentTextarea.value = "";
    }

    getReverseCommentBtn(currentBtn, type) {
        const reverseType = this.getReverseCommentType(type);
        return currentBtn.parentNode.parentNode.querySelector(
            `.comment-list__vote${reverseType}`
        );
    }

    getReverseCommentType(type) {
        return type == "up" ? "--down" : "--up";
    }

    getVoteCommentType(vote) {
        let type = '';
        if (vote.classList.contains('comment-list__vote--up')) {
            type = 'up';
        } else if (vote.classList.contains('comment-list__vote--down')) {
            type = 'down';
        }
        return type;
    }

    getVoteCommentScore(vote) {
        return vote.parentNode.parentNode.querySelector('.comment-list__vote-score');
    }

    setVoteCommentScore(score, value) {
        score.innerText = value;
    }

    showNewCommentReply(id, authorUsername) {

        const commentNew = document.querySelector(`#comment-new-${id}`);
        const textarea = commentNew.querySelector(".comment-new__textarea");
        commentNew.classList.remove("display-none");
        textarea.value = `@${authorUsername} `;
        textarea.focus();
    }

    prepareNewReplyComment(data) {
        const {authorProfileUrl, authorUsername, text, commentId, postId} = data;

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
          <div data-id="${postId}" data-comment-parent="${commentId}" class="comment-new__button comment-new__button-reply">Dodaj</div>
        </div>
      </div>
    </div>`;
        return item;
    }

    prepareItemComment(data, isReply = false) {
        const {authorProfileUrl, authorUsername, text, commentId, postId, commentParentId} = data;

        let item = document.createElement("div");
        const replyClass = isReply ? "comment-list__item--reply" : "";
        let html = `
<div class="comment-list__item ${replyClass}">
    <div class="comment-list__item-avatar" style="background:url('${this.getAuthorAvatarUrl()}');background-size: cover;"></div>
    <div class="comment-list__item-info">
        <div class="comment-list__item-author">
            <a class="comment-list__item-author" href="${authorProfileUrl}">${authorUsername}</a>
             <span id="comment-score-${commentId}" data-score="0"
                  class="comment-list__vote-score">0</span>
            teraz
        </div>
        <div class="comment-list__item-text">${text}</div>
        <div class="comment-list__item-action">
            <div class="comment-list__action--disable display-none"></div>
            <span data-id="${commentId}" data-username="${authorUsername}" data-comment-parent="${commentParentId}"  class="comment-list__action-item comment-list__item-action--reply">
                <i class="fas fa-reply"></i>
                Odpowiedz</span>
            
                 <span data-comment="${commentId}"
                  class="comment-list__vote comment-list__vote--action comment-list__vote--up">
                    <i class="fas fa-angle-up  comment-list__vote--icon"></i>
                    </span>

                <span data-comment="${commentId}"
                  class="comment-list__vote comment-list__vote--action  comment-list__vote--down">
                 <i class="fas fa-angle-down  comment-list__vote--icon"></i>
                </span>
            <div class="comment-list__action--corner">
                <span data-comment="${commentId}" class="comment-list__action-item comment-list__action-item--remove comment-list__remove">
                <i class="fas fa-times"></i></span>
            </div>
        
        </div>

    </div>
</div>

`;
        if (isReply == false) {


            let list = `<div id="comment-reply-${commentId}" class="comment-reply"><div class="comment-reply__list"></div></div>`;
            html = html.concat(list);
            item.innerHTML = html;
            return item;
        }
        item.innerHTML = html;
        return item;
    }

    getAuthorAvatarUrl() {
        return document.querySelector(`.header-label__avatar`).dataset.url;
    }
}