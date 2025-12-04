const { Sequelize } = require("sequelize");
const config = require("../config/db");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.DIALECT   
  }
);

sequelize.authenticate()
  .then(() => console.log("DB Connected Successfully"))
  .catch(err => console.log("DB Error:", err));

module.exports = sequelize;
