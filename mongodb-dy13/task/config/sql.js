const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.SQL_DB,
  process.env.SQL_USERNAME,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    dialect: "mysql"
  }
);

module.exports = sequelize;
