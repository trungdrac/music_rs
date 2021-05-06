const Area = require("../models/Area");
const Artist = require("../models/Artist");
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Category = require("../models/Category");

class AdminController {
  // [GET] /admin/category
  indexCategory = (req, res, next) => {
    Category.find({})
      .then((categories) =>
        res.render("layout", { page: "category", categories })
      )
      .catch(next);
  };

  // [POST] /admin/category/create
  createCategory = (req, res, next) => {
    const category = req.body;
    Category.create(category)
      .then(() => res.redirect("back"))
      .catch(next);
  };

  // [PUT] /admin/category/:id/update
  updateCategory = (req, res, next) => {
    next();
  };

  // [DELETE] /admin/category/:id/delete
  deleteCategory = (req, res, next) => {
    Category.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);


    // can check xem area va song co category do ko
  };

  // [GET] /admin/area
  indexArea = (req, res, next) => {
    Area.find({})
      .populate({ path: "category", select: "name" })
      .then((areas) => res.render("layout", { page: "area", areas }))
      .catch(next);
  };
}

module.exports = new AdminController();
