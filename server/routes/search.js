const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/SearchController");

router.get("/:type", SearchController.search);

router.get("/", SearchController.suggest);

module.exports = router;
