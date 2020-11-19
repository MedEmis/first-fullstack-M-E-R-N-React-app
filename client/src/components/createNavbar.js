import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'




export const Navbar = () => {
	const history = useHistory()//for redirection
	const auth = useContext(AuthContext)
	const logoutHandler = (event) => {
		event.preventDefault()
		auth.logout()
		history.push('/')
	}

	return (
		<nav   className="create-navbar">
			<div className="nav-wrapper">
				<ul id="nav-mobile" className="left hide-on-med-and-down">
					<li><NavLink to="/create">Create Link</NavLink></li>
					<li><NavLink to="/links">Links</NavLink></li>
					<li><NavLink to="/detail/:id">Details</NavLink></li>
					<li><a href="/" onClick={logoutHandler}>Exit</a></li>
				</ul>
			</div>
		</nav>
	)
}