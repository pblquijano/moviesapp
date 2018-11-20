import MovieServerActions from './MovieServerActions';
import request from 'superagent';
import noCache from 'superagent-no-cache';
const MoviesApiUtils = {
	get: function() {
		request
			.get('/movies.json')
			.use(noCache)
			.set('Accept', 'application/json')
			.end(function(err, response) {
				if (err) {
					MovieServerActions.showError(err);
				} else {
					MovieServerActions.receiveAll(response.body);
				}
			});
	},
	getByID: function(id) {
		request
			.get('/movies/' + id)
			.use(noCache)
			.set('Accept', 'application/json')
			.end(function(err, response) {
				if (err) {
					MovieServerActions.showError(err);
				} else {
					MovieServerActions.receiveByID(response.body);
				}
			});
	},
	editMovie: function(id, body) {
		request
			.put('/movies/' + id)
			.send(body)
			.use(noCache)
			.set('Accept', 'application/json')
			.end(function(err, response) {
				if (err) {
					MovieServerActions.showError(err);
				} else {
					MovieServerActions.editMovie(response.body);
				}
			});
	},
	addMovie: function(body) {
		request
			.post('/movies')
			.send(body)
			.use(noCache)
			.set('Accept', 'application/json')
			.end(function(err, response) {
				if (err) {
					MovieServerActions.showError(err);
				} else {
					MovieServerActions.addMovie(response.body);
				}
			});
	},
	deleteMovie: function(id) {
		request
			.delete('/movies/' + id)
			.use(noCache)
			.set('Accept', 'application/json')
			.end(function(err, response) {
				if (err) {
					MovieServerActions.showError(err);
				} else {
					MovieServerActions.deleteMovie(id);
				}
			});
	},
	signIn: function(body) {
		request
			.post('/users/sign_in')
			.send(body)
			.use(noCache)
			.set('Accept', 'application/json')
			.end(function(err, response) {
				if (err) {
					MovieServerActions.showError(err);
				} else {
					MovieServerActions.signIn();
				}
			});
	},
	signOut: function() {
		request
			.delete('/users/sign_out')
			.use(noCache)
			.set('Accept', 'application/json')
			.end(function(err, response) {
				if (err) {
					MovieServerActions.showError(err);
				} else {
					MovieServerActions.signOut();
				}
			});
	},
	signUp: function(body) {
		request
			.post('/users')
			.send(body)
			.use(noCache)
			.set('Accept', 'application/json')
			.end(function(err, response) {
				if (err) {
					MovieServerActions.showError(err);
				} else {
					MovieServerActions.signUp(body);
				}
			});
	}
};

export default MoviesApiUtils;
