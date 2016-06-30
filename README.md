# Tennis-Arena web site repository

Source code for web site at http://tennis-arena-nsk.ru/. Only basic landing as for now, but more features are coming. 

## Tools used

* Prototyping html / css code: Blocs.app (Mac)
* Favicon generator: http://realfavicongenerator.net/
* Gulp build system: http://gulpjs.com
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

## Sie built with Gulp

You should have Gulp preinstalled. 

For FTP publishing feature, you should add .env file to root of project, then copy content of .env.example into .env and set proper values for variables.

Build site with default Gulp task:

```bash
$ gulp
```

Default gulp task will clear ./build folder, then build complete project (process HTML/CSS/JS files, IMG and Fonts).
Also, watchers for HTML/CSS/IMG are added to monitor changes and re-build project. Gulp will launch dev website with live reloading after project change. 


## Publish site o FTP

To Build site and then publish it to FTP use "publish" gulp task:

```bash
$ gulp publish
```

If you want to publish site to FTP with each site change, set PUBLISH env variable to any value (in .env or in system's environment). By default, only changed files are published, but this is not 100% reliable, so you can also set **PUPLISH_ALL** to .env file to publish every file every time.

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
top one, that is visible to user) into HTML and then async load main CSS via JavaScript on page load.

To use critical, run

```bash
$gulp critical-css
```

This will use /original/index.html as source and /source/index.html as destination.
