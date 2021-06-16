import React from 'react';
import RepoItem from './RepoItem';

const Repositories = ({ repositories }) => {
	return repositories.map((repo) => <RepoItem repo={repo} key={repo.id} />);
};

export default Repositories;
