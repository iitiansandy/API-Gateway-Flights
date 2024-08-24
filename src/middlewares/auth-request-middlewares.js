const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');

const { UserService } = require('../services');
const AppError = require('../utils/errors/app-error');

function validateAuthRequest(req, res, next) {
    if (!req.body.email) {
        ErrorResponse.message = 'Something went wrong while creating city';
        
        ErrorResponse.error = new AppError(['Email not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).send({ErrorResponse});
    };

    if (!req.body.password) {
        ErrorResponse.message = 'Something went wrong while authenticating user';
        
        ErrorResponse.error = new AppError(['Password not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).send({ErrorResponse});
    };

    next();
};


async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if (response) {
            req.user = response; // setting the user id in the request object
            next();
        }
    } catch (error) {
        return res.status(error.statusCode).send(error);
    }
};

module.exports = {
    validateAuthRequest,
    checkAuth
};