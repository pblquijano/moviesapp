import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const MovieTitle = ({ name }) => (
	<div className="movieTitleContainer">
		<h3 className="title">{name}</h3>
	</div>
);
MovieTitle.propTypes = {
	name: PropTypes.string
};
export default MovieTitle;

//WebpackerReact.setup({ MovieTitle });
