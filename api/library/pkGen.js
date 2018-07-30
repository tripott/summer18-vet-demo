const slugify = require("slugify");
const { compose, concat } = require("ramda");

module.exports = (prefix, val) => {
  return compose(
    concat(prefix),
    slugify
  )(val);
};
