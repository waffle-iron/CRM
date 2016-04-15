"use strict";

module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        ts: {
            default:{
                tsconfig: true,
                fast: 'never'

            }
        },

        mochaTest: {
            src: "js/test/**/*.js"
        }
    });

    grunt.registerTask("default", ["compile", "test"]);

    grunt.registerTask("compile", ["ts"]);

    grunt.registerTask("test", ["mochaTest"]);

    grunt.registerTask("compileandtest", ["compile", "test"]);


}
