import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ToolbarTitle = ({ title }) => (
	<div className="toolbarTitleContainer">
		<h1 className="title">{title}</h1>
	</div>
);
ToolbarTitle.propTypes = {
	title: PropTypes.string.isRequired
};
export default ToolbarTitle;

//WebpackerReact.setup({ MovieTitle });
