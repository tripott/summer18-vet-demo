const NodeHTTPError = require("node-http-error")
const { getResources, postResource } = require("../dal")
const bodyParser = require("body-parser")
const { propOr, isEmpty, not } = require("ramda")
const checkReqFields = require("../lib/check-required-fields")
const missingFieldMsg = require("../lib/missing-field-msg")
const cleanObj = require("../lib/clean-object")

const reqFields = [
  "categoryId",
  "name",
  "formalName",
  "shortDesc",
  "purpose",
  "website",
  "desc"
]

const resourcesRoutes = app => {
  app.get("/", (req, res) => res.send("Welcome to the VET API"))

  app.get("/resources", (req, res, next) => {
    console.log("inside server.js hit /resources route")

    getResources()
      .then(resources => res.send(resources))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err))
      })
  })

  app.post("/resources", bodyParser.json(), (req, res, next) => {
    const newResource = propOr({}, "body", req)
    if (isEmpty(newResource)) {
      next(
        new NodeHTTPError(
          500,
          "No valid JSON document was provided in the request body."
        )
      )
      return
    }
    const missingFields = checkReqFields(reqFields, newResource)
    if (not(isEmpty(missingFields))) {
      next(new NodeHTTPError(500, missingFieldMsg(missingFields)))
      return
    }
    const cleanResource = cleanObj(reqFields, newResource)
    postResource(cleanResource)
      .then(result => res.status(201).send(result))
      .catch(err => new NodeHTTPError(err.status, err.message, err))
  })
}

module.exports = resourcesRoutes
