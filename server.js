var path = require('path')
var fs = require('fs')
var mysql = require('mysql')
var bodyParser = require('body-parser')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

var Express = require('express')
var app = new Express()
app.use(bodyParser.json())

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: '/' }))
app.use(webpackHotMiddleware(compiler))

var port = 3000
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'q1w2e3r4',
  database: 'course'
})
connection.connect()
// connection.end();

app.get('/api/posts', function (req, res) {
  connection.query('SELECT * FROM posts', function (err, rows) {
    if (err) throw err
    res.send(JSON.stringify(rows))
  })
})

app.post('/api/posts', function (req, res) {
  connection.query('INSERT INTO posts(id,title,content,date) VALUES (null, ?, ?, ?)', [req.body.title, req.body.content, req.body.date], function (err, rows) {
    if (err) throw err
    res.send(JSON.stringify(rows))
  })
})

app.get('/api/posts/:id', function (req, res) {
  var id = req.params.id
  connection.query('SELECT * FROM posts WHERE id=?', [id], function (err, rows) {
    if (err) throw err
    res.send(JSON.stringify(rows[0]))
  })
})

app.put('/api/posts/:id', function (req, res) {
  var id = req.params.id
  connection.query('UPDATE posts SET title = ?,content = ?,date = ?  WHERE id = ?', [req.body.title, req.body.content, req.body.date, id], function (err, rows) {
    if (err) throw err
    res.send(JSON.stringify(rows))
  })
})

app.use('/api', Express.static(path.join(__dirname, '/api')))
// app.use('/src', Express.static(path.join(__dirname, '/src')));
// app.use('/dist', Express.static(path.join(__dirname, '/dist')));
// app.use('/css', Express.static(path.join(__dirname, '/css')));
// app.use('/jspm_packages', Express.static(path.join(__dirname, '/jspm_packages')));
// app.use('/build.js', Express.static(path.join(__dirname, '/build.js')));
// app.use('/build.map.js', Express.static(path.join(__dirname, '/build.map.js')));
// app.use('/config.js', Express.static(path.join(__dirname, '/config.js')));
// app.use('/main.js', Express.static(path.join(__dirname, '/main.js')));

app.use(function (req, res) {
  fs.readFile(path.join(__dirname, '/dist/index.html'), (err, indexData) => {
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
