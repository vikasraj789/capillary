var express  = require('express');
var app      = express();
var path = require('path');

app.use(express.static(path.resolve(__dirname, 'build')));

app.get(/^(?!api).*/, (req, res) =>{
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen('3000', () => {
  console.log('App listening on port 3000');
});