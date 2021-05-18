if (process.env.NODE_ENV === "prod") require("dotenv").config()

const express = require("express")
const fs = require("fs")
const app = express()
const db = require("./app/models")

app.use([
  express.json(),
  express.urlencoded({
    extended: true,
  }),
])

require("./app/router")(app)

module.exports = app
