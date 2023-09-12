const db = require("../models");
const User = db.users;
const GuildsUsers = db.guildsUsers;
const bcrypt = require('bcrypt');
const TokenService = require('./token.service');
const JwtPayloadDto = require('../dtos/jwtPayload.dto');
const ApiError = require('../exceptions/api.exceptions');

class UserService {
    async create(username, password) {
        const createdUser = await User.findOne({
            where: {
                username: username
            }
        })

        if (createdUser) {
            console.log(createdUser);
            throw ApiError.BadRequest(`user with username ${username} already created`)
        }

        const hashedPassword = await bcrypt.hash(password, 3);

        const newUser = await User.create({username, password: hashedPassword});

        const jwtPayload = new JwtPayloadDto(newUser);
        const tokens = await TokenService.generateTokens({...jwtPayload});
        const savedToken = await TokenService.saveToken(tokens.refreshToken, newUser.id)

        console.log(newUser);

        return {...tokens, user: jwtPayload};
    }

    async login(username, password) {
        const user = await User.findOne({
            where: {
                username: username
            }
        })

        if (!user) {
            throw ApiError.BadRequest(`user with username ${username} not found`);
        }

        const isPasswordsEqual = await bcrypt.compare(password, user.password);

        if (!isPasswordsEqual) {
            throw ApiError.BadRequest('incorrect password');
        }

        const jwtPayload = new JwtPayloadDto(user);
        const tokens = await TokenService.generateTokens({...jwtPayload});
        const savedToken = await TokenService.saveToken(tokens.refreshToken, user.id)

        return {...tokens, user: jwtPayload};
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const token = await TokenService.findToken(refreshToken);

        if (!userData || !token) {
            console.log(userData);
            console.log('not some data');
            throw ApiError.UnauthorizedError();
        }

        const userDataFromDB = await User.findByPk(userData.id)

        const jwtPayload = new JwtPayloadDto(userDataFromDB);
        const tokens = await TokenService.generateTokens({...jwtPayload});
        const savedToken = await TokenService.saveToken(tokens.refreshToken, userData.id)

        console.log(userDataFromDB);

        return {...tokens, user: jwtPayload};
    }

    async getUsersList() {
        const usersList = await User.findAll();
        console.log(usersList);

        return usersList;
    }

    async blockUser(id) {
        const user = await User.findOne({
            where: {
                id: id
            }
        });

        console.log(user);

        if (!user) {
            throw ApiError.BadRequest(`user with id ${id} is not found`);
        } else if (user.isActive === false) {
            throw ApiError.BadRequest(`user with id ${id} already blocked`);
        }

        user.isActive = false;

        await user.save();

        return {message: 'user blocked'};
    }

    async getById(id) {
        const user = await User.findByPk(id);
        console.log(user);

        if (!user) {
            throw ApiError.BadRequest(`user with id ${id} not found`);
        }

        return user;
    }

    async deleteById(id) {
        const user = await User.findByPk(id);

        if (!user) {
            throw ApiError.BadRequest(`user with id ${id} not found`);
        }

        await user.destroy();

        return {message: `user with id ${id} deleted`};
    }

    async inviteToGuild(userId, senderId) {
        const senderData = await User.findByPk(senderId);
        const guildId = senderData.guildId;

        const guildsUsers = await GuildsUsers.create({guildId, userId});

        return guildsUsers;
    }
}

module.exports = new UserService();