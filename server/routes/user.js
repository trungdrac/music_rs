const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/register", UserController.register);

router.post("/register/existed", UserController.checkExisted);

router.post("/login", UserController.login);

router.post("/forgot-password", UserController.forgotPassWord);

router.post("/reset-password", UserController.resetPassword);

module.exports = router;
