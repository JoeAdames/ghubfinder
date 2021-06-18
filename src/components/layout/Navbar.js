import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';

const Navbar = ({ icon, title }) => {
	const alertContext = useContext(AlertContext);
	return (
		<nav className='navbar bg-dark'>
			<h1
				onMouseEnter={() =>
					alertContext.setAlert(
						'Click to view code on Github',
						'light',
						`${icon}`
					)
				}
			>
				<i className={icon} />
				<a
					href='https://github.com/JoeAdames/ghubfinder'
					target='_blank'
					rel='noreferrer'
				>
					{title}
				</a>
			</h1>
			<ul>
				<li>
					<Link to='/'> Home </Link>
				</li>
				<li>
					<Link to='/about'> About </Link>
				</li>
			</ul>
		</nav>
	);
};

Navbar.defaultProps = {
	title: 'Github Finder',
	icon: 'fab fa-github',
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};

export default Navbar;
