/* eslint-disable import/no-dynamic-require */
const path = require('path');

const nodeExternals = require('webpack-node-externals');

// const isProduction = process.env.NODE_ENV === 'production';

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  },
  {
    test: /\.css$/,
    loader: 'style-loader!css-loader',
  }, {
    test: /\.(woff|woff2|svg|eot|ttf)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          prefix: 'font',
          limit: 10000,
        },
      },
    ]
    ,
  },
  {
    test: /\.scss$/,
    use: [{
      loader: 'style-loader', // creates style nodes from JS strings
    }, {
      loader: 'css-loader', // translates CSS into CommonJS
    }, {
      loader: 'sass-loader', // compiles Sass to CSS
    }],
  },
];

module.exports = {
  target: 'web',
  devtool: 'source-map',
  entry: {
    index: path.resolve('src', 'index.jsx'),
  },
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
  ],
  externals: [
    nodeExternals({
      // load non-javascript files with extensions, presumably via loaders
      whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
    }),
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
