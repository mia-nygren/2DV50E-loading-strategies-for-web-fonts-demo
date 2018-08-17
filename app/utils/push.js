const fs = require('fs')
    // path = require('path') - TODO might need path for cleaner paths?

const pushFont = (response, fontSrc) => {

    const font = fs.readFileSync('assets/' + fontSrc);
    // push woff2
    response.push('/' + fontSrc, {
        response: {
            'Content-Type': 'font/woff2',
            'Cache-Control': 'no-cache' // must revalidate before using a cached copy
        }
    }, (err, stream) => {
        if (err) return
        stream.end(font)
    })

    // push woff
}


const pushStyles = (response, file, pushPath) => {
    // get the fs here!
    // take in the location of the styles

    // Note: we cached pushed files for 5 minutes (testing purposes)
    response.push(pushPath, {    // response.push('/styles/merriweather/fonts.css'
        response: {
            'Content-Type': 'text/css'
                // 'Cache-Control': 'max-age=300'
        }
    }, function(err, stream) {
        if (err) {
            return;
        }
        stream.end(file);
    });
}

module.exports = {
    pushFont,
    pushStyles
}
