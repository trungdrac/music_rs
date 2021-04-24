const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
          username: user.username,
          userToken,
        });
      })
      .catch(() => {
        res.json({});
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
            username: user.username,
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
}

module.exports = new UserController();
