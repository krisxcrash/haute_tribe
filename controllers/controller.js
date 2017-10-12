var express = require("express");

var router = express.Router();

var db = require("../models")

// Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//     db.Viewer.findAll().then(function(data){
//         var hbsObject = {
//             Viewer: data
//         };
//         console.log(hbsObject);
//         res.render("index", hbsObject);
//     });
// });

router.get("/", function(req, res) {
    db.Outfit.findAll().then(function(data){
        var hbsObject = {
            Outfit: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Export routes for server.js to use.
module.exports = router;
