import "./personModal.scss";
import { h } from "preact";
import { useState } from "preact/hooks";
import useApi from "../../lib/components/useApi";
import Link from "./link";
import Loader from "../loader";

type Person = {
    id: string | null,
    img?: string,
    name?: string,
    position?: string,
    links?: [],
    sex?: string,
}

const PersonModal = (props: { api: any }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [person, setPerson] = useState<Person>({ id: null });
    // console.log('props',props)
    props.api({
        show: (id: string) => {
            setIsOpen(true);
            fetchData(id)
        }
    });

    const fetchData = (id) => {
        const [fetch] = useApi();
        fetch('person', { id }, "get")
            .then((data: { item: Person }) => {
                // console.log('data', data);
                if (data.item) {
                    setPerson(data.item);
                    // console.log(data.item);
                    setIsLoading(false);
                }

            })
            .catch(() => {
                setIsOpen(false);
            })
    }
    const close = () => {
        setIsOpen(false);
        setPerson({ id: null });
    }

    return (
        <div class={`modal--wrapper ${!isOpen || '-open'}`}>
            <div onClick={close} class="overlay"></div>
            <div class="modal--component ">
                <button type="button" onClick={close} class="close btn--close"><span class="icon icon-close" /></button>
    
                {isLoading ? (
                    <Loader />
                ) : (

                    <div class="person--modal">

                        <div class="person--modal--info">
                            <div class="label">
                                <figcaption class="name">{person.name}</figcaption>
                                <span class="position">{person.position}</span>
                            </div>
                            <div class="image">
                                <img class="m-auto md:ml-0" src={person.img} />
                            </div>
                        </div>

                        <div class="person--modal--content">
                            <h4 class="title">Shared {person.sex} insight in:</h4>

                            <div class="person--modal--list">
                                 {person.links && person.links.length &&
                                     person.links.map((link) => <Link data={link} />)
                                }
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}

export default PersonModal;