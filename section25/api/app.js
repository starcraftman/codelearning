const fs = require('fs')
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const SECRET_PATH = path.join(path.dirname(path.dirname(__filename)), 'secrets')
const getSecret = (secret) => {
    return fs.readFileSync(
        path.join(SECRET_PATH, secret), 
        {
            encoding: 'utf-8'
        }
        );
};

const app = express();


// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

mongoose.connect(getSecret('dbUri'))
.then(result => {
    console.log('Connected to mongodb successfully.')
    app.listen(8080);
})
.catch(err => console.log(err));