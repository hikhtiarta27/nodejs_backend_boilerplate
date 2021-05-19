var _res = require("../config/resConfig")
const Logger = require("../log")
const masterDataRepository = require("../repository/masterDataRepository")

module.exports = {
  getProvinces(req, res) {
    masterDataRepository.getProvinces()
      .then((val) => {
        let obj = []
        for(let i=0; i<val.length; i++){
          obj.push(val[i].name)
        }
        Logger.debug(req, "email:" + req.body.email + " SUCCESS GET PROVINCES")
        _res.error = false
        _res.message = "Get provinces"
        _res.result = obj
        res.status(200).send(_res)
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },

  getCities(req, res) {
    masterDataRepository.getCities()
      .then((val) => {        
        let obj = {}
        for(let i=0; i<val.length; i++){
          let x = (obj[val[i].Province.name] == undefined ? [] : obj[val[i].Province.name])
          x.push(val[i].name) 
          obj[val[i].Province.name] = x         
        }
        Logger.debug(req, "email:" + req.body.email + " SUCCESS GET CITIES")
        _res.error = false
        _res.message = "Get cities"
        _res.result = obj
        res.status(200).send(_res)
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },
}
