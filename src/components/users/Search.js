import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';
import Alert from '../layout/Alert';

const Search = () => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);

	const [text, setText] = useState('');
	const [isLight, setIsLight] = useState(true);

	const onChange = (e) => {
		setText(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			alertContext.setAlert(
				'Please enter something',
				'light',
				'fas fa-info-circle'
			);
		} else {
			githubContext.searchUsers(text);
			setText('');
		}
	};

	const changeButtonStyle = () => {
		setIsLight(!isLight);
	};
	return (
		<div>
			<form onSubmit={onSubmit} className='form'>
				<input
					type='text'
					name='text'
					placeholder='Search Users...'
					value={text}
					onChange={onChange}
				/>
				<input
					type='submit'
					value='search'
					className='btn btn-dark btn-block'
				/>
			</form>
			{githubContext.users.length > 0 && (
				<button
					className={`btn btn-${isLight ? 'dark' : 'light'} btn-block`}
					onClick={githubContext.clearUsers}
					onMouseEnter={changeButtonStyle}
					onMouseOut={changeButtonStyle}
				>
					clear
				</button>
			)}
			<Alert />
		</div>
	);
};

export default Search;
