// Sass configuration
var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");

function swallowError(error) {}

gulp.task("sass", function() {
    gulp.src("src/**/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(
            gulp.dest(function(f) {
                return f.base;
            })
        )
        .on("error", swallowError);
});

gulp.task("default", ["sass"], function() {
    gulp.watch("src/**/*.scss", ["sass"]).on("error", function(err) {
        console.log(err.toString());

        this.emit("end");
    });
});
