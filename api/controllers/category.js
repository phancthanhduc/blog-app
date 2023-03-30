const catModel = require("../models/Category");

class Category {
  getAll() {
    return new Promise((resolve, reject) => {
      catModel
        .findAll()
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => reject(err));
    });
  }

  getCategory(cat_name) {
    return new Promise((resolve, reject) => {
      catModel
        .findOne({ where: { cat_name } })
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getCategoryByID(cat_id) {
    return new Promise((resolve, reject) => {
      catModel
        .findOne({ where: { cat_id } })
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  createCategory({ cat_name, cat_desc }) {
    return new Promise((resolve, reject) => {
      catModel
        .create({ cat_name, cat_desc }, { logging: false })
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => reject(err));
    });
  }
}

module.exports = new Category();
