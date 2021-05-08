const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.get("/user/:id/delete", AdminController.deleteUser);
router.get("/user", AdminController.indexUser);

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

router.post("/song/create", AdminController.createSong);
router.post("/song/:id/update", AdminController.updateSong);
router.get("/song/:id/delete", AdminController.deleteSong);
router.get("/song/detail/:id", AdminController.detailSong);
router.get("/song", AdminController.indexSong);

router.post("/playlist/create", AdminController.createPlaylist);
router.post("/playlist/:id/update", AdminController.updatePlaylist);
router.get("/playlist/:id/delete", AdminController.deletePlaylist);
router.get("/playlist/detail/:id", AdminController.detailPlaylist);
router.get("/playlist", AdminController.indexPlaylist);

router.post("/artist/create", AdminController.createArtist);
router.post("/artist/:id/update", AdminController.updateArtist);
router.get("/artist/:id/delete", AdminController.deleteArtist);
router.get("/artist/detail/:id", AdminController.detailArtist);
router.get("/artist", AdminController.indexArtist);

router.get("/", AdminController.index);

module.exports = router;
