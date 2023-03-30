const router = require("express").Router();
const User = require("../controllers/user");
const Post = require("../controllers/post");
const Category = require("../controllers/category");

//CREATE
router.post("/", async (req, res) => {
  Post.createPost(req.body)
    .then((data) => res.status(200).json(JSON.parse(data)))
    .catch((err) => res.status(500).json(err));
});

//GET BY ID
router.get("/:id", async (req, res) => {
  Post.getPostByPostId(req.params.id)
    .then((data) => {
      if (data != "null") {
        res.status(200).json(JSON.parse(data));
      } else {
        res.status(404).json("Not Found");
      }
    })
    .catch((err) => res.status(500).json(err));
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const user_id = req.query.userid;
  const cat_name = req.query.cat;
  if (user_id) {
    Post.getPostByUserId(user_id)
      .then((data) => {
        data = JSON.parse(data);
        if (data != "null") {
          res.status(200).json(data);
        } else {
          res.status(404).json("NOT FOUND!!");
        }
      })
      .catch((err) => res.status(500).json(err));
  } else if (cat_name) {
    Category.getCategory(cat_name)
      .then((data) => {
        data = JSON.parse(data);
        Post.getPostByCatId(data.cat_id)
          .then((data) => {
            if (data != "null") {
              res.status(200).json(JSON.parse(data));
            } else {
              res.status(404).json("NOT FOUND!!");
            }
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  } else {
    Post.getAll()
      .then((data) => res.status(200).json(JSON.parse(data)))
      .catch((err) => res.status(500).json(err));
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  Post.getPostByPostId(req.params.id)
    .then((data) => {
      data = JSON.parse(data);
      if (data) {
        if (data.user_id === req.body.user_id) {
          const { post_id, ...updatedValues } = req.body;
          Post.postUpdateByID(req.params.id, updatedValues)
            .then((data) => res.status(200).json(req.body))
            .catch((err) => res.status(500).json(err));
        } else {
          res.status(401).json("You can update only your post!");
        }
      } else {
        res.status(404).json("NOT FOUND POST!");
      }
    })
    .catch((err) => res.status(500).json(err));
});

//DELETE POST BY ID

router.delete("/:id", async (req, res) => {
  Post.getPostByPostId(req.params.id)
    .then((data) => {
      data = JSON.parse(data);
      if (data) {
        if (data.user_id === req.body.user_id) {
          Post.deletePostByID(Number(req.params.id))
            .then((data) => res.status(200).json(req.body))
            .catch((err) => res.status(500).json(err));
        } else {
          res.status(401).json("You can update only your post!");
        }
      } else {
        res.status(404).json("NOT FOUND POST!");
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
