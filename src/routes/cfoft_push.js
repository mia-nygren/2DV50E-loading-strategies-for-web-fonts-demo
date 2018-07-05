const fs = require('fs'),
    path = require('path'),
    express = require('express')
var router = express.Router()

const MERRIWEATHER = require('../constants').MERRIWEATHER // "merriweather" // Todo make usabe throughout files
//const stylesPath = path.join(__dirname, '../assets/styles/' + fontName + '/fonts.css')
//const styles = fs.readFileSync(stylesPath);

// This is needed for every route...so, refactor  - bryt ut
const cssFile = fs.readFileSync('assets/styles/' + MERRIWEATHER + '/fonts.css'); // this path is wrong...but works??

// console.log('stylesPATH = ' + stylesPath)

// const woff2 = fs.readFileSync('assets/fonts/montserrat-v12-latin-regular.woff2');

// get the helper method for pushing Styles
var pushStyles = require('../utils/push').pushStyles

// critical-foft-push, use PUSH_STREAM if possible
router.get('/critical-foft-push', function(request, response) {

    if (!request.isSpdy) {
        return response.end('SPDY is off. We cannot use Server Push :(')
    }
    // pushFont(response, 'fonts/merriweather-v19-latin-regular-subset.woff2')
    // pushFont(response, 'fonts/merriweather-v19-latin-regular.woff2')
    // pushFont(response, 'fonts/merriweather-v19-latin-italic.woff2')
    //pushFont(response, 'fonts/merriweather-v19-latin-700.woff2')
    //pushFont(response, 'fonts/merriweather-v19-latin-700italic.woff2')

   pushStyles(response, cssFile, '/styles/merriweather/fonts.css')
           
    //  res.header('Link', '</images/big.jpeg>; rel=prefetch');  Look up what header does and why writeHead is different...
    // rel="preload" as="font" crossorigin="crossorigin" type="font/woff2"
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache', //'max-age=300'
        'Link':'</fonts/merriweather-v19-latin-regular.woff2>;  rel="preload"; as="font"; crossorigin="crossorigin"; type="font/woff2"; nopush'
    });

    const indexPath = path.join(__dirname, '../public/critical-foft-push.html');
    fs.createReadStream(indexPath).pipe(response);
    return;
});

module.exports = router;