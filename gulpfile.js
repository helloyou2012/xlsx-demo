const path = require('path');
const gulp = require('gulp');
const glob = require('glob');
const zip = require('gulp-zip');
const unzip = require('gulp-unzip');
const merge = require('merge-stream');

gulp.task('zip', () => {
  const tasks = glob.sync('src/*').map(f => {
    const zipFile = path.relative('src', f) + '.xlsx';
    return gulp.src(f + '/**/*', { base: f, dot: true })
      .pipe(zip(zipFile))
      .pipe(gulp.dest('dist'));
  });
  return merge(tasks);
});

gulp.task('unzip', () => {
  const tasks = glob.sync('dist/*').map(f => {
    const folder = path.basename(f, '.xlsx');
    return gulp.src(f, { base: 'dist' })
      .pipe(unzip({ keepEmpty : true }))
      .pipe(gulp.dest('src/' + folder));
  });
  return merge(tasks);
});
