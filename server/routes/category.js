const express = require("express");
const router = express.Router();

const Category = require("../models/Category");


router.get("/create", (req, res, next) => {
    next();
  });

// [POST] /category/store
// router.post("/store", (req, res, next) => {
//   const category = new Category({ name: "Electronica/Dance" });
//   category.save((err) => {
//     if (err) console.log(err);;
//     res.send("Success!")
//   });
// });

module.exports = router;
