import React, { Component } from 'react';
import './style.css';
import MovieToolbar from '../Shared/MovieToolbar';
import MovieDetails from './MovieDetails';
import MyContainer from '../Shared/MyContainer';
import MovieLoading from '../Shared/MovieLoading';
import { withRouter } from 'react-router-dom';
import MoviesStore from '../../flux/MoviesStore';
import MovieActions from '../../flux/MovieActions';
import MovieNotification from '../Shared/MovieNotification';
import MovieActionTypes from '../../flux/MovieActionTypes';

class DetailMovieContent extends Component {
	constructor(props) {
		super(props);
		this.history = this.props.history;
		this.state = {
			movie: MoviesStore.getByID(props.match.params.id),
			message: 'Loading movie...',
			isShowLoading: true,
			id: props.match.params.id,
			buttons: [
				{ name: 'Rent', action: () => this.props.history.push(`/rent_a_movie/${props.match.params.id}`) },
				{ name: 'Edit', action: () => this.props.history.push(`/edit/${props.match.params.id}`) },
				{
					name: 'Delete',
					action: () => {
						this.setState({ isShowLoading: true, message: 'Removing movie...' });
						this.action_name = MovieActions.deleteMovie(this.state.id);
					}
				}
			],
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
		this._isunmounted = false;
		MoviesStore.addChangeListener(this._onChange.bind(this));
		this.action_name = MovieActions.getByID(this.state.id);
	}
	componentWillUnmount() {
		this._isunmounted = true;
		MoviesStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		setTimeout(() => {
			let response = MoviesStore.getResponse();
			if (!this._isunmounted) {
				switch (this.action_name) {
					case MovieActionTypes.GET_BY_ID:
						if (response.isSuccess) {
							this.setState({ movie: MoviesStore.getByID(this.state.id), isShowLoading: false });
						} else {
							this.setState({
								isShowLoading: false,
								movie: {},
								notification: {
									isShowLoading: true,
									title: 'Error',
									message: response.message ? response.message : 'Server Error',
									action: () => this.setState({ notification: { isShowLoading: false } }),
									type: 'error'
								}
							});
						}
						break;
					case MovieActionTypes.DELETE_MOVIE:
						if (response.isSuccess) {
							this.setState({
								isShowLoading: false,
								notification: {
									isShowLoading: true,
									title: 'Success',
									message: 'Movie Removed',
									action: () => {
										this.props.history.push('/');
									},
									type: 'success'
								}
							});
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
						break;
				}
			}
		}, 900);
	}
	render() {
		return (
			<div className="homeMoviesContent">
				<MovieToolbar title={'Movie Details'} buttons={this.state.buttons} haveBack={true} backAction={() => this.history.push('/')} />
				<MyContainer>
					<MovieDetails movie={this.state.movie} />
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

export default withRouter(DetailMovieContent);
