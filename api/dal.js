const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
const { prop, merge } = require("ramda");
const COUCHDB_SERVER = process.env.COUCHDB_SERVER;
const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME;
const DB_URL = `${COUCHDB_SERVER}${COUCHDB_DBNAME}`;
const pkGen = require("./library/pkGen");

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

const addCategory = categoryDoc => {
  const newID = pkGen("category_", prop("name", categoryDoc));
  const newDoc = merge(categoryDoc, {
    type: "category",
    _id: newID
  });
  return db.put(newDoc);
};

module.exports = {
  getResources,
  getCategories,
  addCategory
};
