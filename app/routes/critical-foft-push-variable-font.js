const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router()

// get the helper methods for pushing Styles and Fonts
const {pushStyles, pushFont} = require('../utils/push')

// critical-foft-push, use PUSH_STREAM if possible
router.get('/critical-foft-push-variable-font', function(req, res) {

    pushFont(res, 'variable-fonts/SourceSansVariable-Roman-subset.woff2')

    pushStyles(res, 'styles/variable-fonts.css')  // works
    const indexPath = path.join(__dirname, '../public/critical-foft-push-variable-font.html');
    fs.createReadStream(indexPath).pipe(res);
    return;
});

module.exports = router;
