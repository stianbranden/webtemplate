module.exports = function(grunt){

  // config
  grunt.initConfig({
    sass: {
      build: {
        files: [{
          src: 'scss/bootstrap.scss',
          dest: 'public/css/bootstrap.css'
        }, {
          src: 'scss/style.scss',
          dest: 'public/css/style.css'
        }]
      }
    },
    postcss: {
      options: {
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')(), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'public/css/*.css'
      }
    }
  });


  //load npm
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');


  //Register tasks
  grunt.registerTask('default', ['sass', 'postcss'])
}
