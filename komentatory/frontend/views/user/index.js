import "./user.scss";
import "../../components/sidebar/categories";
import "../../components/sidebar/main";
import { h, render } from 'preact';


import ListPosts from "./../../modules/ListPosts";


const Index = () => {

  return (
    <div><ListPosts type={"index"} /></div>
  );
}

render(<Index />, document.getElementById('listPosts'));
