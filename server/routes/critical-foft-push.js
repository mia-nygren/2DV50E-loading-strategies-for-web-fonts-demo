const express = require('express'),
    router = express.Router()

// get the helper methods for pushing Styles and Fonts
const {pushStyles, pushFont, pushScript} = require('../utils/push')

// critical-foft-push, use PUSH_STREAM if possible
router.get('/critical-foft-push', function(req, res) {

  // Push Source Sans Pro Regular subset
  pushFont(res, '/fonts/source-sans-pro-latin/source-sans-pro-v11-latin-regular-subset.woff2')

  // pushScript(res, 'js/font-loading.js')
  pushStyles(res, '/styles/main.css')
  pushStyles(res, '/styles/vendor/prism/prism.css') // TODO Gzip

  return res.render('critical-foft-push', {
  page: 'Critical Foft with HTTP/2 Push'
  });
});

module.exports = router;
