import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Fragment } from 'react';
import { fetchPopularCategories } from "../../services/category";
import "./sorter.scss"

const PostSorter = ({ sort, setSort, setCategory }) => {
    const [categories, setCategories] = useState([]);
    const [current, setCurrent] = useState({});
    const [isSubpage, setIsSubpage] = useState(false);

    useEffect(async () => {
        const result = await fetchPopularCategories();
        const url = window.location.href;
        if (url.includes('kategoria-')) {
            setIsSubpage(true);
            const urlArray = url.split('-');
            const currentId = parseInt(urlArray[1]);
            const currentCategory = result.find(category => category.id == currentId);
            setCurrent(currentCategory);
            const categories = result.filter(category => (category.id !== currentId));
            setCategories(categories);
            setCategory(currentId);
        } else {
            setCategories(result);
        }


    }, []);


    return (
        <div class="sorter--component">
            <div class="sorter--types">
                <div onClick={() => setSort('main')} class={`item ${sort == 'main' ? '-active' : ''}`}>
                    <i class="fas fa-fire-alt"></i>
                    <span class="label">Główna</span></div>
                <div onClick={() => setSort('newest')} class={`item ${sort == 'newest' ? '-active' : ''}`}>
                    <i class="fas fa-compass"></i>
                    <span class="label">Najnowsze</span></div>
                <div onClick={() => setSort('top')} class={`item ${sort == 'top' ? '-active' : ''}`}>
                    <i class="fas fa-chart-line"></i>
                    <span class="label">Top</span></div>
                <div onClick={() => setSort('user')} class={`item -user ${sort == 'user' ? '-active' : ''}`}>
                    <i class="far fa-user"></i>
                    <span class="label">Obserwowane</span></div>

            </div>
            <div class={`sorter--categories ${categories.length ? '-show' : ''}`}>

                <div class="dropdown">
                    <div class="current">

                        {Object.keys(current).length === 0 &&
                            <div class="label">Wszystkie kategorie</div>
                        }
                        {Object.keys(current).length > 0 &&
                            <div class="inner">
                                <div class="avatar" style={{ 'backgroundImage': `url('${current.avatar}')` }}></div>
                                <div class="label">{current.name}</div>
                            </div>
                        }
                    </div>
                    <div class="content">
                        {isSubpage && (
                            <a href="/" class="sorter--categories--item -empty">
                                <div class="label">Wszystkie kategorie</div>
                            </a>
                        )}
                        {categories.length && (
                            categories.map(category => (
                                <a href={category.url} class="sorter--categories--item">
                                    <div class="avatar" style={{ 'backgroundImage': `url('${category.avatar}')` }}></div>
                                    <div class="label">{category.name}</div>
                                </a>
                            )))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostSorter;

