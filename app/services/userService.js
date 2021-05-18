const userRepository = require("../repository/userRepository")
const { stringToPhoneNumber, dateToString } = require("../helper")
const Logger = require("../log")
var _res = require("../config/resConfig")

module.exports = {
  getUserProfile(req, res) {
    userRepository
      .get(req.body.email)
      .then((val) => {
        let obj = null
        if (val != null) {
          obj = {
            id: val.id,
            name: val.name,
            email: val.email,
            address: val.address,
            phoneNumber: {
              raw: val.phoneNumber,
              format: stringToPhoneNumber(val.phoneNumber),
            },
            createdAt: dateToString(val.createdAt),
            updatedAt: dateToString(val.updatedAt),
          }
        }
        Logger.debug(req, "email:" + req.body.email + " SUCCESS GET USER")
        _res.error = false
        _res.message = "Get user"
        _res.result = obj
        res.status(200).send(_res)
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },

  updateUser(req, res) {
    userRepository
      .get(req.body.email)
      .then((val) => {
        if (val == null) {
          Logger.debug(
            req,
            "email:" + req.body.email + " FAILED USER NOT FOUND"
          )
          _res.error = true
          _res.message = "Failed user not found"
          _res.result = null
          res.status(401).send(_res)
        } else {
          userRepository
            .update(req.body, req.body.email)
            .then((val) => {
              Logger.debug(
                req,
                "email:" + req.body.email + " SUCCESS UPDATE USER"
              )
              _res.error = false
              _res.message = "Update user successfully"
              _res.result = null
              res.status(200).send(_res)
            })
            .catch((err) => {
              res.status(500).send(err.message)
            })
        }
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },

  deleteUser(req, res) {
    userRepository
      .get(req.body.email)
      .then((val) => {
        if (val == null) {
          Logger.debug(
            req,
            "email:" + req.body.email + " FAILED USER NOT FOUND"
          )
          _res.error = true
          _res.message = "Failed user not found"
          _res.result = null
          res.status(401).send(_res)
        }else{
          userRepository
          .delete(req.body.email)
          .then((val) => {
            Logger.debug(
              req,
              "email:" + req.body.email + " SUCCESS DELETE USER"
            )
            _res.error = false
            _res.message = "Delete user successfully"
            _res.result = null
            res.status(200).send(_res)
          })
          .catch((err) => {
            res.status(500).send(err.message)
          })
        }        
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },
}
