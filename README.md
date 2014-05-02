patch package json
==================

Simple little module to rewrite the `dist.tarball` key in a `package.json` registry entry. So, you know, you can mirror it :)

install
-------

    npm i patch-package-json

usage
-----

Exports two methods: `url` and `json`

```javascript

var patch = require('patch');

var json = { /.package.json data from registry./ };

var data = patch.json(json, 'myregistry.foobar.com');

```


build status
------------

[![build status](https://secure.travis-ci.org/davglass/patch-package-json.png?branch=master)](http://travis-ci.org/davglass/patch-package-json)

