module.exports = (sequelize, Sequelize) => {
    const Guild = sequelize.define("guilds", {
      guildName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      guildDescription: {
        type: Sequelize.STRING,
        allowNull: false
      },
      guildScore: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
    });
  
    return Guild;
};