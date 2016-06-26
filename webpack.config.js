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
        presets: ['es2016']
      }
    }
    ]
  },

  resolve: {
    extensions: ['', '.js']
  }

}
