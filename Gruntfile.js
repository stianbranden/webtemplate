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
    },
    watch: {
      sass: {
        files: ['scss/*.scss','scss/mixins/*.scss', 'scss/utilities/*.scss'],
        tasks: ['sass', 'postcss']
      }
    },
    nodemon: {
      dev: {
        script: 'app.js'
      }
    },
    concurrent: {
      target:{
        tasks: ['watch', 'nodemon'],
  			options: {
  				logConcurrentOutput: true
  			}
      }
    }
  });


  //load npm
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');


  //Register tasks
  grunt.registerTask('default', ['sass', 'postcss', 'concurrent:target'])
}
