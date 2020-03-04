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
      },
      js: {
        files: ['src/*js'],
        tasks: ['shell:parcel']
      }
    },
    nodemon: {
      dev: {
        script: 'app.js'
      }
    },
    shell: {
      ls: 'ls ./src',
      parcel: 'parcel build src/*.js -d public/javascript --no-minify --public-url /javascript'
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
  grunt.loadNpmTasks('grunt-shell');


  //Register tasks
  //grunt.registerTask('default', ['shell:ls']);
  //grunt.registerTask('default', ['babel']);
  grunt.registerTask('default', ['sass', 'postcss', 'shell:parcel', 'concurrent:target'])
}
