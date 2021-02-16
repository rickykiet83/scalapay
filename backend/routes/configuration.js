const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const request = require('request');

router.get('/', auth, (req, res, next) => {

    const options = {
        url: 'https://staging.api.scalapay.com/v1/configurations',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.token,
        }
    };
    try {
        request.get(options.url, options, (err, response, body) => {
            res.status(200).send(JSON.parse(body));
        })
    } catch (error) {
        console.log('error: ', error);
    }
});

module.exports = router;