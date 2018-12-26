const express = require('express'),
    router = express.Router()

// Welcome route

router.get('/', function(req, res) {
    return res.render('index')
})

// Synthesized example
router.get('/synthesis', function(req, res) {
  return res.render('with-font-synthesis')
})

module.exports = router
