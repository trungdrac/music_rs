const playlist = require("./playlist");
const song = require("./song");
const artist = require("./artist");
const area = require("./area");


function route(app) {
  app.use("/playlist", playlist);
  app.use("/song", song);
  app.use("/artist", artist),
  app.use("/area", area)
}

module.exports = route;
