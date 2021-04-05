const Song = require("../../models/Song");

function route(app) {
  // [GET] /
  app.get("/playlist", (req, res, next) => {
    Song.find({})
      .then((playlist) => res.send(playlist))
      .catch(next);
  });
}

module.exports = route;
