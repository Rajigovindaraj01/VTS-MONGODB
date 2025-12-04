const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Blog = sequelize.define("Blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    defaultValue: "Anonymous"
  }
});

module.exports = Blog;
