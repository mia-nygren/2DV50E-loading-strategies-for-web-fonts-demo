const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router()

// All routes for the resource prioritization approaches which are using preload

router.get('/critical-foft-preload-variant1', function(req, res) {
  const indexPath = path.join(__dirname, '../public/critical-foft-preload-variant1.html')
  fs.createReadStream(indexPath).pipe(res)
});

router.get('/critical-foft-preload-variant2', function(req, res) {
  const indexPath = path.join(__dirname, '../public/critical-foft-preload-variant2.html')
  fs.createReadStream(indexPath).pipe(res)
});

router.get('/critical-foft-preload-variant3', function(req, res) {
  const indexPath = path.join(__dirname, '../public/critical-foft-preload-variant3.html')
  fs.createReadStream(indexPath).pipe(res)
})

module.exports = router
