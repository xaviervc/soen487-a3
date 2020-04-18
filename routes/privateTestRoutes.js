const router = require('express').Router();
const verify = require('./verifyToken');
const Places = require('../model/Places');

router.get('/test', verify, (req,res) => {
	res.json({
		posts: {
			title: 'some test title', 
			descriprion: 'some test desc that should be private'
		}
	});
});

router.post('/near', verify, (req,res)=> {
    
    //Extract data from json
    jsonData = req.body
    var longitude = parseFloat(jsonData.longitude)
    var latitude = parseFloat(jsonData.latitude)
    var max = parseInt(jsonData.max)
    // we can change this to pass a minimum distance but why?
    var min = 0
    var coordinate = [longitude,latitude]
    console.log(coordinate)
    //Complete query and send back json result. We can also just send the coordinates for google-maps api to consume
    var place = new Places(max,min)
    place.near(coordinate).then(
        result => {
            console.log(result)
            res.json(result)
        }
    )
      
})

module.exports = router;