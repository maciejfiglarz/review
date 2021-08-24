import { h, render } from 'preact';
import Quiz from "./Quiz";

// const element = document.querySelector('.authenticationComponent');
// const user = element.dataset.user;
// const name = element.dataset.name;
// const slug = element.dataset.slug;
// const content = element.cloneNode(true);
const element = document.querySelector('.quizModule');
if (element) {

    render(<Quiz
        // isLogged={user ? true : false} 
        // slug={slug} 
        // name={name} 
        // user={user} 
        // content={content} 
        isIndex={true}
    />
        , element);

}