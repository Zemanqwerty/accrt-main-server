const jwt = require('jsonwebtoken');
const db = require('../models');
const Token = db.tokens;



class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(refreshToken, userId) {
        const tokenData = await Token.findOne({
            where: {
                userId: userId
            }
        })

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            await tokenData.save()
            return tokenData;
        }

        const newToken = await Token.create({refreshToken, userId});
        console.log(newToken);
        return newToken;
    }

    async removeToken(refreshToken) {
        const token = await Token.findOne({
            where: {
                refreshToken: refreshToken
            }
        });

        await token.destroy();
        
        return token;
    }

    async findToken(refreshToken) {
        const token = await Token.findOne({
            where: {
                refreshToken: refreshToken
            }
        });
        
        return token;
    }
}

module.exports = new TokenService();