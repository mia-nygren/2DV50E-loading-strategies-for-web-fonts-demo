const fs = require('fs'),
    path = require('path'),
    express = require('express')
var router = express.Router()

// Welcome route

router.get('/', function(req, res) {

    // TODO - check if certificate has expired...

    const indexPath = path.join(__dirname, '../public/index.html');
    fs.createReadStream(indexPath).pipe(res);
    return;
})

module.exports = router
