const express = require('express');
const app = express();
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'parking-app';
const client = new MongoClient(url, {useNewUrlParser: true});


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