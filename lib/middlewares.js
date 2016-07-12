var models = require('../models/models');

module.exports = function() {

  function crossOrigin(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }

  function autorization(req, res, next){
    var accessToken = req.header('X-AccessToken');

    if (accessToken) {
        models.accessToken.getAccessTokenByToken(accessToken, function(err, accessToken){
          if (!err) {
            models.user.getUser(accessToken.user_id, function(error, user){
              if (!err) {
                req.currentUser =  user;
                return next();
              } else {
                res.json(401, {error: 'UNAUTHORIZED'});
              }
            });

          } else {
            res.json(401, {error: 'UNAUTHORIZED'});
          }
        });
    } else {
      res.json(401, {error: 'UNAUTHORIZED'});
    }
  }

  var middlewares = {
    crossOrigin: crossOrigin,
    autorization: autorization
  }

  return middlewares;

}