const express = require('express');
const app = express();
const Places = require('./models/Places');

app.use(express.urlencoded({extended: true}));

//Routes
app.get('/', (req, res) => {
    res.send(export_places);
});

app.post('/', (req, res) =>{
    console.log(req.body);
    res.status(200).end();
})

app.listen(3000);