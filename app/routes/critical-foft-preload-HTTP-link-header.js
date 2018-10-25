const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router()

/*** FONT-LOADING-STRATEGY: CRITICAL FOFT with preload in response header  ***
    The following resources are preloaded in the response link header:
      -  regular latin subset woff2 font file
      -  css file with the @font-face blocks
*/

const sourceSansProSubsetFilePath = '/fonts/source-sans-pro-latin/source-sans-pro-v11-latin-regular-subset.woff2'
const cssFilePath = '/styles/source-sans-pro-latin/fonts-4-styles-and-subset.css'

const link = `<${sourceSansProSubsetFilePath}>; rel=preload; as=font; crossorigin=crossorigin; type=font/woff2; nopush, <${cssFilePath}>; rel=preload; as=style; nopush`
router.get('/critical-foft-preload-HTTP-link-header', function(req, res) {

    // The response head includes Link, where the regular font is preloaded and CSS file with @font-face blocks
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Cache-Control': 'max-age=300', //'max-age=300'
        'Link': link
    });
    // console.log('This is liink:' + link);
    const indexPath = path.join(__dirname, '../public/critical-foft-preload-header.html');
    fs.createReadStream(indexPath).pipe(res);
    return;
});

module.exports = router;

//'Link':'</fonts/' + merriweather.regularSubset + '>;  rel="preload"; as="font"; crossorigin="crossorigin"; type="font/woff2"; nopush,

// </styles/merriweather/fonts.css>; rel=preload; as=style; nopush'
