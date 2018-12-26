const express = require('express'),
    router = express.Router()

// get the helper methods for pushing Styles and Fonts
const {pushStyles, pushFont} = require('../utils/push')

router.get('/critical-foft-push-and-preload', function(req, res) {
  // Push Source Sans Pro Regular subset
  pushFont(res, res.app.locals.sourceSansPro.subset) // XKB
  // Push CSS
  pushStyles(res, '/styles/main.css') // XKB
  pushStyles(res, '/styles/vendor/prism/prism.css')  // XKB

   res.render('critical-foft-push-and-preload', {
     page: 'Critical FOFT HTTP/2 Push and Preload'
   })
});

module.exports = router;
