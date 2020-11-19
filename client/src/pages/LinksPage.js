import React, { useCallback, useContext, useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinkList } from '../components/LinkList'


export const LinksPage = () => {
	const [links, setLinks] = useState([])
	const { loading, request } = useHttp()
	const { token } = useContext(AuthContext)

	const fetchLinks = useCallback(async () => {//to get list of links
		try {
			const fetched = await request("/api/link", 'GET', null, { Authorization: `Bearer ${token}` })
			//console.log(request)
			setLinks(fetched)
			//console.log(request)
		} catch (error) { }
	}, [token, request])
	useEffect(() => {fetchLinks()}, [fetchLinks])
	if (loading) {
		return <Loader /> //loader line
	}
	return (
		<>{!loading && <LinkList links={links} />}</>
	)
}


//при обращении к /api/link  не получает ссылку