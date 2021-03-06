
import { h, Fragment, render } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';

import useApi from "../../../lib/api/useApi";
import windowScroll from '../../../helpers/windowBlockScroll';
import effects from '../../../lib/effects';

import { displayError, isEmailNotAvailable, clearErrors } from "../../../lib/form/validation";
import { renderRow } from "../../../lib/form/fields";

import Modal from "../../modal/Modal";
import MainReward from "../../main-reward/MainReward";
import Authentication from "../../authentication/Authentication";



const Item = ({ id, sort, tips, symbol, isUsed, fileUrl, isLogged, questionTask, isDefaultTask, preKeyword }) => {
    const [answer, setAnswer] = useState("");
    const [scrollClass, setScrollClass] = useState("");
    const [isErrorAnswer, setIsErrorAnswer] = useState("");

    const [task, setTask] = useState("");
    const [isErrorTask, setIsErrorTask] = useState("");
    const [isTask, setIsTask] = useState(false);

    const [isUsedKeyword, setIsUsedKeyword] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [isPreKeyword, setIsPreKeyword] = useState(false);


    const [type, setType] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const [authInitType, setAuthInitType] = useState("");

    const itemRef = useRef(null);


    useEffect(() => {
        setIsUsedKeyword(isUsed);
        effects.fadeIn([itemRef.current]);
        if (isDefaultTask) {
            setIsTask(true);
        }

        if (preKeyword) {
            setIsPreKeyword(true);
        }
    }, [])

    useEffect(() => {
        if (isFinish) {
            initMainReward();
        }
    }, [isFinish])


    useEffect(() => {
        if (type == "success") {
            setScrollClass('-mobile');
        } else {
            setScrollClass('');
        }
    }, [type])


    useEffect(() => {
        if (!isOpen && !isFinish && isPreKeyword) {
            setType("success");
            setIsOpen(true);
            setIsPreKeyword(false);
        }
    }, [isPreKeyword])


    useEffect(() => {
        if (!isOpen && !isFinish) {
            setType("");
        }

        if (!isOpen && !isFinish && isPreKeyword) {
            setType("success");
            setIsOpen(true);
            setIsPreKeyword(false);
        }
    }, [isOpen])





    const handleSubmitAnswer = async (e) => {
        e.preventDefault();


        if (!answer.length) {
            setIsErrorAnswer(true);
        } else {
            if (isLogged) {
                setIsErrorAnswer(false);
                const [fetch] = useApi();
                fetch('/api-quiz-check-answer', { id, answer }, 'post')
                    .then((response) => {
                        const { isFinish } = response;
                        if (isFinish) {
                            setIsFinish(true)
                        }
                        setType('success');
                        setIsUsedKeyword(true);
                        setIsOpen(true);
                    })
                    .catch((error) => {
                        setType('fail');
                        setIsOpen(true);
                    });

            } else {

                setIsErrorAnswer(false);
                const [fetch] = useApi();
                fetch('/api-quiz-check-answer-not-logged', { id, answer }, 'post')
                    .then((response) => {
                        setType('guard');
                        setIsOpen(true);
                    })
                    .catch((error) => {
                        setType('fail');
                        setIsOpen(true);
                    });


            }

        }

    }

    const handleSubmitTask = async (e) => {
        e.preventDefault();
        const [fetch] = useApi();

        if (!task.length) {
            setIsErrorTask(true);
        } else {
            setIsErrorTask(false);
            fetch('/api-quiz-send-task', { id, content: task }, 'post')
                .then((response) => {
                    // console.log('repsonse task', response);
                    const { isFinish } = response;
                    if (isFinish) {

                        setType("finish");
                        setIsOpen(true);
                        setIsFinish(false);
                        setIsTask(true);
                        initMainReward();


                    } else {
                        setType('task');
                        setIsOpen(true);
                        setIsTask(true);
                    }


                })
                .catch((error) => {
                    console.log(error);
                });

        }

    }


    const initMainReward = () => {
        render(<MainReward

            isMainTask={false}
        />
            , document.querySelector('.mainRewardComponent'));
    }


    const scrollToMainReward = () => {
        closeModal();

        setTimeout(function () { 
            if (document.querySelector('.mainRewardComponent')) {
                document.querySelector('.mainRewardComponent').scrollIntoView();
            }
        }, 100);

    }



    const closeModal = () => {
        setIsOpen(false);
        setType("");

    }


    const initGuard = (type) => {
        closeModal();
        setAuthInitType(type);
    }



    const renderCreativeTaskStatic = () => {

        if (isUsedKeyword && isTask) {
            return <h5 class="quiz--task--status">Zadanie kreatywne wykonane!</h5>;
        } else {
            if (!isOpen) {
                return (<div>
                    <h5 class="quiz--task--status">Odpowiedz na pytanie kreatywne i&nbsp;walcz o&nbsp;mystery box:</h5>
                    <h5 class="quiz--task--question blue">{questionTask}</h5>
                    <form class="quiz--action -no-margin" onSubmit={handleSubmitTask}>
                        {isErrorTask && (<div class="error">Pole nie mo??e by?? puste.</div>)}
                        <textarea onChange={(e) => setTask(e.target.value)} value={task} class="textarea--field -task" placeholder="Odpowied??"></textarea>
                        <button id={`cta__zadanie-kreatywne-quiz-${sort}`} type="submit" class="btn--primary -center -mt25">Wy??lij</button>
                    </form>
                </div>
                )
            }
        }

    }

    const renderAuthentication = () => (<Authentication isIndependent={true} authInitType={authInitType} setAuthInitType={setAuthInitType} />);
    return (

        <Fragment>

            {authInitType.length > 0 && (
                renderAuthentication()
            )}

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} isFlex={type == "success" ? false : true} scrollClass={scrollClass}>
                {type == "success" && (
                    <Fragment>
                        <h3 class="title">Gratulujemy odkrycia has??a!</h3>
                        <h5 class="info -mb25">Ju?? teraz mo??esz <span class="yellow">odebra?? nagrod?? gwarantowan?? </span>
                            oraz <span class="yellow">zagra?? o&nbsp;Mystery Box o&nbsp;warto??ci 2000 z??otych. </span>
                            Aby to zrobi?? odpowiedz na pytanie, kt??re znajdziesz poni??ej. Nagrodzimy wybrane, najbardziej
                            kreatywne odpowiedzi!</h5>
                        {fileUrl && (
                            <a href={fileUrl} id={`cta__nagroda-gwarantowana-${sort}`} class="button btn--primary -reward -space" download>Pobierz nagrod?? gwarantowan??</a>
                        )}

                        <div class="main--title -task -bright -bright-text ">
                            <h3 class="text">Pytanie</h3>
                        </div>
                        <h5 class="info -mb25">{questionTask}</h5>
                        <div class="wrap">

                            <form class="quiz--action -no-margin" onSubmit={handleSubmitTask}>

                                {isErrorTask && (<div class="error -popup">Pole nie mo??e by?? puste.</div>)}
                                <textarea onChange={(e) => setTask(e.target.value)} class="textarea--field -task" value={task} placeholder="Odpowied??"></textarea>
                                <button id={`cta__zadanie-kreatywne-popup-${sort}`} type="submit" class="btn--primary -center -mt15">Wy??lij</button>
                            </form>


                        </div>
                    </Fragment>
                )}
                {type == "task" && (
                    <Fragment>
                        <h3 class="title">Twoje zadanie kreatywne zosta??o wys??ane</h3>

                        <h5 class="info"><span class="line yellow">Teraz stanie do walki o&nbsp;Mystery Box.</span>
                            <span class="line -mb30">Je??li wygrasz, skontaktujemy si?? z Tob?? w&nbsp;ci??gu tygodnia od zako??czenia konkursu.</span>

                            <span class="line -mb30">Wykorzystaj ten czas na szukanie wskaz??wek i&nbsp;odgadywanie kolejnych hase??.</span>
                            <span class="line -mb30">Powodzenia!</span></h5>
                        <div class="wrap">
                            <button onClick={() => closeModal()} class="btn--primary -center">OK</button>
                        </div>
                    </Fragment>
                )}
                {type == "fail" && (
                    <Fragment>
                        <h3 class="title">Niestety!</h3>
                        <h5 class="info">Podane has??o jest nieprawid??owe.</h5>
                        <div class="wrap">
                            <button onClick={() => closeModal()} class="button btn--primary">Spr??buj ponownie</button>
                        </div>
                    </Fragment>
                )}
                {type == "finish" && (
                    <Fragment>
                        <h3 class="title"><span class="line">Gratulujemy odkrycia</span> wszystkich hase??!</h3>
                        <h5 class="info"><span class="line">Ju?? teraz <span class="yellow">mo??esz odebra?? nagrod?? gwarantowan??</span></span> <span class="line">oraz zagra?? o&nbsp;nagrod?? g????wn??,</span> Jedn?? z&nbsp;5 nowych  <span class="yellow">konsoli ps5 wraz z&nbsp;akcesorami!</span></h5>
                        <div class="wrap">
                            <button id="cta__zagraj-o-nagrode-glowna" onClick={() => scrollToMainReward()} class="button btn--primary -space">Zagraj o nagrod?? g????wn??</button>
                        </div>
                    </Fragment>
                )}
                {type == "guard" && (
                    <Fragment>
                        <h3 class="title">Gratulujemy odkrycia has??a!</h3>

                        <h5 class="info">
                            <span class="line"><span class="yellow">Zaloguj si??</span> lub <span class="yellow">Za?????? konto</span>,</span>
                            <span class="line">by odebra?? nagrod?? gwarantowan??, </span>
                            <span class="line">walczy?? o Mystery Box oraz nagrod?? g????wn??</span>
                            {/* <span class="line">oraz nagrod?? g????wn??.</span> */}
                        </h5>
                        <div class="wrap">
                            <button id="cta__zaloguj-quiz-index" onClick={() => initGuard('login')} class="button btn--primary">Zaloguj si??</button>
                            <button id="cta__zaloz-konto-quiz-index" onClick={() => initGuard('register')} class="button btn--primary">Za?????? konto</button>
                        </div>
                    </Fragment>
                )}
            </Modal>

            <div ref={itemRef} class="quiz--item fadeInTrigger">
                <h5 class="title">Wskaz??wka do has??a {symbol} </h5>
                {Object.keys(tips).map(tipKey => (
                    <div class={`quiz--tip ${tips[tipKey].isVisible ? "-visible" : ""}`} data-id={tips[tipKey].id}>
                        <span class="bold">WSKAZ??WKA {tipKey}: </span>
                        {tips[tipKey].isVisible ? (
                            <Fragment>
                                {tips[tipKey].name}
                            </Fragment>

                        ) : (
                            <Fragment>
                                <span class="bold">WKR??TCE</span>
                            </Fragment>
                        )}
                    </div>
                ))}

                {isUsedKeyword ? (
                    <Fragment>
                        <h5 class="quiz--task--status -first">Has??o odkryte!</h5>
                        {fileUrl && (
                            <a href={fileUrl} id={`cta__nagroda-gwarantowana-${sort}`} class="button btn--primary -space -small" download>Pobierz nagrod?? gwarantowan??</a>
                        )}

                        {renderCreativeTaskStatic()}

                    </Fragment>
                ) : (

                    <form class="quiz--action" onSubmit={handleSubmitAnswer}>
                        {isErrorAnswer && (<div class="error">Pole nie mo??e by?? puste.</div>)}
                        <input onChange={(e) => setAnswer(e.target.value)} type="text" class="input--field" placeholder="Podaj has??o" />
                        <button type="submit" id={`cta__odkryj${sort}`} class={`btn--secondary  -center`}>Odkryj</button>
                    </form>

                )}

            </div>
        </Fragment>
    )


};

export default Item;
