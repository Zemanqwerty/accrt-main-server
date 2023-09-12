const Sequelize = require("sequelize");
const dotenv = require('dotenv').config();

const sequelize = new Sequelize(`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.guilds = require("./guilds.model.js")(sequelize, Sequelize);
db.tokens = require('./token.model.js')(sequelize, Sequelize);
db.usersGuilds = require('./usersGuilds.model.js')(sequelize, Sequelize, db.users, db.guilds);
db.guildsUsers = require('./guildsUsers.model.js')(sequelize, Sequelize, db.users, db.guilds);
db.cars = require('./cars.model.js')(sequelize, Sequelize);
db.raceTracks = require('./raceTrack.model.js')(sequelize, Sequelize);
db.liveries = require('./liveries.model.js')(sequelize, Sequelize);


// GUILDS
db.guilds.hasMany(db.users, {
    foreignKey: 'guildId'
});
db.users.belongsTo(db.guilds);

db.users.hasOne(db.guilds, {
    foreignKey: 'ownerId'
});
db.guilds.belongsTo(db.users);

// GUILDS INVITES
db.users.belongsToMany(db.guilds, { through: 'usersGuilds' });
db.guilds.belongsToMany(db.users, { through: 'guildsUsers' });

// LIVERIES
db.cars.hasMany(db.liveries, {
    foreignKey: 'carId'
});
db.liveries.belongsTo(db.cars);

// AUTH TOKENS
db.users.hasOne(db.tokens, {
    foreignKey: 'userId'
});

module.exports = db;