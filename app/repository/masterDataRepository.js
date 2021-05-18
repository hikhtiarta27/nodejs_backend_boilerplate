const { Province, City } = require("../models")

module.exports = {
  getProvinces() {
    return Province.findAll({
      attributes: [["name", "province"]],
    })
  },

  getCities() {
    return City.findAll({
      attributes: ["name"],
      include: {
        model: Province,
        as: "Province",
        attributes: ["name"],
      },
    })
  },
}
