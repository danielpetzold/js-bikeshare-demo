// gruntfile.js

module.exports = function (grunt) {
    grunt.initConfig({
        nodemon: {
            all : {
                options: {
                    watchedExtensions: ['ts']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.registerTask('default',['nodemon']);
};