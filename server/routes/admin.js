const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

function requireAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/admin/login");
  }
}

router.get("/login", AdminController.login);

passport.use(
  "local",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username, role: "admin" }, (err, user) => {
        if (err) return done(err);
        if (!user)
          return done(
            null,
            false,
            req.flash("error", "Tên đăng nhập không chính xác!")
          );
        if (!bcrypt.compareSync(password, user.password))
          return done(
            null,
            false,
            req.flash("error", "Mật khẩu không chính xác!")
          );
        return done(null, user, req.flash("success", "Đăng nhập thành công!"));
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  User.findById(user._id)
    .then((user) => done(null, user))
    .catch((err) => console.log(err));
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/admin/login",
    badRequestMessage: "Vui lòng nhập đầy đủ thông tin!",
    failureFlash: true,
  })
);

router.get("/logout", AdminController.logout);

router.get("/user/:id/delete", requireAdmin, AdminController.deleteUser);
router.get("/user", requireAdmin, AdminController.indexUser);

router.post("/category/create", requireAdmin, AdminController.createCategory);
router.post(
  "/category/:id/update",
  requireAdmin,
  AdminController.updateCategory
);
router.get(
  "/category/:id/delete",
  requireAdmin,
  AdminController.deleteCategory
);
router.get(
  "/category/detail/:id",
  requireAdmin,
  AdminController.detailCategory
);
router.get("/category", requireAdmin, AdminController.indexCategory);

router.post("/area/create", requireAdmin, AdminController.createArea);
router.post("/area/:id/update", requireAdmin, AdminController.updateArea);
router.get("/area/:id/delete", requireAdmin, AdminController.deleteArea);
router.get("/area/detail/:id", requireAdmin, AdminController.detailArea);
router.get("/area", requireAdmin, AdminController.indexArea);

router.post("/song/create", requireAdmin, AdminController.createSong);
router.post("/song/:id/update", requireAdmin, AdminController.updateSong);
router.get("/song/:id/delete", requireAdmin, AdminController.deleteSong);
router.get("/song/detail/:id", requireAdmin, AdminController.detailSong);
router.get("/song", requireAdmin, AdminController.indexSong);

router.post("/playlist/create", requireAdmin, AdminController.createPlaylist);
router.post(
  "/playlist/:id/update",
  requireAdmin,
  AdminController.updatePlaylist
);
router.get(
  "/playlist/:id/delete",
  requireAdmin,
  AdminController.deletePlaylist
);
router.get(
  "/playlist/detail/:id",
  requireAdmin,
  AdminController.detailPlaylist
);
router.get("/playlist", requireAdmin, AdminController.indexPlaylist);

router.post("/artist/create", requireAdmin, AdminController.createArtist);
router.post("/artist/:id/update", requireAdmin, AdminController.updateArtist);
router.get("/artist/:id/delete", requireAdmin, AdminController.deleteArtist);
router.get("/artist/detail/:id", requireAdmin, AdminController.detailArtist);
router.get("/artist", requireAdmin, AdminController.indexArtist);

router.get("/chart-user", requireAdmin, AdminController.chartUser);
router.get("/", requireAdmin, AdminController.index);

module.exports = router;
