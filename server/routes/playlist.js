const express = require("express");
const router = express.Router();
const PlaylistController = require("../controllers/PlaylistController");

router.get("/detail/:id", PlaylistController.getDetail);

module.exports = router;
