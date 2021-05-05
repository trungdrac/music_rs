const express = require("express");
const router = express.Router();
const PlaylistController = require("../controllers/PlaylistController");

router.get("/detail/:id", PlaylistController.getDetail);

router.get("/:area/count", PlaylistController.countPlaylistArea);

router.get("/:area", PlaylistController.getPlaylistArea);

module.exports = router;
