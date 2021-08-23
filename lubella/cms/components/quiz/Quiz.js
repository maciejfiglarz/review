import "./quiz.scss";
import { Fragment, h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import useApi from "../../lib/api/useApi";
import { toast } from 'react-toastify';
import "./../SingleFileUploader/SingleFileUploader";

import SingleFileUploader from "./../SingleFileUploader/SingleFileUploader";
import StatusSwitcherList from "./../StatusSwitcher/StatusSwitcherList";

import fileIcon from "./../../images/cms_file.svg";

const Quiz = () => {
    const [items, setItems] = useState({});
    const symbols = {
        1: "I",
        2: "II",
        3: "III"
    }
    useEffect(() => {
        const [fetch] = useApi();
        fetch('/cms/api-fetch-quiz', {}, 'post')
            .then((response) => {
                console.log('response', response);
                // if (response.url) {
                //     location.href = response.url;
                // }
                console.log(response);
                setItems(response.data);

            })
            .catch((err) => {
                // toast.error({ text: 'Wystąpił błąd podczas rejestracji' });
                console.log(err);
            }).finally(() => {

            });

        // toast.error((<><b>Error!</b> Form was not send </>), {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        // });
    }, []);

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const input = form.querySelector('input[type=text]');
        const id = input.dataset.id;
        const type = input.dataset.type;
        const text = input.value;

        console.log(id, text, type);

        const [fetch] = useApi();
        fetch('/cms/api-update-data', { id, type, text }, 'post')
            .then((response) => {
                console.log('response', response);
                // if (response.url) {
                //     location.href = response.url;
                // }
                // console.log(response);
                // setItems(response.data);
                toast.success("Dane zapisano poprawnie");

            })
            .catch((error) => {
                // toast.error({ text: 'Wystąpił błąd podczas rejestracji' });
                console.log(error);
                toast.error("Coś poszło nie tak");
            });

    }

    return (
        <div class="quiz--component">


            {Object.keys(items).length > 0 && (

                Object.keys(items).map(keywordKey => {
                    const keyword = items[keywordKey];
                    const tips = keyword.tips;
                    return (
                        <div class="quiz--item">
                            <div class="title">Hasło {symbols[keywordKey]} - {keyword.answer}</div>
                            {/* <form class="quiz--field" onSubmit={handleForm}>
                                <div class="wrap">
                                    <input class="-field-save" data-type="keyword" data-id={keyword.id} type="text" value={keyword.answer} />
                                    <button type="submit" class="btn--primary -save">Zapisz</button>
                                </div>
                            </form> */}
                            {Object.keys(tips).map(tipKey => (
                                <form class="quiz--field" onSubmit={handleForm}>
                                    <div class="wrap">
                                        <div class="title -small">Wskazówka {symbols[tipKey]}</div>
                                        <div><StatusSwitcherList type="tip" id={tips[tipKey].id} listValue={tips[tipKey].isVisible} />{tips[tipKey].isVisible}</div>
                                    </div>
                                    <div class="wrap">
                                        <input class="-field-save" data-type="tip" data-id={tips[tipKey].id} type="text" value={tips[tipKey].name} />
                                        <button type="submit" class="btn--primary -save">Zapisz</button>
                                    </div>
                                </form>
                            ))}
                            {/* <SingleFileUploader id={keyword.id} defaultFileName={keyword.fileName} defaultFileUrl={keyword.fileUrl} /> */}
                        </div>
                    )

                })

            )}

        </div>
    )

}
export default Quiz;

