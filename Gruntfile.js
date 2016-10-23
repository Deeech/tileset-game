module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [
				'src/helpers.js',
				'src/Game.js',
				'src/Player.js'
				],
				dest: 'dist/build.js',
			},
		},
		watch: {
			scripts: {
				files: ['src/*.js'],
				tasks: ['concat'],
				options: {
					spawn: false,
					reload: true,
				},
			},
		},
		uglify: {
			options: {
				mangle: false,
				//beautify: true
			},
			dist: {
				files: {
					'dist/build.min.js': ['dist/build.js']
				}
			}
		}
	});
	grunt.registerTask('ugl', ['uglify']);

	grunt.registerTask('con', ['concat']);

	grunt.registerTask('default', ['watch']);
}