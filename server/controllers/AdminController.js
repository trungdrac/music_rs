const mongoose = require("mongoose");
const Area = require("../models/Area");
const Artist = require("../models/Artist");
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Category = require("../models/Category");
const Interaction = require("../models/Interaction");

class AdminController {
  // [GET] /admin
  index = (req, res, next) => {
    res.render("layout", { page: "dashboard" });
  };

  // [GET] /admin/user
  indexUser = (req, res, next) => {
    User.find({})
      .then((users) => res.render("layout", { page: "user", users }))
      .catch(next);
  };

  // [DELETE] /admin/user/:id/delete
  deleteUser = (req, res, next) => {
    const userId = req.params.id;
    User.find({ _id: userId, role: "user" })
      .then((user) => {
        if (user.length !== 0) {
          const userPromise = User.deleteOne({ _id: userId }).exec();
          const playlistPromise = Playlist.deleteMany({
            own: mongoose.Types.ObjectId(userId),
          }).exec();
          const interactionPromise = Interaction.deleteMany({
            user: mongoose.Types.ObjectId(userId),
          }).exec();
          Promise.all([userPromise, playlistPromise, interactionPromise])
            .then(() => res.redirect("/admin/user?s=Xóa thành công!"))
            .catch(next);
        } else res.redirect("/admin/user?e=Không thể xóa admin!");
      })
      .catch(next);
  };

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
    const categoryPromise = Category.find({}).exec();
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

  // [GET] /admin/song
  indexSong = (req, res, next) => {
    const songPromise = Song.find({})
      .populate({ path: "artist", select: "name" })
      .populate({ path: "category", select: "name" })
      .exec();
    const categoryPromise = Category.find({}).exec();
    const artistPromise = Artist.find({}).exec();
    Promise.all([songPromise, categoryPromise, artistPromise])
      .then((result) =>
        res.render("layout", {
          page: "song",
          songs: result[0],
          categories: result[1],
          artists: result[2],
        })
      )
      .catch(next);
  };

  // [GET] /admin/song/detail/:id
  detailSong = (req, res, next) => {
    const songId = req.params.id;
    Song.findById(songId)
      .then((song) => res.json(song))
      .catch(next);
  };

  // [POST] /admin/song/create
  createSong = (req, res, next) => {
    const song = req.body;
    Song.create(song)
      .then(() => res.redirect("/admin/song?s=Thêm thành công!"))
      .catch(next);
  };

  // [PUT] /admin/song/:id/update
  updateSong = (req, res, next) => {
    const songId = req.params.id;
    const song = req.body;
    Song.updateOne({ _id: songId }, song)
      .then(() => res.redirect("/admin/song?s=Cập nhật thành công!"))
      .catch(next);
  };

  // [DELETE] /admin/song/:id/delete
  deleteSong = (req, res, next) => {
    const songId = req.params.id;
    const playlistPromsie = Playlist.find({
      song: mongoose.Types.ObjectId(songId),
    }).exec();
    const interactionPromise = Interaction.find({
      song: mongoose.Types.ObjectId(songId),
    }).exec();
    Promise.all([playlistPromsie, interactionPromise])
      .then((result) => {
        if (result[0].length === 0 && result[1].length === 0) {
          Song.deleteOne({ _id: songId })
            .then(() => res.redirect("/admin/song?s=Xoá thành công!"))
            .catch(next);
        } else {
          res.redirect(
            "/admin/song?e=Dữ liệu có liên quan đến playlist và tương tác người dùng. Không thể xóa!"
          );
        }
      })
      .catch(next);
  };

  // [GET] /admin/playlist
  indexPlaylist = (req, res, next) => {
    const playlistPromise = Playlist.find({})
      .populate({ path: "area", select: "name" })
      .populate({ path: "own", select: "username" })
      .populate({ path: "song", select: "title" })
      .exec();
    const areaPromise = Area.find({}).exec();
    const songPromise = Song.find({}).exec();
    Promise.all([playlistPromise, areaPromise, songPromise])
      .then((result) =>
        res.render("layout", {
          page: "playlist",
          playlists: result[0],
          areas: result[1],
          songs: result[2],
        })
      )
      .catch(next);
  };

  // [GET] /admin/playlist/detail/:id
  detailPlaylist = (req, res, next) => {
    const playlistId = req.params.id;
    Playlist.findById(playlistId)
      .then((playlist) => res.json(playlist))
      .catch(next);
  };

  // [POST] /admin/playlist/create
  createPlaylist = (req, res, next) => {
    const playlist = req.body;
    Playlist.create(playlist)
      .then(() => res.redirect("/admin/playlist?s=Thêm thành công!"))
      .catch(next);
  };

  // [PUT] /admin/playlist/:id/update
  updatePlaylist = (req, res, next) => {
    const playlistId = req.params.id;
    const playlist = req.body;
    Playlist.updateOne({ _id: playlistId }, playlist)
      .then(() => res.redirect("/admin/playlist?s=Cập nhật thành công!"))
      .catch(next);
  };

  // [DELETE] /admin/playlist/:id/delete
  deletePlaylist = (req, res, next) => {
    const playlistId = req.params.id;
    Playlist.deleteOne({ _id: playlistId })
      .then(() => res.redirect("/admin/playlist?s=Xoá thành công!"))
      .catch(next);
  };

  // [GET] /admin/artist
  indexArtist = (req, res, next) => {
    const artistPromise = Artist.find({})
      .populate({ path: "area", select: "name" })
      .exec();
    const areaPromise = Area.find({}).exec();
    Promise.all([artistPromise, areaPromise])
      .then((result) =>
        res.render("layout", {
          page: "artist",
          artists: result[0],
          areas: result[1],
        })
      )
      .catch(next);
  };

  // [GET] /admin/artist/detail/:id
  detailArtist = (req, res, next) => {
    const artistId = req.params.id;
    Artist.findById(artistId)
      .then((artist) => res.json(artist))
      .catch(next);
  };

  // [POST] /admin/artist/create
  createArtist = (req, res, next) => {
    const artist = req.body;
    Artist.create(artist)
      .then(() => res.redirect("/admin/artist?s=Thêm thành công!"))
      .catch(next);
  };

  // [PUT] /admin/artist/:id/update
  updateArtist = (req, res, next) => {
    const artistId = req.params.id;
    const artist = req.body;
    Artist.updateOne({ _id: artistId }, artist)
      .then(() => res.redirect("/admin/artist?s=Cập nhật thành công!"))
      .catch(next);
  };

  // [DELETE] /admin/artist/:id/delete
  deleteArtist = (req, res, next) => {
    const artistId = req.params.id;
    Song.find({
      artist: mongoose.Types.ObjectId(artistId),
    })
      .then((result) => {
        if (result.length === 0) {
          Artist.deleteOne({ _id: artistId })
            .then(() => res.redirect("/admin/artist?s=Xoá thành công!"))
            .catch(next);
        } else {
          res.redirect(
            "/admin/artist?e=Dữ liệu có liên quan đến bài hát. Không thể xóa!"
          );
        }
      })
      .catch(next);
  };
}

module.exports = new AdminController();
