import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
	const alertContext = useContext(AlertContext);
	const { alert } = alertContext;
	return (
		alert !== null && (
			<div className='alert alert-dark text-center'>
				<i className={`${alert.icon}`}> {alert.msg} </i>
			</div>
		)
	);
};
export default Alert;
