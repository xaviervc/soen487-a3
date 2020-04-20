const router = require('express').Router();
const verify = require('./verifyToken');
const Places = require('../model/Places');


router.get('/near', verify, (req,res)=> {
    //Extract data query string
    let longitude = parseFloat(req.query.longitude)
    let latitude = parseFloat(req.query.latitude)
    let max = parseInt(req.query.max)
    // we can change this to pass a minimum distance but why?
    let min = 0
    let coordinate = [longitude,latitude]
    let limit = parseInt(req.query.limit)
    console.log(coordinate)
    console.log("Max distance : "+max)
    //Complete query and send back json result.
    var place = new Places(max,min)
    place.near(coordinate,limit)
        .then(
            (result) => {
                console.log(result)
                res.status(200).json(result)
            }
    )
})

module.exports = router;