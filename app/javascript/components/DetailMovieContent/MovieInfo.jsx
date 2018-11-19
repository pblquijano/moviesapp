import React from 'react';
import './style.css';

const MovieInfo = ({ duration, directed_by, synopsis }) => {
	return (
		<div className="movieInfoContainer">
			<span>
				<strong>Duration: </strong>
			</span>
			<span>{duration}</span>
			<br />
			<br />
			<span>
				<strong>Directed by: </strong>
			</span>
			<span>{directed_by}</span>
			<br />
			<br />
			<span>
				<strong>Synopsis: </strong>
			</span>
			<span>{synopsis}</span>
		</div>
	);
};

export default MovieInfo;
