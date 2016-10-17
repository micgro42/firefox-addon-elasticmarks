'use strict';
var elasticmarks = elasticmarks || {};

QUnit.module( 'parseURLs', {
    beforeEach: function( ) {
    }, afterEach: function( ) {
    }
});
QUnit.test( 'https://google.com', function( assert ) {
    var url = 'https://google.com';
    var expected_result = {tld: 'com', domain: 'google'};
    assert.deepEqual(elasticmarks.getDomainParts(url), expected_result);
});
QUnit.test( 'https://www.google.com', function( assert ) {
    var url = 'https://www.google.com';
    var expected_result = {tld: 'com', domain: 'google', subdomain: 'www'};
    assert.deepEqual(elasticmarks.getDomainParts(url), expected_result);
});
