export default class CategoriesSearcher {
  constructor() {
    this.categories = document.querySelectorAll(".categories-searcher__item");
    this.headers = document.querySelectorAll(".categories-searcher__header");
    this.lists = document.querySelectorAll(".categories-searcher__list");
    this.initHeaderEvent();
    this.initItemEvent();
  }

  initHeaderEvent() {
    this.headers.forEach((header) => {
      header.addEventListener("click", (event) => {
        const header = event.currentTarget;
        const type = header.dataset.type;
        this.hideAllLists();
        const list = document.querySelector(`[data-list='${type}']`);
        const icon = header.querySelector(".categories-searcher__header-icon");

        list.classList.toggle("display-none");
        icon.classList.toggle("categories-searcher__header-icon--rotated");
        if (type == "init") {
          header.classList.toggle(
            "categories-searcher__header--bottom-rounded"
          );
        }
        this.clearAllSelectedItems();
        this.clearAllSelectedHeader();
        header.classList.toggle("categories-searcher__header--selected");
        this.selectSuperiorSelect(header);
      });
    });
  }

  hideAllLists() {
    this.lists.forEach((item) => {
      item.classList.add("display-none");
    });
  }
  clearAllSelectedHeader() {
    this.headers.forEach((item) => {
      item.classList.remove("categories-searcher__header--selected");
    });
  }

  initItemEvent() {
    this.categories.forEach((item) => {
      item.addEventListener("click", (event) => {
        this.clearAllSelectedItems();
        const category = event.currentTarget;
        category.classList.toggle("categories-searcher__item--selected");
        this.selectCategory(category);
      });
    });
  }
  clearAllSelectedItems() {
    this.categories.forEach((item) => {
      item.classList.remove("categories-searcher__item--selected");
    });
  }
  selectCategory(category) {
    document.querySelector(`select[name="category`).value =
      category.dataset.id;

    // const checkboxes = document.querySelectorAll(`input[name="category[]`);
    // checkboxes.forEach((checkbox) => {
    //   category.dataset.id == checkbox.value
    //     ? (checkbox.checked = true)
    //     : (checkbox.checked = false);
    // });
  }
  selectSuperiorSelect(superiorCategory) {
    document.querySelector(`select[name="superiorCategory`).value =
      superiorCategory.dataset.type;

    // const checkboxes = document.querySelectorAll(`input[name="superiorCategory[]`);
    // checkboxes.forEach((checkbox) => {
    //   console.log( superiorCategory.dataset.type == checkbox.value, superiorCategory.dataset.type , checkbox.value);
    //   superiorCategory.dataset.type == checkbox.value
    //     ? (checkbox.checked = true)
    //     : (checkbox.checked = false);
    // });
  }
}
