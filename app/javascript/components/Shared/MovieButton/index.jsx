import React from 'react';
import './style.css';
const MovieButton = ({ value, style_type, type, action }) => (
	<div className="buttonContainer">
		<button type={type} className={style_type} onClick={action}>
			{value}
		</button>
	</div>
);
export default MovieButton;
