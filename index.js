// dependencies for tachyons

var fs = require("fs")
var autoprefixer = require("autoprefixer")
var postcss = require("postcss")
var atImport = require("postcss-import")
var cssvariables = require('postcss-css-variables')
var compressor = require('node-minify')
var conditionals = require('postcss-conditionals')
var customMedia = require("postcss-custom-media")

// css to be processed
var css = fs.readFileSync("src/tachyons.css", "utf8")

// process css
var output = postcss()
  .use(atImport())
  .use(cssvariables())
  .use(conditionals())
  .use(customMedia())
  .use(autoprefixer())
  .process(css, {
    from: "./src/tachyons.css",
    to: "./css/tachyons.css"
  })
  .then(function(output) {
    fs.writeFile("css/tachyons.css", output, 'utf-8')
  });



// Using Clean-css for CSS
new compressor.minify({
    type: 'clean-css',
    fileIn: './css/tachyons.css',
    fileOut: './css/tachyons.min.css'
});
