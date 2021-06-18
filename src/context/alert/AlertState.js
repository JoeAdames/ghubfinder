import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
// eslint-disable-next-line
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
	const initialState = null;

	const [state, dispatch] = useReducer(AlertReducer, initialState);

	// set alert'
	const setAlert = (msg, type, icon) => {
		dispatch({
			type: SET_ALERT,
			payload: { msg, type, icon },
		});

		setTimeout(
			() =>
				dispatch({
					type: REMOVE_ALERT,
				}),
			5000
		);
	};

	return (
		<AlertContext.Provider
			value={{
				alert: state,
				setAlert,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
