const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router()


router.get('/no-font-loading-strategy', function(req, res) {
  const indexPath = path.join(__dirname, '../public/no-font-loading-strategy.html')
  fs.createReadStream(indexPath).pipe(res)
});

module.exports = router
