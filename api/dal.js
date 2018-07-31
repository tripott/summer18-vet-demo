const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
const {
  map,
  prop,
  merge,
  split,
  not,
  isEmpty,
  filter,
  propEq,
  propOr,
  contains
} = require("ramda");
const COUCHDB_SERVER = process.env.COUCHDB_SERVER;
const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME;
const DB_URL = `${COUCHDB_SERVER}${COUCHDB_DBNAME}`;

const db = new PouchDB(DB_URL);
const { getAllDocs } = require("./dal-helper");
const pkGenResource = require("./lib/pkGen-resource");
const pkGen = require("./library/pkGen");

const getResources = query => {
  const [key, value] = not(isEmpty(query)) ? split(":", query) : ["", ""];
  return getAllDocs(db, {
    include_docs: true,
    startkey: "resource_",
    endkey: "resource_\ufff0"
  }).then(
    resources =>
      isEmpty(query)
        ? resources
        : filter(
            resource => contains(value, propOr("", key, resource)),
            resources
          )
  );
};

const getResource = id => db.get(id);

const postResource = resource => {
  //console.log(JSON.stringify(resource))
  const modifiedResource = merge(resource, {
    _id: pkGenResource(resource),
    type: "resource"
  });
  return db.put(modifiedResource);
};

const putResource = resource => {
  return db.put(resource);
};

const deleteResource = resource => db.remove(resource);

const getCategories = () =>
  getAllDocs(db, {
    include_docs: true,
    startkey: "category_",
    endkey: "category_\ufff0"
  });

const getCategory = id => db.get(id);

const updateCategory = id => {
  return db.put(id);
};

const addCategory = categoryDoc => {
  const newID = pkGen("category_", prop("name", categoryDoc));
  const newDoc = merge(categoryDoc, {
    type: "category",
    _id: newID
  });
  return db.put(newDoc);
};

const deleteCategory = id => {
  return db.remove(id);
};

module.exports = {
  getResources,
  getCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  postResource,
  putResource,
  getResource,
  deleteResource
};
