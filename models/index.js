const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, Sequelize.DataTypes);
db.Product = require('./product.model')(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.Product, { foreignKey: 'userid' });
db.Product.belongsTo(db.User, { foreignKey: 'userid' });

module.exports = db;