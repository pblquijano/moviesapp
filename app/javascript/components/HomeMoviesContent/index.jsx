import React, { Component } from 'react';
import './style.css';
import MovieToolbar from '../Shared/MovieToolbar';
import MoviesStore from '../../flux/MoviesStore';
import MovieActions from '../../flux/MovieActions';
import MoviesGrid from './MoviesGrid';
import { withRouter } from 'react-router-dom';
import MovieLoading from '../Shared/MovieLoading';
import MovieNotification from '../Shared/MovieNotification';

class HomeMoviesContent extends Component {
	constructor(props) {
		super(props);

		this.history = props.history;
		this.buttons = [
			{ name: 'Rent Movies', action: () => this.props.history.push('/rent_a_movie') },
			{ name: 'New Movie', action: () => this.props.history.push('/new') }
		];
		this.state = {
			isShowLoading: true,
			movies: MoviesStore.getList(),
			notification: {
				isShowLoading: false,
				title: 'Success',
				message: '',
				action: null,
				type: 'success'
			}
		};
	}
	componentDidMount() {
		MoviesStore.addChangeListener(this._onChange.bind(this));
		MovieActions.getAll();
	}

	componentWillUnmount() {
		this._isunmounted = true;
		MoviesStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		setTimeout(() => {
			if (!this._isunmounted) {
				let response = MoviesStore.getResponse();
				if (response.isSuccess) {
					this.setState({ movies: MoviesStore.getList(), isShowLoading: false });
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
		}, 900);
	}
	render() {
		return (
			<div className="homeMoviesContent">
				<MovieToolbar title={'Movies App'} buttons={this.buttons} />
				<MoviesGrid movies={this.state.movies} history={this.history} />
				<MovieLoading message={'Loading movies...'} isShow={this.state.isShowLoading} />
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

export default withRouter(HomeMoviesContent);
