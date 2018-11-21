const setLocals = (app) => {

  if(app.get('env') === 'development')
  app.locals.pretty = true

  // Set the font for Source Sans Pro
  app.locals.sourceSansPro = {
    subset : '/fonts/source-sans-pro-latin/source-sans-pro-v11-latin-regular-subset.woff2',
    regular400: '/fonts/source-sans-pro-latin/source-sans-pro-v11-latin-regular.woff2',
    italic400: '/fonts/source-sans-pro-latin/source-sans-pro-v11-latin-italic.woff2',
    bold700: '/fonts/source-sans-pro-latin/source-sans-pro-v11-latin-700.woff2',
    boldItalic700: '/fonts/source-sans-pro-latin/source-sans-pro-v11-latin-700italic.woff2'
  }
}

module.exports = {
  setLocals
}
