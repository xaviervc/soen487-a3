const express = require('express');
const app = express();
const Places = require('./models/Places');

//Not sure if we need this
app.use(express.urlencoded({extended: true}));

//Accepts json
app.use(express.json()) 


//Routes
app.post('/near',(req,res)=> {
    
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

app.post('/', (req, res) =>{
    console.log(req.body);
    res.status(200).end();
})



app.listen(3000);