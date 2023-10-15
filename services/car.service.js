const db = require("../models");
const Car = db.cars;

const ApiError = require('../exceptions/api.exceptions');

class GuildService {

    async getCarsList() {
        const carsList = await Car.findAll();

        return carsList;
    }

    async getById(id) {
        const car = await Car.findByPk(id);

        if (!car) {
            throw ApiError.BadRequest(`car with id ${id} not found`);
        }

        return car;
    }

}

module.exports = new GuildService();