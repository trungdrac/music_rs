const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.post("/category/create", AdminController.createCategory);
router.post("/category/:id/update", AdminController.updateCategory);
router.get("/category/:id/delete", AdminController.deleteCategory);
router.get("/category", AdminController.indexCategory);

router.get("/area", AdminController.indexArea);

module.exports = router;
