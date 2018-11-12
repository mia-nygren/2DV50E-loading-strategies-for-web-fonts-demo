const express = require('express'),
    router = express.Router()

// Welcome route

router.get('/', function(req, res) {
    return res.render('index')
})

module.exports = router
