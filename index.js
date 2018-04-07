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
        response: { 'Content-Type': 'font/woff2' }
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
    pushFont(response, 'fonts/merriweather-v19-latin-regular-subset.woff2')
    pushFont(response, 'fonts/merriweather-v19-latin-regular.woff2')
    pushFont(response, 'fonts/merriweather-v19-latin-italic.woff2')
    pushFont(response, 'fonts/merriweather-v19-latin-700.woff2')
    pushFont(response, 'fonts/merriweather-v19-latin-700italic.woff2')


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

    response.writeHead(200, {
        'Content-Type': 'text/html'
            // 'Cache-Control': 'max-age=300'
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