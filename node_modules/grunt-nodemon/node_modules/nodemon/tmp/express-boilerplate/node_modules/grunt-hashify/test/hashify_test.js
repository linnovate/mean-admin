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

exports.hashify = {
  // setUp: function(done) {
  //   // setup here if necessary
  //   done();
  // },
  defaults: function(test) {
    var actual = grunt.file.read('tmp/defaults.json');
    var expected = grunt.file.read('test/expected/defaults.json');

    test.equal(actual, expected, 'Should generate a JSON file with default options');

    test.done();
  },
  files: function(test) {
    var hashMap = grunt.file.readJSON('tmp/defaults.json');

    var originalFile = grunt.file.read('test/fixtures/script.js');
    var copiedFile = grunt.file.read('tmp/script-min-' + hashMap["../test/fixtures/script.js"] + '.js');

    test.equal(originalFile, copiedFile, 'Should copy original file for cachebusting');
    test.done();
  },
  raw: function(test) {
    var actual = grunt.file.read('tmp/raw.json');
    var expected = grunt.file.read('test/expected/raw.json');

    test.equal(actual, expected, 'Should generate a JSON file for raw content');
    test.done();
  },
  uppercase: function(test) {
    var hashMap = grunt.file.readJSON('tmp/uppercase.json');

    var originalFile = grunt.file.read('test/fixtures/script.js');
    var copiedFile = grunt.file.read('tmp/uppercase-script-min-' + hashMap["../test/fixtures/script.js"] + '.js');

    test.equal(originalFile, copiedFile, 'Uppercase should copy original file for cachebusting');
    test.equal(hashMap["../test/fixtures/script.js"], hashMap["../test/fixtures/script.js"].toUpperCase(),
      'Filename and hash in hashmap are uppercase');
    test.done();
  }
};
