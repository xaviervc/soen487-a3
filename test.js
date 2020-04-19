const Places = require('./model/Places');

// let coords = [-73.5684, 45.5005];
let coords = [-73.638903, 45.428027];

let place = new Places(800, 10);

place.near(coords).then((result) => {
    //All the Display Logic needs to be inside a then
    console.log(result);
});