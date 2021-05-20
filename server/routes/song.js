const express = require("express");
const router = express.Router();
const SongController = require("../controllers/SongController");

router.get("/detail/:id", SongController.getDetail);

router.get("/:area/:category/count", SongController.countSongCategory);

router.get("/:area/:category", SongController.getSongCategory);

router.get("/:id/playing/update", SongController.updatePlaying);

router.get("/chart", SongController.chart);

module.exports = router;
