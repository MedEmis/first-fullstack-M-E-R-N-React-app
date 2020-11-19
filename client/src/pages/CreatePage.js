import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'



export const CreatePage = () => {
	const history = useHistory()
	const auth = useContext(AuthContext)//context to get user token 
	const { request } = useHttp()
	const [link, setLink] = useState('')
	const enterPress = async (event) => {
		if (event.key === 'Enter') {
			try {
				const data = await request('/api/link/generate', 'POST', { from: link }, { Authorization: `Bearer ${auth.token}` })
				history.push(`/detail/${data.link._id}`)//after creating link => redirect to detail page
			} catch (error) { }
		}
	}
	return (
		<div className="row" >
			<div className="col s8 offset-s2">
				<div className="input-field">
					<input
						id="link"
						//name="email"
						type="text"
						className="validate"
						onChange={event => setLink(event.target.value)}
						onKeyPress={enterPress}
					/>
					<label htmlFor="link" data-error="wrong" data-success="right">Paste your link</label>
				</div>
			</div>
		</div>
	)
}