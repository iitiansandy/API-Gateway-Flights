const { StatusCodes } = require('http-status-codes');
const CrudRepository = require('./crud-repository');
const { Role } = require('../models');

const { logger } = require('../config');
const AppError = require('../utils/errors/app-error');

class RoleRepository extends CrudRepository {
    constructor () {
        super(Role);
    }

    async getRoleByName(name) {
        const role = await Role.findOne({ where: { name: name }});
        return role;
    }
}

module.exports = RoleRepository;