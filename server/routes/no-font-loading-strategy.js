const express = require('express'),
    router = express.Router()

router.get('/no-font-loading-strategy', function(req, res) {
  res.render('no-font-loading-strategy', {
    page: 'No Font Loading Strategy',
    path: req.path
    })
});

module.exports = router
