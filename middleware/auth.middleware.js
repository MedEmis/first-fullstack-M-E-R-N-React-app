const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (request, response, next) => {//middleware нужен для того, чтобы перехватывать данные, выпонять с ними работу и затем передавать дальше с помощью next
	if (request.method === 'OPTIONS') {
		return next()//if serever is in acess => continue
	}
	try {
		const token = request.headers.authorization.split(' ')[1]//getting user token from request data. Taking only first element(token).
		//console.log(request.headers.authorization) 
		if (!token) {
			return response.status(401).json({ message: "no authorisation" })
		}
		const decodedToken = jwt.verify(token, config.get('secretJWTkey'))
		request.user = decodedToken
		next()
	} catch (error) {
		response.status(401).json({ message: "no authorisation" })
	}
}//|^|this middleware to make sure, than unauthorised users cannot create links



////// нужно пройти дебагеромy