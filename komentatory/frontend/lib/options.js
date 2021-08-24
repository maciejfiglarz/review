export class Options {
    constructor() {
        Object.assign( this, sortDesktop );

        this.typesList = document.querySelectorAll(`.${this.typesListClass}`);
        this.categoriesList = document.querySelectorAll(`.${this.categoriesListClass}`);


        this.initEvent();
    }

    initEvent() {
        this.initClickTypes();
        this.initClickCategories()
    }

    initClickCategories() {
        this.categoriesList.forEach((category) => {
            category.addEventListener('click', (event) => {
                event.target.classList.toggle(this.classActive);
                this.toggleCategory(category);
            });
        });
    }

    toggleCategory(category) {
        const checkbox = document.querySelector(`input[type="checkbox"][id="${this.aliasCheckboxCategory}-${category.id}"]`);
        if (category.classList.contains(this.classActive)) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    }
    initClickTypes() {
        this.typesList.forEach((type) => {
            type.addEventListener('click', (event) => {
                this.uncheckAllTypes();
                event.target.classList.add(this.classActive);

                this.uncheckAllTypeCheckboxes();
                this.setTypeCheckbox(type);
            });
        });
    }

    uncheckAllTypes() {
        this.typesList.forEach(type => {
            type.classList.remove(this.classActive);
        });
    }

    setTypeCheckbox(type){
        console.log('type',type.id,this.aliasCheckboxType);
        const checkbox = document.querySelector(`input[type="checkbox"][id="${this.aliasCheckboxType}-${type.id}"]`);
        checkbox.checked = true;
    }

    uncheckAllTypeCheckboxes(){
        const checkboxes = document.querySelectorAll(`.${this.sortType}`);
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }


}