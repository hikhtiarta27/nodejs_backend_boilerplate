var _res = require("../config/resConfig")
const Logger = require("../log")
const masterDataRepository = require("../repository/masterDataRepository")

module.exports = {
  getProvinces(req, res) {
    masterDataRepository.getProvinces()
      .then((val) => {
        Logger.debug(req, "email:" + req.body.email + " SUCCESS GET PROVINCES")
        _res.error = false
        _res.message = "Get provinces"
        _res.result = val
        res.status(200).send(_res)
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },

  getCities(req, res) {
    masterDataRepository.getCities()
      .then((val) => {
        Logger.debug(req, "email:" + req.body.email + " SUCCESS GET CITIES")
        _res.error = false
        _res.message = "Get cities"
        _res.result = val
        res.status(200).send(_res)
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },
}
