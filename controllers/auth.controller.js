const UserService = require('../services/user.service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api.exceptions');

class UserController {

    async registration(req, res, next) {
        try {
            const validationErrors = validationResult(req);

            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('validation error', validationErrors.array()))
            }

            const {username, password} = req.body;
            const userData = await UserService.create(username, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const validationErrors = validationResult(req);

            if (!validationErrors.isEmpty()) {
                return next(ApiError.BadRequest('validation error', validationErrors.array()))
            }

            const {username, password} = req.body;
            const userData = await UserService.login(username, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new UserController();