const Area = require("../models/Area");
require("../models/Category");

class AreaController {
  // [GET] /area
  getAll = (req, res, next) => {
    Area.find({}, "name category")
      .populate({ path: "category", select: "name" })
      .then((areas) => res.json(areas))
      .catch(next);
  };
}

module.exports = new AreaController();
