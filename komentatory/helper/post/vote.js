export class Vote {
    constructor() {
        this.buttons = document.querySelectorAll(".single-bar__vote--action");
        this.votedClass = "single-bar__vote--voted";
        this.votedClassDisable = "single-bar__vote--disabled";
        this.type = "";
        this.initEvent();
        this.postUrl = "/vote/";
    }

    initEvent() {
        this.initClick();
    }

    handleEvent(event) {

        let element = event.target;
        if (element.tagName != 'DIV') {
            element = element.parentElement;
        }

        if (element.classList.contains('single-bar__vote')) {
            const btn = element;
            const score = btn.parentNode.querySelector(".single-bar__vote-score");
            const type = this.getType(btn);
            const reverseBtn = this.getReverseBtn(btn, type);
            const reverseType = this.getType(reverseBtn);
            const postID = btn.dataset.id;
            let newScore = parseInt(score.dataset.score);

            if (btn.classList.contains(this.votedClass)) {
                btn.classList.remove(this.votedClass);
                reverseBtn.classList.remove(this.votedClassDisable);
                this.post(this.prepareUrl(postID, 'remove'));

            } else {
                btn.classList.add(this.votedClass);
                btn.classList.remove(this.votedClassDisable);

                reverseBtn.classList.remove(this.votedClass);
                reverseBtn.classList.add(this.votedClassDisable);
                newScore = type == 'up' ? newScore + 1 : newScore - 1;
                this.post(this.prepareUrl(postID, type));
            }

            this.setNewScoreValue(postID, newScore);
        }
    }

    initClickVoted() {
    }

    initClick() {
        const list = document.querySelector('.initClick');
        list.addEventListener('click', (event) => {
            this.handleEvent(event);

        });
        // this.buttons.forEach(btn => {
        //     btn.addEventListener("click", event => {
        //         const btn = event.currentTarget;
        //         const score = btn.parentNode.querySelector(".single-bar__vote-score");
        //         const type = this.getType(btn);
        //         const reverseBtn = this.getReverseBtn(btn, type);
        //         const reverseType = this.getType(reverseBtn);
        //         const postID = btn.dataset.id;
        //         let newScore = parseInt(score.dataset.score);
        //
        //         if (btn.classList.contains(this.votedClass)) {
        //             btn.classList.remove(this.votedClass);
        //             reverseBtn.classList.remove(this.votedClassDisable);
        //             this.post(this.prepareUrl(postID, 'remove'));
        //             console.log('vote', 'remove');
        //         } else {
        //             btn.classList.add(this.votedClass);
        //             btn.classList.remove(this.votedClassDisable);
        //
        //             reverseBtn.classList.remove(this.votedClass);
        //             reverseBtn.classList.add(this.votedClassDisable);
        //             newScore = type == 'up' ? newScore + 1 : newScore - 1;
        //             this.post(this.prepareUrl(postID, type));
        //             console.log('vote', type);
        //         }
        //
        //         this.setNewScoreValue(postID, newScore);
        //     });
        // });
    }

    prepareUrl(id, action) {
        return (this.postUrl = `/vote/${id}/${action}`);
    }

    getReverseBtn(currentBtn, type) {
        const reverseType = this.getReverse(type);
        return currentBtn.parentNode.parentNode.querySelector(
            `.single-bar__vote${reverseType}`
        );
    }

    getReverse(type) {
        return type == "up" ? "--down" : "--up";
    }

    getType(btn) {
        let type = "";
        if (btn.classList.contains("single-bar__vote--up")) {
            type = "up";
        } else if (btn.classList.contains("single-bar__vote--down")) {
            type = "down";
        }
        return type;
    }

    setNewScoreValue(id, scoreValue) {
        const score = document.querySelector(`#score-${id}`);
        score.innerText = scoreValue;
    }

    post(url) {
        // do zmiany na fetch

        $.ajax({
            url: url,
            data: [],
            type: "post",
            contentType: false,
            processData: false,
            cache: false,
            dataType: "json",
            beforeSend: () => {
            },
            success: data => {
                console.log(data);
            }
        });
    }

}
