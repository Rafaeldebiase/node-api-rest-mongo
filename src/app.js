'use strict'

const express = require('express');
const bodyparse = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyparse.json());
app.use(bodyparse.urlencoded({
    extended: false
}));

const route = router.get('/', (request, response, next) => {
    response.status(200).send({
        title: "Node Store API",
        verison: "0.0.1"
    })
});

const create = router.post('/', (request, response, next) => {
    response.status(201).send(request.body);
});

const put = router.put('/:id', (request, response, next) => {
    const id = request.params.id;
    response.status(200).send({
        id: id,
        item: request.body
    });
});

const del = router.delete('/', (request, response, next) => {
    response.status(200).send(request.body);
});



app.use('/products', create);
app.use('/products', put);
app.use('/products', del);
app.use('/', route);

module.exports = app;