# gulp-puml
[![Build Status](https://travis-ci.org/bondden/gulp-puml.svg?branch=master)](https://travis-ci.org/bondden/gulp-puml.svg?branch=master)

[PlantUML](http://plantuml.com/) rendering [Gulp](http://gulpjs.com/) plugin.

## Install

```
$ npm i -D gulp-puml
```

## Usage

```js
var gulp = require('gulp');
var puml = require('gulp-puml');

gulp.task('default', function () {
	return gulp.src('doc/puml/**/*.puml')
		.pipe(puml())
		.pipe(gulp.dest('doc/img/'));
});
```

## API

### puml(options)

#### options

##### format

Type: `string`
Default: `svg`

Format of output files.
Currently only `svg` format supported.

## License

MIT © [bondden](https://github.com/bondden) 2015
