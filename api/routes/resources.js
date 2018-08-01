const NodeHTTPError = require('node-http-error')
const {
  getResources,
  getResource,
  postResource,
  putResource,
  deleteResource
} = require('../dal')
const bodyParser = require('body-parser')
const { propOr, isEmpty, not, concat, pathOr } = require('ramda')
const checkReqFields = require('../lib/checkRequiredCategoryFields')
const missingFieldMsg = require('../lib/missingFieldMsg')
const cleanObj = require('../lib/cleanObj')

const reqFields = [
  'categoryId',
  'name',
  'formalName',
  'shortDesc',
  'purpose',
  'website'
]

const allowedFields = concat(
  [
    'type',
    'organization',
    'contacts',
    'primaryPhone',
    'addresses',
    'rank',
    'faq'
  ],
  reqFields
)

const resourcesRoutes = app => {
  app.get('/', (req, res) => res.send('Welcome to the VET API'))

  app.get('/resources', (req, res, next) => {
    console.log('in resources route')
    // console.log("inside server.js hit /resources route")
    const query = pathOr('', ['query', 'filter'], req)
    //console.log("query", query)

    getResources(query)
      .then(resources => res.send(resources))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err))
      })
  })

  app.get('/resources/:id', (req, res, next) => {
    const resourceId = pathOr('', ['params', 'id'], req)
    getResource(resourceId)
      .then(resource => res.status(200).send(resource))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err))
      })
  })

  app.post('/resources', bodyParser.json(), (req, res, next) => {
    const newResource = propOr({}, 'body', req)
    // console.log(JSON.stringify(newResource))
    if (isEmpty(newResource)) {
      next(
        new NodeHTTPError(
          400,
          'No valid JSON document was provided in the request body.'
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
    postResource(cleanResource)
      .then(result => {
        console.log({ result })
        res.status(201).send(result)
      })
      .catch(err => new NodeHTTPError(err.status, err.message, err))
  })

  app.put('/resources/:id', bodyParser.json(), (req, res, next) => {
    const newResource = propOr({}, 'body', req)
    // console.log(JSON.stringify(newResource))
    if (isEmpty(newResource)) {
      next(
        new NodeHTTPError(
          400,
          'No valid JSON document was provided in the request body.'
        )
      )
      return
    }
    // console.log("new", newResource)
    const missingFields = checkReqFields(
      concat(['_id', '_rev'], reqFields),
      newResource
    )
    //console.log(missingFields)
    //console.log(not(isEmpty(missingFields)))
    if (not(isEmpty(missingFields))) {
      //console.log(missingFieldMsg(missingFields))
      next(new NodeHTTPError(400, missingFieldMsg(missingFields)))
      return
    }
    const cleanResource = cleanObj(
      concat(allowedFields, ['_id', '_rev']),
      newResource
    )
    //console.log("clean", cleanResource)
    putResource(cleanResource)
      .then(result => {
        console.log({ result })
        res.status(200).send(result)
      })
      .catch(err => new NodeHTTPError(err.status, err.message, err))
  })

  app.delete('/resources/:id', bodyParser.json(), (req, res, next) => {
    const resource = propOr({}, 'body', req)
    deleteResource(resource)
      .then(result => res.status(200).send(result))
      .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
  })
}

module.exports = resourcesRoutes
