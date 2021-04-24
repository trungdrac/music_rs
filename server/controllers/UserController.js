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
          });
        }
      })
      .catch(() => {
        res.status(401).json({
          message: "Tên đăng nhập không chính xác!",
        });
      });
  };
}

module.exports = new UserController();
