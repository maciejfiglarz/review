import { h, Fragment, render } from 'preact';
import { useEffect, useState, useLayoutEffect } from 'preact/hooks';
import "./main-reward.scss";
import useApi from '../../lib/api/useApi';
import Modal from "./../../components/modal/Modal";

import boyImg from "../../images/boy.png";
import boyMobileImg from "../../images/boy-mobile.png";

import girlImg from "../../images/girl.png";
import girlMobileImg from "../../images/girl-mobile.png";

const MainReward = ({ isMainTask }) => {
    const [fileName, setFileName] = useState(false);
    const [file, setFile] = useState(false);
    const [error, setError] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isUsed, setIsUsed] = useState(false);

    useLayoutEffect(() => {
        if (isMainTask) {
            setIsUsed(true);
        }
    }, []);



    console.log('error', error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Musisz załączyć jakiś plik");
        } else if (Math.round((file.size / 1024)) >= 5100) {
            setError("Zdjęcie nie może być większe niż 5mb");
        } else if (!file.name.match(/.(jpg|jpeg|png)$/i)) {
            setError("Załączony plik musi być zdjęciem");
            // setFileName(false);
            // setFile(false);
        } else {
            setError("");
            const [fetch] = useApi();
        
            fetch('/api-upload-finish-task', { file }, 'post')
                .then((response) => {
                    setFile(null);
                    setFileName(null);
                    setIsUsed(true);
                })
                .catch((error) => {
                    setError("Niestety coś poszło nie tak");
                })
        }

    }


    const onChangeFile = async (e) => {
        const files = e.target.files;
        const file1 = files[0];
        const fileSize = Math.round((file1.size / 1024));
        setFileName(file1.name);
        setFile(file1);
    
    }

    return (
        <Fragment>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} isFlex={true}>
                <Fragment>
                    <h3 class="title">Twoje zadanie kreatywne zostało wysłane</h3>

                    <h5 class="info"><span class="line yellow">Teraz stanie do walki o Mystery Box.</span>
                        <span class="line -mb30">Jeśli wygrasz, skontaktujemy się z Tobą w ciągu tygodnia od zakończenia konkursu.</span>

                        <span class="line -mb30">Wykorzystaj ten czas na szukanie wskazówek i odgadywanie kolejnych haseł.</span>
                        <span class="line -mb30">Powodzenia!</span></h5>
                    <div class="wrap">
                        <button onClick={() => setIsOpen(false)} class="btn--primary -center">OK</button>
                    </div>
                </Fragment>
            </Modal>

            <div class="container">
                <div class="main-reward--component">
                    <div class="main--title">
                        <h1 class="text">Zadanie</h1>
                    </div>
                    <div class="main--reward--content">

                        {isUsed ? (
                            <div class="main--reward--success">
                                <h5 class="title">Gratulujemy odkrycia wszystkich haseł i&nbsp;wykonania zadania głównego!</h5>
                                <p class="info">
                                    Jeśli wygrasz skontaktujemy się z&nbsp;Tobą w&nbsp;ciągu tygodnia od zakończenia konkursu.
                                </p>
                            </div>
                        ) : (
                            <Fragment>
                                <h5 class="info"><span class="first-line">Stwórz, w dowolny sposób, plakat z&nbsp;vito i&nbsp;bellą</span> w&nbsp;towarzystwie płatków Lubella choco game.</h5>
                                <form onSubmit={handleSubmit} enctype="multipart/form-data" class="form">

                                    {error.length > 0 && (<div class="error">{error}</div>)}

                                    <div class="wrap">
                                        <label for="file-upload" class="file--field">
                                            {fileName ? (
                                                <Fragment>
                                                    {fileName}
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    Wybierz plik
                                                </Fragment>
                                            )}

                                        </label>
                                        <input onChange={(e) => onChangeFile(e)} id="file-upload" type="file" />
                                    </div>
                                    <button id="cta__zadanie-glowne" type="submit" class="button btn--secondary -center">Wyślij</button>
                                </form>
                                <div class="rule">
                                    Zrób zdjęcie lub print screen swojej pracy i&nbsp;wrzuć tutaj, na&nbsp;swoje konto na stronie poszukiwaczeplatkow.pl! 
                                    <span class="line">Vito i&nbsp;Bella wybiorą najlepsze kreacje,
                                    która zasłużą na&nbsp;nagrody główne.</span>
                                </div>
                            </Fragment>
                        )}



                    </div>
                </div>
            </div>
            <div class="main--reward--footer">
                <picture class="boy">
                    <source media="(min-width:768px)" srcset={boyImg} />
                    <img src={boyMobileImg} alt="" style="width:auto;" />
                </picture>
                <picture class="girl">
                    <source media="(min-width:768px)" srcset={girlImg} />
                    <img src={girlMobileImg} alt="" style="width:auto;" />
                </picture>
            </div>
        </Fragment>
    );
};

export default MainReward;



