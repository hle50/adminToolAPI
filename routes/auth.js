const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signIn', authController.signIn);


module.exports = router;