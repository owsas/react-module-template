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
    index: path.resolve('src', 'index.jsx'),
    app: path.resolve('demo', 'app.jsx'),
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
  module: {
    loaders,
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve('demo'),
    compress: true,
  },
};
