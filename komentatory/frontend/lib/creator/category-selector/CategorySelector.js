
import { Fragment, h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import "./categorySelector.scss";
import useApi from '~/lib/api/useApi';

const CategorySelector = ({ defaultSelectedID }) => {
    const [items, setItems] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedID, setSelectedID] = useState("");
    const [selected, setSelected] = useState({});

    useEffect(() => {
        const data = {};
        const [fetch] = useApi();
        // const items = await categoryService.fetchAllActive();
        fetch('/api-popular-categories', {}, 'post')
            .then(({ items }) => {
                console.log('items', items);
                setItems(items);
                setIsDataLoaded(true);
            })
            .catch((error) => {
                // toast.error({ text: 'Wystąpił błąd podczas rejestracji' });
                console.log(error);
            });


    }, []);

    useEffect(() => {
        if (defaultSelectedID) {
            setSelectedID(defaultSelectedID);
            updateInput(defaultSelectedID);
        }

    }, [isDataLoaded]);

    const onClickItem = (id) => {
        setSelectedID(id);
        updateInput(id);
        setIsOpen(!isOpen);
    }
    const updateInput = (id) => {
        const selectedItem = items.find(item => item.id == id);
        if (selectedItem) {
            console.log(selectedItem, id);
            setSelected(selectedItem);
        }

    }

    // console.log('selectedID', selectedID);

    return (
        <div class="category--selector">
            {isDataLoaded && (
                <Fragment>
                    <div onClick={() => setIsOpen(!isOpen)} class="category--selector--input">
                        {Object.keys(selected).length ?
                            <div class="category--selector--item">
                                <div class="avatar" style={{ backgroundImage: `url(${selected.avatarUrl})` }} class="avatar"></div>
                                <div class="separator">-</div>
                                <div class="name">{selected.name}</div>
                            </div>
                            : <div class="category--selector--item -unchecked"><span class="label">Wybierz kanał</span></div>
                        }
                    </div>
                    <div class={`category--selector--list ${isOpen ? '-open' : ''}`}>
                        {Object.keys(items).length > 0 &&
                            items.map((item, i) => (
                                <div onClick={() => onClickItem(item.id)} class="category--selector--item" key={i}>
                                    <div class="avatar" style={{ backgroundImage: `url(${item.avatarUrl})` }} class="avatar"></div>
                                    <div class="separator">-</div>
                                    <div class="name">{item.name}</div>
                                </div>
                            ))}

                    </div>
                </Fragment>
            )}
            <input type="hidden" name="categoryID" value={selectedID} />
        </div>
    )

}
export default CategorySelector;

