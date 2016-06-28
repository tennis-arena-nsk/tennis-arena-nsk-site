'use strict';
const gulp = require('gulp');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const webserver = require('gulp-server-livereload');
const allGlob = '/**/*.*';

// config vars for folders/files:
var source = {  base: './source' };
source.css = source.base + '/css';
source.cssFiles = source.css + '/**/*.css';
source.img = source.base + '/img';
source.imgAll = source.img + allGlob;
source.fonts = source.base + '/fonts';
source.fontsAll = source.fonts + allGlob;
source.htmlAll = source.base + '/**/*.html';
source.js = source.base + '/js';
source.jsAll = source.js + '/**/*.js';

var build = { base: './build' };
build.css = build.base + '/css';
build.cssFiles = build.css;
build.img = build.base + '/img';
build.imgFiles = [
  build.img + '/*.jpg',
  build.img + '*.png',
  build.img + '*.ico',
  build.img + '*.gif'
];
build.fonts = build.base + '/fonts';
build.js = build.base + '/js';

// config var for task names:
var task = {
  clean: 'clean',
  processCss :  'process-css',
  processImg: 'process-img',
  processFonts: 'process-fonts',
  processHtml: 'process-html',
  processJs: 'process-js',
  processAll: 'process-build',
  webserver: 'webserver'
};

// define generic tasks
gulp.task('default', [ task.webserver] );
gulp.task( task.processAll, [ task.processImg, task.processFonts, task.processCss , task.processHtml, task.processJs ] );


// Clean: clear all files in build directory
gulp.task( task.clean, function () {
  return gulp.src( build.base + '/**/*.*' /*, {read: false} */)
    .pipe(clean());
});

// CSS: process CSS files
gulp.task( task.processCss, [task.clean], function () {
  // plain copy of css files into dest:
  return gulp.src( source.cssFiles  )
    .pipe( gulp.dest( build.css ));

  /* TODO: separate vendor csss files and own css files, vendor files should be already minified, just do some uncss - for own files miniy all */
});


// IMG: process image files: minify with imagemin
gulp.task( task.processImg, [task.clean], function () {

  // copy all files from img folder to dest
  return gulp.src( source.imgAll  )
    .pipe(imagemin())
    .pipe( gulp.dest( build.img ));

});

// FONTS: process fonts:
gulp.task( task.processFonts, [task.clean], function () {
  // plain copy of all font files into dest:
  return gulp.src( source.fontsAll  )
    .pipe( gulp.dest( build.fonts ));
});

// HTML: process pages
gulp.task( task.processHtml, [task.clean], function () {
  // plain copy:
  return gulp.src( source.htmlAll  )
    .pipe( gulp.dest( build.base ));
});

// JS: process js
gulp.task( task.processJs, [task.clean], function () {
  // plain copy:
  return gulp.src( source.jsAll  )
    .pipe( gulp.dest( build.js ));
});

// Start webserver with live-reload (end with Ctrl+c)
gulp.task(task.webserver, [task.processAll], function() {
  return gulp.src( build.base )
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});
