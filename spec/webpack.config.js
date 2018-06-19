const path = require('path');
// const JasmineMemoryPlugin = require('../src/plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './spec/foo-spec.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: path.resolve('./src/loader.js')
      }
    ]
  }
};
