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

//sends html response of all possible routes
app.get('/', (req,res) => {
    return res.sendFile('index.html');
});


//handling fevicon request
app.get('/favicon.ico', (req, res) => {
    return res.status(204).end();
});

//sends html response of last 20 operations and answer on the server
app.get('/history', (req,res) => {
    return getHistory(req,res);
});

//sends json response of calculated answer
app.get('/*', (req,res) => {
    return calculate(req,res);
});



