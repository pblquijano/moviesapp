import React from 'react';
import './style.css';
const MovieInput = ({ name, handleChange, label, value, type, required }) => (
	<div className="inputContainer">
		<input name={name} type={type} value={value} onChange={handleChange} required={required} />
		<label>{label}</label>
	</div>
);
export default MovieInput;
