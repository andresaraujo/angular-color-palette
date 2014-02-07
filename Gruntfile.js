'use strict';

var path = require('path');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.description %>\n' +
      ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @author <%= pkg.author %>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
      ' */\n'
    },
    dirs: {
      src: 'src',
      dest: 'dist'
    },
    copy: {

    },
    concat: {
      build_css: {
        src: [
          '<%= dirs.src %>/*.less'
        ],
        dest: '<%= dirs.dest %>/<%= pkg.name %>.less'
      },
      
      dist: {
        options: {
          banner: '<%= meta.banner %>\n (function(window, document) {\n\'use strict\';\n',
          footer: '\n})(window, document);\n',
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
              src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          }
        },
        src: ['<%= dirs.src %>/*.js', '!<%= dirs.src %>/*.spec.js'],// '<%= dirs.src %>/**/*.js'],
        dest: '<%= dirs.dest %>/<%= pkg.name %>.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', '<%= dirs.src %>/*.js', 'test/unit/*.js'],

      options: {
        curly: false,
        browser: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        expr: true,
        node: true,
        globals: {
          exports: true,
          angular: false,
          $: false
        }
      }
    },
    karma: {
      unit: {
          configFile: './karma.conf.js',
          port: 7101,
          //background: true
          autoWatch: false,
          singleRun: true
      }
    }
  });

  // Build task.
  grunt.registerTask('build', ['jshint', 'karma:unit', 'concat']);

  // Default task.
  grunt.registerTask('default', ['build']);

};