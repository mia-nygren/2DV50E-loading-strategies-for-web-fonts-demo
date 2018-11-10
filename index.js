// Require Modules
const spdy = require('spdy'),
    fs = require('fs'),
    express = require('express')     // path = require('path'),

 // Create Express Application
const app = express()
const PORT = 3000

// Require the routes
app.use(require('./app/routes'))

// Routes for Critical FOFT Server Push
app.use(require('./app/routes/critical-foft-push'))
app.use(require('./app/routes/critical-foft-push-and-preload'))

// Routes for Critical FOFT preload (including variant1, variant2 and variant3)
app.use(require('./app/routes/critical-foft-preload'))

// Route for no strategy
app.use(require('./app/routes/no-font-loading-strategy'))

const options = {
    key: fs.readFileSync('./app/keys/key.pem'),
    cert: fs.readFileSync('./app/keys/cert.pem'),
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

