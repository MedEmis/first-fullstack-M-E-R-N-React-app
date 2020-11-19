////CLIENT FRONT-END//////
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'// mandatory for routing (Router)
import { useRoutes } from './pages/Routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/createNavbar'
import 'materialize-css'
import {Loader} from './components/Loader'


function App() {
	const { token, login, logout, userId, ready } = useAuth()//we asking from Localstorage if there is any info about user...
	const isAuthentificated = !!token // means, we have token
	const routes = useRoutes(isAuthentificated)//...if yes => we using it as route(to keep user on same page even after reloading)
	if (!ready) {
		return <Loader /> //loader line
	}
	//===========================================...if not => bring him back to authorisation page
	return (
		<AuthContext.Provider value={{
			token, login, logout, userId, isAuthentificated
		}}
		>
			<Router>
				{isAuthentificated && <Navbar />}   {/* if user is authentificated => we will add navbar for all pages */}
				<div className="container">
					{routes}
				</div>
			</Router>
		</AuthContext.Provider>
	)
}

export default App;
