const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router()


// get the helper methods for pushing Styles and Fonts
const {pushStyles, pushFont} = require('../utils/push')

router.get('/critical-foft-push-and-preload', function(req, res) {


    // Push Source Sans Pro Regular subset
    pushFont(res, 'fonts/source-sans-pro-latin/source-sans-pro-v11-latin-regular-subset.woff2')

   pushStyles(res, 'styles/source-sans-pro-latin/fonts-4-styles-and-subset.css')
    const indexPath = path.join(__dirname, '../public/critical-foft-push-and-preload.html');
    fs.createReadStream(indexPath).pipe(res);
    return;
});

module.exports = router;