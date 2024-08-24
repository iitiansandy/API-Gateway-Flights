const { StatusCodes } = require('http-status-codes');
const CrudRepository = require('./crud-repository');
const { User } = require('../models');

const { logger } = require('../config');
const AppError = require('../utils/errors/app-error');

class UserRepository extends CrudRepository {
    constructor () {
        super(User);
    }
}

module.exports = UserRepository;