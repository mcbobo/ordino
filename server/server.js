var express = require('express');
var app = express();

var r = require('rethinkdb');

var connection = null;
r.connect({
  host: 'localhost', 
  port: 28015,
  db: 'ordino'
}, function(err, conn) {
  if (err) throw err;
  connection = conn;
});

app.get('/', function (req, res) {
  r.table('tasks').insert(
    {
      test: "bro, testing"
    }
  ).run(connection, function (error, result) {
    console.error(error);
    console.log(result);
    res.json(result);
  }); 
});

app.listen(5000, function () {
  console.log('Server started');
});
