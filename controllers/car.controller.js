const CarService = require('../services/car.service');

class CarController {

    async getCarsList(req, res, next) {
        try {
            const carsList = await CarService.getCarsList()

            return res.json(carsList);
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const carData = await CarService.getById(req.params.id);

            return res.json(carData);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CarController();