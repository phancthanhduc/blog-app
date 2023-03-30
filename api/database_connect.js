const mysql = require("mysql2");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_URL,
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
