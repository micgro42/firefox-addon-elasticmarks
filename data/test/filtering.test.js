'use strict';
var elasticmarks = elasticmarks || {};

QUnit.module( 'filter bookmarks functions: tags');
QUnit.test( '1 1 valid', function ( assert ) {
    const bookmark = {
        tags: ['tag1']
    };
    const checkedTags = ['tag1'];
    assert.strictEqual(elasticmarks.tagfilter(bookmark, checkedTags), true);
});
QUnit.test( '1 1 invalid', function ( assert ) {
    const bookmark = {
        tags: ['tag1']
    };
    const checkedTags = ['tag2'];
    assert.strictEqual(elasticmarks.tagfilter(bookmark, checkedTags), false);
});
QUnit.test( '2 2 valid', function ( assert ) {
    const bookmark = {
        tags: ['tag1', 'tag2']
    };
    const checkedTags = ['tag2', 'tag1'];
    assert.strictEqual(elasticmarks.tagfilter(bookmark, checkedTags), true);
});

QUnit.test( '2 1 valid', function ( assert ) {
    const bookmark = {
        tags: ['tag1', 'tag2']
    };
    const checkedTags = ['tag2'];
    assert.strictEqual(elasticmarks.tagfilter(bookmark, checkedTags), true);
});

QUnit.test( '1 2 invalid', function ( assert ) {
    const bookmark = {
        tags: ['tag2']
    };
    const checkedTags = ['tag2', 'tag1'];
    assert.strictEqual(elasticmarks.tagfilter(bookmark, checkedTags), false);
});

QUnit.test( '2 null valid', function ( assert ) {
    const bookmark = {
        tags: ['tag1', 'tag2']
    };
    const checkedTags = null;
    assert.strictEqual(elasticmarks.tagfilter(bookmark, checkedTags), true);
});
