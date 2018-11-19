import React from 'react';
import './style.css';

const MovieLoading = ({ message, isShow }) => (
	<div className={isShow ? 'movieLoadingContainer active ' : 'movieLoadingContainer'}>
		<span className="message">{message}</span>
	</div>
);

export default MovieLoading;
