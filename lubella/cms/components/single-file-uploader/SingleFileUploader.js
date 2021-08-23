import "./singleFileUploader.scss";
import { h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import fileIcon from "./../../images/cms_file.svg";
import { toast } from 'react-toastify';

import useApi from "../../lib/api/useApi";

const SingleFileUploader = ({ setTemponaryFileID, id, defaultFileUrl, label, type, defaultFileName }) => {
    const [content, setContent] = useState("");
    const [fileUrl, setFileUrl] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileRef = useRef(null);
    console.log('id');
    useEffect(() => {
        setFileUrl(defaultFileUrl);
        setFileName(defaultFileName);
    }, []);

    const onChangeFile = async (e) => {
        setIsLoading(true);
        const files = e.target.files;
        if (e.target.files.length) {
            const file = files[0];

            const [fetch] = useApi();
            fetch('/cms/api-upload-temponary-file', { file, keywordID: id }, 'post')
                .then((response) => {
                    const { fileUrl, fileName } = response;
                    setFileUrl(fileUrl);
                    setFileName(fileName);
                    //     setTemponaryImageID(temponaryImageID);
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

        setIsLoading(false);

    }
    console.log('fileUrl',fileUrl);
    return (
        <div class="single--file--uploader">
            <div class="label">{label}</div>
            {isLoading && (
                <div class="loader"></div>
            )}

            {fileUrl && type == "image" && (
                <div class="frame">
                    <img class="image" src={fileUrl} />
                </div>
            )}
            {fileUrl && type != "image" && (
                <a href={fileUrl} class="frame -image" download>
                    <img class="image" src={fileIcon} /> {fileName}
                </a>
            )}

            {/* #todo type: accept="image/*" */}
            <input type="file" multiple="false" onChange={(e) => onChangeFile(e)} ref={fileRef} class="btn--upload" />
        </div>
    )
}
export default SingleFileUploader;

