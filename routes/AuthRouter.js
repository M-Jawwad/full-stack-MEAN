const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const authenticate = require('../middleware/authentication');

router.get('/users', authenticate, AuthController.users);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/refresh-token', AuthController.refreshToken);
router.delete('/delete', authenticate, AuthController.deleteUser);

module.exports = router;