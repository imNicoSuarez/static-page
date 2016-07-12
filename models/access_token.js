var config = require('configure');

module.exports = function(mongoose){
  var Schema = mongoose.Schema,
      bcrypt = require('bcrypt');

  var AccessTokenSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    token: String,
    due_date: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
  });

  AccessTokenSchema.pre('save', function(next) {
    var access = this;

    var hash = generateToken(access);

    access.token = hash;
    access.due_date = nextDay();

    next();
  });

  var AccessToken = mongoose.model('AccessToken', AccessTokenSchema);

  function getAccessTokens(filter, resultsCallback){
    filter =  filter || {};

    AccessToken.find(filter, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function getAccessTokenByToken(token, resultsCallback){
    var filter =  {token: token};

    AccessToken.findOne(filter, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function getAccessToken(_id, resultsCallback){
    AccessToken.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function create(attrs, resultsCallback){
    var accessTocken = new AccessToken(attrs);

    accessTocken.save(function(err) {
      if (err) return resultsCallback(err, null);

      getAccessToken(accessTocken, resultsCallback);
    });
  }

  function update(_id, attrs, resultsCallback){
    AccessToken.findByIdAndUpdate(_id, attrs, function(err, result){
      getAccessToken(_id, resultsCallback);
    });
  }

  function destroy(_id, resultsCallback){
    AccessToken.findByIdAndRemove(_id, resultsCallback)
  }

  function nextDay() {
    var today = new Date();

    var d = today.getDate();
    var m = today.getMonth();
    var y = today.getFullYear();

    var nextDate = new Date(y, m, d+1);

    return nextDate;
  }

  function generateToken(access) {
    var secretToken = process.env.SECRET_TOKEN || config.SECRET_TOKEN;
    var code = Date.now() + secretToken + access.user_id;

    var salt = bcrypt.genSaltSync(parseInt(process.env.SALT_WORK_FACTOR) || config.SALT_WORK_FACTOR);
    return bcrypt.hashSync(code, salt);
  }

  var methods = {
    getAccessToken: getAccessToken,
    getAccessTokens: getAccessTokens,
    getAccessTokenByToken: getAccessTokenByToken,
    create: create,
    update: update,
    destroy: destroy
  }

  return methods;
}