const express = require("express")
const userService = require("../services/userService")
const authService = require("../services/authService")

var userRouter = express.Router()
userRouter.get("/", [authService.tokenVerify], userService.getUserProfile)
userRouter.put("/", [authService.tokenVerify], userService.updateUser)
userRouter.delete("/", [authService.tokenVerify], userService.deleteUser)

module.exports = userRouter