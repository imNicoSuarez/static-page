var mongoose = require('mongoose'),
    config   = require('configure');

module.exports = function(){
  mongoose.connect(process.env.MONGOLAB_URI || config.mongodb.server);

  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function() {
    console.log("Connected with %s", config.mongodb.name);
  });

  return mongoose;
}
