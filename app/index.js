const spdy = require('spdy'),
    fs = require('fs'),
    // path = require('path'),
    express = require('express'),
    app = express();

// Requrie the routes
app.use(require('./routes/index'))
app.use(require('./routes/critical-foft-push'))
app.use(require('./routes/critical-foft-preload-header'))

// Set variables that can be used in all routes
const cssFontFile = fs.readFileSync('./app/assets/styles/merriweather/fonts.css'); // this path is wrong...but works?? // refactor
app.set('cssFontFile', cssFontFile)
//app.set('merriweather_regular')

const options = {
    key: fs.readFileSync('./app/keys/private.key'),
    cert: fs.readFileSync('./app/keys/certificate.pem')
        //ca: fs.readFileSync('keys/server.csr')
};

// Assets and public folder. Located after index because otherwise push streams doesn't work
app.use(express.static('public'));
app.use(express.static('./app/assets'));

const server = spdy.createServer(options, app);

server.listen(3000, () => {
    console.log(`Server started on port ${server.address().port}`);
});
// server.listen(3000, '127.0.0.1', function() {
//     server.close(function() {
//         server.listen(3001, '192.168.1.135')
//     })
// })
