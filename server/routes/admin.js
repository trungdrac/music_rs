const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.post("/category/create", AdminController.createCategory);
router.post("/category/:id/update", AdminController.updateCategory);
router.get("/category/:id/delete", AdminController.deleteCategory);
router.get("/category/detail/:id", AdminController.detailCategory);
router.get("/category", AdminController.indexCategory);

router.post("/area/create", AdminController.createArea);
router.post("/area/:id/update", AdminController.updateArea);
router.get("/area/:id/delete", AdminController.deleteArea);
router.get("/area/detail/:id", AdminController.detailArea);
router.get("/area", AdminController.indexArea);

module.exports = router;
