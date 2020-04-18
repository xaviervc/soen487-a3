const jwt = require('jsonwebtoken');

const tokenSecret = 'dsjfwmndssdficn';

module.exports = function(req,res,next){
	const token = req.header('auth-token');
	if(!token) return res.status(401).send('401: access denied !');

	try{
		const verified = jwt.verify(token,tokenSecret);
		req.user = verified;
		next();
	}catch(err){
		res.status(400).send('Invalid token sent');
	}
}