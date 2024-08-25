const express = require('express');
const router = express.Router();

const { UserController } = require('../../controllers');

const { AuthRequestMiddleware } = require('../../middlewares');

// USER SIGNUP
router.post('/signup', AuthRequestMiddleware.validateAuthRequest, UserController.signup);

// USER SIGNIN
router.post('/signin', AuthRequestMiddleware.validateAuthRequest, UserController.signin);

// 
router.post('/role', AuthRequestMiddleware.checkAuth, AuthRequestMiddleware.isAdmin, UserController.addRoleToUser);



module.exports = router;