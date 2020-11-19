import { useState, useCallback } from 'react'

// html.hook we need to maintain requests with loader in there

export const useHttp = () => {   // custom hook to work with async requests to server via native api-fetch
	const [loading, setLoading] = useState(false)// loading flag
	const [error, setError] = useState(null)

	const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {//useCallback to avoid recursive work of react
		setLoading(true)//showing that loading is in progress
		try {
			if (body) {//if we have something in body ...
				body = JSON.stringify(body)//=> parse it to string and...
				headers['Content-Type'] = 'application/json'//=> explicitly indicate that we are using data as JSON  !
			}
			const response = await fetch(url, { method, body, headers })
			//console.log( 'html hook:  ',response)
			const data = await response.json()
			
			if (!response.ok) {
				throw new Error(data.message || "Something went wrong.")//if wrong response throw error to make "catch" work
			}
			setLoading(false)
			return data
		} catch (error) {
			//console.log('html hook:  ', error)
			setLoading(false)
			setError(error.message)
			throw error
		}
	}, [])
	const clearError = useCallback(() => setError(null), [])
	return { loading, request, error, clearError }
}