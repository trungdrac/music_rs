const User = require("../models/User");
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
          username: user.username,
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
          user.resetToken = token;
          user.expireToken = Date.now() + 3600000; // 1 hours
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
              res.json({ message: "Kiểm tra emaail của bạn!" });
            })
            .catch(next);
        })
        .catch(next);
    });
  };

  // [POST] user/reset-password
  resetPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const token = req.body.resetToken;
    User.findOne({ resetToken: token, expireToken: { $gt: Date.now() } })
      .then((user) => {
        if (!user) {
          return res
            .status(422)
            .json({ message: "Link hết hạn, hãy thử lại!" });
        }
        user.password = newPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user
          .save()
          .then(() => {
            res.json({ message: "Cập nhật mật khẩu thành công!" });
          })
          .catch(next);
      })
      .catch(next);
  };
}

module.exports = new UserController();
