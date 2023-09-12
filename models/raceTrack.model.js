module.exports = (sequelize, Sequelize) => {
    const RaceTrack = sequelize.define("race-tracks", {
      raceTrackName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      raceTrackImageLink: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return RaceTrack;
};