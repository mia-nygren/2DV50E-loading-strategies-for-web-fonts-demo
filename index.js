const spdy = require('spdy'),
    fs = require('fs'),
    path = require('path'),
    express = require('express')
app = express();

const options = {
    key: fs.readFileSync('keys/private.key'),
    cert: fs.readFileSync('keys/certificate.pem')
        //ca: fs.readFileSync('keys/server.csr')
};
const fontName = "merriweather"
const styles = fs.readFileSync('assets/styles/' + fontName + '/fonts.css');
const appScript = fs.readFileSync('public/app.js');
// const woff2 = fs.readFileSync('assets/fonts/montserrat-v12-latin-regular.woff2');

let pushFont = (response, fontSrc) => {

    let font = fs.readFileSync('assets/' + fontSrc);
    // push woff2
    response.push('/' + fontSrc, {
        response: {
            'Content-Type': 'font/woff2',
            'Cache-Control': 'no-cache' // must revalidate before using a cached copy
        }
    }, (err, stream) => {
        if (err) return
        stream.end(font)
    })

    // push woff
}

let pushStyles = (response) => {
    // Note: we cached pushed files for 5 minutes (testing purposes)
    response.push('/styles/merriweather/fonts.css', {
        response: {
            'Content-Type': 'text/css'
                // 'Cache-Control': 'max-age=300'
        }
    }, function(err, stream) {
        if (err) {
            return;
        }
        stream.end(styles);
    });
}

// critical-foft-push, use PUSH_STREAM if possible
app.get('/critical-foft-push', function(request, response) {

    if (!request.isSpdy) {
        return response.end('SPDY is off. We cannot use Server Push :(')
    }
    // pushFont(response, 'fonts/merriweather-v19-latin-regular-subset.woff2')
    // pushFont(response, 'fonts/merriweather-v19-latin-regular.woff2')
    // pushFont(response, 'fonts/merriweather-v19-latin-italic.woff2')
        //pushFont(response, 'fonts/merriweather-v19-latin-700.woff2')
        //pushFont(response, 'fonts/merriweather-v19-latin-700italic.woff2')

    console.log(request)
    pushStyles(response)
        /*
        // push app.js    
        response.push('/app.js', {
            response: {
                'Content-Type': 'application/javascript'
                    // 'Cache-Control': 'max-age=300'
            }
        }, function(err, stream) {
            if (err) {
                return;
            }
            stream.end(appScript);
        }); */
        
    //  res.header('Link', '</images/big.jpeg>; rel=prefetch');  Look up what header does
    // rel="preload" as="font" crossorigin="crossorigin" type="font/woff2"
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache', //'max-age=300'
        'Link':'</fonts/merriweather-v19-latin-regular.woff2>;  rel="preload"; as="font"; crossorigin="crossorigin"; type="font/woff2"; nopush'
    });

    const indexPath = path.join(__dirname, '/public/critical-foft-push.html');
    fs.createReadStream(indexPath).pipe(response);
    return;
});

/*
// Service Worker file
app.get('/sw.js', function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'application/javascript'
    });
    const filePath = path.join(__dirname, request.url);
    return fs.createReadStream(filePath).pipe(response);
}); */

// Assets and public folder. Located after index because otherwise push streams didnt work
app.use(express.static('public'));
app.use(express.static('assets'));

const server = spdy.createServer(options, app);


server.listen(3000, () => {
    console.log(`Server started on port ${server.address().port}`);
});
// server.listen(8000, '127.0.0.1', function() {
//     server.close(function() {
//         server.listen(8001, '192.168.1.79')
//     })
// }