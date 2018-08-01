const slugify = require("slugify")
const { compose, concat, toLower } = require("ramda")

module.exports = (prefix, val) => {
  console.log(
    compose(
      concat(prefix),
      slugify
    )(val)
  )

  return compose(
    concat(prefix),
    slugify,
    toLower
  )(val)
}
