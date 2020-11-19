import React from 'react'
export const LinkCard = ({ link }) => {
	return (
		<div style={{fontSize:20}}>
			<h2>Link</h2>
			<p >Your shortened link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a> </p>
			<p>Link from: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a> </p>
			<p>Number of clicks: <strong>{link.clicks}</strong> </p>
			<p>Creation date: <strong >{new Date(link.date).toLocaleDateString()}</strong> </p>
		</div>
	)
}