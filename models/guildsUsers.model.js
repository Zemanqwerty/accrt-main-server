module.exports = (sequelize, Sequelize, Users, Guilds) => {
    const guildsUsers = sequelize.define("guildsUsers", {
        guildId: {
            type: Sequelize.INTEGER,
            references: {
                model: Guilds,
                key: 'id'
            },
            allowNull: false
        },
        userId: {
        type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: 'id'
        },
        allowNull: false
      },
    });
  
    return guildsUsers;
};