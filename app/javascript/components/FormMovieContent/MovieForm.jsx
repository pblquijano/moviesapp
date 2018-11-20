import React, { Component } from 'react';
import './style.css';
import MoviePicture from '../Shared/MoviePicture';
import MovieInput from '../Shared/MovieInput';
import MovieButton from '../Shared/MovieButton';
import MovieLoading from '../Shared/MovieLoading';
import MovieNotification from '../Shared/MovieNotification';
import ImageUploader from 'react-images-upload';
import MoviesStore from '../../flux/MoviesStore';
import MovieActions from '../../flux/MovieActions';
import MovieActionTypes from '../../flux/MovieActionTypes';

class MovieForm extends Component {
	constructor(props) {
		super(props);
		this.notify = {
			title: 'Awesomeness',
			message: 'Awesome Notifications!',
			type: 'success'
		};
		this.action_name = '';
		this.state = {
			isShowLoading: true,
			movie: MoviesStore.getByID(props.id),
			message: 'Preparing form...',
			title: '',
			genre: '',
			duration: 0,
			directed_by: '',
			synopsis: '',
			price: 0,
			img: '',
			id: props.id,
			notification: {
				isShowLoading: false,
				title: 'Success',
				message: '',
				action: null,
				type: 'success'
			}
		};
		if (this.state.id && this.state.id >= 0) {
			this.state.message = 'Loading movie...';
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}
	componentDidMount() {
		MoviesStore.addChangeListener(this._onChange.bind(this));
		if (this.state.id && this.state.id >= 0) {
			this.action_name = MovieActions.getByID(this.state.id);
		} else {
			setTimeout(() => {
				if (!this._isunmounted) {
					this.setState({ isShowLoading: false });
				}
			}, 900);
		}
	}
	componentWillUnmount() {
		this._isunmounted = true;
		MoviesStore.removeChangeListener(this._onChange);
	}
	_onChange() {
		setTimeout(() => {
			if (!this._isunmounted) {
				let movie, response;
				response = MoviesStore.getResponse();
				switch (this.action_name) {
					case MovieActionTypes.GET_BY_ID:
						movie = MoviesStore.getByID(this.state.id);
						if (response.isSuccess) {
							this.setState({
								movie: movie,
								title: movie.title,
								genre: movie.genre,
								duration: movie.duration,
								directed_by: movie.directed_by,
								synopsis: movie.synopsis,
								price: movie.price,
								img: movie.img,
								id: movie.id,
								isShowLoading: false
							});
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
					case MovieActionTypes.EDIT_MOVIE:
						movie = MoviesStore.getByID(this.state.id);
						if (response.isSuccess) {
							this.setState({
								isShowLoading: false,
								movie: movie,
								notification: {
									isShowLoading: true,
									title: 'Success',
									message: 'Data movie saved',
									action: () => this.setState({ notification: { isShowLoading: false } }),
									type: 'success'
								}
							});
						} else {
							this.setState({
								isShowLoading: false,
								movie: movie,
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
					case MovieActionTypes.ADD_MOVIE:
						movie = MoviesStore.getByID(this.state.id);
						if (response.isSuccess) {
							this.setState({
								isShowLoading: false,
								title: '',
								genre: '',
								duration: 0,
								directed_by: '',
								synopsis: '',
								price: 0,
								img: '',
								notification: {
									isShowLoading: true,
									title: 'Success',
									message: 'Data movie saved',
									action: () => this.setState({ notification: { isShowLoading: false } }),
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
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	onDrop(picture) {
		if (picture && picture.length > 0) {
			const root = this;

			let reader = new FileReader();
			reader.readAsDataURL(picture[picture.length - 1]);
			reader.onload = function() {
				root.setState({
					img: reader.result
				});
			};
			reader.onerror = function(error) {
				console.log('Error: ', error);
			};
		}
	}

	onChange(event) {
		this.setState({ synopsis: event.target.value });
	}

	handleSubmit(e) {
		this.setState({ isShowLoading: true, message: 'Saving data...' });
		e.preventDefault();
		e.stopPropagation();
		let body = {
			title: this.state.title,
			genre: this.state.genre,
			duration: this.state.duration,
			directed_by: this.state.directed_by,
			synopsis: this.state.synopsis,
			price: this.state.price,
			img: this.state.img
		};
		if (this.state.id && this.state.id >= 0) {
			body.id = this.state.id;
			this.action_name = MovieActions.editMovie(this.state.id, body);
		} else {
			this.action_name = MovieActions.addMovie(body);
		}
	}
	render() {
		return (
			<div className="row movieForm card">
				<div className="pictureSection col-xs-12 col-sm-offset-0">
					<MoviePicture img={this.state.img} />

					<ImageUploader
						withIcon={false}
						buttonText="Choose images"
						onChange={this.onDrop}
						withLabel={false}
						singleImage={true}
						imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
						maxFileSize={5242880}
						buttonText={'Choose image'}
					/>
				</div>
				<div className="divider col-xs-12" />
				<div className="formContainer col-xs-12 col-sm row center-xs start-sm" onSubmit={this.handleSubmit}>
					<form className="form row">
						<MovieInput label="Movie Name" type="text" name="title" handleChange={this.handleChange} value={this.state.title} required={true} />
						<MovieInput label="Movie Genre" type="text" name="genre" handleChange={this.handleChange} value={this.state.genre} required={true} />
						<MovieInput
							label="Directed By"
							type="text"
							name="directed_by"
							handleChange={this.handleChange}
							value={this.state.directed_by}
							required={true}
						/>
						<MovieInput
							label="Duration"
							type="number"
							name="duration"
							handleChange={this.handleChange}
							value={this.state.duration}
							required={true}
						/>
						<MovieInput label="Price" type="number" name="price" handleChange={this.handleChange} value={this.state.price} required={true} />
						<div className="textareaContainer ">
							<textarea value={this.state.synopsis} onChange={this.onChange} required />
							<label className="textareaLabel">Synopsis</label>
						</div>

						<div className="row center-xs end-sm col-xs-12">
							<MovieButton type="submit" value="Save" style_type="raised" />
						</div>
					</form>
				</div>
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

export default MovieForm;
