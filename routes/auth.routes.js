////////OUR SERVER///////

const { Router } = require("express")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require("express-validator");
const User = require("../models/User")
const router = Router()

// /api/auth/register
router.post('/register',
	[//middleWire validation
		check("email", "wrong email adress").isEmail(),//for email
		check("password", "minimal password length is 6 symbols").isLength({ min: 6 })//for password
	],
	async (request, response) => {
		try {
			//console.log("body===>", request.body)
			const errors = validationResult(request)//collecting of any error in one object
			if (!errors.isEmpty()) { //output in case errors
				return response.status(400).json({ errors: errors.array(), message: "wrong registration data" })
			}
			const { email, password } = request.body //body of request form frontend
			const candidate = await User.findOne({ email })//looking for same candidate in data base
			if (candidate) {
				return response.status(400).json({ message: "This email already exist" })
			}
			const hashedPassword = await bcrypt.hash(password, 12)// encoding of password
			const user = new User({ email: email, password: hashedPassword })//creating of new user
			await user.save()
			response.status(201).json({ message: "User was created!" })
		} catch (error) {
			response.status(500).json({ message: "Something wrong. Error occured" })
		}
	})
// /api/auth/login
router.post('/login',
	[	// validators array 
		check("email", "wrong email adress").normalizeEmail().isEmail(),
		check("password", "incorrect password").exists()
	],
	async (request, response) => {
		try {
			const errors = validationResult(request)
			if (!errors.isEmpty()) {
				return response.status(400).json({ errors: errors.array(), message: "wrong registration data" })
			}
			const { email, password } = request.body // getting user data from autorisation form
			const user = await User.findOne({ email })// searching user in database by email
			if (!user) { //if such user was not found -> error message
				return response.status(400).json({ message: "Error. Such user was not found." })
			}
			const isMatch = await bcrypt.compare(password, user.password) //comparing recived password and password from dataBase
			if (!isMatch) {
				return response.status(400).json({ message: "wrong password" })
			}
			const token = jwt.sign( //token for autorisation in single-page app
				{ userId: user.id },
				config.get('secretJWTkey'),
				{ expiresIn: "5h" }
			)
			response.json({ token, userId: user.id })// final response in case of succesfull autorisation

		} catch (error) {
			response.status(500).json({ message: "Something wrong. Error occured" })
		}
	})

module.exports = router