const router = require("express").Router();
const Category = require("../controllers/category");

router.post("/", async (req, res) => {
  const newCat = {
    cat_name: req.body.cat_name,
    cat_desc: req.body.cat_desc,
  };
  Category.createCategory(newCat)
    .then((data) => {
      res.status(200).json(JSON.parse(data));
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/", async (req, res) => {
  const cat_name = req.query.cat;
  if (cat_name) {
    Category.getCategoryByName(cat_name)
      .then((data) => res.status(200).json(JSON.parse(data)))
      .catch((err) => res.status(500).json(err));
  } else {
    Category.getAll()
      .then((data) => res.status(200).json(JSON.parse(data)))
      .catch((err) => res.status(500).json(err));
  }
});

router.get("/:id", async (req, res) => {
  Category.getCategoryByID(req.params.id)
    .then((data) => {
      if (data != "null") {
        res.status(200).json(JSON.parse(data));
      } else {
        res.status(404).json("Not Found");
      }
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
