import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ToolbarTitle from './ToolbarTitle';
import ToolbarButton from './ToolbarButton';
import back_icon from 'images/backspace.svg';

function getButtons(buttons) {
	let buttons_temp = [];
	if (buttons && buttons.length > 0) {
		buttons_temp = buttons.map((button, i) => <ToolbarButton name={button.name} action={button.action} key={i} />);
	}
	return buttons_temp;
}
function getlinks(links) {
	let links_temp = [];
	if (links && links.length > 0) {
		links_temp = links.map((button, i) => (
			<a href="" key={i} onClick={button.action}>
				{button.name}
			</a>
		));
	}
	return links_temp;
}

class MovieToolbar extends Component {
	constructor(props) {
		super(props);
		this.newButtons = getButtons(props.buttons);
		this.newLinks = getlinks(props.buttons);
		this.state = { showMenu: false, value: 'dropdown-content' };
		if (props.haveBack) {
			this.backDiv = <img className="iconBack" src={back_icon} alt="" onClick={props.backAction} />;
		} else {
			this.backDiv = <span />;
		}
	}

	toggleDropdown = () => {
		this.state.showMenu = !this.state.showMenu;
		this.setState({ value: this.state.showMenu ? 'show' : '' });
	};
	hideDropdown = () => {
		this.state.showMenu = false;
		this.setState({ value: this.state.showMenu ? 'show' : '' });
	};
	isActive = () => {
		return 'dropdown-content ' + this.menuVis;
	};
	render() {
		return (
			<div className="movieToolbarContainer row middle-xs">
				{this.backDiv}
				<ToolbarTitle title={this.props.title} />
				<div className="col-xs" />
				{this.newButtons}
				<div className="dropdown">
					<button className="iconButton dropbtn" onClick={this.toggleDropdown.bind()}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100%"
							height="100%"
							viewBox="0 0 18 18"
							fit=""
							preserveAspectRatio="xMidYMid meet"
							focusable="false">
							<path d="M0 0h18v18h-18z" fill="none" />
							<path d="M9 5.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm0 2c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
						</svg>
					</button>
					<div className={'dropdown-content ' + this.state.value}>{this.newLinks}</div>
				</div>
				<div className={'backdrop ' + this.state.value} onClick={this.hideDropdown.bind()} />
			</div>
		);
	}
}
MovieToolbar.propTypes = {
	title: PropTypes.string.isRequired
};
export default MovieToolbar;

//WebpackerReact.setup({ MovieTitle });
