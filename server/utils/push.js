const fs = require('fs'),
    path = require('path')

const pushFont = (response, fontSrc) => {
    const fontFilePath = path.join(__dirname, '../../app/assets' + fontSrc);
    const fontFile = fs.readFileSync(fontFilePath)
    // push woff2
    response.push(fontSrc, {
        response: {
            'Content-Type': 'font/woff2',
            'Cache-Control': 'max-age=300'
        }
    }, (err, stream) => {
        if (err) return
        stream.end(fontFile)
    })

}

const pushStyles = (response, staticPath) => {
  // locate the stylesheet
  const styleFilePath = path.join(__dirname, `../../app/assets${staticPath}`);
  const cssFile = fs.readFileSync(styleFilePath + '.gz')

  response.push(staticPath, {    // usage: response.push('/styles/main.css')
      response: {
          'Content-Type': 'text/css',
          'Cache-Control': 'max-age=300',
          'content-encoding' : 'gzip',
      }
  }, function(err, stream) {
      if (err) {
          return;
      }
      stream.end(cssFile);
  });
}

const pushScript = (response, filePath) => {
  // locate the gziped js file
  const scriptFilePath = path.join(__dirname, `../../app/assets/${filePath}.gz`) // Gziped file
  const scriptFile = fs.readFileSync(scriptFilePath)

  response.push('/' + filePath, {
    response: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'max-age=300',
      'content-encoding' : 'gzip',
    }
  }, (err, stream) => {
    if(err) return
    stream.end(scriptFile)
  })
}


module.exports = {
    pushFont,
    pushStyles,
    pushScript
}
