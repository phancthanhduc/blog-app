const userModel = require("../models/User");

class User {
  getOneByID(user_id) {
    return new Promise((resolve, reject) => {
      userModel
        .findOne({ where: { user_id } })
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => reject(err));
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      userModel
        .findAll()
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => reject(err));
    });
  }

  createUser(username, email, passwords, profilePic = null) {
    return new Promise((resolve, reject) => {
      userModel
        .create({ username, email, passwords, profilePic }, { logging: false })
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => reject(err));
    });
  }

  userLogin(username) {
    return new Promise((resolve, reject) => {
      userModel
        .findOne({ where: { username } })
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => reject(err));
    });
  }

  userUpdateByID(user_id, values) {
    return new Promise((resolve, reject) => {
      userModel
        .update(values, { where: { user_id } })
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => reject(err));
    });
  }

  userDeleteByID(user_id) {
    return new Promise((resolve, reject) => {
      userModel
        .destroy({ where: { user_id } })
        .then((data) => resolve(JSON.stringify(data)))
        .catch((err) => reject(err));
    });
  }
}

module.exports = new User();
