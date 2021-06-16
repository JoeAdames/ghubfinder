import React, { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
// eslint-disable-next-line
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER,
	GET_REPOSITORIES,
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
	githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
	githubClientSecret = process.env.REACT_APP_GITHuB_CLIENT_SECRET;
} else {
	githubClientId = process.env.GITHUB_CLIENT_ID;
	githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repositories: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	//search users
	const searchUsers = async (text) => {
		setLoading();
		const res = await fetch(
			`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);
		const data = await res.json();
		dispatch({
			type: SEARCH_USERS,
			payload: data.items,
		});
	};

	//getuser
	const getUser = async (username) => {
		setLoading();
		const res = await fetch(
			`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);
		const data = await res.json();
		console.log(data);
		dispatch({
			type: GET_USER,
			payload: data,
		});
	};

	//get repositories
	const getUserRepositories = async (username) => {
		setLoading();
		const res = await fetch(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);
		const data = await res.json();
		console.log(data);
		dispatch({
			type: GET_REPOSITORIES,
			payload: data,
		});
	};

	//clear users
	const clearUsers = () =>
		dispatch({
			type: CLEAR_USERS,
		});

	//setloading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repositories: state.repositories,
				loading: state.loading,
				searchUsers,
				getUser,
				getUserRepositories,
				clearUsers,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
