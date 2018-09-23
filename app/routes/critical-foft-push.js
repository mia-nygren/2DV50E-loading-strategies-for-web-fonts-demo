const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router(),
    merriweather = require('../constants/font') // TODO - refactor or remove

// get the helper methods for pushing Styles and Fonts
const {pushStyles, pushFont} = require('../utils/push')

// critical-foft-push, use PUSH_STREAM if possible
router.get('/critical-foft-push', function(req, res) {

    pushFont(res, 'fonts/merriweather-v19-latin-regular-subset.woff2')
    // pushFont(response, 'assets/fonts/merriweather-v19-latin-regular.woff2')
    // pushFont(response, 'fonts/merriweather-v19-latin-italic.woff2')
    // pushFont(response, 'fonts/merriweather-v19-latin-700.woff2')
    // pushFont(response, 'fonts/merriweather-v19-latin-700italic.woff2')

   pushStyles(res, 'styles/merriweather/fonts.css')  // works
    const indexPath = path.join(__dirname, '../public/critical-foft-push.html');
    fs.createReadStream(indexPath).pipe(res);
    return;
});

module.exports = router;
