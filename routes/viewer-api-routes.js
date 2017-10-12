// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the viewers
  app.get("/api/viewers", function(req, res) {
    var query = {};
    if (req.query.stylist_id) {
      query.StylistId = req.query.stylist_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Viewer.findAll({
      where: query,
      include: [db.Stylist]
    }).then(function(dbViewer) {
      res.json(dbViewer);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/viewers/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Stylist
    db.Viewer.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Stylist]
    }).then(function(dbViewer) {
      res.json(dbViewer);
    });
  });

  // POST route for saving a new viewers
  app.post("/api/viewers", function(req, res) {
    console.log(req.body);
    db.Viewer.create(req.body).then(function(dbViewer) {
      res.json(dbViewer);
    });
  });

  // DELETE route for deleting viewers
  app.delete("/api/viewers/:id", function(req, res) {
    db.Viewer.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbViewer) {
      res.json(dbViewer);
    });
  });

  // PUT route for updating viewers
  app.put("/api/viewers", function(req, res) {
    db.Viewer.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbViewer) {
        res.json(dbViewer);
      });
  });
};
