/* eslint-disable import/no-dynamic-require */
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
  entry: {
    app: path.resolve(__dirname, 'app.jsx'),
  },
  output: {
    path: path.resolve('..', 'build'),
    filename: '[name].js',
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
  devServer: {
    historyApiFallback: true,
    contentBase: __dirname,
    compress: true,
  },
};
