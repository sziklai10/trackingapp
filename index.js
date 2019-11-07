const express = require('express'); //setting express
const Datastore = require('nedb');//setting Datastore

const app = express(); //setting app
app.listen(3000, () => console.log("listening at port 3000"));// setting up host (3000 if local server, port number if external server)
app.use(express.static('public'));//using public file
app.use(express.json({limit: '1mb'}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Starting server at ${port}`);
});

const database = new Datastore('database.db');//new database
database.loadDatabase();//loading the database



app.post('/api', (request, response) => {//posting the api key
    const data = request.body;
    const timestamp = Date.now();//setting the timestamp
    data.timestamp = timestamp;
    database.insert(data);//insert data to database
    response.json(data);//reads the json
});

// Task 01
app.get('/api', (request, response) => {//getting the api key
    database.find({}).sort({timestamp: 1}).exec(function (err,docs){//putting data in order
        response.json(docs);
    });
});

