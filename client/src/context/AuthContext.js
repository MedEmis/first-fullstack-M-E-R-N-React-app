import { createContext } from 'react'

function noop() { } // empty function that returns nothing

export const AuthContext = createContext({//current context that pass parametrs by all Application 
	token: null,
	userId: null,
	login: noop,
	logout: noop,
	isAuthentificated: false
})
