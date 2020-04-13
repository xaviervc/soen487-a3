const Places = require('./models/Places');

let coords = [-73.5684, 45.5005];

let place = new Places(1000, 10);

place.near(coords).then((result) => {
    //All the Display Logic needs to be insie a then
    var documents = result;
    console.log(documents[0]);
});
