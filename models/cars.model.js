module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define("cars", {
      carName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      carImageLink: {
        type: Sequelize.STRING,
        allowNull: false
      },
      carLogoImageLink: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Car;
};