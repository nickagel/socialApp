var express    = require('express')
var bodyParser = require('body-parser')
var logger     = require('morgan')

var app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(require('./controllers'))

var port = process.env.PORT || 3000
var server = app.listen(port, function () {
  console.log('Server', process.pid, 'listening on', port)
})
require('./websockets').connect(server)
