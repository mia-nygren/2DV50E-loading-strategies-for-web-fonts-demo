const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router(),
    merriweather = require('../constants/font')

// get the helper method for pushing Styles
const pushStyles = require('../utils/push').pushStyles

// critical-foft-push, use PUSH_STREAM if possible
router.get('/critical-foft-push', function(req, res) {

    const cssFontFile = req.app.get('cssFontFile')  // Works in chrome canary

    if (!req.isSpdy) {
        return res.end('SPDY is off. We cannot use Server Push :(')
    }
    // pushFont(response, 'fonts/merriweather-v19-latin-regular-subset.woff2')
    // pushFont(response, 'fonts/merriweather-v19-latin-regular.woff2')
    // pushFont(response, 'fonts/merriweather-v19-latin-italic.woff2')
    // pushFont(response, 'fonts/merriweather-v19-latin-700.woff2')
    // pushFont(response, 'fonts/merriweather-v19-latin-700italic.woff2')

   pushStyles(res, cssFontFile, '/styles/merriweather/fonts.css')  // works

    // -- Subset font is push with link header --
   // If I don't have nopush in link will the asset be pushed instead of preloaded? -TESTING - TODO - push font with function instead of in Link header
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache', //'max-age=300'
        'Link':'</fonts/' + merriweather.regularSubset + '>;  rel="preload"; as="font"; crossorigin="crossorigin"; type="font/woff2";'
    });

    const indexPath = path.join(__dirname, '../public/critical-foft-push.html');
    fs.createReadStream(indexPath).pipe(res);
    return;
});

module.exports = router;
