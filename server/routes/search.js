const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/SearchController");

router.get("/:type", SearchController.search);

router.get("/count/:type", SearchController.count);

router.get("/", SearchController.suggest);

module.exports = router;
