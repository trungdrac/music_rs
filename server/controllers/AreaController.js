const Area = require("../models/Area");
require("../models/Category");

class AreaController {
  // [GET] /area
  getAll = (req, res, next) => {
    Area.find({})
      .populate({ path: "category" })
      .exec((err, areas) => {
        if (err) {
          next;
        } else {
          res.json(areas);
        }
      });
  };
}

module.exports = new AreaController();
