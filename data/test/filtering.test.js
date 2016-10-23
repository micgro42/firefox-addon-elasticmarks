'use strict';
var elasticmarks = elasticmarks || {};

QUnit.module( 'filterBookmarks', {
    beforeEach: function( ) {
    }, afterEach: function( ) {
    }
});
QUnit.test( '1 filter: tld valid', function( assert ) {
    var tldfilter = new elasticmarks.Filter().construct('tld', 'equal', 'org');
    var bookmark = {
        id: 8,
        index: 0,
        title: 'Help and Tutorials',
        updated: 1477241737303000,
        url: 'https://www.mozilla.org/en-US/firefox/help/',
    };
    assert.strictEqual(tldfilter.isBookmarkValid(bookmark), true);
});


