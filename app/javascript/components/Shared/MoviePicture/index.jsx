import React from 'react';
import './style.css';
const MoviePicture = ({ img }) => (
	<div className="moviePictureContainer">
		<img src={img} alt="" />
	</div>
);
export default MoviePicture;
