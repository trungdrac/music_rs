const mongoose = require("mongoose");
const Area = require("../models/Area");
const Artist = require("../models/Artist");
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Category = require("../models/Category");
const Interaction = require("../models/Interaction");

class AdminController {
  // [GET] /admin/login
  login = (req, res, next) => {
    res.render("login");
  };

  // [GET] /admin/logout
  logout = (req, res, next) => {
    req.logout();
    res.redirect("/admin/login");
  };

  // [GET] /admin
  index = (req, res, next) => {
    const countUser = User.countDocuments({ role: "user" }).exec();
    const countSong = Song.countDocuments({}).exec();
    const countPlaylist = Playlist.countDocuments({
      own: mongoose.Types.ObjectId(process.env.MUSICRS_ID),
    }).exec();
    const countArtist = Artist.countDocuments({}).exec();
    Promise.all([countUser, countSong, countPlaylist, countArtist])
      .then((result) => {
        const statistics = {
          countUser: result[0],
          countSong: result[1],
          countPlaylist: result[2],
          countArtist: result[3],
        };
        res.render("layout", { page: "dashboard", statistics });
      })
      .catch(next);
  };

  // [GET] /admin/chart-user
  chartUser = (req, res, next) => {
    const currentMonth = new Date().getMonth();
    let labels = [];
    let months = [];
    let start, end;
    for (let i = 0; i < 12; i++) {
      const d = new Date();
      d.setMonth(currentMonth - i);
      labels.unshift(
        `${
          d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
        }/${d.getFullYear()}`
      );
      months.unshift(
        `${d.getFullYear()}-${
          d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
        }`
      );
      if (i === 0) end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      if (i === 11) start = new Date(d.getFullYear(), d.getMonth(), 1);
    }
    User.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: { month: { $substrCP: ["$createdAt", 0, 7] } },
          count: { $sum: 1 },
        },
      },
    ])
      .sort({ _id: 1 })
      .then((result) => {
        const count = months.map((month, index) => {
          for (let item of result) {
            if (month === item._id.month)
              return { month: labels[index], count: item.count };
          }
          return { month: labels[index], count: 0 };
        });
        res.json(count);
      })
      .catch(next);
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
            .then(() => {
              req.flash("success", "Xóa thành công!");
              res.redirect("/admin/user");
            })
            .catch(next);
        } else {
          req.flash("error", "Không thể xóa admin!");
          res.redirect("/admin/user");
        }
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
      .then(() => {
        req.flash("success", "Thêm thành công!");
        res.redirect("/admin/category");
      })
      .catch(next);
  };

  // [PUT] /admin/category/:id/update
  updateCategory = (req, res, next) => {
    const categoryId = req.params.id;
    const category = req.body;
    Category.updateOne({ _id: categoryId }, category)
      .then(() => {
        req.flash("success", "Cập nhật thành công!");
        res.redirect("/admin/category");
      })
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
            .then(() => {
              req.flash("success", "Xoá thành công!");
              res.redirect("/admin/category");
            })
            .catch(next);
        } else {
          req.flash(
            "error",
            "Dữ liệu có liên quan đến bài hát và khu vực. Không thể xóa!"
          );
          res.redirect("/admin/category");
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
      .then(() => {
        req.flash("success", "Thêm thành công!");
        res.redirect("/admin/area");
      })
      .catch(next);
  };

  // [PUT] /admin/area/:id/update
  updateArea = (req, res, next) => {
    const areaId = req.params.id;
    const area = req.body;
    Area.updateOne({ _id: areaId }, area)
      .then(() => {
        req.flash("success", "Cập nhật thành công!");
        res.redirect("/admin/area");
      })
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
            .then(() => {
              req.flash("success", "Xoá thành công!");
              res.redirect("/admin/area");
            })
            .catch(next);
        } else {
          req.flash(
            "error",
            "Dữ liệu có liên quan đến playlist và nghệ sĩ. Không thể xóa!"
          );
          res.redirect("/admin/area");
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
    song.image = req.file
      ? `${process.env.PROXY}/uploads/${req.file.filename}`
      : process.env.DEFAULT_IMAGE;
    Song.create(song)
      .then(() => {
        req.flash("success", "Thêm thành công!");
        res.redirect("/admin/song");
      })
      .catch(next);
  };

  // [PUT] /admin/song/:id/update
  updateSong = (req, res, next) => {
    const songId = req.params.id;
    const song = req.body;
    if (req.file)
      song.image = `${process.env.PROXY}/uploads/${req.file.filename}`;
    Song.updateOne({ _id: songId }, song)
      .then(() => {
        req.flash("success", "Cập nhật thành công!");
        res.redirect("/admin/song");
      })
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
            .then(() => {
              req.flash("success", "Xoá thành công!");
              res.redirect("/admin/song");
            })
            .catch(next);
        } else {
          req.flash(
            "error",
            "Dữ liệu có liên quan đến playlist và tương tác người dùng. Không thể xóa!"
          );
          res.redirect("/admin/song");
        }
      })
      .catch(next);
  };

  // [GET] /admin/playlist
  indexPlaylist = (req, res, next) => {
    const playlistPromise = Playlist.find({
      own: mongoose.Types.ObjectId(process.env.MUSICRS_ID),
    })
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
    playlist.image = req.file
      ? `${process.env.PROXY}/uploads/${req.file.filename}`
      : process.env.DEFAULT_IMAGE;
    Playlist.create(playlist)
      .then(() => {
        req.flash("success", "Thêm thành công!");
        res.redirect("/admin/playlist");
      })
      .catch(next);
  };

  // [PUT] /admin/playlist/:id/update
  updatePlaylist = (req, res, next) => {
    const playlistId = req.params.id;
    const playlist = req.body;
    if (req.file)
      playlist.image = `${process.env.PROXY}/uploads/${req.file.filename}`;
    Playlist.updateOne({ _id: playlistId }, playlist)
      .then(() => {
        req.flash("success", "Cập nhật thành công!");
        res.redirect("/admin/playlist");
      })
      .catch(next);
  };

  // [DELETE] /admin/playlist/:id/delete
  deletePlaylist = (req, res, next) => {
    const playlistId = req.params.id;
    Playlist.deleteOne({ _id: playlistId })
      .then(() => {
        req.flash("success", "Xoá thành công!");
        res.redirect("/admin/playlist");
      })
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
    artist.image = req.file
      ? `${process.env.PROXY}/uploads/${req.file.filename}`
      : process.env.DEFAULT_IMAGE;
    Artist.create(artist)
      .then(() => {
        req.flash("success", "Thêm thành công!");
        res.redirect("/admin/artist");
      })
      .catch(next);
  };

  // [PUT] /admin/artist/:id/update
  updateArtist = (req, res, next) => {
    const artistId = req.params.id;
    const artist = req.body;
    if (req.file)
      artist.image = `${process.env.PROXY}/uploads/${req.file.filename}`;
    Artist.updateOne({ _id: artistId }, artist)
      .then(() => {
        req.flash("success", "Cập nhật thành công!");
        res.redirect("/admin/artist");
      })
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
            .then(() => {
              req.flash("success", "Xoá thành công!");
              res.redirect("/admin/artist");
            })
            .catch(next);
        } else {
          req.flash(
            "error",
            "Dữ liệu có liên quan đến bài hát. Không thể xóa!"
          );
          res.redirect("/admin/artist");
        }
      })
      .catch(next);
  };
}

module.exports = new AdminController();
