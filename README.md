# grunt-img-preload [![Build Status](https://api.travis-ci.org/juherpin/grunt-img-preload.png?branch=master)](http://travis-ci.org/#!/juherpin/grunt-img-preload)

> Grunt plugin for image preloading through CSS2+ caching using the content property.

## Generated content

This is an example of a resulting generation. Images are dynamically added to the content property :

```css
body:after {
  content: url(img1) url(img2);
  display: none;
}
```
This task will parse your CSS files and fill the content property. You can add other images manually.

The pseudo element body:after is added to a new CSS file or appended to an existing one (option).

Preloading images can be usefull for your HTML5 apps or websites. It's compliant with all CSS2+ browsers.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-img-preload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-img-preload');
```

## Documentation

### Overview
In your project's Gruntfile, add a section named `img_preload` to the data object passed into `grunt.initConfig()`.

Generate a preload block into a new file (dest.css) with all images paths found into source.css :

```js
grunt.initConfig({
  img_preload: {
    my_target: {
      files: {
        'dest.css': ['source.css']
      }
    }
  }
});
```

You can manually preload some other files (paths must be relative to the dest CSS file) and append the preload block to an existing CSS dest file.

```js
grunt.initConfig({
  img_preload: {
    options: {
      append: true,
      urls: ['../images/foo.png', ...]
    }
    my_target: {
      files: {
        'dest.css': ['source.css']
      }
    }
  }
});
```

### Options

#### options.append
Type: `boolean`
Default value: `false`

If true, append the generated CSS block (with images preloading) to the end of the dest file (if exists).

If false, create a new dest file or replace it.

#### options.urls
Type: `Array`
Default value: `[]`

Manually add images paths to preload (paths must be relative to dest location).