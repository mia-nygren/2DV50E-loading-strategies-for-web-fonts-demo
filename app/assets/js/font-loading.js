// CSS Font Loading API //
(function () {
  "use strict";
  if ("fonts" in document) {
    console.log('fonts are in document')

    document.fonts.load("1em SourceSansProSubset").then(function () {
      document.documentElement.className += " subset-loaded";
      Promise.all([
        document.fonts.load("400 1em SourceSansPro"),
        document.fonts.load("700 1em SourceSansPro"),
        document.fonts.load("italic 1em SourceSansPro"),
        document.fonts.load("italic 700 1em SourceSansPro")
      ]).then(function () {
        document.documentElement.className += " fonts-loaded";
        // Optimization for Repeat Views
        //sessionStorage.fontsLoadedCriticalFoftPreloadFallback = true;
      });
    });
  }
})();
