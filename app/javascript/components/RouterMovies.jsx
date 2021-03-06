import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeMoviesContent from './HomeMoviesContent';
import DetailMovieContent from './DetailMovieContent';
import FormMovieContent from './FormMovieContent';
import LoginMovieContent from './LoginMovieContent';
import RentMovieContent from './RentMovieContent';
import My404Component from './My404Component';

class RouterMovies extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
	}
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={HomeMoviesContent} />
					<Route exact path="/detail/:id" component={DetailMovieContent} />
					<Route exact path="/new" component={FormMovieContent} />
					<Route exact path="/edit/:id" component={FormMovieContent} />
					<Route exact path="/rent_a_movie" component={RentMovieContent} />
					<Route exact path="/rent_a_movie/:id" component={RentMovieContent} />

					<Route component={My404Component} />
				</Switch>
			</Router>
		);
	}
}

export default RouterMovies;
