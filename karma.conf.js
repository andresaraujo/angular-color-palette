module.exports = function(config) {
  config.set({
    files: [
      'lib/angular/angular.js',
      'lib/angular-mocks/angular-mocks.js',
      'src/**/*.js'
      //'src/color-palette.spec.js'
    ],
    exclude: [
      'src/assets/**/*.js'
    ],
    //basePath: '../',

    frameworks: ['jasmine'],
    reporters: ['progress'],
    browsers: ['Chrome'],
    autoWatch: false,
    singleRun: true,
    colors: true
  });
}