// Require Modules
const spdy = require('spdy'),
    fs = require('fs'),
    express = require('express')     // path = require('path'),

 // Create Express Application
const app = express();

// Require the routes
app.use(require('./app/routes'))
app.use(require('./app/routes/critical-foft-push'))
app.use(require('./app/routes/critical-foft-push-variable-font'))
app.use(require('./app/routes/critical-foft-preload-header'))
app.use(require('./app/routes/no-font-loading-strategy'))

const options = {
    key: fs.readFileSync('./app/keys/private.key'),
    cert: fs.readFileSync('./app/keys/certificate.pem'),
        //ca: fs.readFileSync('keys/server.csr')
         // **optional** SPDY-specific options
  spdy: {
    ssl: false
  }
};

// Assets and public folder - TODO describe static
app.use(express.static('public'));
app.use(express.static('app/assets'));

// Setup Server
const server = spdy.createServer(options, app);   // TODO - how does spdy know it is HTTP/2?

server.listen(3000, () => {
    console.log(`Server started on port ${server.address().port}`);
});

