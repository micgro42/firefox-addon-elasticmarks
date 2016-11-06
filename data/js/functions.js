'use strict';
var elasticmarks = elasticmarks || {};

elasticmarks.Filter = class Filter {
    construct (aspect, relation, value) {
        this.aspect = aspect;
        this.relation = relation;
        this.value = value;
        return this;
    }
    isBookmarkValid (bookmark) {
        if (typeof bookmark.parts == 'undefined') {
            bookmark.parts = elasticmarks.getDomainParts(bookmark.url);
        }
        if (typeof bookmark[this.aspect] != 'undefined') {
            return bookmark[this.aspect] === this.value;
        }
        if (typeof bookmark.parts[this.aspect] != 'undefined') {
            return bookmark.parts[this.aspect] === this.value;
        }
        console.error('Aspect ' + this.aspect + ' is unknown!');
        return null;
    }
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
