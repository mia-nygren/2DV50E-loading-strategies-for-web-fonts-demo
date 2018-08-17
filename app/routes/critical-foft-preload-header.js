const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router(),
    merriweather = require('../constants/font')

/* -- CRITICAL FOFT with preload in header  --
    Following resources are preloaded in the response link header:
      -  regular subset woff2 file
      -  css file with the @font-face declaration
*/

// get the helper method for pushing Styles - TODO change utils to lib folder?
const pushStyles = require('../utils/push').pushStyles

// critical-foft-push, use PUSH_STREAM if possible
router.get('/critical-foft-preload-header', function(req, res) {

    const cssFontFile = req.app.get('cssFontFile')  // Works in chrome canary (initiator = push) - TODO should I push styles or preload as well?

    if (!req.isSpdy) {
        return res.end('SPDY is off. We cannot use Server Push :(')
    }

   pushStyles(res, cssFontFile, '/styles/merriweather/fonts.css')  // works

    // The response head includes Link, where the regular font is preloaded
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache', //'max-age=300'
        'Link':'</fonts/' + merriweather.regularSubset + '>;  rel="preload"; as="font"; crossorigin="crossorigin"; type="font/woff2"; nopush'
    });

    const indexPath = path.join(__dirname, '../public/critical-foft-preload-header.html');
    fs.createReadStream(indexPath).pipe(res);
    return;
});

module.exports = router;
