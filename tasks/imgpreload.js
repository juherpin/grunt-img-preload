/*
 * grunt-img-preload
 * https://github.com/juherpin/grunt-img-preload
 *
 * Copyright (c) 2013 juherpin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var regex = /background[-image]*:.*?url\(([^\)]+)/g;

  /**
   * Parse a CSS file to find `background` and `background-image` URL's
   */
  var getFileUrls = function(input) {
    var match, urls = [];
    while ((match = regex.exec(input)) !== null) {
      var str = match[1];
      if(typeof str === 'string') {
        // Trim and remove quote marks before pushing it
        urls.push(str.trim().replace(/["']/g, ""));
      }
    }
    return urls;
  };

  /**
   * Generate body:after containing url to preload
   */
  var generateCssPreloader = function(urls) {

    var wrappedUrls = urls.map(function(url) {
      return 'url(' + url + ')';
    });

    return "body:after {\n\tdisplay: none;\n\tcontent: " + wrappedUrls.join(' ') + ";\n}";

  };

  /**
   * Grunt task
   */
  grunt.registerMultiTask('img_preload', 'Preload images with CSS2 body:after', function() {

    var options = this.options({
      append: false,
      urls: []
    });

    if(!(options.urls instanceof Object)) {
      grunt.fail.warn('`urls` option must be an Array');
    }

    this.files.forEach(function(f) {

      // URL's to preload.
      var urls = options.urls;

      // Files processing. Searching images url's.
      f.src.filter(function(filepath) {

        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }

      }).forEach(function(file) {

        var newUrls = getFileUrls(grunt.file.read(file));
        urls = urls.concat(newUrls);

      });

      // Dedup
      urls = grunt.util._.uniq(urls);

      if(urls.length > 0) {

        var content = '';

        // With append mode (get file content).
        if(grunt.file.exists(f.dest) && options.append) {
          content += grunt.file.read(f.dest) + "\n\n";
        }

        // Preloader block and write.
        content += generateCssPreloader(urls);
        grunt.file.write(f.dest, content);

        grunt.log.ok('File "' + f.dest + '" created with ' + urls.length + ' url\'s to preload.');

      } else {

        grunt.log.warn('No URL\'s found.');

      }

    });
  });

};
