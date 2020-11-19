const express = require('express')
const mongoose = require('mongoose')//MongoDB - database servise
const config = require('config')// config storage
const app = express()//our server
const path = require('path')

app.use(express.json({ extended: true }))//to parse data from register form to json format
app.use('/api/auth', require('./routes/auth.routes'))//to handle API requests from frontend. Route registers.
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))//to redirect by link 

if (process.env.NODE_ENV === 'production') {//if production => we add static
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))//creating of static folder
	app.get('*', (request, response) => {                                //by any "get" request => we will send file
		response.sendFile(path.resolve(__dirname, 'client', 'build','index.html'))
	})
}

const PORT = config.get('port') || 5000 // current port

async function start() {
	try {
		await mongoose.connect(config.get("mongoUri"), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})//1arg: url for database; 2arg: options
		app.listen(PORT, () => console.log(`App has been started at port ${PORT}`)) // server setup
	} catch (error) {
		console.log(`Server error: ${error.message}`)
		process.exit(1)
	}
}
start()

