import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ToolbarTitle from './ToolbarTitle';
import ToolbarButton from './ToolbarButton';
import back_icon from 'images/backspace.svg';
import MoviesStore from '../../../flux/MoviesStore';
import MovieActions from '../../../flux/MovieActions';
import MovieLoading from '../MovieLoading';
import MovieActionTypes from '../../../flux/MovieActionTypes';

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
		this.action_name = '';
		this.newButtons = getButtons(props.buttons);
		this.newLinks = getlinks(props.buttons);
		this.state = {
			showMenu: false,
			value: 'dropdown-content',
			isShowLoading: false,
			message: 'Sending data...'
		};
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

	componentDidMount() {
		MoviesStore.addChangeListener(this._onChange.bind(this));
	}
	componentWillUnmount() {
		this._isunmounted = true;
		MoviesStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		setTimeout(() => {
			if (!this._isunmounted) {
				if (this.action_name == MovieActionTypes.SIGN_OUT) {
					let response;
					response = MoviesStore.getResponse();
					if (response.isSuccess) {
						location.href = '/users/sign_in';
					} else {
						this.setState({
							isShowLoading: false,
							notification: {
								isShowLoading: true,
								title: 'Error',
								message: response.message ? response.message : 'Server Error',
								action: () => this.setState({ notification: { isShowLoading: false } }),
								type: 'error'
							}
						});
					}
				}
			}
		}, 500);
	}

	signOut() {
		return () => {
			let r = confirm('Do you want to log out?');
			if (r == true) {
				this.setState({ isShowLoading: true, message: 'Log out...' });
				this.action_name = MovieActions.signOut();
			}
		};
	}
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
					<div className={'dropdown-content ' + this.state.value}>
						{this.newLinks}
						<a href="" key={this.newLinks.length} onClick={this.signOut()}>
							{'Sign Out'}
						</a>
					</div>
				</div>
				<button className="iconButton dropbtn signout" onClick={this.signOut()}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path fill="none" d="M0 0h24v24H0z" />
						<path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
					</svg>
				</button>
				<div className={'backdrop ' + this.state.value} onClick={this.hideDropdown.bind()} />
				<MovieLoading message={this.state.message} isShow={this.state.isShowLoading} />
			</div>
		);
	}
}
MovieToolbar.propTypes = {
	title: PropTypes.string.isRequired
};
export default MovieToolbar;
