const mongoose = require("mongoose");
const Interaction = require("../models/Interaction");
require("../models/User");
require("../models/Song");

class InteractionController {
  // [GET] /interaction/detail?user=song=
  getDetail = (req, res, next) => {
    const userId = req.query.user;
    const songId = req.query.song;
    Interaction.findOne({
      user: mongoose.Types.ObjectId(userId),
      song: mongoose.Types.ObjectId(songId),
    })
      .then((result) => {
        if (result) res.json(result);
        else {
          Interaction.create({ user: userId, song: songId })
            .then((result) => res.json(result))
            .catch(next);
        }
      })
      .catch(next);
  };

  // [GET] /interaction/like?user=song=
  toggleLike = (req, res, next) => {
    const userId = req.query.user;
    const songId = req.query.song;
    Interaction.findOne({
      user: mongoose.Types.ObjectId(userId),
      song: mongoose.Types.ObjectId(songId),
    })
      .then((result) => {
        result.like = !result.like;
        result
          .save()
          .then((newResult) => res.json(newResult))
          .catch(next);
      })
      .catch(next);
  };
}

module.exports = new InteractionController();
