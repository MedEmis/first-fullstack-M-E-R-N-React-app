import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {//for autorisation on front-end. Callback function for export functions for login or logout from system
	const [token, setToken] = useState(null)//state responsive for token
	const [ready, setReady] = useState(false)//autorisation flag
	const [userId, setUserId] = useState(null)//state responsive for id
	const login = useCallback((jwtToken, id) => {
		setToken(jwtToken)//set token to state
		//console.log(jwtToken)
		setUserId(id)//set id to state
		localStorage.setItem(storageName, JSON.stringify({ userId: id, token: jwtToken }))//to keep token and id in localStorage
	}, [])//to login to system
	const logout = useCallback(() => {
		setToken(null)//clear token state
		setUserId(null)//clear id state
		localStorage.removeItem(storageName)//clear localStorage
	}, [])//to logout from system

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))
		if (data && data.token) {//if we have data and token in there..
			login(data.token, data.userId)//...provide log-in
		}
		setReady(true)//authorisation true
	}, [login])//dependesy for useEffect()

	return { login, logout, token, userId, ready }
}