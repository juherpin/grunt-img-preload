'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.img_preload = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  css_urls_only: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/css_urls_only.css');
    var expected = grunt.file.read('test/expected/css_urls_only.css');
    test.equal(actual, expected, 'should find and preload urls contained into a CSS file');
    test.done();
  },
  options_urls_only: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/options_urls_only.css');
    var expected = grunt.file.read('test/expected/options_urls_only.css');
    test.equal(actual, expected, 'should preload images specified into url option');
    test.done();
  },
  both_urls: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/both_urls.css');
    var expected = grunt.file.read('test/expected/both_urls.css');
    test.equal(actual, expected, 'should preload images specified into url option and parse css files');
    test.done();
  },
  append: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/append.css');
    var expected = grunt.file.read('test/expected/append.css');
    test.equal(actual, expected, 'should append preload block to a css file');
    test.done();
  }
};
