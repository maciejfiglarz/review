import ClassicEditor from './../lib/ckeditor';

window.addEventListener("DOMContentLoaded", event => {

    initCKEditorEntry();


});





export const initCKEditorEntry = () => {
    const editors = document.querySelectorAll(".ckeditor");

    editors.forEach(editorFirst => {


        ClassicEditor.create( editorFirst )
            .then( editor => {
                window.editor = editor;
            } )
            .catch( err => {
                console.error( err.stack );
            } );

    });
};