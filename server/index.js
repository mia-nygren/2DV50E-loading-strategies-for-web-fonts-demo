// Require Modules
const spdy = require('spdy'),
    fs = require('fs'),
    express = require('express'),
    path = require('path'),
    configs = require('./config'),
    createError = require('http-errors')

 // Create Express Application
const app = express()
const config = configs[app.get('env')]
const PORT = 3000

// Set the template engine to Pug
app.set('view engine','pug' )
app.set('views', path.join(__dirname, '../app/views'))

// Assets and public folder - TODO describe static
app.use(express.static('app/vendor'))
app.use(express.static('app'))
app.use(express.static('app/assets'))

if(app.get('env') === 'development')
  app.locals.pretty = true

app.locals.sourceSansPro = {
  subset : '/fonts/source-sans-pro-latin/source-sans-pro-v11-latin-regular-subset.woff2',
  regular400: '/fonts/source-sans-pro-latin/source-sans-pro-v11-latin-regular.woff2',
  italic400: '/fonts/source-sans-pro-latin/source-sans-pro-v11-latin-italic.woff2',
  bold700: '/fonts/source-sans-pro-latin/source-sans-pro-v11-latin-700.woff2',
  boldItalic700: '/fonts/source-sans-pro-latin/source-sans-pro-v11-latin-700italic.woff2'
}

// Require the routes
app.use(require('./routes')) // Route for index page
app.use(require('./routes/no-font-loading-strategy')) // Route for no strategy
app.use(require('./routes/critical-foft-push')) // Route for Critical FOFT Server Push
app.use(require('./routes/critical-foft-push-and-preload')) // Route for Critical FOFT Server Push and Preload
app.use(require('./routes/critical-foft-preload')) // Routes for Critical FOFT preload (including variant1, variant2 and variant3)

// If no route matches, uses 404 error page
app.use((req,res, next) => {
  return next(createError(404, 'File not found'))
})

app.use((err, req, res, next) => {
  res.locals.message = err.message // Makes the error message available in the template.
  const status = err.status || 500
  res.locals.status = status
  res.locals.error = req.app.get('env') === 'development' ? err: {}
  res.status(status)
  return res.render('error')
})

// Create options object for the server
const options = {
    key: fs.readFileSync('./server/keys/key.pem'),
    cert: fs.readFileSync('./server/keys/cert.pem')
};

// Create Server
const server = spdy.createServer(options, app)

server.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port}`)
});

module.exports = app

