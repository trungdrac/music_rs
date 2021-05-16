const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const requireLogin = require("../middleware/requireLogin");

router.post("/register", UserController.register);

router.post("/register/existed", UserController.checkExisted);

router.post("/login", UserController.login);

router.post("/forgot-password", UserController.forgotPassWord);

router.post("/reset-password", UserController.resetPassword);

router.get("/:id/liked-song", requireLogin, UserController.getLikedSong);

router.get(
  "/:id/liked-song/count",
  requireLogin,
  UserController.countLikedSong
);

router.get("/:id/my-playlist", requireLogin, UserController.getPlaylist);

router.get("/:id/my-playlist/all", requireLogin, UserController.getPlaylistAll);

router.get(
  "/:id/my-playlist/count",
  requireLogin,
  UserController.countPlaylist
);

router.post(
  "/:id/my-playlist/create",
  requireLogin,
  UserController.createPlaylist
);

router.get(
  "/my-playlist/:playlistId/add/:songId",
  requireLogin,
  UserController.addToPlaylist
);

router.post(
  "/my-playlist/update/:playlistId",
  requireLogin,
  UserController.updatePlaylist
);

router.get(
  "/my-playlist/delete/:playlistId",
  requireLogin,
  UserController.deletePlaylist
);

module.exports = router;
