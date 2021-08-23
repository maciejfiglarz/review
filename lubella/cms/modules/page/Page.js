import "./page.scss";
import { h, render, Fragment } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { toast } from 'react-toastify';
import SingleImageUploader from "../../components/SingleFileUploader/SingleFileUploader";
import useApi from "../../lib/api/useApi";
import SingleFileUploaderPage from "./../../components/SingleFileUploader/SingleFileUploaderPage";

const Page = () => {
    const [isSending, setIsSending] = useState(false);
    const [isRefreshData, setIsRefreshData] = useState(false);
    const [items, setItems] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [temponaryImageID, setTemponaryImageID] = useState("");

    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [metaTitleFacebook, setMetaTitleFacebook] = useState("");
    const [metaDescriptionFacebook, setMetaDescriptionFacebook] = useState("");

    const getData = () => {

        const [fetch] = useApi();
        fetch('/cms/api-fetch-pages', {}, 'post')
            .then((response) => {
                const { data } = response;
                console.log('data', data);
                setItems(data);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {

        getData();

    }, [isRefreshData]);

    useEffect(() => {

        getData();

    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        console.log(form);
        const id = form.dataset.id;
        const metaTitle = form.querySelector("input[name='metaTitle']").value;
        const metaDescription = form.querySelector("input[name='metaDescription']").value;
        const metaTitleFacebook = form.querySelector("input[name='metaTitleFacebook']").value;
        const metaDescriptionFacebook = form.querySelector("input[name='metaDescriptionFacebook']").value;
        console.log(metaTitle);
        setIsSending(true);
        console.log('id', id);
        const [fetch] = useApi();
        fetch('/cms/api-save-page', { id, metaTitle, metaDescription, metaTitleFacebook, metaDescriptionFacebook }, 'post')
            .then((response) => {
                toast.success("Dane zapisano poprawnie");
                setIsRefreshData(true);

            })
            .catch((error) => {
                setIsSending(false);
                console.log(error);
                toast.error("Coś poszło nie tak");
            }).finally(() => {
                setIsSending(false);
            })

    }

    return (

        <Fragment>
            {Object.keys(items).length > 0 && (
                Object.keys(items).map(key => (
                    <form class="page--item" data-id={items[key].id} onSubmit={(e) => onSubmit(e)}>
                        <SingleFileUploaderPage type="image" id={items[key].id} defaultFileName={items[key].fileName} defaultFileUrl={items[key].fileUrl} />
                        <h4 class="title">{items[key].name}</h4>
                        <div class="field">
                            <input value={items[key].metaTitle} type="text" class="input-primary" name="metaTitle" placeholder="Meta Tytuł"></input>
                        </div>
                        <div class="field">
                            <input value={items[key].metaDescription} type="text" class="input-primary" name="metaDescription" placeholder="Meta Opis"></input>
                        </div>
                        <div class="field">
                            <input value={items[key].metaTitleFacebook} type="text" class="input-primary" name="metaTitleFacebook" placeholder="Meta Tytuł Facebook"></input>
                        </div>
                        <div class="field">
                            <input value={items[key].metaDescriptionFacebook} type="text" class="input-primary" name="metaDescriptionFacebook" placeholder="Meta Opis Facebook"></input>
                        </div>
                        <button class={`btn--primary btn--submit  button`} disabled={isSending}>Zapisz</button>
                    </form>
                ))
            )}
        </Fragment>
    )
}
export default Page;
