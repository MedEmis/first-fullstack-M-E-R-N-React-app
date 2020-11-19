import React, { useCallback, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'//to get id from link
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard'


export const DetailPage = () => {
	const { request, loading } = useHttp()
	const { token } = useContext(AuthContext)
	const [link, setLink] = useState(null)
	const linkId = useParams().id// => /detail/:id
	const getLink = useCallback(async () => {
		try {
			const fetched = await request(`/api/link/${linkId}`, 'GET', null, { Authorization: `Bearer ${token}` })// to use out link by id
			// fetched => result link
			setLink(fetched)// keep fetched in state
		} catch (error) { }
	}, [token, linkId, request])
	useEffect(() => { getLink() }, [getLink])//by readyness of the component we getting link
	if (loading) {
		return <Loader /> //loader line
	}
	//console.log(link)
	return (
		<>{!loading && link && <LinkCard link={link}  />}</>
	)
}



