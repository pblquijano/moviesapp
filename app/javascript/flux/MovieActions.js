import MovieActionTypes from './MovieActionTypes';
import AppDispatcher from './AppDispatcher';
import MoviesAPIUtils from './MoviesAPIUtils';

const MovieActions = {
	getAll() {
		AppDispatcher.handleViewAction({
			actionType: MovieActionTypes.GET_ALL
		});
		MoviesAPIUtils.get();
		return MovieActionTypes.GET_ALL;
	},
	getByID(id) {
		AppDispatcher.handleViewAction({
			actionType: MovieActionTypes.GET_BY_ID
		});
		MoviesAPIUtils.getByID(id);
		return MovieActionTypes.GET_BY_ID;
	},
	editMovie(id, body) {
		AppDispatcher.handleViewAction({
			actionType: MovieActionTypes.EDIT_MOVIE
		});
		MoviesAPIUtils.editMovie(id, body);
		return MovieActionTypes.EDIT_MOVIE;
	},
	addMovie(body) {
		AppDispatcher.handleViewAction({
			actionType: MovieActionTypes.ADD_MOVIE
		});
		MoviesAPIUtils.addMovie(body);
		return MovieActionTypes.ADD_MOVIE;
	},
	deleteMovie(id) {
		AppDispatcher.handleViewAction({
			actionType: MovieActionTypes.DELETE_MOVIE
		});
		MoviesAPIUtils.deleteMovie(id);
		return MovieActionTypes.DELETE_MOVIE;
	},
	signIn(body) {
		AppDispatcher.handleViewAction({
			actionType: MovieActionTypes.SIGN_IN
		});
		MoviesAPIUtils.signIn(body);
		return MovieActionTypes.SIGN_IN;
	},
	signOut() {
		AppDispatcher.handleViewAction({
			actionType: MovieActionTypes.SIGN_OUT
		});
		MoviesAPIUtils.signOut();
		return MovieActionTypes.SIGN_OUT;
	},
	signUp(body) {
		AppDispatcher.handleViewAction({
			actionType: MovieActionTypes.SIGN_UP
		});
		MoviesAPIUtils.signUp(body);
		return MovieActionTypes.SIGN_UP;
	}
};

export default MovieActions;
