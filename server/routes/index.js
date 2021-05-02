const playlist = require("./playlist");
const song = require("./song");
const artist = require("./artist");
const area = require("./area");
const category = require("./category");
const user = require("./user");
const interaction = require("./interaction");
const search = require("./search");

function route(app) {
  app.use("/playlist", playlist);
  app.use("/song", song);
  app.use("/artist", artist);
  app.use("/area", area);
  app.use("/category", category);
  app.use("/user", user);
  app.use("/interaction", interaction);
  app.use("/search", search);
}

module.exports = route;
