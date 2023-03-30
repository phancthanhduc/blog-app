const postModel = require("../models/Post");

class Post {
  createPost(newPost) {
    let { title, post_desc, photo, user_id, cat_id } = newPost;
    user_id = Number(user_id);
    cat_id = Number(cat_id);
    return new Promise((resolve, reject) => {
      postModel
        .create({ title, post_desc, photo, user_id, cat_id })
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => reject(err));
    });
  }

  getPostByPostId(post_id) {
    return new Promise((resolve, reject) => {
      postModel
        .findOne({ where: { post_id } })
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => reject(err));
    });
  }

  getPostByUserId(user_id) {
    return new Promise((resolve, reject) => {
      postModel
        .findAll({ where: { user_id } })
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => reject(err));
    });
  }

  getPostByCatId(cat_id) {
    return new Promise((resolve, reject) => {
      postModel
        .findAll({ where: { cat_id } })
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => reject(err));
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      postModel
        .findAll()
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => reject(err));
    });
  }

  deleteAllPostByUserId(user_id) {
    return new Promise((resolve, reject) => {
      postModel
        .destroy({ where: { user_id } })
        .then((data) => resolve(JSON.stringify(data)))
        .catch((err) => reject(err));
    });
  }

  deletePostByID(post_id) {
    return new Promise((resolve, reject) => {
      postModel
        .destroy({ where: { post_id } })
        .then((data) => resolve(JSON.stringify(data)))
        .catch((err) => reject(err));
    });
  }

  postUpdateByID(post_id, values) {
    return new Promise((resolve, reject) => {
      postModel
        .update(values, { where: { post_id } })
        .then((data) => {
          resolve(JSON.stringify(data));
        })
        .catch((err) => reject(err));
    });
  }
}

module.exports = new Post();
