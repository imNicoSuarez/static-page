module.exports = function(mongoose){
  var Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;

  var ProyectSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    token: String,
    created_at: { type: Date, default: Date.now }
  });

  var Proyect = mongoose.model('Proyect', ProyectSchema);

  function getProyects(filter, resultsCallback){
    filter =  filter || {};

    Proyect.find(filter, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function getProyect(_id, resultsCallback){
    Proyect.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function create(attrs, resultsCallback){
    var user = new Proyect(attrs);

    user.save(function(err) {
      if (err) return resultsCallback(err, null);

      getProyect(user, resultsCallback);
    });
  }

  function update(_id, attrs, resultsCallback){
    Proyect.findByIdAndUpdate(_id, attrs, function(err, result){
      getProyect(_id, resultsCallback);
    });
  }

  function destroy(_id, resultsCallback){
    Proyect.findByIdAndRemove(_id, resultsCallback)
  }

  var methods = {
    getProyect: getProyect,
    getProyects: getProyects,
    create: create,
    update: update,
    destroy: destroy
  }

  return methods;
}