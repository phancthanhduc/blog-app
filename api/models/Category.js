const { DataTypes } = require("sequelize");
const db = require("../database_connect");
// const sequelize = new Sequelize("blog_app", "root", "matkhau19", {
//   host: "localhost",
//   port: 3306,
//   dialect: "mysql",
// });

// sequelize
//   .authenticate()
//   .then((data) => console.log("Connecting!!!"))
//   .catch((err) => console.log(err));

const Category = db.define("category", {
  cat_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  cat_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cat_desc: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "life is good, and keep going",
  },
});

// Category.sync({ alter: true })
//   .then(() => {
//     return Category.findAll();
//   })
//   .then((data) => console.log(JSON.stringify(data)))
//   .catch((err) => console.log(err));
db.sync();

module.exports = Category;
