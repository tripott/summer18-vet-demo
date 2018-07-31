const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
const { map, prop } = require("ramda");
const COUCHDB_SERVER = process.env.COUCHDB_SERVER;
const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME;
const DB_URL = `${COUCHDB_SERVER}${COUCHDB_DBNAME}`;
console.log("Here", DB_URL);

const db = new PouchDB(DB_URL);
const { getAllDocs } = require("./dal-helper");

const getResources = () =>
  getAllDocs(db, {
    include_docs: true,
    startkey: "resource_",
    endkey: "resource_\ufff0"
  });

const getCategories = () =>
  getAllDocs(db, {
    include_docs: true,
    startkey: "category_",
    endkey: "category_\ufff0"
  });

module.exports = {
  getResources,
  getCategories
};
