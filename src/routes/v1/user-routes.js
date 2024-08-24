const express = require('express');
const router = express.Router();

const { UserController } = require('../../controllers')

// USER SIGNUP
router.post('/signup', UserController.signup);

// USER SIGNIN
router.post('/signin', UserController.signin);



module.exports = router;