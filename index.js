// Require Modules
const spdy = require('spdy'),
    fs = require('fs'),
    express = require('express'),
    path = require('path')

 // Create Express Application
const app = express()
const PORT = 3000

// Set the template engine to Pug
app.set('view engine','pug' )
app.set('views', path.join(__dirname, './app/views'))

// Require the routes
app.use(require('./server/routes'))

// Routes for Critical FOFT Server Push
app.use(require('./server/routes/critical-foft-push'))
app.use(require('./server/routes/critical-foft-push-and-preload'))

// Routes for Critical FOFT preload (including variant1, variant2 and variant3)
app.use(require('./server/routes/critical-foft-preload'))

// Route for no strategy
app.use(require('./server/routes/no-font-loading-strategy'))

const options = {
    key: fs.readFileSync('./server/keys/key.pem'),
    cert: fs.readFileSync('./server/keys/cert.pem')
        //ca: fs.readFileSync('keys/server.csr')
         // **optional** SPDY-specific options
};

// Assets and public folder - TODO describe static
app.use(express.static('app/vendor'))
app.use(express.static('app/assets'))

// Setup Server
const server = spdy.createServer(options, app)   // TODO - how does spdy know it is HTTP/2?

server.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port}`)
});

