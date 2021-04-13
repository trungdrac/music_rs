const playlist = require("./playlist");
const song = require("./song");
const artist = require("./artist");

function route(app) {
  app.use("/playlist", playlist);
  app.use("/song", song);
  app.use("/artist", artist)
}

module.exports = route;
