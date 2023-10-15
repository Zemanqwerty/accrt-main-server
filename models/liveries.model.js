module.exports = (sequelize, Sequelize) => {
    const Livery = sequelize.define("liveries", {
      liveryName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      liveryImageLink: {
        type: Sequelize.STRING,
        allowNull: false
      },
      liveryResourcesLink: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Livery;
};