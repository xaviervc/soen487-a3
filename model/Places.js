const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'parking-app';
const collectionName = 'Places';

class Places {

    constructor(maxDistance, minDistance){
        this.maxDistance = maxDistance;
        this.minDistance = minDistance;
    }

    async near(coord){

        const client = await MongoClient.connect(url, {useNewUrlParser: true})
        .catch(error => {console.log(error)});

        if(!client){
            return;
        }

        try{
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            let result = collection.find(
                {'geometry.coordinates':
                    {$near: 
                        {$geometry:
                            {type: "Point", coordinates: coord}, $maxDistance: this.maxDistance, $minDistance: this.minDistance
                        }
                    }
                });
            return await result.toArray();
        }catch(error){
            console.log(error);
        }finally{
            client.close();
        }
    }
}


module.exports = Places;