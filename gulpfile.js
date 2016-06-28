'use strict';
require('dotenv-safe').load();
const gulp = require('gulp');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const ftp = require('vinyl-ftp');
const gutil = require( 'gulp-util' );
const runSequence = require('run-sequence');

const allGlob = '/**/*';

// config vars for folders/files:
var source = {  base: './source' };
source.css = source.base + '/css';
source.cssFiles = source.css + '/**/*.css'; // only css files inside source folder
source.img = source.base + '/img';
source.imgAll = source.img + allGlob; // all files in source img folder
source.fonts = source.base + '/fonts';
source.fontsAll = source.fonts + allGlob;
source.htmlFiles = source.base + '/**/*.html'; // only html files inside source folder
source.js = source.base + '/js';
source.jsFiles = source.js + '/**/*.js'; // only js files inside source folder

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
  webserver: 'webserver',
  watchJs: 'watch-js',
  watchCss: 'watch-css',
  watchHtml: 'watch-html',
  publish: 'publish',
  publishWatch: 'publish-watch'
};

// configuration for publish to FTP:
const connection = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: 21,
  sourcePath: [build.base + allGlob],
  destPath: '/htdocs'
}

// helper function for building ftp connection:
function getFtpConnection() {
  return ftp.create({
    host: connection.host,
    port: connection.port,
    user: connection.user,
    password: connection.password,
    parallel: 5,
    log: gutil.log
  });
}

// define generic tasks
gulp.task('default', [ task.webserver] );
gulp.task( task.processAll, function(cb) {
  // use undocumented function to start complete build just after clean:
  runSequence( 
    task.clean,
    [ task.processImg, task.processFonts, task.processCss , task.processHtml, task.processJs ],
    cb
  );
  
});


// Clean: clear all files in build directory
gulp.task( task.clean, function () {
  return gulp.src( build.base + '/**/*.*' /*, {read: false} */)
    .pipe(clean());
});

// CSS: process CSS files
gulp.task( task.processCss, function () {
  // plain copy of css files into dest:
  return gulp.src( source.cssFiles  )
    .pipe( gulp.dest( build.css ));
});


// IMG: process image files: minify with imagemin
gulp.task( task.processImg, function () {

  // copy all files from img folder to dest
  return gulp.src( source.imgAll  )
    .pipe(imagemin())
    .pipe( gulp.dest( build.img ));
});

// FONTS: process fonts:
gulp.task( task.processFonts, function () {
  // plain copy of all font files into dest:
  return gulp.src( source.fontsAll  )
    .pipe( gulp.dest( build.fonts ));
});

// HTML: process pages
gulp.task( task.processHtml, function () {
  // plain copy:
  return gulp.src( source.htmlFiles  )
    .pipe( gulp.dest( build.base ));
});

// JS: process js
gulp.task( task.processJs, function () {
  // plain copy:
  return gulp.src( source.jsFiles  )
    .pipe( gulp.dest( build.js ));
});

// Watch-related tasks: reload dev browser after processing files
gulp.task( task.watchJs, [ task.processJs ], browserSync.reload);
gulp.task( task.watchHtml, [ task.processHtml ], browserSync.reload);
gulp.task( task.watchCss, [ task.processCss ], browserSync.reload);

// Start webserver with live reloading:
gulp.task(task.webserver, [task.processAll], function() {
  // start webserver with live reloading feature:
  browserSync.init({
    server: {
      baseDir: build.base
    }
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch( source.jsFiles, [ task.watchJs ] );
  gulp.watch( source.htmlFiles, [ task.watchHtml ] );
  gulp.watch( source.cssFiles, [ task.watchCss ] );
});

// PUBLISH: upload files to FTP
gulp.task( task.publish, [task.processAll], function() {

  var conn = getFtpConnection();

  return gulp.src( connection.sourcePath, { base: build.base, buffer: false })
    .pipe( conn.newer( connection.destPath ) ) // only upload newer files
    .pipe( conn.dest( connection.destPath ) );
});

// PUBLISH and WATCH: watch for file changes and publish them:
/* Not ready as for now:
gulp.task( task.publishWatch, function() {
  gulp.watch( connection.sourcePath )
    .on('change', function(event) {
      console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);

      gulp.start( task.publish);


      // return gulp.src( [event.path], { base: '.', buffer: false } )
      //   .pipe( conn.newer( remoteFolder ) ) // only upload newer files
      //   .pipe( conn.dest( remoteFolder ) )
      //   ;
    });
});
*/
