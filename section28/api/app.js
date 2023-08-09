const fs = require('fs')
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { graphqlHTTP } = require('express-graphql');

const getSecret = require('./util/get-secret');
const graphqlResolvers = require('./graphql/resolvers')
const graphqlSchema = require('./graphql/schema')

const app = express();
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`)
    }
})
const fileFilter = (req, file, cb) => {
    cb(null, ['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype));
}


// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));
app.use('/images', express.static(path.join(path.dirname(__filename), 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use((err, req, res, next) => {
    console.log('CRITICAL SERVER ERROR:', err);

    return res
        .status(err.statusCode)
        .json({
            message: err.toString(),
            code: err.statusCode,
            data: err.data
        })
})

app.use(
    '/graphql', 
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true,
        formatError(err) {
            if (!err.originalError) {
                return err;
            }

            return {
                message: "" + err.originalError,
                status: err.originalError.code || 500,
                data: err.originalError.data
            }
        }
    })
);

mongoose.connect(getSecret('dbUri'))
.then(result => {
    console.log('Connected to mongodb successfully.')
    app.listen(8080);
})
.catch(err => console.log(err));