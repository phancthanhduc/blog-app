const router = require("express").Router();
const User = require("../controllers/user");
const Post = require("../controllers/post");
const bcrypt = require("bcryptjs");

//GET
router.get("/:id", async (req, res) => {
  User.getOneByID(req.params.id)
    .then((data) => {
      if (data != "null") {
        const { passwords, ...others } = JSON.parse(data);
        res.status(200).json(others);
      } else {
        res.status(404).json("Not Found");
      }
    })
    .catch((err) => res.status(500).json(err));
});

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.user_id == req.params.id) {
    if (req.body.passwords) {
      const salt = await bcrypt.genSalt(10);
      req.body.passwords = await bcrypt.hash(req.body.passwords, salt);
    }
    const { user_id, ...updateValues } = req.body;
    User.userUpdateByID(req.params.id, updateValues)
      .then((data) => res.status(200).json(req.body))
      .catch((err) => res.status(500).json(err));
  } else {
    res.status(401).json("You can update only your account");
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  if (req.body.user_id === req.params.id) {
    Post.deleteAllPostByUserId(req.body.user_id)
      .then((data) => {
        User.userDeleteByID(req.params.id)
          .then(async (data) => {
            res.status(200).json("User has been deleted!!!");
          })

          .catch((err) => {
            res.status(500).json(err);
          });
      })
      .catch((err) => res.status(500).json(err));
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

module.exports = router;
