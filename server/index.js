// Require Modules
const spdy = require('spdy'),
    fs = require('fs'),
    express = require('express'),
    path = require('path'),
    configs = require('./config'),
    createError = require('http-errors'),
    compression = require('compression'),
    sassMiddleware = require('node-sass-middleware')
const {setLocals} = require('./utils/locals')

// Create Express Application
const app = express()
// const config = configs[app.get('env')]
const PORT = configs.port

// Set the template engine to Pug
app.set('view engine','pug' )
app.set('views', path.join(__dirname, '../app/views'))

// Compress all responses
app.use(compression())

app.use(sassMiddleware({
  /* Options */
  src: path.join(__dirname, '../app/assets/styles/scss'),
  dest: path.join(__dirname, '../app/assets/styles/'),
  debug: false,
  outputStyle: 'compressed',
  prefix:  '/styles'
}));

// Assets and public folder
app.use(express.static('app'))
app.use(express.static('app/assets'))
app.use('styles', express.static(path.join(__dirname, '../app/assets/styles')))

setLocals(app)

// Require the routes
app.use(require('./routes')) // Route for index page and font-syntesis example
app.use(require('./routes/no-font-loading-strategy')) // Route for no strategy
app.use(require('./routes/critical-foft-preload')) // Routes for strategies #1 and #2
app.use(require('./routes/critical-foft-push-and-preload')) // Routes for straetgy #3, #4 and #5


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
    console.log(`\n Server started on port ${server.address().port}`)
    console.log('\n Navigate to https://localhost:8000/ in Google Chrome to view the demo');
});

module.exports = app

