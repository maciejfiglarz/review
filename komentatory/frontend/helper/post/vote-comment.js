export class VoteComment {
    constructor() {
        this.buttons = document.querySelectorAll(".single-bar__vote");
        this.votedClass = "single-bar__vote--voted";
        this.votedClassDisable = "single-bar__vote--disabled";
        this.type = "";
        this.initEvent();
        this.postUrl = "/vote/";
    }

    initEvent() {
        this.initClick();
    }


}
