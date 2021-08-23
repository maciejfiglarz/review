import "./categoryObserver.scss";

import { Fragment, h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import bodyService from "~/lib/body";
import useApi from "~/lib/api/useApi";

const CategoryObserver = ({ isDefaultObserved, categoryID, isLogged }) => {
    const [isObserved, setIsObserved] = useState(false);
    useEffect(() => {
        console.log(isDefaultObserved);
        if (isDefaultObserved == "1") {
            setIsObserved(true);
        } else if (isDefaultObserved == "0") {
            setIsObserved(false);
        } else {
            setIsObserved(isDefaultObserved);
        }

    }, [])


    const handleObserver = () => {

        if (isLogged == "0" || !isLogged) {
            bodyService.initGuard();
        } else {

            setIsObserved(!isObserved);

            const [fetch] = useApi();
            fetch(`/api-toggle-user-category/${categoryID}`, {}, 'get')
                .then((response) => {
                })
                .catch((error) => {
                }).finally(() => {
                });
        }
    }


    return (
        <div onClick={() => handleObserver()} class={`category--observer ${isObserved ? '-observed' : ''}`}>
            {isObserved ? (
                <Fragment>Obserwujesz</Fragment>
            ) : (
                <Fragment>Obserwuj</Fragment>
            )}
        </div>
    )
}
export default CategoryObserver;

