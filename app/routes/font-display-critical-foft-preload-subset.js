const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router()


router.get('/font-display-critical-foft-preload-subset', function(req, res) {
  const indexPath = path.join(__dirname, '../public/font-display-critical-foft-preload-subset.html')
  fs.createReadStream(indexPath).pipe(res)
});

module.exports = router
