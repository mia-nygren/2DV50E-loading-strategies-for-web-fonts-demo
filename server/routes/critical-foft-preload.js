const express = require('express'),
    router = express.Router()

// All routes for the resource prioritization approaches which are using preload

router.get('/critical-foft-preload-variant1', function(req, res) {
  res.render('critical-foft-preload-variant1')
});

router.get('/critical-foft-preload-variant2', function(req, res) {
  res.render('critical-foft-preload-variant2')
});

router.get('/critical-foft-preload-variant3', function(req, res) {
  res.render('critical-foft-preload-variant3')
})

module.exports = router
