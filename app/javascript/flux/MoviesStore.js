import ObjectAssign from 'object-assign';
import { EventEmitter } from 'events';
import MovieActionTypes from './MovieActionTypes';
import AppDispatcher from './AppDispatcher';

const CHANGE_EVENT = 'change';

let _store = {
	list: [],
	users_list: [],
	user_signed_in: false,
	response: {
		isSuccess: true,
		message: ''
	}
};
const _setList = array => {
	_store.list = array;
};
const _addMovie = movie => {
	_store.list.push = movie;
};
const _addUser = user => {
	_store.users_list.push = user.email;
};
const _signIn = () => {
	_store.user_signed_in = true;
};
const _signOut = () => {
	_store.user_signed_in = false;
};
const _setError = message => {
	_store.response.isSuccess = false;
	if (message) {
		_store.response.message = '' + message;
	} else {
		_store.response.message = '';
	}
};
const _setSuccess = () => {
	_store.response.isSuccess = true;
	_store.response.message = '';
};
const _setElementInList = movie => {
	if (_store.list.length > 0) {
		for (let i = 0; i < _store.list.length; ++i) {
			if (_store.list[i].id === movie.id) {
				_store.list[i] = movie;
				break;
			}
		}
	} else {
		_store.list.push(movie);
	}
};
const _deleteMovie = id => {
	if (_store.list.length > 0) {
		for (let i = 0; i < _store.list.length; ++i) {
			if (_store.list[i].id === id) {
				_store.list.splice(i, 1);
				break;
			}
		}
	}
};
const MoviesStore = ObjectAssign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(cb) {
		this.on(CHANGE_EVENT, cb);
	},

	removeChangeListener: function(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},
	getByID: function(id) {
		let movie = {};
		for (let i = 0; i < _store.list.length; ++i) {
			if (parseInt(_store.list[i].id) === parseInt(id)) {
				movie = _store.list[i];
				break;
			}
		}
		return movie;
	},

	getList: function() {
		return _store.list;
	},
	getResponse: function() {
		return _store.response;
	},
	dispatcherIndex: AppDispatcher.register(function(payload) {
		var action = payload.action;

		switch (action.actionType) {
			case MovieActionTypes.GET_ALL_RESPONSE:
				_setSuccess();
				_setList(action.response);
				MoviesStore.emitChange();
				break;
			case MovieActionTypes.GET_BY_ID_RESPONSE:
				_setSuccess();
				_setElementInList(action.response);
				MoviesStore.emitChange();
				break;
			case MovieActionTypes.EDIT_MOVIE_RESPONSE:
				_setSuccess();
				_setElementInList(action.response);
				MoviesStore.emitChange();
				break;
			case MovieActionTypes.HANDLE_ERROR:
				_setError(action.response);
				MoviesStore.emitChange();
				break;
			case MovieActionTypes.ADD_MOVIE_RESPONSE:
				_setSuccess();
				_addMovie(action.response);
				MoviesStore.emitChange();
				break;
			case MovieActionTypes.DELETE_MOVIE_RESPONSE:
				_setSuccess();
				_deleteMovie(action.response);
				MoviesStore.emitChange();
				break;
			case MovieActionTypes.SIGN_IN_RESPONSE:
				_setSuccess();
				_signIn();
				MoviesStore.emitChange();
				break;
			case MovieActionTypes.SIGN_OUT_RESPONSE:
				_setSuccess();
				_signOut();
				MoviesStore.emitChange();
				break;
			case MovieActionTypes.SIGN_UP_RESPONSE:
				_setSuccess();
				_addUser(action.response);
				MoviesStore.emitChange();
				break;
		}

		return true;
	})
});

export default MoviesStore;
