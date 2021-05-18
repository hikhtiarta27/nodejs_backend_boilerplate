const jwt = require("jsonwebtoken")
let secret = "TAS-TAS-TAS"
const { comparePassword } = require("../helper")
const Logger = require("../log")
var _res = require("../config/resConfig")
const userRepository = require("../repository/userRepository")

module.exports = {

  login(req, res) {
    let email = req.body.email
    let password = req.body.password
    userRepository.get(email).then((val) => {
      if (val == null) {
        Logger.debug(req, `email:${email} FAILED USER NOT FOUND`)
        _res.message = "User not found"
        _res.error = true
        _res.result = null
        res.status(401).send(_res)
      } else {
        comparePassword(password, val.password).then((result) => {
          if (!result) {
            Logger.debug(req, `email:${email} FAILED PASSWORD DIDN't MATCH`)
            _res.message = "Password didn't match"
            _res.error = true
            _res.result = null
            res.status(401).send(_res)
          }
          else {
            let token = jwt.sign({ email }, secret, { expiresIn: 86400 })
            Logger.debug(req, `email:${email} SUCCESS LOGIN`)
            _res.message = "Login successfully"
            _res.error = false
            _res.result = {
              token,
              email,
            }
            res.status(200).send(_res)
          }
        })
      }
    })
    .catch(err=>{
      res.status(500).send(err.message)
    })
  },

  register(req, res) {
    let email = req.body.email
    userRepository
      .get(email)
      .then((val) => {
        if (val != null) {
          Logger.debug(req, `email: ${email} FAILED USER ALREADY REGISTERED`)
          _res.error = true
          _res.message = "User already registered"
          _res.result = null
          res.status(401).send(_res)
        } else {
          userRepository.add(req.body).then(() => {
            Logger.debug(req, `email: ${email} SUCCESS REGISTERED`)
            _res.error = false
            _res.message = "User successfully registered"
            _res.result = null
            res.status(200).send(_res)
          })
        }
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },

  tokenVerify(req, res, next){
    let email = req.body.email
    let token = req.headers.authorization 
    if (token.split(" ")[0] != "Bearer" || token.split(" ")[1] == null) {
      Logger.debug(req, `email: ${email} FAILED TOKEN NOT FOUND`)
      _res.message = "Token must be provided"
      _res.error = true
      _res.result = null
      res.status(401).send(_res)
    }
    jwt.verify(token.split(" ")[1], secret, (err, val) => {
      if (err) {
        Logger.debug(req, `email: ${email} FAILED ${err.message}`)
        _res.message = err.message
        _res.error = true
        _res.result = null
        res.status(401).send(_res)
      } else next()
    })
  },

  logout(req, res) {
    Logger.debug(req, `email: ${req.body.email} SUCCESS USER LOGOUT`)
    _res.message = "Logout successfully"
    _res.error = false
    _res.result = null
    res.status(200).send(_res)
  },
}
