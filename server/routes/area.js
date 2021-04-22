const express = require("express");
const router = express.Router();
const AreaController = require("../controllers/AreaController");

router.get("/", AreaController.getAll);

module.exports = router;
