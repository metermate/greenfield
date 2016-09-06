var database = require('../db.js');
var latestData;

exports.cleanLocationData = function() {
  // Removes erroneous meter coordinates at (0, 0)
  database.db.query('DELETE from meters WHERE latitude = 0 AND longitude = 0', function(err, result) {
    if(err) {
      console.error(err);
    }
  });
  
  // Removes erroneous meter coordinates at (34.01945, -118.49119)
  database.db.query('DELETE from meters WHERE latitude = 34.01945 AND longitude = -118.49119', function(err, result) {
    if(err) {
      console.error(err);
    }
  });
  console.log('Removed erroneous meter location data');
};

exports.storeLatestData = function() {
  // Updates local storage with latest meter data in DB
  database.db.query('SELECT * from meters', function(err, result) {
    if (err) {
      console.error(err);
    } else {
      latestData = result;
      console.log('Updated local storage with latest meter data');
    }
  });
};

exports.latestData = latestData;
