import ClassicEditor from "./../../../lib/ckeditor";
// import "./../../../../css/ckeditor.css";

export const initCkEditor = () => {
  const editor = document.querySelector(".ckeditor");

  ClassicEditor.create(editor)
    .then((editor) => {
      window.editor = editor;
    })
    .catch((err) => {
      console.error(err.stack);
    });
};
