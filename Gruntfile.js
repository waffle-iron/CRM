"use strict";

module.exports = function(grunt) {

    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        ts: {
            default:{
                tsconfig: true,
                fast: 'never'
            }
        },

        mochaTest: {
            default:{
                src: "js/test/**/*.js"
            }
        },
        
        coveralls:{
            default:{
                src: 'coverage/*.info'
            }
        },
        
        mocha_istanbul: {
            default: {
                src: "js/test/**/*.js"
            }
        }
    });

    grunt.registerTask("default", []);

}
