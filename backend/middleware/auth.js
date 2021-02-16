module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).send('Access denied. No token provided');
        req.token = token;
    
        next();
    } catch (error) {
        res.status(401).send({ message: "Auth failed!" });
    }

}
