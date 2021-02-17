const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');

function getApiUrl() {
    return `${config.get('scalaApi')}/configurations`;
}

router.get('/', (req, res) => {
    request.get(getApiUrl(), req.headers, (err, response, body) => {
        res.status(response.statusCode).send(JSON.parse(body));
    });
});

module.exports = router;