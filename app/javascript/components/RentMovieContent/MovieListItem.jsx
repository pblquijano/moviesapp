import React from 'react';
import MovieTitle from '../Shared/MovieTitle';
import MovieGenre from '../Shared/MovieGenre';
import MovieRentPrice from '../Shared/MovieRentPrice';
import MoviePicture from '../Shared/MoviePicture';
import './style.css';

const MovieListItem = ({ title, genre, img, price, selected, handleChange, id }) => {
	function handleChange(event) {
		handleChange(event);
	}
	return (
		<div className="movieListItemContainer row middle-xs">
			<MoviePicture img={img} />
			<div className="text col-xs">
				<MovieTitle name={title} />
				<MovieGenre name={genre} />
			</div>
			<MovieRentPrice price={price} />
			<div>
				<label className="container">
					<input type="checkbox" name={id} checked={selected} onChange={handleChange} />
					<span className="checkmark" />
				</label>
			</div>
		</div>
	);
};

export default MovieListItem;

//WebpackerReact.setup({ MovieTitle });
