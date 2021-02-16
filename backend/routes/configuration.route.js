const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');

function getApiUrl() {
    return `${config.get('scalaApi')}/configurations`;
}

router.get('/', (req, res) => {
    const url = getApiUrl();
    request.get(url, req.headers, (err, response, body) => {
        res.status(response.statusCode).send(JSON.parse(body));
    });
});

module.exports = router;