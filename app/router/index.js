const authController = require("../controllers/authController")
const userController = require("../controllers/userController")
const masterdataController = require("../controllers/masterDataController")

module.exports = function (app) {
  app.use("/api/auth", authController)
  app.use("/api/user", userController)
  app.use("/api/masterdata", masterdataController)
}
