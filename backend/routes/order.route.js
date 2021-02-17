const express = require('express');
const router = express.Router();
const config = require('config');
const { validate } = require('../models/order.model');
const request = require('request');

function getApiUrl() {
    return `${config.get('scalaApi')}/orders`;
}

router.post('/', (req, res) => {
    const data = req.body;
    const { error } = validate(data);
    if (error) return res.status(400).send(error.details[0].message);

    let header = req.headers.headers;
    headers = {
        headers: header,
        json: data,
    }

    request.post(getApiUrl(), headers, function(err, resonse, body) {
        res.status(resonse.statusCode).json(body);
    });
});


module.exports = router;