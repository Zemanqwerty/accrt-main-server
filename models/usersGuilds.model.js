module.exports = (sequelize, Sequelize, Users, Guilds) => {
    const usersGuilds = sequelize.define("usersGuilds", {
      userId: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: 'id'
        },
        allowNull: false
      },
      guildId: {
        type: Sequelize.INTEGER,
        references: {
            model: Guilds,
            key: 'id'
        },
        allowNull: false
      },
    });
  
    return usersGuilds;
};