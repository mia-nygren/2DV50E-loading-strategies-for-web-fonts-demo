const fs = require('fs'),
    path = require('path')

const pushFont = (response, fontSrc) => {
    const fontFilePath = path.join(__dirname, '../assets/' + fontSrc);
    const font = fs.readFileSync(fontFilePath)   //('./app/fonts/merriweather-v19-latin-regular-subset.woff2');
    // push woff2
    response.push('/' + fontSrc, {
        response: {
            'Content-Type': 'font/woff2',
            'Cache-Control': 'no-cache' // must revalidate before using a cached copy !! TODO - change this
        }
    }, (err, stream) => {
        if (err) return
        stream.end(font)
    })

    // push woff
}



const pushStyles = (response, filePath) => {
  // get the fs here!
  // take in the location of the styles
  const styleFilePath = path.join(__dirname, '../assets/' + filePath);
  // console.log(`styleFilePath ${styleFilePath}`);
  const cssFile = fs.readFileSync(styleFilePath)
  // Note: we cached pushed files for 5 minutes (testing purposes)
  response.push('/' + filePath, {    // response.push('/styles/merriweather/fonts.css'
      response: {
          'Content-Type': 'text/css'
              // 'Cache-Control': 'max-age=300'
      }
  }, function(err, stream) {
      if (err) {
          return;
      }
      stream.end(cssFile);
  });
}

module.exports = {
    pushFont,
    pushStyles
}
