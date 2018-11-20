import MovieActionTypes from './MovieActionTypes';
import AppDispatcher from './AppDispatcher';

const MovieServerActions = {
	showError: response => {
		AppDispatcher.handleServerAction({
			actionType: MovieActionTypes.HANDLE_ERROR,
			response: response
		});
	},
	receiveAll: response => {
		AppDispatcher.handleServerAction({
			actionType: MovieActionTypes.GET_ALL_RESPONSE,
			response: response
		});
	},
	receiveByID: response => {
		AppDispatcher.handleServerAction({
			actionType: MovieActionTypes.GET_BY_ID_RESPONSE,
			response: response
		});
	},
	editMovie: response => {
		AppDispatcher.handleServerAction({
			actionType: MovieActionTypes.EDIT_MOVIE_RESPONSE,
			response: response
		});
	},
	addMovie: response => {
		AppDispatcher.handleServerAction({
			actionType: MovieActionTypes.ADD_MOVIE_RESPONSE,
			response: response
		});
	},
	deleteMovie: response => {
		AppDispatcher.handleServerAction({
			actionType: MovieActionTypes.DELETE_MOVIE_RESPONSE,
			response: response
		});
	},
	signIn: response => {
		AppDispatcher.handleServerAction({
			actionType: MovieActionTypes.SIGN_IN_RESPONSE,
			response: response
		});
	},
	signOut: response => {
		AppDispatcher.handleServerAction({
			actionType: MovieActionTypes.SIGN_OUT_RESPONSE,
			response: response
		});
	},
	signUp: response => {
		AppDispatcher.handleServerAction({
			actionType: MovieActionTypes.SIGN_UP_RESPONSE,
			response: response
		});
	}
};

export default MovieServerActions;
