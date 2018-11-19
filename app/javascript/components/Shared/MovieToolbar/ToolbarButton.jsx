import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ToolbarButton = ({ name, action }) => (
	<div className="toolbarButtonContainer">
		<button className="toolbarButton" type="button" onClick={action}>
			{name}
		</button>
	</div>
);
ToolbarButton.propTypes = {
	name: PropTypes.string.isRequired,
	action: PropTypes.func.isRequired
};
export default ToolbarButton;

//WebpackerReact.setup({ MovieTitle });
