class UserController {
  // [POST] /user/register
  register = (req, res, next) => {
    res.json("REGISTER");
  };

  // [POST] /user/login
  login = (req, res, next) => {
    res.json("LOGIN");
  };
}

module.exports = new UserController();
