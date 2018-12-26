const express = require('express'),
    router = express.Router()

// All routes for the resource prioritization approaches which are using preload

router.get('/critical-foft-preload-variant1', function(req, res) {
  res.render('critical-foft-preload-variant1',{
     page: 'Critical FOFT Preload (Variant1)'
  })
});

router.get('/critical-foft-preload-variant2', function(req, res) {
  res.render('critical-foft-preload-variant2', {
    page: 'Critical FOFT Preload (Variant 2)'
  })
});


module.exports = router
