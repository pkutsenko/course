var path = require('path')
var fs = require('fs')
var mysql = require('mysql');
var bodyParser  = require("body-parser");

var Express = require('express')
var app = new Express()
app.use(bodyParser.json());

var port = 3000
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'q1w2e3r4',
  database: 'course'
});
connection.connect();
//connection.end();

app.get('/api/posts', function (req, res) {
  connection.query('SELECT * FROM posts', function(err, rows, fields) {
    if (err) throw err;
    res.send(JSON.stringify(rows))
  });
})

app.post('/api/posts', function (req, res) {
  console.log(req.body);
  connection.query('INSERT INTO posts(id,title,content,date) VALUES (null, ?, ?, ?)', [req.body.title, req.body.content, req.body.date], function(err, rows, fields) {
    if (err) throw err;
    res.send(JSON.stringify(rows))
  });
})

app.get('/api/posts/:id', function (req, res) {
  var id = req.params.id;
  connection.query('SELECT * FROM posts WHERE id=?', [id], function(err, rows, fields) {
    if (err) throw err;
    res.send(JSON.stringify(rows[0]))
  });
})

app.put('/api/posts/:id', function (req, res) {
  var id = req.params.id;
  connection.query('UPDATE posts SET title = ?,content = ?,date = ?  WHERE id = ?', [req.body.title, req.body.content, req.body.date, id], function(err, rows, fields) {
    if (err) throw err;
    res.send(JSON.stringify(rows))
  });
})


app.use('/bower_components', Express.static(path.join(__dirname, '/bower_components')));
app.use('/src', Express.static(path.join(__dirname, '/src')));
app.use('/dist', Express.static(path.join(__dirname, '/dist')));
app.use('/css', Express.static(path.join(__dirname, '/css')));
app.use('/jspm_packages', Express.static(path.join(__dirname, '/jspm_packages')));
app.use('/build.js', Express.static(path.join(__dirname, '/build.js')));
app.use('/build.map.js', Express.static(path.join(__dirname, '/build.map.js')));
app.use('/config.js', Express.static(path.join(__dirname, '/config.js')));
app.use('/main.js', Express.static(path.join(__dirname, '/main.js')));

app.use(function (req, res) {
  fs.readFile(path.join(__dirname, '/index.html'), (err, indexData) => {
    if (err) throw err
    res.set('Content-Type', 'text/html')
    res.send(indexData.toString())
  })
})

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})
