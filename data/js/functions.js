'use strict';
var elasticmarks = elasticmarks || {};

elasticmarks.tagfilter = function tagfilter(bookmark, checkedTags) {
    return checkedTags ? checkedTags.reduce((valid, tag) => valid && bookmark.tags.includes(tag), true) : true;
};

elasticmarks.tagCounter = function (carrier, bookmark) {
    return bookmark.tags.reduce(function(carrier, tag) {
        if (typeof carrier[tag] == 'undefined') {
            carrier[tag] = 0;
        }
        carrier[tag] += 1;
        return carrier;
    }, carrier);
};


/**
 * @todo: write tests, get protocoll
 */
elasticmarks.getDomainParts = function (url) {
    var hostparts = new URL(url).hostname.split('.');
    var domain = {};
    domain.tld = hostparts.pop();
    domain.domain = hostparts.pop();
    if (hostparts.length) {
        domain.subdomain = hostparts.pop();
    }
    return domain;
};
