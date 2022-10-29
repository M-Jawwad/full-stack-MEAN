const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.login);
router.get('/refresh-token', AuthController.refreshToken);

module.exports = router;