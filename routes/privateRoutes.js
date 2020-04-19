const router = require('express').Router();
const verify = require('./verifyToken');
const Places = require('../model/Places');

router.get('/test', verify, (req,res) => {
	res.json({
		posts: {
			title: 'some test title', 
			description: 'some test desc that should be private'
		}
	});
});

router.get('/near', verify, (req,res)=> {
    
    //Extract data from json
    var longitude = parseFloat(req.query.longitude)
    var latitude = parseFloat(req.query.latitude)
    var max = parseInt(req.query.max)
    // we can change this to pass a minimum distance but why?
    var min = 0
    var coordinate = [longitude,latitude]
    console.log(coordinate)
    //Complete query and send back json result. We can also just send the coordinates for google-maps api to consume
    var place = new Places(max,min)
    place.near(coordinate)
        .then(
            (result) => {
                console.log(result)
                res.status(200).json(result)
            }
    )
})

module.exports = router;