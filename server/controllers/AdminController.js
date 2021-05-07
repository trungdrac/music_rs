const mongoose = require("mongoose");
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

  // [GET] /admin/category/detail/:id
  detailCategory = (req, res, next) => {
    const categoryId = req.params.id;
    Category.findById(categoryId)
      .then((category) => res.json(category))
      .catch(next);
  };

  // [POST] /admin/category/create
  createCategory = (req, res, next) => {
    const category = req.body;
    Category.create(category)
      .then(() => res.redirect("/admin/category?s=Thêm thành công!"))
      .catch(next);
  };

  // [PUT] /admin/category/:id/update
  updateCategory = (req, res, next) => {
    const categoryId = req.params.id;
    const category = req.body;
    Category.updateOne({ _id: categoryId }, category)
      .then(() => res.redirect("/admin/category?s=Cập nhật thành công!"))
      .catch(next);
  };

  // [DELETE] /admin/category/:id/delete
  deleteCategory = (req, res, next) => {
    const categoryId = req.params.id;
    const songPromsie = Song.find({
      category: mongoose.Types.ObjectId(categoryId),
    }).exec();
    const areaPromise = Area.find({
      category: mongoose.Types.ObjectId(categoryId),
    }).exec();
    Promise.all([songPromsie, areaPromise])
      .then((result) => {
        if (result[0].length === 0 && result[1].length === 0) {
          Category.deleteOne({ _id: categoryId })
            .then(() => res.redirect("/admin/category?s=Xoá thành công!"))
            .catch(next);
        } else {
          res.redirect(
            "/admin/category?e=Dữ liệu có liên quan đến bài hát và khu vực. Không thể xóa!"
          );
        }
      })
      .catch(next);
  };

  // [GET] /admin/area
  indexArea = (req, res, next) => {
    const areaPromise = Area.find({})
      .populate({ path: "category", select: "name" })
      .exec();
    const categoryPromise = Category.find({}).sort({ name: 1 }).exec();
    Promise.all([areaPromise, categoryPromise])
      .then((result) =>
        res.render("layout", {
          page: "area",
          areas: result[0],
          categories: result[1],
        })
      )
      .catch(next);
  };

  // [GET] /admin/area/detail/:id
  detailArea = (req, res, next) => {
    const areaId = req.params.id;
    Area.findById(areaId)
      .then((area) => res.json(area))
      .catch(next);
  };

  // [POST] /admin/area/create
  createArea = (req, res, next) => {
    const area = req.body;
    Area.create(area)
      .then(() => res.redirect("/admin/area?s=Thêm thành công!"))
      .catch(next);
  };

  // [PUT] /admin/area/:id/update
  updateArea = (req, res, next) => {
    const areaId = req.params.id;
    const area = req.body;
    Area.updateOne({ _id: areaId }, area)
      .then(() => res.redirect("/admin/area?s=Cập nhật thành công!"))
      .catch(next);
  };

  // [DELETE] /admin/area/:id/delete
  deleteArea = (req, res, next) => {
    const areaId = req.params.id;
    const playlistPromsie = Playlist.find({
      area: mongoose.Types.ObjectId(areaId),
    }).exec();
    const artistPromise = Artist.find({
      area: mongoose.Types.ObjectId(areaId),
    }).exec();
    Promise.all([playlistPromsie, artistPromise])
      .then((result) => {
        if (result[0].length === 0 && result[1].length === 0) {
          Area.deleteOne({ _id: areaId })
            .then(() => res.redirect("/admin/area?s=Xoá thành công!"))
            .catch(next);
        } else {
          res.redirect(
            "/admin/area?e=Dữ liệu có liên quan đến playlist và nghệ sỹ. Không thể xóa!"
          );
        }
      })
      .catch(next);
  };
}

module.exports = new AdminController();
