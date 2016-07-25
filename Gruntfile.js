module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'public',
                    src: '*.scss',
                    dest: 'public',
                    ext: '.css'
                }]
            }
        },
        watch: {
            sass: {
                files: 'public/*.scss',
                tasks: 'sass'
            }
        }
    });

    grunt.registerTask('build', ['sass']);
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('heroku', ['build']);
};
