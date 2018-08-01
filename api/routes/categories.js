const NodeHTTPError = require('node-http-error')
const {
  getCategory,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
} = require('../dal')
const { pathOr, propOr, isEmpty, not } = require('ramda')
const cleanObj = require('../lib/cleanObj')
const checkRequiredCategoryFields = require('../lib/checkRequiredCategoryFields')

const categoriesRoutes = app => {
  app.get('/', (req, res) => res.send('Welcome to the VET API'))

  app.get('/categories', (req, res, next) => {
    const query = pathOr('', ['query', 'filter'], req)

    getCategories(query)
      .then(category => res.send(category))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err))
      })
  })

  app.get('/categories/:id', (req, res, next) => {
    const categoryId = pathOr('', ['params', 'id'], req)
    getCategory(categoryId)
      .then(category => res.status(200).send(category))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err))
      })
  })

  app.post('/categories', (req, res, next) => {
    const newCategory = propOr({}, 'body', req)

    const missingFields = checkRequiredCategoryFields(
      ['name', 'shortDesc', 'desc', 'icon'],
      newCategory
    )

    if (not(isEmpty(missingFields))) {
      next(
        new NodeHTTPError(400, `missing the following fields: ${missingFields}`)
      )
    }
    const finalObj = cleanObj(
      ['name', 'shortDesc', 'desc', 'icon'],
      newCategory
    )
    addCategory(finalObj)
      .then(addResult => {
        console.log(addResult)
        res.status(201).send(addResult)
      })
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err))
      })
  })

  app.put('/categories/:id', (req, res, next) => {
    const newCategory = propOr({}, 'body', req)

    const missingFields = checkRequiredCategoryFields(
      ['_id', 'type', '_rev', 'name', 'shortDesc', 'desc', 'icon'],
      newCategory
    )

    if (not(isEmpty(missingFields))) {
      next(
        new NodeHTTPError(400, `missing the following fields: ${missingFields}`)
      )
    }
    const finalObj = cleanObj(
      ['_id', 'type', '_rev', 'name', 'shortDesc', 'desc', 'icon'],
      newCategory
    )
    updateCategory(finalObj)
      .then(addResult => {
        console.log(addResult)
        res.status(201).send(addResult)
      })
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err))
      })
  })

  app.delete('/categories/:id', (req, res, next) => {
    const category = propOr({}, 'body', req)
    deleteCategory(category)
      .then(result => res.status(200).send(result))
      .catch(err => next(new NodeHTTPError(err.status, err.message, err)))
  })
}

module.exports = categoriesRoutes
