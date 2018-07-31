const { toLower, concat, compose, trim, replace } = require("ramda")

module.exports = obj =>
  compose(
    concat("resource_"),
    replace(" ", "-"),
    trim,
    toLower
  )(obj.name)
