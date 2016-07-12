var mongoose = require('../lib/db.js')();

// Models
var models = {
  user : require('./user')(mongoose),
  accessToken: require('./access_token')(mongoose)
}

module.exports = models;