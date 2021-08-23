import { h, render } from 'preact';

import "~/components/sidebar/categories";
import "~/components/sidebar/main";
import "./categorySingle.scss";
import "~/components/category-observer";


import ListPosts from "../../modules/ListPosts";

const Category = () => {
  return (
    <div><ListPosts type={"category"} /></div>
  );
}

render(<Category />, document.getElementById('listPosts'));