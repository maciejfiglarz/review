import {singsCounter} from "./common";
import {CommentHelper} from "./comment-helper";


export class Comment extends CommentHelper {
    constructor() {
        super();
        this.singsCounter = singsCounter;
        this.newCommentMain = document.querySelector(".comment-new--main");
        this.newButton = document.querySelector(".comment-new__button-new");
        this.newTextarea = document.querySelector(".comment-new__textarea");
        this.newCounter = document.querySelector(
            ".comment-new__counter--current-new"
        );


        this.list = document.querySelector(".comment-list");
        this.votedCommentClass = "comment-list__vote--voted";
        this.currentNewComment = '';
        this.initEvents();
    }

    initEvents() {
        this.initNewComment();
        this.initCounter();
        this.initEventItem();
        this.initEventRemoveComment();
    }

    initEventRemoveComment() {
        const buttons = document.querySelectorAll('.comment-list__remove');
        buttons.forEach(btn => {
            this.eventRemoveComment(btn);
        })
    }

    eventRemoveComment(btn) {
        btn.addEventListener('click', event => {
            const element = event.currentTarget;
            const commentId = element.dataset.comment;
            const url = '/api-remove-comment';
            const actionDisable = element.parentNode.parentNode.querySelector('.comment-list__action--disable');
            const text = element.parentNode.parentNode.parentNode.querySelector('.comment-list__item-text');
            const votes = element.parentNode.parentNode.querySelectorAll('.comment-list__vote');

            actionDisable.classList.remove('display-none');
            text.classList.add('comment-list__item-text--ban');
            text.innerText = 'Treść tego komentarza została usunięta przez autora';
            votes.forEach(vote => {
                vote.classList.remove('comment-list__vote--voted');
            });

            const formData = new FormData();

            formData.append("commentId", commentId);

            this.post(url, formData, true);
        })
    }

    initEventItem() {
        const items = document.querySelectorAll('.comment-list__item');
        items.forEach(itemComment => {
            const replyAction = itemComment.querySelector('.comment-list__item-action--reply');
            this.addEventClickToReplyAction(replyAction);
            this.eventVoteComment(itemComment);
        })
    }

    initCounter() {
        const newComments = document.querySelectorAll(".comment-new");
        newComments.forEach(newComment => {
            this.eventCounter(newComment);
        })
    }

    eventVoteComment(itemComment) {
        const votes = itemComment.querySelectorAll('.comment-list__vote--action');
        votes.forEach(vote => {
            vote.addEventListener('click', (event) => {
                const element = event.currentTarget;
                this.voteComment(element);
            });
        });
    }

    voteComment(btn) {

        const url = '/api-vote-comment';
        const type = this.getVoteCommentType(btn);
        const reverseBtn = this.getReverseCommentBtn(btn, type);
        const commentId = btn.dataset.comment;
        const score = this.getVoteCommentScore(btn);
        let newScore = parseInt(score.dataset.score);
        const formData = new FormData();
        formData.append("commentId", commentId);
        formData.append("type", type);


        if (btn.classList.contains(this.votedCommentClass)) {
            btn.classList.remove(this.votedCommentClass);
            formData.append("type", 'remove');
        } else {
            btn.classList.add(this.votedCommentClass);
            reverseBtn.classList.remove(this.votedCommentClass);
            newScore = type == 'up' ? newScore + 1 : newScore - 1;
        }
        this.post(url, formData, true);
        this.setVoteCommentScore(score, newScore);
    }


    initNewComment() {
        const commentNewList = document.querySelectorAll(".comment-new");
        commentNewList.forEach(newComment => {
            this.addEventForCommentNew(newComment);
        });

    }

    eventCounter(newComment) {
        const counterContener = newComment.querySelector(
            ".comment-new__counter--current"
        );
        const fieldContener = newComment.querySelector(
            "textarea"
        );
        this.singsCounter(fieldContener, counterContener, 1000);
    }

    addEventForCommentNew(newComment) {
        const newButton = newComment.querySelector('.comment-new__button');
        const textarea = newComment.querySelector('textarea');


        const url = "/api-add-new-comment";
        newButton.addEventListener('click', (event) => {
            const parentFrame = event.target.parentNode.parentNode.parentNode;
            const textarea = parentFrame.querySelector('textarea');
            const text = textarea.value;
            const postId = event.target.dataset.id;
            const commentParentId = event.target.dataset.commentParent;

            this.currentNewComment = parentFrame;
            this.currentTextarea = textarea;

            if (this.validTextarea(text)) {
                const formData = new FormData();
                formData.append("postId", postId);
                formData.append("text", text);
                formData.append("commentParentId", commentParentId);
                this.post(url, formData);
                parentFrame.querySelector('.comment-new__counter--current').innerText = '0';
            }
        });

    }

    post(url, formData, isReply = false) {
        $.ajax({
            url: url,
            data: formData,
            type: "post",
            contentType: false,
            processData: false,
            cache: false,
            dataType: "json",
            beforeSend: () => {
                if (!isReply) {
                    this.beforePost();

                }
            },
            success: data => {
                if (!isReply) {
                    this.afterPost(data);
                }
            }
        });
    }

    beforePost() {
        this.currentNewComment.style.opacity = "0.6";
    }

    afterPost(data) {
        const {status, commentParentId} = data;
        if (status) {
            if (!commentParentId) {

                const preparedItemComment = this.prepareItemComment(data);
                const newComment = this.prepareNewReplyComment(data);

                this.list.insertBefore(newComment, this.list.firstChild);
                this.eventCounter(newComment);
                this.list.insertBefore(preparedItemComment, this.list.firstChild);
                this.addEventForCommentNew(newComment);


                const replyAction = preparedItemComment.querySelector('.comment-list__item-action--reply');
                this.addEventClickToReplyAction(replyAction);
                this.eventVoteComment(preparedItemComment);
                this.eventRemoveComment(preparedItemComment.querySelector('.comment-list__remove'));
            } else {

                const commentReply = document
                    .querySelector(`#comment-reply-${commentParentId}`)
                    .querySelector(".comment-reply__list");

                const preparedItemComment = this.prepareItemComment(data, true);
                commentReply.appendChild(preparedItemComment, commentReply.firstChild);

                const replyAction = preparedItemComment.querySelector('.comment-list__item-action--reply');
                this.addEventClickToReplyAction(replyAction);
                this.eventVoteComment(preparedItemComment);
                this.eventRemoveComment(preparedItemComment.querySelector('.comment-list__remove'));
            }


        }

        this.resetCurrentTextarea();
        this.currentTextarea.innerText = '';
        this.currentNewComment.style.opacity = "1";
    }

    addEventClickToReplyAction(reply) {
        if (reply) {
            reply.addEventListener("click", event => {
                const commentId = event.target.dataset.id;
                const commentParentId = event.target.dataset.commentParent;
                const authorUsername = event.target.dataset.username;
                this.showNewCommentReply(commentParentId > 0 ? commentParentId : commentId, authorUsername);
            });
        }
    }
}
