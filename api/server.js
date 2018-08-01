require('dotenv').config()
const PORT = process.env.PORT
const app = require('express')()
const cors = require('cors')

const bodyParser = require('body-parser')

const resources = require('./routes/resources')
const categories = require('./routes/categories')

app.use(bodyParser.json())
app.use(cors({ credentials: true }))

app.use(cors({ credentials: true }))

resources(app)
categories(app)

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message)
})

app.use((err, req, res, next) => {
  console.log('error', err)
  next(err)
})

app.listen(PORT || 5000, () => console.log('UP on ', PORT || 5000))
