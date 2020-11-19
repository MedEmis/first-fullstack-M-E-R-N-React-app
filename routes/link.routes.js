const { Router } = require("express");
const config = require('config')
const shortid = require("shortid");
const Link = require('../models/Link')//model of link
const auth = require("../middleware/auth.middleware")
const router = Router()
//  /api/link/generate

router.post('/generate', auth, async (request, response) => {
	try {
		const baseUrl = config.get('baseUrl')
		const { from } = request.body//sourse link we getting from front-end
		const code = shortid.generate()//unique code
		const existing = await Link.findOne({ from })
		const to = baseUrl + '/t/' + code //creating new link to...
		//console.log(baseUrl, '/t/', code)
		const link = new Link({ code, to, from, owner: request.user.userId })
		await link.save()//saving link to the database
		if (existing) {
			return response.json({ link: existing })
		}
		res.status(201).json({ link })
		response.status(201).json({ message: "Link was successfully created!" })
		//console.log(response.status)
	} catch (error) {
		response.status(500).json({ message: "Something wrong. Error /generate occured" })

	}
})
router.get('/', auth, async (request, response) => {
	try {
		const links = await Link.find({ owner: request.user.userId })
		response.json(links)
	} catch (error) {
		response.status(500).json({ message: "Something wrong. Error / occured" })
	}

})
router.get('/:id', auth, async (request, response) => {
	//console.log("link:  ", auth)
	try {
		const link = await Link.findById(request.params.id)
		response.json(link)
	} catch (error) {
		response.status(500).json({ message: "Something wrong. Error /:id occured" })
	}
})

module.exports = router