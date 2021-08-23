import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

import searchIcon from '../../../images/icon-search.svg';
import './searchBar.scss';

import Input from '../forms/input/input';

const SearchBar = () => {
    const [searchBar, setSearchBar] = useState<boolean>(false);

    return (
        <Fragment>
            <button type="button" class="small--icon--search" onClick={() => setSearchBar(true)}>
                <img src={searchIcon} alt="Search" />
            </button>
            <div class={`mobile--search--bar ${searchBar ? '-show' : ''}`}>
                <div class="search--bar--component">
                    <form method="get">
                        {Input({ type: 'text', name: 'search', placeholder: 'Wpisz nazwę składnika lub przepisu' })}
                        <button class="icon--search" type="button">
                            <img src={searchIcon} class="hidden lg:block" alt="Search" />
                            <i class="icon-left-arrow -close lg:hidden" onClick={() => setSearchBar(false)} />
                        </button>
                        <button type="reset" class="clear--button lg:hidden">
                            <i class="icon-close -clear" />
                        </button>
                    </form>
                </div>
                <div class="search--autocomplete">
                    <span class="result">{/*test*/}</span>
                </div>
            </div>
        </Fragment>
    );
};

export default SearchBar;
