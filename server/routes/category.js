const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.get("/create", CategoryController.create);

router.post("/store", CategoryController.store);

module.exports = router;
