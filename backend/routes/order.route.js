const express = require('express');
const router = express.Router();
const config = require('config');
const { validate } = require('../models/order.model');

function getApiUrl() {
    return `${config.get('scalaApi')}/orders`;
}

router.post('/', (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    res.status(201).send('Success');
});


module.exports = router;