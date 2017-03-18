var express  = require('express');
var app      = express();
var path = require('path');
var bodyParser= require('body-parser');
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/capillary';

app.use(express.static(path.resolve(__dirname, 'build')));
app.use(bodyParser.urlencoded({extended: true}));

app.get(/^\/(?!api).*/, (req, res) =>{
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    app.listen('3000', () => {
      console.log('App listening on port 3000');
    });

    app.get('/api/games', (req, res)=> {
      res.setHeader('Content-Type', 'application/json');
      var games = db.collection('gamesdata');
      games.find().toArray(function(err, data) {
        if(data) {
          res.send(JSON.stringify(data));
        }
      });
    });
  }
});
