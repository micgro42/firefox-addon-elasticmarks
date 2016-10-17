'use strict';
var elasticmarks = elasticmarks || {};

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
