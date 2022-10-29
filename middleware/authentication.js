const jwt = require('jsonwebtoken');


function authenticate(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'AzQ,PI)0(');

        req.user = decode;
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).send({ message: 'Token Expired!' });
        } else if (error.name === 'TypeError') {
            res.status(401).send({ message: 'Authication failed! ' });
        } else {
            res.status(400).send({ message: error.message });
        }
    }
}


module.exports = authenticate;