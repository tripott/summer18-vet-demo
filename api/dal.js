const PouchDB = require("pouchdb-core")
PouchDB.plugin(require("pouchdb-adapter-http"))
const { map, prop, merge } = require("ramda")
const COUCHDB_SERVER = process.env.COUCHDB_SERVER
const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME
const DB_URL = `${COUCHDB_SERVER}${COUCHDB_DBNAME}`

const db = new PouchDB(DB_URL)
const { getAllDocs } = require("./dal-helper")
const pkGenResource = require("./lib/pkGen-resource")

const getResources = () =>
  getAllDocs(db, {
    include_docs: true,
    startkey: "resource_",
    endkey: "resource_\ufff0"
  })

const postResource = resource => {
  //console.log(JSON.stringify(resource))
  const modifiedResource = merge(resource, {
    _id: pkGenResource(resource),
    type: "resource"
  })
  return db.put(modifiedResource)
}

const getCategories = () =>
  getAllDocs(db, {
    include_docs: true,
    startkey: "category_",
    endkey: "category_\ufff0"
  })

module.exports = {
  getResources,
  getCategories,
  postResource
}
