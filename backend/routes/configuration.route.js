const express = require('express');
const router = express.Router();
const request = require('request');
const getOptionHeader = require('../middleware/header');

router.get('/', getOptionHeader, (req, res) => {
    const url = 'https://staging.api.scalapay.com/v1/configurations';
    request.get(url, req.headers, (err, response, body) => {
        res.status(response.statusCode).send(JSON.parse(body));
    });
});

module.exports = router;