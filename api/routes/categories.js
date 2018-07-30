const NodeHTTPError = require("node-http-error");
const { getCategories, addCategory } = require("../dal");
const { propOr, isEmpty, not } = require("ramda");
const cleanObj = require("../library/cleanObj");
const checkRequiredCategoryFields = require("../library/checkRequiredCategoryFields");

const categoriesRoutes = app => {
  app.get("/", (req, res) => res.send("Welcome to the VET API"));

  app.get("/categories", (req, res, next) => {
    getCategories()
      .then(resources => res.send(resources))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err));
      });
  });

  app.post("/categories", (req, res, next) => {
    const newCategory = propOr({}, "body", req);

    const missingFields = checkRequiredCategoryFields(
      ["name", "shortDesc", "desc", "icon"],
      newCategory
    );

    if (not(isEmpty(missingFields))) {
      next(
        new NodeHTTPError(400, `missing the following fields: ${missingFields}`)
      );
    }
    const finalObj = cleanObj(
      ["name", "shortDesc", "desc", "icon"],
      newCategory
    );
    addCategory(finalObj)
      .then(addResult => {
        console.log(addResult);
        res.status(201).send(addResult);
      })
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err));
      });
  });
};

module.exports = categoriesRoutes;
