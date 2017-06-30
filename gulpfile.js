
const gulp = require('gulp');
const fs = require('fs');
const del = require('del');
const $ = require('gulp-load-plugins')();

// Utility to ignore Node modules and Bower components
// when generating the glob patterns array for gulp.src()
function addDefSrcIgnore (srcArr) {
  return srcArr.concat([
    '!**/REMOVE{,/**}',
    '!node_modules{,/**}',
    '!public/scripts{,/**}',
    '!client/bower_components{,/**}',
    '!private{,/**}',
    '!dist{,/**}',
    '!.git{,/**}',
    '!**/.DS_Store'
  ]);
}

// Lint all files
gulp.task('lint', ['lint-js']); // , 'lint-css']);

// JavaScript and JSON linter
gulp.task('lint-js', function () {
  return gulp.src(addDefSrcIgnore(['**/*.js', '**/*.json']), {dot: true})
    .pipe($.eslint({dotfiles: true}))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

// HTML linter
gulp.task('lint-html', function () {
  return gulp.src(addDefSrcIgnore(['**/*.html']))
    .pipe($.htmlLint({htmllintrc: '.htmllintrc.json'}))
    .pipe($.htmlLint.format())
    .pipe($.htmlLint.failAfterError());
});

// CSS linter
gulp.task('lint-css', function () {
  return gulp.src(addDefSrcIgnore(['**/*.css']))
    .pipe($.stylelint({
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

// Remove solutions from exercises
gulp.task('remove-solutions', function () {
  del.sync('dist');
  return gulp.src(addDefSrcIgnore(['**']), {dot: true})
    .pipe($.replace(/^\s*(\/\/|<!--|\/\*)\s*REMOVE-START[\s\S]*?REMOVE-END\s*(\*\/|-->)?\s*$/gm, ''))
    .pipe(gulp.dest('dist'));
});

// Prepare for distribution to students
gulp.task('dist', ['remove-solutions'], function () {

  function removeMaster (str) {
    var strArr = str.split('-');
    strArr[strArr.length - 1] === 'master' && strArr.pop();
    return strArr.join('-');
  }

  const npmConfig = require('./package.json');
  npmConfig.name = removeMaster(npmConfig.name);
  npmConfig.repository.url = removeMaster(npmConfig.repository.url);
  npmConfig.config.ghooks['pre-commit'] = 'gulp lint';
  fs.writeFileSync('dist/package.json', JSON.stringify(npmConfig, null, 2));

  const esLintConfig = require('./.eslintrc.json');
  esLintConfig.rules['no-undef'] = 'off';
  esLintConfig.rules['no-unused-vars'] = 'off';
  fs.writeFileSync('dist/.eslintrc.json', JSON.stringify(esLintConfig, null, 2));

});
