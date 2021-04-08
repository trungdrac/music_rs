const playlist = require("./playlist");
const song = require("./song");

function route(app) {
  app.use("/playlist", playlist);
  app.use("/song", song);
}

module.exports = route;
