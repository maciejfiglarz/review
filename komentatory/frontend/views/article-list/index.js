
import "./articleList.scss";
import "../../components/sidebar/main";
import "../../components/sidebar/categories";

const harmonyMenu = () => {
  const list = document.querySelector('.articlesList');
  const trigger = document.querySelector('.articlesListTrigger');
  console.log(list);
  trigger.addEventListener('click', () => {
    list.classList.toggle('article-categories__list--show');
  });
}


window.addEventListener("DOMContentLoaded", (event) => {

  // harmonyMenu();

});
