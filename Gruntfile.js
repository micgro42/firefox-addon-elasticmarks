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
              moz: true
          },
          all: ['Gruntfile.js', 'index.js', 'data/**/*.js', 'test/**/*.js']
      }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');

};
