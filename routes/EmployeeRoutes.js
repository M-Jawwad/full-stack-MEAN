const express = require('express');
const router = express.Router();

const empController = require('../controllers/EmployeeController');
const upload = require('../middleware/upload');
const authenticate = require('../middleware/authentication');


router.get('/', authenticate, empController.index);
router.get('/show', authenticate, empController.show);
router.post('/store', upload.array('avatar[]'), empController.store);
router.patch('/update', authenticate, empController.update);
router.delete('/khatam-tata-bye', authenticate, empController.khatamTata);

module.exports = router