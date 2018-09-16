// Require Modules
const spdy = require('spdy'),
    fs = require('fs'),
    express = require('express')     // path = require('path'),

 // Create Express Application
const app = express();

// Require the routes
app.use(require('./routes/index'))
app.use(require('./routes/critical-foft-push'))
app.use(require('./routes/critical-foft-preload-header'))
app.use(require('./routes/no-font-loading-strategy'))

// Set variables that can be used in all routes
const cssFontFile = fs.readFileSync('./app/assets/styles/merriweather/fonts.css'); // this path is wrong...but works?? // refactor
app.set('cssFontFile', cssFontFile)
//app.set('merriweather_regular')

const options = {
    key: fs.readFileSync('./app/keys/private.key'),
    cert: fs.readFileSync('./app/keys/certificate.pem')
        //ca: fs.readFileSync('keys/server.csr')
};

// Assets and public folder - TODO describe static
app.use(express.static('public'));
app.use(express.static('./app/assets'));

// Setup Server
const server = spdy.createServer(options, app);   // TODO - how does spdy know it is HTTP/2?

server.listen(3000, () => {
    console.log(`Server started on port ${server.address().port}`);
});
// server.listen(3000, '127.0.0.1', function() {
//     server.close(function() {
//         server.listen(3001, '192.168.1.135')
//     })
// })
