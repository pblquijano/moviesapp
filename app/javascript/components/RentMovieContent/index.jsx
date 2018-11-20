import React, { Component } from 'react';
import './style.css';
import MovieToolbar from '../Shared/MovieToolbar';
import MoviesList from './MoviesList';
import RentResume from './RentResume';
import MyContainer from '../Shared/MyContainer';
import MovieLoading from '../Shared/MovieLoading';
import MovieNotification from '../Shared/MovieNotification';
import MoviesStore from '../../flux/MoviesStore';
import MovieActions from '../../flux/MovieActions';
import MovieActionTypes from '../../flux/MovieActionTypes';

import { withRouter } from 'react-router-dom';

class RentMovieContent extends Component {
	constructor(props) {
		super(props);
		this.history = this.props.history;
		this.action_name = '';
		this.state = {
			message: 'Loading movies...',
			isShowLoading: true,
			movies: MoviesStore.getList(),
			total: 0,
			movies_selected: [],
			notification: {
				isShowLoading: false,
				title: 'Success',
				message: '',
				action: null,
				type: 'success'
			}
		};

		this.buttons = [
			{
				name: 'Make Rent',
				action: () => {
					this.setState({ isShowLoading: true, message: 'Send request...' });
					if (this.state.movies_selected && this.state.movies_selected.length <= 0) {
						setTimeout(() => {
							this.setState({
								isShowLoading: false,
								notification: {
									isShowLoading: true,
									title: 'Error',
									message: 'You have not selected movies to rent.',
									action: () => this.setState({ notification: { isShowLoading: false } }),
									type: 'error'
								}
							});
						}, 900);
					} else {
						fetch('/make_a_rent', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							}
						})
							.then(response => {
								if (response.ok) {
									return response.json();
								}
								return response.text().then(text => {
									throw new Error(text);
								});
							})
							.then(resp => {
								setTimeout(() => {
									if (resp.code === 200) {
										this.setState({
											isShowLoading: false,
											notification: {
												isShowLoading: true,
												title: 'Success',
												message: resp.message,
												action: () => this.history.push('/'),
												type: 'success'
											}
										});
									} else {
										this.setState({
											isShowLoading: false,
											notification: {
												isShowLoading: true,
												title: 'Error',
												message: resp.message,
												action: () => this.setState({ notification: { isShowLoading: false } }),
												type: 'error'
											}
										});
									}
								}, 900);
							})
							.catch(err => {});
					}
				}
			}
		];

		this.id = props.match.params.id;
		if (this.id && this.id >= 0) {
			this.path = '/detail/' + this.id;
		} else {
			this.path = '/';
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	componentDidMount() {
		MoviesStore.addChangeListener(this._onChange.bind(this));
		this.action_name = MovieActions.getAll();
	}
	componentWillUnmount() {
		this._isunmounted = true;
		MoviesStore.removeChangeListener(this._onChange);
	}
	_onChange() {
		setTimeout(() => {
			if (!this._isunmounted) {
				if (this.action_name == MovieActionTypes.GET_ALL) {
					let response = MoviesStore.getResponse();
					if (response.isSuccess) {
						const data = MoviesStore.getList();
						let total = 0;
						let movies_selected_temp = [];
						const movies_temp = data.map(movie => {
							let movie_temp = movie;
							if (this.id && parseInt(this.id) === parseInt(movie_temp.id)) {
								movies_selected_temp.push(movie);
								movie_temp.selected = true;
								total += parseFloat(movie.price);
							} else {
								movie_temp.selected = false;
							}
							return movie_temp;
						});
						this.setState({ movies: movies_temp, isShowLoading: false, movies_selected: movies_selected_temp, total: total });
					} else {
						this.setState({
							isShowLoading: false,
							movies: [],
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
		}, 900);
	}
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		let movies_selected_temp = this.state.movies_selected;
		let total = this.state.total;
		const movies_temp = this.state.movies.map((movie, i) => {
			let movie_temp = movie;
			if (parseInt(name) === parseInt(movie_temp.id)) {
				movie_temp.selected = value;
				if (value) {
					movies_selected_temp.push(movie);
					total += parseFloat(movie.price);
				} else {
					movies_selected_temp = movies_selected_temp.filter(movie2 => movie2.id != movie.id);
					total -= parseFloat(movie.price);
				}
			}
			return movie_temp;
		});
		this.setState({ movies: movies_temp, movies_selected: movies_selected_temp, total: total });
	}
	render() {
		return (
			<div className="rentMovieContent">
				<MovieToolbar title={'Rent Movies'} buttons={this.buttons} haveBack={true} backAction={() => this.history.push(this.path)} />
				<MyContainer>
					<div className="rentData card row">
						<MoviesList movies={this.state.movies} handleChange={this.handleInputChange} />
						<RentResume movies_selected={this.state.movies_selected} total={this.state.total} />
					</div>
				</MyContainer>
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

export default withRouter(RentMovieContent);
