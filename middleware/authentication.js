const jwt = require('jsonwebtoken');


function authenticate(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'AzQ,PI)0(');

        req.user = decode;
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({
                message: 'Token Expired!'
            });
        } else {
            res.json({ message: 'Authication failed! ' + error.message });
        }
    }
}


module.exports = authenticate;