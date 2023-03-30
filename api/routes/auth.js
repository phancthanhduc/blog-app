const router = require("express").Router();
const User = require("../controllers/user");
const bcrypt = require("bcryptjs");

//REGISTER
router.post("/register", async (req, res) => {
  let hashedPass;
  if (req.body.passwords !== null) {
    const salt = await bcrypt.genSalt(10);

    hashedPass = await bcrypt.hash(req.body.passwords, salt);
  }
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    passwords: hashedPass,
  };

  User.createUser(newUser.username, newUser.email, newUser.passwords)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});

//LOGIN

router.post("/login", async (req, res) => {
  User.userLogin(req.body.username)
    .then(async (data) => {
      const { passwords, ...others } = JSON.parse(data);
      !data && res.status(400).json("Wrong credentials!");
      bcrypt.compare(req.body.passwords, passwords, (err, result) => {
        !result
          ? res.status(400).json("Wrong credentials!")
          : res.status(200).json(others);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
