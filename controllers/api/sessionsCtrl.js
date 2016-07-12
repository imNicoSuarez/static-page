var models = require('../../models/models');

exports.signIn = function(req, res) {

  var email = req.headers.user_email;
  var password = req.headers.user_password;

  console.log(email, password);

  models.user.autenticate(email, password, function(err, user){
    if (!err) {
      var sessionData = {user_id: user._id}
      models.accessToken.create(sessionData, function(error, accessToken) {
        res.json({token: accessToken.token});
      });
    } else {
      res.json(401, { error: 'UNAUTORIZED',
                      message: err.message });
    }
  });
}

exports.signOut = function(req, res) {
  var token = req.header('X-AccessToken');
  models.accessToken.getAccessTokenByToken(token, function(err, accessToken){
    if (!err) {
      models.accessToken.destroy(accessToken._id, function(err, accessTokenDeleted) {
        if (!err) {
          res.json(200, {message: 'Sign Out Successfull.'});
        } else {
          res.json(422, {error: err});
        }
      });
    } else {
      res.json(422, {error: err});
    }
  });
}

exports.createUser = function(req, res) {
  console.log(req.body);
  models.user.create(req.body, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ user : result });
    }
  });
}