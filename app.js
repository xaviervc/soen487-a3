const express = require('express');
const app = express();
const Places = require('./models/Places');

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 


//Routes
app.post('/near',(req,res)=> {
    
    jsonData = req.body
    var longitude = parseFloat(jsonData.longitude)
    var latitude = parseFloat(jsonData.latitude)
    var max = parseInt(jsonData.max)
    var min = 0
    var coordinate = [longitude,latitude]
    console.log(coordinate)

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