module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define("tokens", {
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Token;
};