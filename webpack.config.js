const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const getFilenamePattern = (ext) => (isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: getFilenamePattern('js'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
    historyApiFallback: true,
    host: '0.0.0.0',
  },
  devtool: isDev ? 'source-map' : '',
  externals: {
    'Config': JSON.stringify(isProd ? {
      mode: "production",
      ga: ""
    } : {
      mode: "development"
    })
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/images'),
        to: path.resolve(__dirname, 'public/images'),
      },
      {
        from: path.resolve(__dirname, 'src/assets'),
        to: path.resolve(__dirname, 'public/assets'),
      },
      {
        from: path.resolve(__dirname, 'src/data'),
        to: path.resolve(__dirname, 'public/data'),
      },
    ]),
  ],
};
