import React from 'react';
import './style.css';
import MovieToolbar from '../Shared/MovieToolbar';
import MovieForm from './MovieForm';
import MyContainer from '../Shared/MyContainer';
import { withRouter } from 'react-router-dom';

const FormMovieContent = ({ match, history }) => {
	let path = '/';
	let id = match.params.id;
	let title = 'New Movie';
	if (id >= 0) {
		path = '/detail/' + id;
		title = 'Edit Movie';
	}
	return (
		<div className="formMoviesContent">
			<MovieToolbar title={title} haveBack={true} backAction={() => history.push(path)} />
			<MyContainer>
				<MovieForm id={id} />
			</MyContainer>
		</div>
	);
};

export default withRouter(FormMovieContent);
