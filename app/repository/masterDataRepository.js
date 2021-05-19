const { Province, City } = require("../models")

module.exports = {
  getProvinces() {
    return Province.findAll({
      attributes: ["name"],
      order: [
        ["name", "ASC"]
      ],
    })
  },

  getCities() {
    return City.findAll({
      attributes: ["name"],
      order: [
        [Province, "name", "ASC"],
        ["name", "ASC"],
      ],
      include: {
        model: Province,
        as: "Province",
        attributes: ["name"],
      },
    })
  },
}
