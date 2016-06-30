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

## Project structure

    |- original/        folder that holds original version of html, css, js files and index.html
    |- source/          other project assets - some procesing done on css (generated uncss.css, index.html processed via critical)
    |- build/           automatically generated folder, source for publishing
    |- node-modules/    use "npm install" to fill this folder
    | .env              copy content from .env.example and set proper values for vairables
    | .env.example      file with list of possible env variables
    | gulpfile.js       main gulp file, defined taskes are "default", "publish", "critical-css"
    | uncss.json        config for UnCSS
    | run_uncss.sh      script to run UnCSS
    | (other stuff)

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

## UnCSS

Project have feature to optimize CSS pages by processing via UnCSS. Processing can be done
via running bash script:

```bash
$ ./run_uncss.sh
```

This script loads file from tennis-arena-nsk.ru, then extracts styles and save them to source/css/uncss.css.

Before running this script its recommended to run "gulp publish" to publish most recent version on site.



## Critical

Project have feature to optimize CSS loading via inlining critical part of CSS (above-the-fold part of page,
top one, that is visible to user) into HTML and then load main CSS via JavaScript on page load.

To use critical, run

```bash
$gulp critical-css
```

This will use /original/index.html as source and /source/index.html as destination.
