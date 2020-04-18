const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const {registerValidation, loginValidation} = require('../userValidation');

const tokenSecret = 'dsjfwmndssdficn';

// module.exports = function(req,res,next){
// 	const token = req.header('auth-token');
// 	if(!token) return res.status(401).send('401: access denied !');

// 	try{
// 		const verified = jwt.verify(token,tokenSecret);
// 		req.user = verified;
// 	}catch(err){
// 		res.status(400).send('Invalid token sent');
// 	}
// }

router.post('/register', async (req,res) => {
	// Validate data entered by user (if it matches minimum characters requirements)
	const {error} = registerValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	// check if username already exists
	const usernameExists = await User.findOne({username: req.body.username});
	if(usernameExists) return res.status(400).send('Username already exists');

	// hash password if user doesn't already exist
	const salt = await bcrypt.genSalt(8);
	const hashedPass = await bcrypt.hash(req.body.password, salt);

	// creating the new user
	const user = new User({
		username: req.body.username,
		password: hashedPass
	})
	try{
		const savedUser = await user.save();
		res.send({user: user._id});
	}catch(err){
		res.status(400).send(err);
	}
});

router.post('/login', async (req,res) => {
	// Validate data entered by user
	const {error} = loginValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	// check if username exists in the database
	const user = await User.findOne({username: req.body.username});
	if(!user) return res.status(400).send('Username does not exist');

	// check if password matches username in the db (compare user input to the hash value in db)
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if(!validPass) return res.status(400).send('Invalid password entered');

	// Create a token to keep making requests when logging in (using user id in the db and a random token secret)
	const token = jwt.sign({_id: user._id}, tokenSecret);
	res.header('auth-token', token).send(token);
});

module.exports = router;