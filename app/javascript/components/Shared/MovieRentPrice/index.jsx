import React from 'react';
import './style.css';

const MovieRentPrice = ({ price }) => (
	<div className="movieRentPriceContainer">
		<span className="price">${parseFloat(price).toFixed(2)}</span>
	</div>
);

export default MovieRentPrice;
