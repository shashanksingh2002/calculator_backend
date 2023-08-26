//required files and libraries
require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./backend/database');
const { getHistory } = require('./routes/history');
const { calculate } = require('./routes/calculation');
const app = express();

//port
const port = process.env.PORT || 3000;


//middlewares
app.use(express.json());
app.use(express.static(__dirname+'/public'));

//connect to database and start the server
connectToDb((err) => {
    if(!err){
        app.listen(port,()=>{
            console.log('Connected to database and server started at port:',port);
        })
    }
    else{
        console.error(err);
    }
});

//routes

//sends html response of last 20 operations and answer on the server
app.get('/history', async(req,res) => {
    try{
        const data = await getHistory(req);
        res.send(data)
    }
    catch(err){
        console.log("History route",err);
        throw err;
    }
});

//sends html response of all possible routes
app.get('/', (req,res) => {
    res.sendFile('index.html');
});

//sends json response of calculated answer
app.get('/*', async(req,res) => {
    try{
        const data = await calculate(req);
        res.json(data);
    } catch(err) {
        console.log('/*',err);
        throw err;
    }
});



