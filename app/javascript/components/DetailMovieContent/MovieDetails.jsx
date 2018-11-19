import React from 'react';
import './style.css';
import MoviePicture from '../Shared/MoviePicture';
import MovieTitle from '../Shared/MovieTitle';
import MovieGenre from '../Shared/MovieGenre';
import MovieInfo from './MovieInfo';
import MovieRentPrice from '../Shared/MovieRentPrice';

const MovieDetails = ({ movie }) => (
	<div className="row moviesDetailsContainer card">
		<div className="pictureSection col-xs-12 col-sm-offset-0">
			<MoviePicture img={movie.img} />
			<div>
				<MovieRentPrice price={movie.price} />
			</div>
		</div>
		<div className="divider col-xs-12" />
		<div className="details col-xs-12 col-sm">
			<MovieTitle name={movie.title} />
			<MovieGenre name={movie.genre} />
			<MovieInfo duration={movie.duration} directed_by={movie.directed_by} synopsis={movie.synopsis} />
		</div>
	</div>
);

export default MovieDetails;
