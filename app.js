const express = require('express');
const app = express();
const Places = require('./models/Places');

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 


const parseJson = (json) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(JSON.parse(json))
      })
    })
  }

//Routes
app.get('/', (req, res) => {
    res.send(export_places);
});

app.post('/jsonLocation',(req,res)=> {
    
    jsonData = req.body
    
    longitude = parseFloat(jsonData.longitude)
    latitude = parseFloat(jsonData.latitude)
    max = 30
    min = 10
    coordinate = [longitude,latitude]
    console.log(coordinate)

    place = new Places(max,min)
    responseBody = place.near(coordinate).then(
        result => {
            console.log(result)
            res.send(result)
        }
   
        
    )
    
    
    
    
})




app.post('/', (req, res) =>{
    console.log(req.body);
    res.status(200).end();
})



app.listen(3000);