import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const MyContainer = props => <div className="myContainer">{props.children}</div>;

export default MyContainer;

//WebpackerReact.setup({ MovieTitle });
