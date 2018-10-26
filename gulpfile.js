var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var fs = require('fs');
var path = require('path');
var url = require('url');
var listjson = require('./mock/list.json');
var querystring = require('querystring')
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname == '/favicon.ico') {
                    res.end('');
                    return false;
                }
                if (pathname == '/api/list') {
                    res.end(JSON.stringify({ code: 1, data: listjson }))
                } else if (pathname == '/api/detail') {
                    // var params = url.parse(req.url, true).query;
                    // var newData = listjson.filter(function(item) {
                    //     return item.id == params.id;
                    // })

                    // var str = "";
                    // req.on('data', function(chunk) {
                    //     str += chunk;
                    // })
                    // req.on('end', function() {
                    //     var param = {};
                    //     try {
                    //         param = JSON.parse(str)
                    //     } catch (error) {
                    //         try {
                    //             param = querystring.parse(str)
                    //         } catch (err) {
                    //             throw new Error('不合法')
                    //         }
                    //     }
                    //     var id = param.id;
                    //     var newData = listjson.filter(function(item) {
                    //         return item.id == param.id;
                    //     })
                    //     res.end(JSON.stringify({ code: 1, data: newData }))
                    // })

                    var str = "";
                    req.on('data', function(chunk) {
                        str += chunk;
                    })
                    res.on('end', function() {
                        var param = {};
                        try {
                            param = JSON.parse(chunk);
                        } catch (error) {
                            try {
                                param = querystring.parse(chunk)
                            } catch (err) {
                                throw newError('不合法')
                            }
                        }
                        var id = param.id;
                        var newData = listjson.filter(function(item) {
                            return item.id == param.id
                        })
                        res.end(JSON.stringify({ code: 1, data: newData }))
                    })

                } else if (pathname == '/api/add') {
                    var vals = url.parse(req.url, true).query.key;
                    console.log(vals);
                    var key = [];
                    listjson.forEach(function(item) {
                        if (item.food.match(vals) != null) {
                            key.push(item.food)
                        }
                    })
                    res.end(JSON.stringify({ code: 1, data: key }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})
gulp.task('devCss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.src('./src/scss/*.scss', gulp.series('devCss'))
})

gulp.task('dev', gulp.series('devCss', 'server', 'watch'))