const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/Register');
const signin = require('./Controllers/Signin');
const profile = require('./Controllers/Profile');
const image = require('./Controllers/Image');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: '789632541',
		database: 'smart-brain'
	}
})

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.put('/imageurl', (req, res) => { image.handleApiCall(req, res, db) })

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is runnung on port ${process.env.PORT}`)
})