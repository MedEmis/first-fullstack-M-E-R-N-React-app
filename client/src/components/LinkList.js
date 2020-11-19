import React from 'react'
import { Link } from 'react-router-dom'
export const LinkList = ({ links }) => {

	if (!links.length) {
		return (
			<div>
				<h3 className='center' style={{ fontWeight: 900 }}>Your links</h3>
				<p className="center" style={{ fontSize: 24 }}>no links yet</p>
			</div>
		)
	} else {
		return (
			<div >
				<h3 className='center'>Your links</h3>
				<table>
					<thead>
						<tr>
							<th>Number</th>
							<th>Origin link</th>
							<th>Shorten link</th>
							<th>Open</th>
						</tr>
					</thead>
					<tbody>
						{links.map((link, index) => {
							return (
								<tr key={link._id}>
									<td>{index + 1}</td>
									<td>{link.from}</td>
									<td>{link.to}</td>
									<td><Link to={`/detail/${link._id}`}>Open link</Link></td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>)
	}
}