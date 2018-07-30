const { difference, keys } = require("ramda")

module.exports = (arr, obj) => difference(arr, keys(obj))
