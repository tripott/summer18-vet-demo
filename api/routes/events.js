const NodeHTTPError = require("node-http-error")
const { getEvents, addEvent, getEvent } = require("../dal")
const bodyParser = require("body-parser")
const { propOr, isEmpty, not, concat, pathOr } = require("ramda")
const checkReqFields = require("../lib/check-required-fields")
const missingFieldMsg = require("../lib/missing-field-msg")
const cleanObj = require("../lib/clean-object")
const reqFields = ["name", "shortDesc", "primaryPhone", "eventDateTime"]
const allowedFields = concat(["type"], reqFields)

const eventRoutes = app => {
  app.get("/events", (req, res, next) => {
    const query = pathOr("", ["query", "filter"], req)
    getEvents(query)
      .then(resources => res.send(resources))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err))
      })
  })

  app.get("/events/:id", (req, res, next) => {
    const resourceId = pathOr("", ["params", "id"], req)
    getEvent(resourceId)
      .then(resource => res.status(200).send(resource))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err))
      })
  })

  app.post("/events", bodyParser.json(), (req, res, next) => {
    const newResource = propOr({}, "body", req)
    console.log(JSON.stringify({ newResource }))
    if (isEmpty(newResource)) {
      next(
        new NodeHTTPError(
          400,
          "No valid JSON document was provided in the request body."
        )
      )
      return
    }
    // console.log("new", newResource)
    const missingFields = checkReqFields(reqFields, newResource)
    //console.log(missingFields)
    //console.log(not(isEmpty(missingFields)))
    if (not(isEmpty(missingFields))) {
      //console.log(missingFieldMsg(missingFields))
      next(new NodeHTTPError(400, missingFieldMsg(missingFields)))
      return
    }
    const cleanResource = cleanObj(allowedFields, newResource)
    //console.log("clean", cleanResource)
    addEvent(cleanResource)
      .then(result => {
        console.log({ result })
        res.status(201).send(result)
      })
      .catch(err => new NodeHTTPError(err.status, err.message, err))
  })
}

module.exports = eventRoutes
