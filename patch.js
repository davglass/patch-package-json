var url = require('url');

var modPath = function(tarball, currentHost) {
    if (!currentHost.match(/^https?:\/\//)) {
        currentHost = 'http://' + currentHost;
    }
    var h = url.parse(currentHost);
    var u = url.parse(tarball);
    delete u.href;
    delete u.host;
    delete u.hostname;
    delete u.path;
    u.hostname = h.hostname;
    u.protocol = h.protocol;
    if (h.port) {
        u.port = h.port;
    }
    return url.format(u);
};

exports.url = modPath;

var patchPath = function(json, host) {
    if (typeof json === 'string') {
        json = JSON.parse(json);
    }
    var patch = function(d) {
        if (d.dist && d.dist.tarball) {
            d.dist.tarball = modPath(d.dist.tarball, host);
        }
    };

    if (json.versions) {
        Object.keys(json.versions).forEach(function (v) {
            patch(json.versions[v]);
        });
    } else {
        patch(json);
    }
    return json;
};

exports.json = patchPath;