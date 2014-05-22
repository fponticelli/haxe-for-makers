'use strict';

var express    = require('express'),
    stylus     = require('stylus'),
    nib        = require('nib'),
    livereload = require('express-livereload'),
    fs         = require('fs'),
    app        = express(),
    cwd        = __dirname;

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', cwd + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware({
  src: cwd + '/www',
  compile: compile
}));

['index', 'presentation-screen', 'index-notes'].forEach(function (value) {
  app.get('/' + (value === 'index' ? '' : value + '.html'), function (req, res, next) {
    res.render(value, function(err, html) {
      if(err) return next(err);
      fs.writeFile(cwd + '/www/' + value + '.html', html, function(err) {
          if(err) {
              console.log(err);
          }
      });
      res.send(html);
    });
  });
});

app.use(express.static(cwd + '/www'));

livereload(app, {
  watchDir: cwd
});

app.listen(3000);