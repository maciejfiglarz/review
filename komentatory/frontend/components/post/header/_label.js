import { h, render, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import bodyService from "./../../../lib/body";
import useApi from "./../../../lib/api/useApi";


const Label = ({ data }) => {
	// const [isCategoryObserved, setIsCategoryObserved] = useState(true);
	const { date,authorLink, categoryAvatar, author, category, categoryUrl, isCategoryObserved: defaultIsCategoryObserved, categoryID, isLogged, id } = data;

	const categoryAvatarStyle = {
		backgroundImage: `url("${categoryAvatar}")`
	};



	return (
		<div class="post--header--label">
			<a href={categoryUrl} style={categoryAvatarStyle} class="avatar"></a>
			<div class="content">
				<div class="top">
					<a class="category" href={categoryUrl}>
						<div href={categoryUrl} style={categoryAvatarStyle} class="avatar"></div>
						<div class="name">{category}</div>

					</a>

				</div>
				<div class="bottom">
					<a class="author" href={authorLink}>
						{author}
					</a>
					<div class="separator">•</div>
					<div class="date">{date}</div>
				</div>
			</div>
		</div >
	)
}

export default Label;