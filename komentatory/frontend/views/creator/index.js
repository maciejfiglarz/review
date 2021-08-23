
import "./creator.scss";
import "../../components/sidebar/main";
// import GraphicWorkspace from "../../helper/creator/graphic/workspace";
import GraphicWorkspace from "../../modules/creator/graphic/workspace";

// import NewsWorkspace from "../../helper/creator/news/workspace";
import NewsWorkspace from "../../modules/creator/news/workspace";

// import LinkWorkspace from "../../helper/creator/link/workspace";
import LinkWorkspace from "../../modules/creator/link/workspace";

import { counterTextarea } from "../../lib/form";


import initCaptcha from "../../modules/creator/captcha";

import Creator from "../../modules/creator/Creator";


import "../../modules/creator/category-selector";



window.addEventListener("DOMContentLoaded", (event) => {
    new GraphicWorkspace();
    new NewsWorkspace();
    new LinkWorkspace();
    new Creator();
    counterTextarea();
    // initCkEditor();
    initCaptcha();
    // new CategoriesSearcher();
});

