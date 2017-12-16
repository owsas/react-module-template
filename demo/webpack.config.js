/* eslint-disable import/no-dynamic-require */
const path = require('path');

// const isProduction = process.env.NODE_ENV === 'production';

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
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
