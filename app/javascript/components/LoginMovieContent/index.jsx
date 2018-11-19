import React, { Component } from 'react';
import './style.css';
import MovieInput from '../Shared/MovieInput';
import MovieButton from '../Shared/MovieButton';
import MyImage from 'images/bg.jpg';

class LoginMovieContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		console.log(value);
		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
	}
	render() {
		return (
			<div className="loginMoviesContent">
				<img className="myBackground" src={MyImage} />
				<div className="card">
					<h1 className="title">Movies App</h1>
					<form onSubmit={this.handleSubmit}>
						<MovieInput label="Email" type="email" name="email" handleChange={this.handleChange} value={this.state.email} />
						<MovieInput label="Password" type="password" name="password" handleChange={this.handleChange} value={this.state.password} />
						<div className="row center-xs">
							<MovieButton type="submit" value="Login" style_type="raised" />
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default LoginMovieContent;
