'use strict'

const express = require('express');
const bodyparse = require('body-parser');

const app = express();

const index = require('./routes/index');
const product = require('./routes/product');


app.use(bodyparse.json());
app.use(bodyparse.urlencoded({
    extended: false
}));





app.use('/products', product);
app.use('/', index);

module.exports = app;