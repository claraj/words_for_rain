var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var WordSchema = new Schema({
  word: {
    type:String, required: true, unique: true
  },
})

var model = mongoose.model('Word', WordSchema);

module.exports = model;
