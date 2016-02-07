module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      all: ['temp/'],
    },

    'includes': {
      all: {
        options: {
          includeRegexp: /(\s*)@include\s+"(\S+)"\s*/
        },
        src: ['InviPay.Widgets.js', 'InviPay.Widgets.*.js'],
        dest: 'temp',
      }
    },

    'uglify': {
      all: {
        options: {
          banner: '/*\n*\t<%= pkg.name %>\n*\n*\t@version: <%= pkg.version %>\n*\t@build: <%= grunt.template.today("yyyy-mm-dd") %>\n*\t@copyright (C) 2015-<%= grunt.template.today("yyyy") %> <%= pkg.license %>\n*\t@author Kuba Pilecki (kpilecki@invipay.com)\n*/\n',
          sourceMap: true,
          sourceMapName: '../InviPay.Widgets.min.map',
          screwIE8: true,
          mangle: true,
        },
        src: ['temp/InviPay.Widgets.js', 'temp/InviPay.Widgets.*.js'],
        dest: 'temp/InviPay.Widgets.min.js'
      }
    },

    'string-replace': {
      dev: {
        options: {
          replacements: [{
            pattern: /@BASE_URI\/?/ig,
            replacement: '',
          }]
        },

        src: 'temp/InviPay.Widgets.min.js',
        dest: '../InviPay.Widgets.min.js',
      },

      dist: {
        options: {
          replacements: [{
            pattern: /@BASE_URI\/?/ig,
            replacement: '//invipay.com/promo/',
          }]
        },

        src: 'temp/InviPay.Widgets.min.js',
        dest: '../InviPay.Widgets.min.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('default', ['clean:all', 'includes:all', 'uglify:all', 'string-replace:dev']);
  grunt.registerTask('dist', ['clean:all', 'includes:all', 'uglify:all', 'string-replace:dist']);

};