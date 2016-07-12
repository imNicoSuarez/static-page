var models = require('../../models/models');


exports.getUsers = function(req, res) {
  models.user.getUsers(function(err, results){
    if (err) {
      res.send(err);
    } else {
      res.json({ users : results });
    }
  });
}

exports.getUser = function(req, res) {
  models.user.getUser(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ user : result });
    }
  });
}

exports.updateUser = function(req, res) {
  models.user.update(req.params.id, req.body, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ user : result });
    }
  });
}

exports.deleteUser = function(req, res) {
  models.user.destroy(req.params.id, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({ user : result });
    }
  });
}