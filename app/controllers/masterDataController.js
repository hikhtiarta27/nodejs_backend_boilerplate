const express = require("express")
const masterDataService = require("../services/masterDataService")
const authService = require("../services/authService")

var masterDataRouter = express.Router()
masterDataRouter.get("/province", [authService.tokenVerify], masterDataService.getProvinces)
masterDataRouter.get("/city", [authService.tokenVerify], masterDataService.getCities)

module.exports = masterDataRouter