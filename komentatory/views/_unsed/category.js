import { h, render } from 'preact';
import ListPosts from "./../frontend/modules/ListPosts";

const Category = () => {
  return (
    <div><ListPosts type={"category"} /></div>
  );
}

render(<Category />, document.getElementById('listPosts'));