const express = require("express")
const middlewares = require("../middlewares")
const authService = require("../services/authService")

var apiRouter = express.Router()
apiRouter.post("/login", authService.login)
apiRouter.post("/logout", authService.logout)
apiRouter.post("/register", [middlewares.isValidEmail], authService.register)

module.exports = apiRouter