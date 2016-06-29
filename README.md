# Tennis-Arena web site repository

Web site repository for http://tennis-arena-nsk.ru/

## Tools used

* Original html / css code: Blocs.app (Mac)
* Favicon generator: http://realfavicongenerator.net/
* Gulp build system: http://gulpjs.com
* Image minification: gulp-imagemin
* Live reload of pages via browser-sync module: http://browsersync.io
* Yandex.Metrika / Google Analytics code snippets
* 2Gis map widget

## Gulp Build system

For FTP publishing feature, you should add .env file to root of project, then copy content of .env.example into it  and set proper values for variables.

Start working with

```bash
$ gulp
```

Default gulp task will clear ./build folder, then build complete project (process HTML/CSS/JS files, IMG and Fonts).
Also, watchers for HTML/CSS/IMG are added to monitor changes and re-build project


Then use

```bash
$ gulp publish
```

to build whole project and upload it to specified FTP.

Add **PUPLISH_ALL** to .env file to publish whole site after any changes (by default, only changed files are published).

