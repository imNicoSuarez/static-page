var SessionsCtrl = require('../../controllers/api/sessionsCtrl');

var express = require('express');
var sessions = express.Router();


sessions.route('/')
  .post(SessionsCtrl.signIn)
  .delete(SessionsCtrl.signOut);

sessions.route('/register')
  .post(SessionsCtrl.createUser);

module.exports = sessions;
