const express = require("express");
const router = express.Router();

const Playlist = require("../../models/Playlist");
require("../../models/Song");
require("../../models/User");
require("../../models/Artist");

// [GET] /playlist
router.get("/", (req, res, next) => {
  // Playlist.find({})
  //   .then((playlist) => res.send(playlist))
  //   .catch(next);

  Playlist.find({ $text: { $search: "Playlist hay" } })
    .populate({
      path: "song",
      populate: {
        path: "artist",
        select: "name",
      },
    })
    .exec((err, playlist) => {
      if (err) {
        console.log(err);
      } else {
        res.send(playlist[0]);
      }
    });
});

//[GET] /playlist/:id
router.get("/playlist/:id", (req, res, next) => {
  const playlistId = req.params.id;
  Playlist.findById(playlistId)
    .populate("song")
    .populate("own")
    .exec((err, playlist) => {
      if (err) {
        console.log(err);
      } else {
        res.send(playlist);
      }
    });
});

module.exports = router;
