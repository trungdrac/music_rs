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

  // [GET] /playlist/:area/
  getPlaylistArea = (req, res, next) => {
    const areaId = req.params.area;
    Playlist.find({ area: areaId }, "title image song")
      .sort({ _id: 1 })
      .limit(24)
      .exec((err, playlists) => {
        if (err) {
          next;
        } else {
          res.json(playlists);
        }
      });
  };
}

module.exports = new PlaylistController();
