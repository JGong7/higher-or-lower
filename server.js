const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const MongoDriver = require('./mongo.js');
const mongo = new MongoDriver("mongodb+srv://embarrassedboy233:123@cluster0.4q4ed6h.mongodb.net/?retryWrites=true&w=majority");
let mongoStarted = false;

app.use(cors());

app.get('/', (req, res) =>{
    res.send("Hello World!");
})

app.listen(port, () =>{
    startMongo();
    console.log("server running at http://localhost:3000");
})

app.get('/start', (req, res) => {
    let all = mongo.read("City");
    let rand1 = Math.floor(Math.random() * all.length);
    let rand2 = Math.floor(Math.random() * all.length);
    while (rand2 == rand1){
        rand2 = Math.floor(Math.random() * all.length);
    }
    let result = [all[rand1], all[rand2]];
    res.send(result);
  });


async function startMongo(){
    await mongo.connect();
    mongoStarted = true;
    await mongo.read("City");
};