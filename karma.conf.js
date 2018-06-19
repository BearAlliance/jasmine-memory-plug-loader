const webpackConfig = require('./spec/webpack.config.js');

module.exports = function (config) {

  config.set({
    webpack: webpackConfig,
    frameworks: ['jasmine'],
    plugins: [
      require('karma-webpack'),
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-spec-reporter'
    ],
    files: [
      // 'spec/foo-spec.js'
      // 'node_modules/webpack/bin/webpack.js',
      // 'node_modules/requirejs/bin/r.js',
      'spec/index.spec.js'
    ],
    preprocessors: {
      // 'spec/foo-spec.js': ['webpack']
      // 'spec/index.spec.js': ['webpack']
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    random: false,
    singleRun: true,
    browsers: ['ChromeHeadless'],
  });

};
