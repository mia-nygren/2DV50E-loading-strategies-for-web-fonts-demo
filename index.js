// Require Modules
const spdy = require('spdy'),
    fs = require('fs'),
    express = require('express')     // path = require('path'),

 // Create Express Application
const app = express()
const PORT = 3000
// Require the routes
app.use(require('./app/routes'))

// Routes for Critical FOFT push
app.use(require('./app/routes/critical-foft-push'))
app.use(require('./app/routes//critical-foft-push-all'))
// app.use(require('./app/routes/critical-foft-push-variable-font'))

// Routes for Critical FOFT preload
app.use(require('./app/routes/critical-foft-preload'))
app.use(require('./app/routes/critical-foft-preload-all'))
app.use(require('./app/routes/critical-foft-preload-HTTP-link-header'))
app.use(require('./app/routes/no-font-loading-strategy'))

// font-display
app.use(require('./app/routes/font-display-preload'))
app.use(require('./app/routes/font-display-critical-foft-preload-subset'))

const options = {
    key: fs.readFileSync('./app/keys/private.key'),
    cert: fs.readFileSync('./app/keys/certificate.pem'),
        //ca: fs.readFileSync('keys/server.csr')
         // **optional** SPDY-specific options
  spdy: {
    ssl: false  // TODO -should this be here??!
  }
};

// Assets and public folder - TODO describe static
app.use(express.static('public'))
app.use(express.static('app/assets'))

// Setup Server
const server = spdy.createServer(options, app)   // TODO - how does spdy know it is HTTP/2?

server.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port}`)
});

