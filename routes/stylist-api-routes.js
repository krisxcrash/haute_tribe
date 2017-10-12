var db = require("../models");

module.exports = function(app) {
  app.get("/api/stylists", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Stylist
    db.Stylist.findAll({
      include: [db.Outfit]
    }).then(function(dbStylist) {
      res.json(dbStylist);
    });
  });

  app.get("/api/stylists/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Stylist
    db.Stylist.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Outfit]
    }).then(function(dbStylist) {
      res.json(dbStylist);
    });
  });

  app.post("/api/stylists", function(req, res) {
    db.Stylist.create(req.body).then(function(dbStylist) {
      res.json(dbStylist);
    });
  });

  app.delete("/api/stylists/:id", function(req, res) {
    db.Stylist.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbStylist) {
      res.json(dbStylist);
    });
  });

};
