const config = require('config');

module.exports = function (req, res, next) {
    try {
        let token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            token = config.get('token');
        }
        // return res.status(401).send('Access denied. No token provided');
        req.token = token;
    
        next();
    } catch (error) {
        res.status(401).send({ message: "Auth failed!" });
    }

}
