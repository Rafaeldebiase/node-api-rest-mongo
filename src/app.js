'use strict'

const express = require('express');
const app = express();
const router = express.Router();

const route = router.get('/', (request, response, next) => {
    response.status(200).send({
        title: "Node Store API",
        verison: "0.0.1"
    })
});

const create = router.post('/', (request, response, next) => {
    response.status(201).send(request.body);
});


app.use('/products', create);
app.use('/', route);

module.exports = app;

