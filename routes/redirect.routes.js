const { Router } = require('express')
const Link = require('../models/Link')
const router = Router()

router.get('/:code', async (request, response) => {// app.js => '/t'
	try {
		const link = await Link.findOne({ code: request.params.code })//getting one link by code 
		if (link) {//if we got link, we will be redirected to origin link
			link.clicks++
			await link.save()
			return response.redirect(link.from)
		} else {
			response.status(404).json({message: 'Link was not found'})
		}
	} catch (error) {
		response.status(500).json({ message: 'Server error' })
	}
})

module.exports = router