import "./quiz.scss";

import { h, Fragment, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import Item from "./subcomponents/Item";

import useApi from "../../lib/api/useApi";

import MainReward from "../main-reward/MainReward";

const Quiz = ({ isIndex }) => {
    const [keywords, setKeywords] = useState({});
    const [isDefaultFinish, setIsDefaultFinish] = useState(false);
    const [isMainTask, setIsMainTask] = useState(false);
    const [preKeyword, setPreKeyword] = useState(null);

    const symbols = {
        1: "I",
        2: "II",
        3: "III"
    }

    useEffect(() => {

        if (isDefaultFinish) {
            initMainReward();
        }

    }, [isDefaultFinish]);

    useEffect(() => {
        const [fetch] = useApi();
        fetch('/api-fetch-quiz', {}, 'get')
            .then((response) => {
                setKeywords(response.data);
                setIsMainTask(response.isMainTask);
                setIsDefaultFinish(response.isDefaultFinish);
                setPreKeyword(response.preKeyword);

            })
            .catch((error) => {

                // console.log(error);
            });

    }, []);

    const initMainReward = () => {
        if (document.querySelector('.mainRewardComponent')) {
            render(<MainReward
                isMainTask={isMainTask}
            />
                , document.querySelector('.mainRewardComponent'))
        }

    }


    return (

        <Fragment>
            <div class="quiz--component">
                {Object.keys(keywords).length > 0 && (
                    Object.keys(keywords).map(keywordKey => {

                        return (
                            <Fragment>
                                <Item
                                    id={keywords[keywordKey].id}
                                    sort={keywords[keywordKey].sort}
                                    questionTask={keywords[keywordKey].task}
                                    isDefaultTask={keywords[keywordKey].usedTasks && keywords[keywordKey].usedTasks.includes(keywords[keywordKey].sort) ? true : false}
                                    name={keywords[keywordKey].name}
                                    symbol={symbols[keywordKey]}
                                    tips={keywords[keywordKey].tips}
                                    isUsed={keywords[keywordKey].isUsed}
                                    fileUrl={keywords[keywordKey].fileUrl}
                                    isLogged={keywords[keywordKey].isLogged}
                                    isIndex={isIndex}
                                    preKeyword={preKeyword == keywords[keywordKey].sort ? true : false}
                                />
                            </Fragment>
                        )
                    })
                )}
            </div>

        </Fragment>
    );
};

export default Quiz;
