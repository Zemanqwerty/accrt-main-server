const GuildService = require('../services/guild.service');

class GuildController {

    async create(req, res, next) {
        try {
            const {guildName, guildDescription} = req.body;
            const ownerId = req.user.id;
            const newGuild = await GuildService.create(guildName, guildDescription, ownerId);

            return res.json(newGuild);
        } catch (e) {
            next(e)
        }
    }

    async getGuildsList(req, res, next) {
        try {
            const guildsList = await GuildService.getGuildsList()

            return res.json(guildsList);
        } catch (e) {
            next(e)
        }
    }

    async increaseScore(req, res, next) {
        try {
            const increasedScoreData = await GuildService.increaseScore(req.params.id);

            return res.json(increasedScoreData);
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const guildData = await GuildService.getById(req.params.id);

            return res.json(guildData);
        } catch (e) {
            next(e)
        }
    }

    async deleteById(req, res, next) {
        try {
            const deletedGuildData = await GuildService.getById(req.params.id);

            return res.json(deletedGuildData);
        } catch (e) {
            next(e)
        }
    }

    async apply(req, res, next) {
        try {
            const guildId = req.params.id;
            const userId = req.user.id;
            const applyData = await GuildService.apply(userId, guildId);

            return res.json(applyData);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new GuildController();