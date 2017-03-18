var fs = require('fs');
var MongoJs = require('mongojs');
var fileExists,
    savedGames = [],
    db;

//checking for file existence
fileExists = fs.existsSync(__dirname + '/games.csv' );
if (!fileExists) {
  console.log('File \"games.csv\" does not exists in the directory ' + __dirname + '\n');
  return;
}

if(fileExists) {
  var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('games.csv');
  db = MongoJs('capillary', ["gamesdata"]);
  lr.on('error', function (err) {
    console.log('Error in csv file' + err);
  });

  lr.on('line', function (line) {
    var column = line.split(',');

    var title,
        platform,
        score,
        genre,
        edtrsChoice;
    title = column[0];
    platform = column[1];
    score = column[2];
    genre = column[3];
    edtrsChoice = column[4];

    if(title !== 'title') {
      db['gamesdata'].insert({
        title: title,
        platform: platform,
        score: score,
        genre: genre,
        edtrsChoice: edtrsChoice
      }, function(err, doc) {
        if(doc){
          savedGames.push(title);
        }
      });
    }
  });


  lr.on('end', function () {
    db.close();
    console.log('CSV parsing ended. Updated data to db- capillary');
  });
}
