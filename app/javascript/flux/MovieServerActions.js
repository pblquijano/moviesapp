import MovieActionTypes from './MovieActionTypes';
import AppDispatcher from './AppDispatcher';

const MovieServerActions = {
	showError: response => {
		console.log(response);
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
	}
};

export default MovieServerActions;
