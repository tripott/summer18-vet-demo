const NodeHTTPError = require("node-http-error");
const { getResources } = require("../dal");

const resourcesRoutes = app => {
  app.get("/", (req, res) => res.send("Welcome to the VET API"));

  app.get("/resources", (req, res, next) => {
    console.log("inside server.js hit /resources route");

    getResources()
      .then(resources => res.send(resources))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err));
      });
  });
};

module.exports = resourcesRoutes;
