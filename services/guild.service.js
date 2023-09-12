const db = require("../models");
const Guild = db.guilds;
const User = db.users;
const UsersGuilds = db.usersGuilds;
const GuildsUsers = db.guildsUsers;
const ApiError = require('../exceptions/api.exceptions');

class GuildService {
    async create(guildName, guildDescription, ownerId) {
        const owner = await User.findByPk(ownerId);
        if (owner.guildId) {
            throw ApiError.BadRequest(`you already in the guild`)
        }
        const createdGuild = await Guild.findOne({
            where: {
                guildName: guildName
            }
        })

        if (createdGuild) {
            console.log(createdGuild);
            throw ApiError.BadRequest(`guild with guild name ${guildName} already created`)
        }

        const newGuild = await Guild.create({guildName, guildDescription, ownerId, userId: ownerId});
        owner.guildId = newGuild.id
        await owner.save()

        return {guildName};
    }

    async getGuildsList() {
        const guildsList = await Guild.findAll();
        console.log(guildsList);

        return guildsList;
    }

    async increaseScore(id) {
        const guild = await Guild.findOne({
            where: {
                id: id
            }
        });

        console.log(guild);

        if (!guild) {
            throw ApiError.BadRequest(`guild with id ${id} is not found`);
        }

        guild.guildScore += 100;

        await guild.save();

        return {message: 'guild score was increased'};
    }

    async getById(id) {
        const guild = await Guild.findByPk(id);
        console.log(guild);

        if (!guild) {
            throw ApiError.BadRequest(`guild with id ${id} not found`);
        }

        return guild;
    }

    async deleteById(id) {
        const guild = await Guild.findByPk(id);

        if (!guild) {
            throw ApiError.BadRequest(`guild with id ${id} not found`);
        }

        await guild.destroy();

        return {message: `guild with id ${id} deleted`};
    }

    async apply(userId, guildId) {
        const apply = await UsersGuilds.create({userId, guildId});
        return apply;
    }
}

module.exports = new GuildService();