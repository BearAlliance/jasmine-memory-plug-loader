const path = require('path');
const webpack = require('webpack');
const memoryfs = require('memory-fs');

module.exports = function (fixture) {
  const webpackConfig = {
    entry: {
      main: `${__dirname}/fixtures/${fixture}.js`
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: path.resolve(__dirname + '/../index.js')
        }
      ]
    }
  };

  const compiler = webpack(webpackConfig);

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) reject(err || stats.error);

      resolve(stats);
    });
  });

};
