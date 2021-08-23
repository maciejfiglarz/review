import CategoriesSearcher from "./../helper/CategoriesSearcher";



window.addEventListener("DOMContentLoaded", (event) => {

  const inits = document.querySelectorAll(".admin-content__category-label");
  inits.forEach((element) => {
    element.addEventListener("click", (event) => {
      const current = event.currentTarget;
      const id = current.dataset.superior;
      const label = document.querySelector(
        `.list${id}`
      );

      label.classList.toggle("display-none");
    });
  });

 new CategoriesSearcher();
});
