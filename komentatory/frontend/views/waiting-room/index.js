import "./waitingRoom.scss";
// import "../components/preview/slider";
import "./index.scss";
import "../../components/sidebar/categories";
import "../../components/sidebar/main";
// import "../../components/guard";

import { h, render } from 'preact';


import ListPosts from "./../../modules/ListPosts";


const Index = ({ userID }) => {

  return (
    <div><ListPosts type={"waiting-room"} userIDu={userID} /></div>
  );
}

const element = document.getElementById('listPosts');
const userID = element.dataset.id;

render(<Index />, document.getElementById('listPosts'));


