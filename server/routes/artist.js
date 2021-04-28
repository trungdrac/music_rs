const express = require("express");
const router = express.Router();
const ArtistController = require("../controllers/ArtistController");

router.get("/detail/:id", ArtistController.getDetail);

router.get("/:area", ArtistController.getArtistArea);

module.exports = router;
