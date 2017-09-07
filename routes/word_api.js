var express = require('express');
var router = express.Router();

var Word = require('../models/word');

router.get('/', function(req, res, next){
  res.send('this route shouldn\'t be here.');
})

/* GET random word */
router.get('/random', function(req, res, next) {

  console.log('get random word')

  Word.find().count(function(err, data){
    console.log('count', err, data)
    if (err) {next(err);}
    // data is # of docs.
    var n = random(0, data);
    console.log('rnd,' , n)
    // return n th document
    // There's probably a more efficient  way....

    Word.find(function(err, data){
      console.log('fin', err, data)
      if (err) {next(err);}
      doc = data[n];
      console.log('document' , doc)
      res.json(doc)
    })

  })

});



function random(min, max) {
  return Math.floor( (Math.random() * max) ) + min;
}


module.exports = router;
