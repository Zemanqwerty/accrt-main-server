module.exports = app => {
    const car = require('../controllers/car.controller.js');
    const authMiddleware = require('../middlewares/auth.middleware.js');

    const router = require("express").Router();

    router.get('/all', authMiddleware, car.getCarsList);
    router.get('/:id', authMiddleware, car.getById);
  
    app.use('/cars', router);
};