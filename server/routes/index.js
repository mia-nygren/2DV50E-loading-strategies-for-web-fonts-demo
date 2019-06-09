const express = require('express'),
    router = express.Router()

// Welcome route

// get the helper methods for pushing Styles and Fonts
const {pushStyles, pushFont} = require('../utils/push')

router.get('/', function(req, res) {
  // Push Source Sans Pro Regular subset
  pushFont(res, res.app.locals.sourceSansPro.subset)

  // Push CSS
  pushStyles(res, '/vendor/bulma/bulma.css')  // 10KB  -- GZipped
  pushStyles(res, '/styles/main.css') //  GZipped!
  return res.render('index')
})

// Synthesized example
router.get('/synthesis', function(req, res) {
  return res.render('with-font-synthesis')
})

module.exports = router
