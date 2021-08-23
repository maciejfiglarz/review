import ClassicEditor from './../lib/ckeditor';

export const initCKEditorxxx = () => {
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