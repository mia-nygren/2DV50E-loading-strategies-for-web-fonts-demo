const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router()


// get the helper methods for pushing Styles and Fonts
const {pushStyles, pushFont} = require('../utils/push')

// critical-foft-push, use PUSH_STREAM if possible
router.get('/critical-foft-push-all', function(req, res) {

    // Push Source Sans Pro Regular subset
    pushFont(res, 'fonts/source-sans-pro-latin/source-sans-pro-v11-latin-regular-subset.woff2')
    pushFont(res, 'fonts/source-sans-pro-latin/source-sans-pro-v11-latin-regular.woff2')
    pushFont(res, 'fonts/source-sans-pro-latin/source-sans-pro-v11-latin-italic.woff2')
    pushFont(res, 'fonts/source-sans-pro-latin/source-sans-pro-v11-latin-700.woff2')
    pushFont(res, 'fonts/source-sans-pro-latin/source-sans-pro-v11-latin-700italic.woff2')

    // pushFont(res, 'fonts/source-sans-pro-latin/source-sans-pro-v11-latin-200.woff2')
    // pushFont(res, 'fonts/source-sans-pro-latin/source-sans-pro-v11-latin-200italic.woff2')
    // pushFont(res, 'fonts/source-sans-pro-latin/source-sans-pro-v11-latin-300.woff2')
    // pushFont(res, 'fonts/source-sans-pro-latin/source-sans-pro-v11-latin-300italic.woff2')

   pushStyles(res, 'styles/source-sans-pro-latin/fonts-4-styles-and-subset.css')
    const indexPath = path.join(__dirname, '../public/critical-foft-push-all.html');
    fs.createReadStream(indexPath).pipe(res);
    return;
});

module.exports = router;
