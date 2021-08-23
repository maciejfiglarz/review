import { h, render, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import CategoryObserver from "~/components/category-observer/categoryObserver";

const Observer = ({ data }) => {
	const { authorLink, categoryAvatar, author, category, categoryUrl, isCategoryObserved: defaultIsCategoryObserved, categoryID, isLogged, id } = data;


	return (
		<div class="post--header--menu">
	
			<CategoryObserver isDefaultObserved={defaultIsCategoryObserved} categoryID={categoryID} isLogged={isLogged} />

		</div>

	)
}

export default Observer;
