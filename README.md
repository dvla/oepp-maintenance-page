maintenance page
================

This repository contains static maintenance page displayed when OEPP service is not available.

## Requirements

 * Node.js (https://nodejs.org)
 * Gulp (http://gulpjs.com)

## How to change page content

To make content changes easier and separate these from template changes project uses Handlebars templates (http://handlebarsjs.com).

Simply to amend page content please edit `src/content.handlebars` file and compile project using `gulp compile` command.

It is worth noticing that compilation is always automaticaly executed when `browser-sync` and `build` tasks are run.

## How to build it

To build this project execute following command:

```bash
  gulp build
```

As a result `maintenance-page.zip` archive will be created in `dist` directory.

## How to run it

To run it in the browser execute following command:

```bash
gulp browser-sync
```

or simply

```bash
gulp
```

It will result in starting lightweight HTTP server which serves assets from `src` directory under `http://localhost:3000` URL.

Mentioned above task also watches all the changes to files located under `src` and automatically refreshes maintenance page in the browser.
