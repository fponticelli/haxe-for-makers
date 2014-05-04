'use strict';

var express    = require('express'),
    stylus     = require('stylus'),
    nib        = require('nib'),
    livereload = require('express-livereload'),
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

app.use(express.static(cwd + '/www'));

['index', 'presentation-screen', 'index-notes'].forEach(function (value) {
  app.get('/' + (value === 'index' ? '' : value + '.html'), function (req, res) {
    res.render(value);
  });
});

livereload(app, {
  watchDir: cwd
});

app.listen(3000);