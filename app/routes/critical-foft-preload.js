const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router()


router.get('/critical-foft-preload', function(req, res) {
  const indexPath = path.join(__dirname, '../public/critical-foft-preload.html')
  fs.createReadStream(indexPath).pipe(res)
});

module.exports = router
