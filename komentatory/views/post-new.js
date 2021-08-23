import { singsCounter } from "./../helper/post/common";
import ClassicEditor from "./../lib/ckeditor";
import EmbedHelper from "./../helper/post/embed";
import "../frontend/components/CategorySelector";
import "../../css/ckeditor.css";
import {
  isValidStringMaxLength,
  isValidStringMinLength,
} from "./../lib/validation";
import { NewPostHelper } from "./../helper/post/new-post-helper";

window.addEventListener("DOMContentLoaded", (event) => {
  new Select(singsCounter);
  new NewPost();

  new CategoriesSearcher();
  // showOptions();
  singsCounter(
    document.querySelector("#create_post_form_title"),
    document.querySelector(".field-label__counter--title", 250)
  );
  singsCounter(
    document.querySelector("#create_post_form_description"),
    document.querySelector(".field-label__counter--description", 750)
  );

});
