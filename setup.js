// Read words.txt
// plunk into MongoDB

var config = require('./config')
var Word = require('./models/word');
var mongoose = require('mongoose')
var fs = require('fs')


var url = 'mongodb://localhost/words_for_rain'


mongoose.connect(url).then(
  function(){
    console.log('connected')
    readwordtext();
  },
  function(err) {
    console.log('error connecting, ' + err);
  }
)


function readwordtext(){


  var path = './words.txt'

  // todo error handling
  var all_words = fs.readFileSync(path, {'encoding':'utf8'});

  // sort out words

  //console.log(all_words)

  var words = all_words.split('\n');
for (var w in words) {

  var curWord = words[w].trim();


  if (curWord.length == 0) {
    continue;
  }

  console.log('the word from file is ' + curWord)


  var word = Word( { 'word': curWord });

  Word.find({'word' : curWord}, function(err, data) {
    if (err) { console.log('error find' + err)}
    else {
      if (data.length != 0
      ) {
        console.log('word is here, will not add ' + data);
      } else {
        console.log('word is not here, adding')
        word.save(function(err) { console.log('error' + err)});

      }
    }
  })





}


Word.find().exec(function(err, data) {
  console.log('find query')
  console.log(data)
  console.log(err)

})

}
