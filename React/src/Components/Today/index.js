import React from 'react';
import './index.css';

const Today = () => {
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	const toDay = new Date();
	return <p className="toDay">{toDay.toLocaleDateString('en-GB', options)}</p>;
};

export default Today;
