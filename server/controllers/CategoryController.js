const Category = require("../models/Category");

class CategoryController {
  // [GET] /category/create
  create = (req, res, next) => {
    next();
  };

  // [POST] /category/store
  store = (req, res, next) => {
    const category = new Category({ name: "Electronica/Dance" });
    category.save((err) => {
      if (err) console.log(err);
      res.send("Success!");
    });
  };
}

module.exports = new CategoryController();
