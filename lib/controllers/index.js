'use strict';

var path = require('path');

// Retrieve
var MongoClient = require('mongodb').MongoClient;
var nmap = require('node-libnmap');
var async = require('async');


/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function(req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);
  res.render(requestedView, function(err, html) {
    if(err) {
      console.log("Error rendering partial '" + requestedView + "'\n", err);
      res.status(404);
      res.send(404);
    } else {
      res.send(html);
    }
  });
};

/**
 * Send our single page app
 */
exports.index = function(req, res) {
  res.render('index');
};

exports.inspect = function(req, res) {
  console.log("Inspecting ", req.body);

  try {
    MongoClient.connect("mongodb://" + req.body.host + ':27017' , function(err, db) {
      if(!err) {
        db.admin().listDatabases(function(err, dbs) {
          console.log(dbs);
          res.send({isMongo: true, dbs: dbs});
        });
      } else {
        console.log(err, "haiz");
        res.send({isMongo: false});
      }
    });
  } catch (err) {
    console.log(err, "hai");
    res.send({isMongo: false});
  }


};

exports.probe = function(req, res) {
  // Connect to the db
  console.log("Scanning ", req.body);
  async.auto({
    nmap: function(next) {
      nmap.nmap('scan', {range: [req.body.host], ports: req.body.ports, nmap: "/usr/local/bin/nmap"}, next);
    },

    mongoOpen: function(next) {
      try {
        MongoClient.connect("mongodb://" + req.body.host + ':27017' , function(err, db) {
          if(!err) {
            next(null, true);
          } else {
            next(null, false);
          }
        });
      } catch (err) {
        next(null, false);
      }
    }
  }, function(err, results) {
    if (err)
      return res.send(err, 400);
    console.log(results);
    res.send(results);
  });
 
};