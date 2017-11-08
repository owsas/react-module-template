const path = require('path');

// const isProduction = process.env.NODE_ENV === 'production';

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  },
];

module.exports = {
  target: 'web',
  devtool: 'eval-source-map',
  entry: path.resolve('src', 'index.jsx'),
  output: {
    path: path.resolve('build'),
    filename: 'index.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
  ],
  module: {
    loaders,
  },
};
