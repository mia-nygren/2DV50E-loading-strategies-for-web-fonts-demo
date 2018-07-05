const spdy = require('spdy'),
    fs = require('fs'),
    path = require('path'),
    express = require('express')
app = express();

// Requrie the routes
app.use(require('./src/routes/index'))
app.use(require('./src/routes/cfoft_push'))

const options = {
    key: fs.readFileSync('src/keys/private.key'),
    cert: fs.readFileSync('src/keys/certificate.pem')
        //ca: fs.readFileSync('keys/server.csr')
};

// Assets and public folder. Located after index because otherwise push streams doesn't work
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