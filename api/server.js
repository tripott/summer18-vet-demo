require("dotenv").config()
const PORT = process.env.PORT
const app = require("express")()

const resources = require("./routes/resources")
const categories = require("./routes/categories")

resources(app)
categories(app)

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message)
  next(err)
})

app.use((err, req, res, next) => console.log("error", err.message))

app.listen(PORT || 5000, () => console.log("UP on ", PORT || 5000))
