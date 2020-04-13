const Places = require('./models/Places');

let coords = [-73.5684, 45.5005];

let place = new Places(30, 10);

place.near(coords).then((result) => {
    //All the Display Logic needs to be inside a then
    var documents = result;
    console.log(documents[0]);
});