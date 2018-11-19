import React from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';
import MoviePreview from '../Shared/MoviePreview';

const MoviesGrid = ({ movies, history }) => {
	const newMovies = movies.map((movie, i) => (
		<MoviePreview
			action={() => history.push(`/detail/${movie.id}`)}
			key={i}
			id={movie.id}
			title={movie.title}
			genre={movie.genre}
			img={movie.img}
			price={movie.price}
		/>
	));
	return <div className="row center-xs moviesGridContainer">{newMovies}</div>;
};

export default withRouter(MoviesGrid);
