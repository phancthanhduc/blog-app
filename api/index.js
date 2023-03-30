const express = require("express");
const cors = require("cors");
//const mysql = require("mysql2");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categories");

const app = express();
dotenv.config();
//use cors for cross origin access (CORS standard)
app.use(cors());
//added body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "images");
  },
  filename: (req, res, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded!");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", catRoute);

app.listen("5000", () => {
  console.log("Back end is running...");
});
