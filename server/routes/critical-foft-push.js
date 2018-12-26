const express = require('express'),
    router = express.Router()

// get the helper methods for pushing Styles and Fonts
const {pushStyles, pushFont, pushScript} = require('../utils/push')

// critical-foft-push, use PUSH_STREAM if possible
router.get('/critical-foft-push', function(req, res) {

  // Push Source Sans Pro Regular subset
  pushFont(res, res.app.locals.sourceSansPro.subset) // XKB
  // Push CSS
  pushStyles(res, '/styles/main.css') // XKB
  pushStyles(res, '/styles/vendor/prism/prism.css')  // XKB

  res.render('critical-foft-push', {
  page: 'Critical Foft with HTTP/2 Push'
  });
});

module.exports = router;
