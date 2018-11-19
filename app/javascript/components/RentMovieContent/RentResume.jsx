import React from 'react';
import './style.css';

const RentResume = ({ movies_selected, total }) => {
	const newMovies = movies_selected.map((movie, i) => (
		<div className="selectedMovie row" key={i}>
			<span className="name col-xs">{movie.title}</span>
			<span className="price">${parseFloat(movie.price).toFixed(2)}</span>
		</div>
	));
	return (
		<div className="rentResumeContainer ">
			<div className="resumeList">{newMovies}</div>

			<div className="totalContainer row">
				<span className="name col-xs">TOTAL:</span>
				<span className="price">${parseFloat(total).toFixed(2)}</span>
			</div>
		</div>
	);
};

export default RentResume;
