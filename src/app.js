'use strict'

const express = require('express');
const bodyparse = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://rafael:rafa@mongostr-yd1ew.gcp.mongodb.net/test?retryWrites=true')

const productModel = require('./models/product');

const indexRoute = require('./routes/index');
const productRoute = require('./routes/product');

app.use(bodyparse.json());
app.use(bodyparse.urlencoded({
    extended: false
}));

app.use('/products', productRoute);
app.use('/', indexRoute);

module.exports = app;