# Tennis-Arena web site repository

Web site repository for http://tennis-arena-nsk.ru/

## Tools used

* Original html / css code: Blocs.app (Mac)
* Favicon generator: http://realfavicongenerator.net/
* Gulp build system: http://gulpjs.com
* Image minification: gulp-imagemin
* Live reload of pages via browser-sync module: http://browsersync.io

## Manually added

* Yandex.Metrika / Google Analytics code snippets
* 2Gis map widget

## FTP publishing

You should add .env file to root of project, then copy content of .env.example into it  and set proper values for variables.

Then use

```bash
$ gulp publish
```

to build whole project and upload it to specified FTP.

