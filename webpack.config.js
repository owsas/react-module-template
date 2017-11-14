/* eslint-disable import/no-dynamic-require */
const path = require('path');

const pkg = require(path.resolve('package.json'));

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
  entry: {
    index: path.resolve('src', 'index.jsx'),
  },
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
  ],
  externals: []
    .concat(pkg.peerDependencies)
    .concat(pkg.dependencies),
  module: {
    loaders,
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve('demo'),
    compress: true,
  },
};
