"use strict";
module.exports = function(grunt) {

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      less: {
          development: {
              files: {
                  "data/css/sidebar.css": "data/css/sidebar.less"
              },
              options: {}
          }
      },
      jshint: {
          options: {
              moz: true,
              curly: true,
              forin: true,
              freeze: true,
              globals: {addon: true},
              strict: "global",
              undef: true,
              unused: true,
              plusplus: true,
              browser: true,
              node: true,
              devel: true
          },
          all: ['Gruntfile.js', 'index.js', 'data/**/*.js', 'test/**/*.js']
      },
      watch: {
          js: {
              files: ['<%= jshint.all %>'],
              tasks: ['jshint']
          },
          less: {
              files: ['data/css/*.less'],
              tasks: ['less']
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

};
