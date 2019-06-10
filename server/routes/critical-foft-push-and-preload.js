const express = require('express'),
    router = express.Router()

// get the helper methods for pushing Styles and Fonts
const {pushStyles, pushFont} = require('../utils/push')

const pushResources = (res) => {
   // Push Source Sans Pro Regular subset
   pushFont(res, res.app.locals.sourceSansPro.subset)

   // Push CSS
   pushStyles(res, '/vendor/bulma/bulma.min.css')  //  GZipped
   pushStyles(res, '/styles/styles.css') //  GZipped!
}

/**
 *   Route for strategy #3 (Push only)
 */

router.get('/critical-foft-push', function(req, res) {

  pushResources(res)
  res.render('critical-foft-push', {
    page: 'Critical Foft with HTTP/2 Push',
    path: req.path
  });
});

/**
 *    Routes for strategy #4 and #5 (Push & Preload)
 */

router.get('/critical-foft-push-and-preload-variant1', function(req, res) {
  pushResources(res)

   res.render('critical-foft-push-and-preload-variant1', {
     page: 'Critical FOFT HTTP/2 Push and Preload (V1)',
     path: req.path
   })
});
router.get('/critical-foft-push-and-preload-variant2', function(req, res) {
  pushResources(res)

   res.render('critical-foft-push-and-preload-variant2', {
     page: 'Critical FOFT HTTP/2 Push and Preload (V2)',
     path: req.path
   })
});

module.exports = router;
