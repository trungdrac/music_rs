const express = require("express");
const router = express.Router();
const InteractionController = require("../controllers/InteractionController");
const requireLogin = require("../middleware/requireLogin");

router.get("/detail", requireLogin, InteractionController.getDetail);

router.get("/like", requireLogin, InteractionController.toggleLike);

module.exports = router;
