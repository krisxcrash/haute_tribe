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

  // GET route for getting all of the outfits
  app.get("/api/outfits", function(req, res) {
    var query = {};
    if (req.query.stylist_id) {
      query.StylistId = req.query.stylist_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Outfit.findAll({
      where: query,
      include: [db.Stylist]
    }).then(function(dbOutfit) {
      res.json(dbOutfit);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/outfits/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Stylist
    db.Outfit.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Stylist]
    }).then(function(dbOutfit) {
      res.json(dbOutfit);
    });
  });

  // POST route for saving a new outfits
  app.post("/api/outfits", function(req, res) {
    console.log(req.body);
    db.Outfit.create(req.body).then(function(dbOutfit) {
      res.json(dbOutfit);
    });
  });

  // DELETE route for deleting outfits
  app.delete("/api/outfits/:id", function(req, res) {
    db.Outfit.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOutfit) {
      res.json(dbOutfit);
    });
  });

  // PUT route for updating outfits
  app.put("/api/outfits", function(req, res) {
    db.Outfit.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbOutfit) {
        res.json(dbOutfit);
      });
  });
};
