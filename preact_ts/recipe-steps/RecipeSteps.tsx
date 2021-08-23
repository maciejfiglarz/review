import { Fragment, h } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import zoomIcon from './../../../images/icon-zoom.svg';

type Props = {
    readonly content: HTMLElement;
};

type Data = {
    readonly number: string;
    readonly content: string;
    readonly imageUrl?: string;
    readonly videoUrl?: string;
};

const RecipeSteps = ({ content }: Props) => {
    const [dataSteps, setDataSteps] = useState<Data[]>([]);
    const [modalImageUrl, setModalImageUrl] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const showModal = (ref): void => {
        const image = ref.current;
        const url: string = image.src;
        setModalImageUrl(url);
        setIsModalOpen(true);
    };

    useEffect(() => {
        setDataSteps(
            Array.from(content.querySelectorAll<HTMLElement>('.recipeContentStep')).map((item: HTMLElement) => {
                const numberHTML = item.querySelector<HTMLElement>('.number');
                const contentHTML = item.querySelector<HTMLElement>('.content');
                const imageHTML = item.querySelector<null | HTMLElement>('img');
                const videoHTML = item.querySelector<null | HTMLElement>('.player');
                return {
                    number: numberHTML.textContent,
                    content: contentHTML.textContent,
                    imageUrl: imageHTML ? imageHTML.dataset.src : '',
                    videoUrl: videoHTML ? videoHTML.dataset.src : '',
                };
            }),
        );
    }, []);
    return (
        <Fragment>
            <div class={`recipe--steps--modal ${isModalOpen ? '-show' : ''}`}>
                <div class="content">
                    <button onClick={() => setIsModalOpen(false)} type="button" class="close">
                        <span class="icon-close icon"></span>
                    </button>
                    <img class="image" src={modalImageUrl} />
                </div>
            </div>
            {dataSteps.length &&
                dataSteps.map((item: Data) => {
                    const ref = useRef<HTMLImageElement>(null);
                    return (
                        <div class="recipe--steps--item">
                            <div class="number">{item.number}</div>
                            <p class="content">{item.content}</p>

                            {item.imageUrl != '' && (
                                <div class="wrap">
                                    <div class="image">
                                        <div class="zoom">
                                            <img
                                                onClick={() => {
                                                    showModal(ref);
                                                }}
                                                src={zoomIcon}
                                            />
                                        </div>
                                        <img
                                            ref={ref}
                                            onClick={() => {
                                                showModal(ref);
                                            }}
                                            src={item.imageUrl}
                                        />
                                    </div>
                                </div>
                            )}

                            {item.videoUrl != '' && (
                                <div class="wrap">
                                    <div class="player">
                                        {/* // @ts-ignore */}
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={item.videoUrl}
                                            frameBorder="0"
                                            //# typescripts errors
                                            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
        </Fragment>
    );
};

export default RecipeSteps;
