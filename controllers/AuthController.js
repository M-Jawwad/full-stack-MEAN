const userModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function users(req, res, next) {
    userModel.find().then((resp) => {
        res.json({
            data: resp
        });
    }).catch(err => {
        res.status().json({
            message: err
        });
    });
}

function register(req, res, next) {
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
            res.json({
                error: err
            });
        }

        let user = new userModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        });
    
        user.save().then(user => {
            res.json({
                message: 'User created successfully'
            });
        }).catch(err => {
            res.json({
                message: err
            });
        });
    });
}

function deleteUser(req, res, next) {
    const uId = req.body.user_id;

    userModel.findByIdAndDelete(uId).then((resp) => {
        res.json({
            message: 'User deleted successfully'
        });
    }).catch(err => {
        res.json({
            message: err
        });
    });
}

function login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    userModel.findOne({$or: [{email: username}, {phone: username}]}).then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                }

                if (result) {
                    let token = jwt.sign({name: user.name}, 'AzQ,PI)0(', {expiresIn: '1h'});
                    let refresh_token = jwt.sign({name: user.name}, ')rEf[R]eSh(', {expiresIn: '36h'});
                    res.json({
                        message: 'Login Successfull',
                        token, refresh_token
                    })
                } else {
                    res.status(400).json({
                        message: 'Password does not matched!'
                    });
                }
            })
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    })
}

function refreshToken(req, res, next) {
    const refreshToken = req.body.refreshToken;
    jwt.verify(refreshToken, ')rEf[R]eSh(', (err, decode) => {
        if (err) {
            res.status(400).json({
                err
            });
        } else {
            let token = jwt.sign({name: decode.name}, 'AzQ,PI)0(', {expiresIn: '30s'} );
            let refreshToken = req.body.refreshToken;
            res.status(200).json({
                message: 'Token refreshed succesfully', token, refreshToken
            });
        }
    })
}

module.exports = {
    users, register, login, deleteUser, refreshToken
}