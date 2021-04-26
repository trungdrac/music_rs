const express = require("express");
const router = express.Router();
const SongController = require("../controllers/SongController");

router.get("/detail/:id", SongController.getDetail);

router.get("/:area/:category", SongController.getSongCategory);

router.get("/", SongController.getAll);

module.exports = router;