const fs = require('fs'),
    path = require('path')

const pushFont = (response, fontSrc) => {
    const fontFilePath = path.join(__dirname, '../../app/assets/' + fontSrc);
    const fontFile = fs.readFileSync(fontFilePath)   //('./app/fonts/merriweather-v19-latin-regular-subset.woff2');
    // push woff2
    response.push('/' + fontSrc, {
        response: {
            'Content-Type': 'font/woff2',
            'Cache-Control': 'max-age=300' // 'no-cache' --> must revalidate before using a cached copy, but we need push cache?
        }
    }, (err, stream) => {
        if (err) return
        stream.end(fontFile)
    })

}

const pushScript = (response, filePath) => {
  const scriptFilePath = path.join(__dirname, '../../app/assets/' + filePath)
  const scriptFile = fs.readFileSync(scriptFilePath)
  console.log(`should push script`);

  response.push('/' + filePath, {
    response: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'max-age=300'
    }
  }, (err, stream) => {
    if(err) return
    stream.end(scriptFile)
  })
}

const pushStyles = (response, filePath) => {
  // get the fs here!
  // take in the location of the styles
  const styleFilePath = path.join(__dirname, '../../app/assets/' + filePath);
  // console.log(`styleFilePath ${styleFilePath}`);
  const cssFile = fs.readFileSync(styleFilePath)

  response.push('/' + filePath, {    // response.push('/styles/merriweather/fonts.css'
      response: {
          'Content-Type': 'text/css',
          'Cache-Control': 'max-age=300'
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
    pushStyles,
    pushScript
}
