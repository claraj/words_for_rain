var express = require('express');
var routes = require('./routes/word_api')
var mongoose = require('mongoose')
var config = require('./config')

app = express();


// connect to mongoose
var url = 'mongodb://localhost/words_for_rain'


mongoose.connect(url).then(
  function(){
    console.log('connected')
    
  },
  function(err) {
    console.log('error connecting, ' + err);
  }
)



port = process.env.PORT || 3000;

app.listen(port);

console.log('API server started on ' + port);





app.use('/', routes)

app.use(function(req, res, next) {
  //and hing else
  var err = new Error('not found')
  err.status = 404
  next(err)
})

app.use(function(req, res, next){
  res.status(err.status || 500)
  res.json({'error' : err.message})   // todo dev vs prod error handler
})
