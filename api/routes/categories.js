const NodeHTTPError = require("node-http-error")
const { getCategories } = require("../dal")

const categoriesRoutes = app => {
  app.get("/", (req, res) => res.send("Welcome to the VET API"))

  app.get("/categories", (req, res, next) => {
    getCategories()
      .then(resources => res.send(resources))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err))
      })
  })
}

module.exports = categoriesRoutes
