const { map, prop } = require("ramda")

const getAllDocs = (db, options) => {
  // console.log("options", options)

  return db.allDocs(options).then(res => map(prop("doc"), res.rows))
}

module.exports = { getAllDocs }
