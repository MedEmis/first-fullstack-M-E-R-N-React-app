import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'



export const AutorisationPage = () => {
	const auth = useContext(AuthContext)
	const { loading, request, error, clearError } = useHttp()
	const message = useMessage()
	const [form, setForm] = useState({ // the state of autorisation form                       xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
		email: '', password: ''
	})
	useEffect(() => {//actions in case of erros, dependens of [error, message,clearError]
		message(error)//message about error
		clearError()
	}, [error, message, clearError])//<== dependensies for useEffect

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value })//creating clone of form-state and filling with email with its value  or  password with its value. And keep this values in form-state.
	}

	const registerHandler = async () => {//for registration and geting info about user from data request
		try {
			const data = await request('/api/auth/register', "POST", { ...form })
			message(data.message) //message about creating new user
		} catch (error) {
		}
	}
	const loginHandler = async () => {//for registration and geting info about user from data request
		try {
			const data = await request('/api/auth/login', "POST", { ...form })
			auth.login(data.token, data.userId)
			message(data.message) //message about creating new user
		} catch (error) {
		}
	}

	return (
		<div className="row" >
			<div className="col s6 offset-s3" >
				<h1>Shorten your links!</h1>
				<div className="card blue-grey darken-1"
					style={{ padding: 20 }}>
					<div className="card-content white-text">
						<span className="card-title">Autorisation</span>
					</div>
					<div className="input-field">
						<input
							id="email"
							name="email"
							type="text"
							value={form.email}
							className="validate"
							onChange={changeHandler}//handler for changing of form input
						/>
						<label htmlFor="email" data-error="wrong" data-success="right">Your Email</label>
					</div>
					<div className="input-field">
						<input
							id="password"
							name="password"
							type="password"
							value={form.password}
							className="validate"
							onChange={changeHandler}
						/>
						<label htmlFor="password">Your password</label>
					</div>
					<div className="card-action">
						<button onClick={loginHandler} disabled={loading} className="btn" href="#">Log in</button>
						<button onClick={registerHandler} disabled={loading} className="btn right yellow darken-4" href="#">Create new account</button>
					</div>
				</div>
			</div>
		</div>
	)
}
