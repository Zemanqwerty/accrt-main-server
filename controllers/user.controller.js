const UserService = require('../services/user.service');

class UserController {

    async create(req, res, next) {
        try {
            const {username, password} = req.body;
            const userData = await UserService.create(username, password);
            console.log(userData);
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async usersList(req, res, next) {
        try {
            const usersList = await UserService.getUsersList();
            return res.json(usersList);
        } catch (e) {
            next(e)
        }
    }

    async block(req, res, next) {
        try {
            const updatedUser = await UserService.blockUser(req.params.id);
            return res.json(updatedUser);
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const user = await UserService.getById(req.params.id);
            return res.json(user);
        } catch (e) {
            next(e)
        }
    }

    async deleteById(req, res, next) {
        try {
            const deleteData = await UserService.deleteById(req.params.id);
            return res.json(deleteData);
        } catch (e) {
            next(e)
        }
    }

    async inviteToGuild(req, res, next) {
        try {
            const userId = req.params.id;
            const senderId = req.user.id;

            const inviteData = await UserService.inviteToGuild(userId, senderId);

            return res.json(inviteData);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();