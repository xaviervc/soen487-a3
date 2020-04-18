// USER VALIDATION
const Joi = require('@hapi/joi');


const registerValidation = data => {
	const schema = Joi.object({
		username: Joi.string().min(3).required(),
		password: Joi.string().min(6).required()
	});

	return schema.validate(data);


	//Validate creds first
	//const {error} = schema.validate(req.body);
	//if(error) return res.status(400).send(error.details[0].message);


}

const loginValidation = data => {
	const schema = Joi.object({
		username: Joi.string().min(3).required(),
		password: Joi.string().min(6).required()
	});

	return schema.validate(data);


	//Validate creds first
	//const {error} = schema.validate(req.body);
	//if(error) return res.status(400).send(error.details[0].message);


}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;