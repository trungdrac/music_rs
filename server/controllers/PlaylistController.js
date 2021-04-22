const Playlist = require("../models/Playlist");
require("../models/Song");
require("../models/User");
require("../models/Artist");

class PlaylistController {
  //[GET] /playlist/detail/:id
  getDetail = (req, res, next) => {
    const playlistId = req.params.id;
    Playlist.findById(playlistId)
      .populate("song")
      .populate("own")
      .exec((err, playlist) => {
        if (err) {
          console.log(err);
        } else {
          res.json(playlist);
        }
      });
  };
}

module.exports = new PlaylistController();
