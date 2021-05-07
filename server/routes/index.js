const playlist = require("./playlist");
const song = require("./song");
const artist = require("./artist");
const area = require("./area");
const user = require("./user");
const interaction = require("./interaction");
const search = require("./search");
const admin = require("./admin");

function route(app) {
  app.use("/playlist", playlist);
  app.use("/song", song);
  app.use("/artist", artist);
  app.use("/area", area);
  app.use("/user", user);
  app.use("/interaction", interaction);
  app.use("/search", search);
  app.use("/admin", admin);
}

module.exports = route;
