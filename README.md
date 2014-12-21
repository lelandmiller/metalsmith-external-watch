#  [![Build Status](https://secure.travis-ci.org/lelandmiller/metalsmith-external-watch.png?branch=master)](http://travis-ci.org/lelandmiller/metalsmith-external-watch)

> A module to watch source directories, run a preview server, and trigger builds
> for a Metalsmith site.

## Overview

The functionality of this package is still rough, but workable.

## Install

```sh
$ npm install --save metalsmith-external-watch
```


## Usage

```js
var externalWatch = require('metalsmith-external-watch');

externalWatch(function() {
    Metalsmith(__dirname)
        .build();
});
```

This will watch the `src` and `template` directories for changes. When changes
occur it will run the function passed as an argument (for example, to build the
project) and it serves the `build` directory on 8080.


## License

MIT © [Leland Miller](http://www.lelandmiller.com)
