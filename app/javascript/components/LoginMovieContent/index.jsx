import React, { Component } from 'react';
import './style.css';
import MovieInput from '../Shared/MovieInput';
import MovieButton from '../Shared/MovieButton';
import MyImage from 'images/bg.jpg';
import MoviesStore from '../../flux/MoviesStore';
import MovieActions from '../../flux/MovieActions';
import MovieLoading from '../Shared/MovieLoading';
import MovieNotification from '../Shared/MovieNotification';

class LoginMovieContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			remember_me: false,
			isShowLoading: false,
			message: 'Sending data...',
			notification: {
				isShowLoading: false,
				title: 'Success',
				message: '',
				action: null,
				type: 'success'
			}
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		MoviesStore.addChangeListener(this._onChange.bind(this));
	}
	componentWillUnmount() {
		this._isunmounted = true;
		MoviesStore.removeChangeListener(this._onChange);
	}
	goToHome() {
		return () => {
			location.href = '/';
		};
	}
	_onChange() {
		setTimeout(() => {
			if (!this._isunmounted) {
				let response;
				response = MoviesStore.getResponse();
				if (response.isSuccess) {
					location.href = '/';
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
		}, 900);
	}
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		this.setState({ isShowLoading: true, message: 'Sending data...' });
		event.preventDefault();
		event.stopPropagation();
		let body = {
			user: {
				email: this.state.email,
				password: this.state.password,
				remember_me: this.state.remember_me
			}
		};
		MovieActions.signIn(body);
	}

	goToSignUp() {
		return () => {
			location.href = '/users/sign_up';
		};
	}
	render() {
		return (
			<div className="loginMoviesContent">
				<img className="myBackground" src={MyImage} />
				<div className="col-xs" />
				<div className="card">
					<h1 className="title">Movies App</h1>
					<form onSubmit={this.handleSubmit}>
						<MovieInput label="Email" type="email" name="email" handleChange={this.handleChange} value={this.state.email} />
						<MovieInput label="Password" type="password" name="password" handleChange={this.handleChange} value={this.state.password} />
						<label id="remember_me">
							Remember me:
							<input name="remember_me" type="checkbox" checked={this.state.remember_me} onChange={this.handleChange} />
						</label>
						<div className="row center-xs">
							<MovieButton type="button" value="New User" style_type="flat" action={this.goToSignUp()} />
							<div className="col-xs" />
							<MovieButton type="submit" value="Login" style_type="raised" />
						</div>
					</form>
				</div>
				<div className="col-xs" />
				<MovieLoading message={this.state.message} isShow={this.state.isShowLoading} />
				<MovieNotification
					message={this.state.notification.message}
					isShow={this.state.notification.isShowLoading}
					title={this.state.notification.title}
					action={this.state.notification.action}
					type={this.state.notification.type}
				/>
			</div>
		);
	}
}

export default LoginMovieContent;
