const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  //authorization: `<type> ${token}`
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Bạn phải đăng nhập trước!" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.APP_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: "Bạn phải đăng nhập trước!" });
    }
    const { userId } = payload;
    User.findById(userId)
      .then((userdata) => {
        if (userdata) {
          req.user = userdata;
          next();
        } else
          return res
            .status(401)
            .json({ message: "Tài khoản không tồn tại hoặc đã bị xóa!" });
      })
      .catch(next);
  });
};
