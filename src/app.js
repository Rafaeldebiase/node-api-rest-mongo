'use strict'

const express = require('express');
const app = express();
const router = express.Router();

const route = router.get('/', (required, response, next) => {
    response.status(200).send({
        title: "Node Store API",
        verison: "0.0.1"
    })
});
app.use('/', route);

module.exports = app;
