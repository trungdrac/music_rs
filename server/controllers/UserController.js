const mongoose = require("mongoose");
const User = require("../models/User");
const Playlist = require("../models/Playlist");
const Interaction = require("../models/Interaction");
const Song = require("../models/Song");
const {
  NUMBER_OF_ITEM_PER_PAGE,
} = require("../../client/src/constants/Config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

class UserController {
  // [POST] /user/register
  register = (req, res, next) => {
    User.create(req.body)
      .then((user) => {
        const userToken = jwt.sign(
          { userId: user._id },
          process.env.APP_SECRET
        );
        res.status(200).json({
          userId: user._id,
          username: user.username,
          email: user.email,
          userToken,
        });
      })
      .catch(() => {
        res.status(422).json({ message: "Đăng ký thất bại!" });
      });
  };

  // [POST] /user/register/existed
  checkExisted = (req, res, next) => {
    if (req.body.username)
      User.findOne({ username: req.body.username })
        .then((user) => {
          if (user) {
            res.json({
              message: "Tên đăng nhập đã tồn tại!",
              field: "username",
            });
          } else {
            res.json({ message: "", field: "username" });
          }
        })
        .catch(next);
    if (req.body.email)
      User.findOne({ email: req.body.email })
        .then((email) => {
          if (email) {
            res.json({ message: "Email đã tồn tại!", field: "email" });
          } else {
            res.json({ message: "", field: "email" });
          }
        })
        .catch(next);
  };

  // [POST] /user/login
  login = (req, res, next) => {
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const userToken = jwt.sign(
            { userId: user._id },
            process.env.APP_SECRET
          );
          res.status(200).json({
            userId: user._id,
            username: user.username,
            email: user.email,
            userToken,
          });
        } else {
          res.status(401).json({
            message: "Mật khẩu không chính xác!",
            field: "password",
          });
        }
      })
      .catch(() => {
        res.status(401).json({
          message: "Tên đăng nhập không chính xác!",
          field: "username",
        });
      });
  };

  // [POST] /user/:id/update-profile
  updateProfile = (req, res, next) => {
    const userId = req.params.id;
    User.findOne({ _id: userId })
      .then((user) => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          user.username = req.body.username;
          user.email = req.body.email;
          const { authorization } = req.headers;
          const userToken = authorization.split(" ")[1];
          user
            .save()
            .then((user) => {
              res.status(200).json({
                userId: user._id,
                username: user.username,
                email: user.email,
                userToken,
              });
            })
            .catch(next);
        } else {
          res.status(401).json({
            message: "Mật khẩu không chính xác!",
            field: "password",
          });
        }
      })
      .catch(next);
  };

  // [POST] /user/forgot-password
  forgotPassWord = (req, res, next) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
      // Transport Layer Security
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
      }
      const token = buffer.toString("hex");
      User.findOne({ email: req.body.email })
        .then((user) => {
          user.resettoken = token;
          user.expiretoken = Date.now() + 3600000; // 1 hours
          user
            .save()
            .then(() => {
              transporter.sendMail({
                from: process.env.MAIL,
                to: user.email,
                subject: "password reset",
                html: `
                  <p>Bạn đã yêu cầu thay đổi mật khẩu tại MusicRS !</p>
                  <p>Nhấp vào <a href="http://localhost:3000/reset-password/${token}">đây</a> để thay đổi lại mật khẩu!</p>
                  `,
              });
              res.json({ message: "Kiểm tra email của bạn!" });
            })
            .catch(next);
        })
        .catch(next);
    });
  };

  // [POST] user/reset-password
  resetPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const token = req.body.resettoken;
    User.findOne({ resettoken: token, expiretoken: { $gt: Date.now() } })
      .then((user) => {
        if (!user) {
          return res
            .status(422)
            .json({ message: "Link hết hạn, hãy thử lại!" });
        }

        user.password = newPassword;
        user.resettoken = undefined;
        user.expiretoken = undefined;
        user
          .save()
          .then(() => {
            res.json({ message: "Cập nhật mật khẩu thành công!" });
          })
          .catch(next);
      })
      .catch(next);
  };

  // [GET] /user/:id/liked?page=
  getLikedSong = (req, res, next) => {
    const { page } = req.query;
    const userId = req.params.id;
    Interaction.find(
      { user: mongoose.Types.ObjectId(userId), like: true },
      "song -_id"
    )
      .populate({
        path: "song",
        select: "title artist image url",
        populate: {
          path: "artist",
          select: "name",
        },
      })
      .sort({ updatedAt: -1 })
      .skip(NUMBER_OF_ITEM_PER_PAGE * (page - 1))
      .limit(NUMBER_OF_ITEM_PER_PAGE)
      .then((results) => {
        const songs = results.map((result) => result.song);
        res.json(songs);
      })
      .catch(next);
  };

  // [GET] /user/:id/liked/count
  countLikedSong = (req, res, next) => {
    const userId = req.params.id;
    Interaction.countDocuments({
      user: mongoose.Types.ObjectId(userId),
      like: true,
    })
      .then((count) => res.json(count))
      .catch(next);
  };

  // [GET] /user/:id/my-playlist?page=
  getPlaylist = (req, res, next) => {
    const userId = req.params.id;
    const { page } = req.query;
    Playlist.find({ own: mongoose.Types.ObjectId(userId) }, "title image song")
      .populate({
        path: "song",
        select: "title artist image url",
        populate: {
          path: "artist",
          select: "name",
        },
      })
      .sort({ createdAt: -1 })
      .skip(NUMBER_OF_ITEM_PER_PAGE * (page - 1))
      .limit(NUMBER_OF_ITEM_PER_PAGE)
      .then((playlists) => res.json(playlists))
      .catch(next);
  };

  // [GET] /user/:id/my-playlist/all
  getPlaylistAll = (req, res, next) => {
    const userId = req.params.id;
    Playlist.find(
      { own: mongoose.Types.ObjectId(userId) },
      "title song updatedAt"
    )
      .sort({ createdAt: -1 })
      .then((playlists) => res.json(playlists))
      .catch(next);
  };

  // [GET] /user/:id/my-playlist/count
  countPlaylist = (req, res, next) => {
    const userId = req.params.id;
    Playlist.countDocuments({ own: mongoose.Types.ObjectId(userId) })
      .then((count) => res.json(count))
      .catch(next);
  };

  // [GET] /user/my-playlist/:playlistId/add/:songId
  addToPlaylist = (req, res, next) => {
    const { playlistId, songId } = req.params;
    Playlist.findById(playlistId)
      .then((playlist) => {
        if (playlist.song.includes(songId))
          res.json({ error: "Bài hát đã tồn tại trong playlist!" });
        else {
          playlist.song.push(songId);
          playlist
            .save()
            .then((result) =>
              res.json({
                success: `Đã thêm bài hát vào playlist "${result.title}"`,
              })
            )
            .catch(next);
        }
      })
      .catch(next);
  };

  // [POST] /user/:id/my-playlist/create
  createPlaylist = (req, res, next) => {
    const userId = req.params.id;
    const playlist = req.body;
    Playlist.findOne({
      own: mongoose.Types.ObjectId(userId),
      title: playlist.title,
    })
      .then((result) => {
        if (result) res.json({ error: "Tên playlist đã tồn tại!" });
        else {
          playlist.image = "/images/song-image-default/default.jpg";
          playlist.own = userId;
          Playlist.create(playlist)
            .then(() => res.json({ success: "Tạo playlist mới thành công!" }))
            .catch(next);
        }
      })
      .catch(next);
  };

  // [PUT] /user/my-playlist/update/:playlistId
  updatePlaylist = (req, res, next) => {
    const { playlistId } = req.params;
    const data = req.body;
    Playlist.findById(playlistId)
      .then((result) => {
        result.song = data.songIds;
        result
          .save()
          .then(() => {
            Playlist.findById(playlistId)
              .populate({
                path: "song",
                select: "title artist image url",
              })
              .then((result) => res.json(result))
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  };

  // [DELETE] /user/my-playlist/delete/:playlistId
  deletePlaylist = (req, res, next) => {
    const { playlistId } = req.params;
    Playlist.deleteOne({
      _id: mongoose.Types.ObjectId(playlistId),
    })
      .then(() => res.json({ success: "Đã xóa playlist!" }))
      .catch(next);
  };

  // [GET] /user/:id/recommend
  recommend = (req, res, next) => {
    const userId = req.params.id;
    Interaction.find({ user: userId, playing: { $gt: 0 } })
      .then((result) => {
        if (!result.length) next();
        else {
          const spawn = require("child_process").spawn;
          const recommend = spawn(
            `${process.env.RECOMMEND_URI}/${process.env.VIRTUALENV}/bin/python`,
            [`${process.env.RECOMMEND_URI}/recommend.py`, userId]
          );
          recommend.stdout.on("data", (data) => {
            const recommendation = Object.values(
              JSON.parse(data.toString()).song
            );
            Song.find(
              { _id: { $in: recommendation } },
              "title artist image url"
            )
              .populate({ path: "artist", select: "name" })
              .then((result) => res.json(result))
              .catch(next);
          });

          recommend.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
          });

          recommend.on("close", (code) => {
            console.log(`recommend.py exited with code ${code}`);
          });
        }
      })
      .catch(next);
  };

  // [POST] /user/download
  download = (req, res, next) => {
    res.json(req.body.link);
  };
}

module.exports = new UserController();
