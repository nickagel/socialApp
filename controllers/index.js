var router = require('express').Router()
var bodyParser = require('body-parser')

router.use(require('../auth'))
router.use(bodyParser.json())

router.use('/api', require('./api'))
router.use('/', require('./static'))

module.exports = router
