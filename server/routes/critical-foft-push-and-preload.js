const express = require('express'),
    router = express.Router()

// get the helper methods for pushing Styles and Fonts
const {pushStyles, pushFont} = require('../utils/push')

router.get('/critical-foft-push-and-preload', function(req, res) {

  pushStyles(res, '/styles/main.css')
  pushStyles(res, '/styles/vendor/prism/prism.css')
  // Push Source Sans Pro Regular subset
  pushFont(res, '/fonts/source-sans-pro-latin/source-sans-pro-v11-latin-regular-subset.woff2')

   res.render('critical-foft-push-and-preload', {
     page: 'Critical FOFT HTTP/2 Push and Preload'
   })
});

module.exports = router;
