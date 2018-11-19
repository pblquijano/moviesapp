import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
const MovieGenre = ({ name }) => (
	<div className="movieGenreContainer">
		<span className="genre">{name}</span>
	</div>
);
MovieGenre.propTypes = {
	name: PropTypes.string
};
//WebpackerReact.setup({ MovieGenre });
export default MovieGenre;
