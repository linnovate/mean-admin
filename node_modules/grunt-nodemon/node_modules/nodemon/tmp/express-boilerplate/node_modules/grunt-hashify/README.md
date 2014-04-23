# grunt-hashify

This grunt task iterates over its source files, calculating the MD5 hash of each, then creates a file containing the
list of filenames and hashes. It can also create a copy of original filename with hash as part of the name and works with
pre-existing hashmap files extending them so partial updates are possible.

## Getting Started
This plugin requires Grunt `~0.4.0`
Deal with it.

Installation:
```shell
npm install grunt-hashify --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hashify');
```

## The "hashify" task

### Overview
In your project's Gruntfile, add a section named `hashify` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  hashify: {
    simple: {
      options: {
        basedir: 'tmp/', // hashmap paths will be relative to this dir, files will be copied to it as well
        copy: true, // keeps originals
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
    }
  },
})
```

