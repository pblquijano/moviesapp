import React from 'react';
import './style.css';
import MovieButton from '../MovieButton';

const MovieNotification = ({ title, message, isShow, action, type }) => (
	<div className={isShow ? 'movieNotificationContainer active ' : 'movieNotificationContainer'}>
		<div className={`dataCenterContainer ${type}`}>
			<span className="title">{title}</span>
			<span className="message">{message}</span>
			<MovieButton value="Ok" style_type="raised" type="button" action={action} />
		</div>
	</div>
);

export default MovieNotification;
