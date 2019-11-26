// const gettext = require('gettext-parser')
// const fs = require('fs')
const path = require('path')
// const webpack = require('webpack')
// const wpPot = require('wp-pot')
const AssetsPlugin = require('assets-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
// const Glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const themeDir = 'themes/_ws/'

module.exports = (env, argv) => ({
  devtool: argv.mode === 'development' ? 'cheap-module-source-map' : false,
  entry: {
    'js': path.resolve(__dirname, themeDir + 'src/js/index.js'),
    'css': path.resolve(__dirname, themeDir + 'src/css/index.css')
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false // Otherwise prints legal/copyright comments
          }
        }
      })
    ]
  },
  plugins: [
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.resolve(__dirname, themeDir + 'data')
    }),
    new FixStyleOnlyEntriesPlugin({
      silent: true
    }),
    new MiniCssExtractPlugin({
      filename: 'index.min.css?ver=[contenthash:8]',
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      files: themeDir + 'src/**/*.css',
      syntax: 'scss'
    }),
    new CleanWebpackPlugin(),
    new BrowserSyncPlugin(
      {
        open: false,
        proxy: 'localhost',
        files: [themeDir + '**/*.php', themeDir + '**/*.html', themeDir + '**/*.svg']
      }
    )
  ],
  watchOptions: {
    ignored: [themeDir + 'static/dist']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-import'),
                require('precss')({ autoprefixer: { grid: true } }),
                require('postcss-hexrgba'),
                require('cssnano')
              ]
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'index.min.js?ver=[contenthash:8]',
    path: path.resolve(__dirname, themeDir + 'static/dist')
  }
})
