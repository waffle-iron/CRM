"use strict";

module.exports = function (grunt) {

    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        ts: {
            default: {
                tsconfig: true,
                options: {
                    fast: "never",
                    sourceMap: false
                }
            }
        },

        coveralls: {
            default: {
                src: "coverage/*.info"
            }
        },

        mocha_istanbul: {
            default: {
                src: "js/test/**/*.js"
            }
        },

        clean: ["js"]

    });

    grunt.registerTask("default", []);
    grunt.registerTask("compile", ["clean", "ts"]);

}
