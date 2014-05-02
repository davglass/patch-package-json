var vows = require('vows'),
    assert = require('assert'),
    patch = require('../patch');

var tarball = 'http://registry.npmjs.org/foo/-/foo-1.0.1.tar.gz';

var JSON1 = {
    dist: {
        tarball: tarball
    }
};

var JSON2 = {
    versions: {
        '1.1.1': {
            dist: {
                tarball: tarball.replace('1.0.1', '1.1.1')
            }
        },
        '1.1.2': {
            dist: {
                tarball: tarball.replace('1.0.1', '1.1.2')
            }
        },
        '1.1.3': {
            dist: {
                tarball: tarball.replace('1.0.1', '1.1.3')
            }
        },
        '1.1.4': {
            dist: {
            }
        }
    }
};


var tests = {
    'should export two functions': {
        topic: function() {
            return patch;
        },
        'json': function(t) {
            assert.isFunction(t.json);
        },
        'url': function(t) {
            assert.isFunction(t.url);
        }
    },
    'should parse good url with http': {
        topic: function() {
            return patch.url(tarball, 'http://registry.davglass.com');
        },
        'and return valid info': function(d) {
            assert.equal(d, 'http://registry.davglass.com/foo/-/foo-1.0.1.tar.gz');
        }
    },
    'should parse good url with https': {
        topic: function() {
            return patch.url(tarball, 'https://registry.davglass.com');
        },
        'and return valid info': function(d) {
            assert.equal(d, 'https://registry.davglass.com/foo/-/foo-1.0.1.tar.gz');
        }
    },
    'should parse good url with no protocol': {
        topic: function() {
            return patch.url(tarball, 'registry.davglass.com');
        },
        'and return valid info': function(d) {
            assert.equal(d, 'http://registry.davglass.com/foo/-/foo-1.0.1.tar.gz');
        }
    },
    'should parse good url with port': {
        topic: function() {
            return patch.url(tarball, 'http://registry.davglass.com:8080/');
        },
        'and return valid info': function(d) {
            assert.equal(d, 'http://registry.davglass.com:8080/foo/-/foo-1.0.1.tar.gz');
        }
    },
    'should parse simple json': {
        topic: function() {
            return patch.json(JSON1, 'registry.davglass.com');
        },
        'and return valid info': function(d) {
            assert.equal(d.dist.tarball, 'http://registry.davglass.com/foo/-/foo-1.0.1.tar.gz');
        }
    },
    'should parse full json': {
        topic: function() {
            return patch.json(JSON.stringify(JSON2), 'registry.davglass.com');
        },
        'and return valid info': function(d) {
            assert.equal(d.versions['1.1.1'].dist.tarball, 'http://registry.davglass.com/foo/-/foo-1.1.1.tar.gz');
            assert.equal(d.versions['1.1.2'].dist.tarball, 'http://registry.davglass.com/foo/-/foo-1.1.2.tar.gz');
            assert.equal(d.versions['1.1.3'].dist.tarball, 'http://registry.davglass.com/foo/-/foo-1.1.3.tar.gz');
        }
    }
};

vows.describe('patch-package-json').addBatch(tests).export(module);
