/*
 * grunt-hashify
 * https://github.com/suprMax/grunt-hashify
 *
 * Copyright (c) 2013 Max Degterev
 * `I dont give a shit` license
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Clean up previous testrunner results
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    hashify: {
      defaults: {
        options: {
          basedir: 'tmp/', // hashmap paths will be relative to this dir, files will be copied to it as well
          copy: true, // keeps originals
          uppercase: false, // use uppercase md5
          hashmap: 'defaults.json' // where to put hashmap. relative to basedir
        },
        files: [{
          src: 'test/fixtures/style.css', // md5 of the contents goies in hashmap
          dest: 'style-min-{{hash}}.css', // {{hash}} will be replaced with md5 of the contents of the source
          key: 'awesome.js' // key to use in the hashmap
        }, {
          src: 'test/fixtures/script.js',
          dest: 'script-min-{{hash}}.js'
        }]
      },
      raw: {
        options: {
          complete: function(hashes) {
            grunt.file.write('tmp/raw.json', JSON.stringify(hashes));
            return null;
          }
        },
        src: ['test/fixtures/raw']
      },
      uppercase: {
        options: {
          basedir: 'tmp/', // hashmap paths will be relative to this dir, files will be copied to it as well
          copy: true, // keeps originals
          uppercase: true, // use uppercase md5
          hashmap: 'uppercase.json' // where to put hashmap. relative to basedir
        },
        files: [{
          src: 'test/fixtures/style.css', // md5 of the contents goies in hashmap
          dest: 'uppercase-style-min-{{hash}}.css', // {{hash}} will be replaced with md5 of the contents of the source
          key: 'awesome.js' // key to use in the hashmap
        }, {
          src: 'test/fixtures/script.js',
          dest: 'uppercase-script-min-{{hash}}.js'
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'hashify', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
