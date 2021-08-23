export default class Report {
    constructor(sortDesktop) {
        this.initReports = document.querySelectorAll('.report__init');
        this.reports = document.querySelectorAll('.report');
        this.postUrl = '/api-report';
        this.cover = document.querySelector('.cover');
        this.initReport();
    }

    initReport() {

        const list = document.querySelector('.initClick');
        list.addEventListener('click', (event) => {
            let element = event.target;
            if (element.tagName != 'DIV') {
                element = element.parentElement;
            }
            if (element.classList.contains('single-header__button--report')) {

                const button = element;
                const type = button.dataset.type;
                const id = button.dataset.id;

                button.classList.remove('display-none');
                document.querySelector(`#report-${type}-${id}`).classList.remove('display-none');

                this.cover.classList.remove('display-none');
            }
        });

        this.reports.forEach(report => {
            this.setEventsForReport(report);
        });
    }

    setEventsForReport(report) {
        this.eventReport(report);
        this.onlyOneSelected(report);
        this.closeReport(report);
    }

    eventReport(report) {
        report.querySelector('.report__button').addEventListener('click', event => {
            event.preventDefault();
            const report = event.currentTarget.parentNode.parentNode.parentNode;
            const type = report.dataset.type;
            const id = report.dataset.id;
            const checkboxes = report.querySelectorAll("input[type='checkbox']");
            const textarea = report.querySelector('textarea').value;

            const formData = new FormData();
            formData.append('type', type);
            formData.append('id', id);
            formData.append('other', textarea);

            checkboxes.forEach(checkbox => {
                formData.append(checkbox.value, checkbox.checked ? true : false);
            });

            this.post(this.postUrl, formData);
            this.resetReport(report);
        });
    }

    closeReport(report) {
        const close = report.querySelector('.report__close');
        close.addEventListener('click', event => {
            const report = event.currentTarget.parentNode;
            this.resetReport(report);
        });
    }

    resetReport(report) {
        const checkboxes = report.querySelectorAll("input[type='checkbox");
        const other = report.querySelector('textarea');
        const button = report.querySelector('.report__button');

        report.classList.add('display-none');
        this.clearAllCheckbox(checkboxes);
        other.classList.add('display-none');
        other.innerText = '';
        button.classList.add('display-none');
        this.cover.classList.add('display-none');
    }

    onlyOneSelected(report) {
        const checkboxes = report.querySelectorAll("input[type='checkbox");
        const button = report.querySelector('.report__button');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('click', event => {

                this.clearAllCheckbox(checkboxes);

                const currentCheckbox = event.currentTarget;
                currentCheckbox.checked = true;
                const textarea = event.currentTarget.parentNode.parentNode.parentNode.querySelector('textarea');

                if (currentCheckbox.getAttribute('value') == 'isOther') {
                    textarea.classList.remove('display-none');
                } else {
                    textarea.classList.add('display-none');
                }
                button.classList.remove('display-none');
            });
        });
    }

    clearAllCheckbox(checkboxes) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
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
            },
            success: data => {
            }
        });
    }

}
