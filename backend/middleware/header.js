const auth = require("./auth");

module.exports = function (req, res, next) {
    if (!req.token) auth(req, res, next);
    const token = req.token;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    }
    req.headers = { headers };
    next();
}