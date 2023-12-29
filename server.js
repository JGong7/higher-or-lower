const express = require('express');
const app = express();
const cors = require('cors');
const lodash = require('lodash');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const MongoDriver = require('./mongo.js');
const mongo = new MongoDriver("mongodb+srv://embarrassedboy233:123@cluster0.4q4ed6h.mongodb.net/?retryWrites=true&w=majority");
let mongoStarted = false;

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) =>{
    res.send("Hello World!");
})

app.get('/hi', (req, res) =>{
    res.send("hi");
})

app.listen(port, () =>{
    startMongo();
    console.log(`server running at `);
    console.log(`the port is now https://express-service-dot-noble-mantis-409407.wl.r.appspot.com`);
})

app.get('/start', async (req, res) => {
    if (mongoStarted){
        let all = await mongo.read("City");
        let rand1 = Math.floor(Math.random() * all.length);
        let rand2 = Math.floor(Math.random() * all.length);
        while (rand2 == rand1){
            rand2 = Math.floor(Math.random() * all.length);
        }
        let result = [all[rand1], all[rand2]];
        res.send(result);
    }
  });

app.post('/next', async (req, res) =>{
    if (mongoStarted){
        let all = await mongo.read("City");
        let lastCity = req.body.city;
        let rand = Math.floor(Math.random() * all.length);
        while (lodash.isEqual(all[rand], lastCity)){
            rand = Math.floor(Math.random() * all.length);
        }
        res.send(all[rand]);
    }
})


async function startMongo(){
    await mongo.connect();
    mongoStarted = true;
    await mongo.read("City");
};