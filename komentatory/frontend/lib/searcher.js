export const initSearcher = () => {
    const initSearcher = document.querySelector('.searcher__init');
    const searcherFrame = document.querySelector('.searcher');
    const inputText = document.querySelector('.searcher__text');
    const button = document.querySelector('.searcher__button');
    const buttonStatic = document.querySelector('.searcher-static__button');
    const inputTextStatic = document.querySelector('.searcher-static__text');

    initSearcher.addEventListener('click', () => {
        searcherFrame.classList.remove('display-none');
        initSearcher.classList.add('display-none');
        inputText.focus();
    });

    button.addEventListener('click',(event)=>{
        if(inputText.value.length == 0){
            event.preventDefault();
        }
    });

    if(inputTextStatic){
        buttonStatic.addEventListener('click',(event)=>{
            if(inputTextStatic.value.length == 0){
                event.preventDefault();
            }
        });
    }


};