import React from 'react';
import MovieTitle from '../MovieTitle';
import MovieGenre from '../MovieGenre';
import MoviePicture from '../MoviePicture';
import MovieRentPrice from '../MovieRentPrice';
import './style.css';
const MoviePreview = ({ id, img, price, title, genre, action }) => (
	<div className="moviePreviewContainer card" onClick={action}>
		<div className="priceInPictureContainer">
			<MoviePicture img={img} />
			<MovieRentPrice price={price} />
		</div>

		<MovieTitle name={title} />
		<MovieGenre name={genre} />
	</div>
);

//WebpackerReact.setup({ MoviePreview });
export default MoviePreview;
