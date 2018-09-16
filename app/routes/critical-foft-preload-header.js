const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router(),
    merriweather = require('../constants/font')

/* -- FONT-LOADING-STRATEGY: CRITICAL FOFT with preload in response header  --
    Following resources are preloaded in the response link header:
      -  regular subset woff2 file
      -  css file with the @font-face blocks
*/

router.get('/critical-foft-preload-header', function(req, res) {

    if (!req.isSpdy) { // TODO
        return res.end('SPDY is off. We cannot use Server Push :(')
    }

   // pushStyles(res, cssFontFile, '/styles/merriweather/fonts.css')  // works

    // The response head includes Link, where the regular font is preloaded
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache', //'max-age=300'
        'Link':'</fonts/' + merriweather.regularSubset + '>; rel=preload; as=font; crossorigin=crossorigin; type=font/woff2; nopush, </styles/merriweather/fonts.css>; rel=preload; as=style; nopush'
    });

    const indexPath = path.join(__dirname, '../public/critical-foft-preload-header.html');
    fs.createReadStream(indexPath).pipe(res);
    return;
});

module.exports = router;

//'Link':'</fonts/' + merriweather.regularSubset + '>;  rel="preload"; as="font"; crossorigin="crossorigin"; type="font/woff2"; nopush,

// </styles/merriweather/fonts.css>; rel=preload; as=style; nopush'
