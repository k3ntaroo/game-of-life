module.exports = {
  entry: './src/main.js',

  output: {
    path: 'build',
    filename: 'main.bundle.js'
  },

  module: {
    loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
    ]
  },

  resolve: {
    extensions: ['', '.js']
  }

}
