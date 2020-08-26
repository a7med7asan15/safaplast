const gulp = require('gulp');
const  sass = require('gulp-sass');
sass.compiler = require('node-sass');
const  sassGlob = require('gulp-sass-glob');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
require('dotenv').config();



function parentThemeAdminChild (){

return gulp.src('./rest/sass/style.scss')
        .pipe(sassGlob({allowEmpty:true}))
        .pipe(plumber(
            {
                errorHandler: function(err) {
                  // display the error message
                  console.log(err.message);
                  // end the errored task
                  this.emit('end') }
              }
        ))
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./rest/public/websiteAssets/css'))

}

function scssForTheEditor (){

return gulp.src('./rest/sass/style-rtl.scss')
        .pipe(sassGlob())
        .pipe(plumber(
            {
                errorHandler: function(err) {
                  // display the error message
                  console.log(err.message);
                  // end the errored task
                  this.emit('end') }
              }
        ))
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./rest/public/websiteAssets/css'))

}


function watchFiles (){
        browserSync.init({
            proxy:{
                target:'localhost:3001'
            },
            open: false,
            notify: false,
            reloadDelay: 100
            
        })
        //    gulp.watch(['*.php','src/pug/**/*.pug']).on('change',browserSync.reload);
        gulp.watch(['./rest/sass/*'], gulp.series(parentThemeAdminChild,scssForTheEditor)).on('change', browserSync.reload);
    };

    exports.parentThemeAdminChild = parentThemeAdminChild;
    exports.scssForTheEditor = scssForTheEditor;
    // exports.pluginSCSS = pluginSCSS;
    exports.watchFiles = watchFiles;

    gulp.task('default',gulp.series(parentThemeAdminChild,scssForTheEditor,watchFiles));