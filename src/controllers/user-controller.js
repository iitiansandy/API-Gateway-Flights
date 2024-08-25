const { UserService } = require('../services');
const { StatusCodes } = require('http-status-codes');

const { SuccessResponse, ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

/**
 * POST: /cities
 * req-body: { name: London }
 */
async function signup(req, res) {
    try {
        const user = await UserService.create({
            email: req.body.email,
            password: req.body.password
        });

        SuccessResponse.data = user;

        return res.status(StatusCodes.CREATED).send({SuccessResponse});

    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ErrorResponse});
    }
};


async function signin(req, res) {
    try {
        const user = await UserService.signin({
            email: req.body.email,
            password: req.body.password
        });

        SuccessResponse.data = user;
        return res.status(StatusCodes.CREATED).send({SuccessResponse});

    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ErrorResponse});
    }
};


async function addRoleToUser(req, res) {
    try {
        const user = await UserService.addRoleToUser({
            role: req.body.role,
            id: req.body.id
        });

        SuccessResponse.data = user;
        return res.status(StatusCodes.CREATED).send({SuccessResponse});

    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ErrorResponse});
    }
};



async function getCities(req, res) {
    try {
        const cities = await CityService.getCities();
        SuccessResponse.data = cities;
        return res.status(StatusCodes.OK).send({SuccessResponse});
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).send({ErrorResponse});
    }
};


async function getCity(req, res) {
    try {
        const city = await CityService.getCity(req.params.id);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK).send({SuccessResponse});
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).send({ErrorResponse});
    }
};


async function destroyCity(req, res) {
    try {
        const city = await CityService.destroyCity(req.params.id);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK).send({SuccessResponse});
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).send({ErrorResponse});
    }
};


async function updateCity(req, res) {
    try {
        const city = await CityService.updateCity(
            req.params.id,
            req.body
        );

        SuccessResponse.data = city;
        return res.status(StatusCodes.OK).send({SuccessResponse});
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).send({ErrorResponse});
    }
};


module.exports = {
    signup,
    signin,
    addRoleToUser
}