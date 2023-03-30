const { DataTypes } = require("sequelize");
const db = require("../database_connect");
const User = require("./User");
const Category = require("./Category");

const Post = db.define("posts", {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "user_id",
    },
  },
  cat_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "categories",
      key: "cat_id",
    },
  },
});

db.sync({ alter: true });

module.exports = Post;
