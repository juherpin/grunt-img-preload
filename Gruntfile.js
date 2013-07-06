/*
 * grunt-img-preload
 * https://github.com/juherpin/grunt-img-preload
 *
 * Copyright (c) 2013 juherpin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    img_preload: {
      css_urls_only: {
        options: {
        },
        files: {
          'tmp/css_urls_only.css': ['test/fixtures/style1.css', 'test/fixtures/style2.css'],
        },
      },
      options_urls_only: {
        options: {
          urls: ['../images/foo.jpg', '../images/bar.png']
        },
        files: {
          'tmp/options_urls_only.css': [],
        },
      },
      both_urls: {
        options: {
          urls: ['../images/foo.jpg', '../images/bar.png']
        },
        files: {
          'tmp/both_urls.css': ['test/fixtures/style2.css'],
        },
      },
      append: {
        options: {
          append: true
        },
        files: {
          'tmp/append.css': ['tmp/append.css'],
        },
      },
    },

    // Copy a fixture file for "append" option test.
    copy: {
      tests: {
        files: { 'tmp/append.css': 'test/fixtures/style1.css' }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'img_preload', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
