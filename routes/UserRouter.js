const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const authenticate = require('../middleware/authentication');

router.get('/users', authenticate, AuthController.users);
router.post('/register', authenticate, AuthController.register);
router.delete('/delete', authenticate, AuthController.deleteUser);

module.exports = router;