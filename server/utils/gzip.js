const zlib = require('zlib'),
      fs = require('fs'),
      path = require('path'),
      { pipeline } = require('stream');

const mainCSS = path.join(__dirname, '../../app/assets/styles/styles.css')
const prismCSS = path.join(__dirname, '../../app/assets/vendor/prism/prism.css')
const bulmaCSS = path.join(__dirname, '../../app/assets/vendor/bulma/bulma.min.css')

const gzipFile = (filePath => {
  pipeline(
    fs.createReadStream(filePath),
    zlib.createGzip(),
    fs.createWriteStream(filePath + '.gz'),
      (err) => {
        if (err) {
          console.error('Pipeline failed.', err);
        } else {
          console.log('Pipeline succeeded.');
        }
    }
  );
}
)

// Gzip main styles (used for pushing) before serving
gzipFile(mainCSS)
gzipFile(prismCSS)
gzipFile(bulmaCSS)

console.log('Gzip complete');
