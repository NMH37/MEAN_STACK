const express = require('express');

router = express.Router();

const userController = require('../controllers/user')

router.post('/signup', userController.createUser);

router.post('/login', userController.loginUser);

module.exports = router;
