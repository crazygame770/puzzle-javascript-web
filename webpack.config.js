var webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  BaseHrefWebpackPlugin
} = require('base-href-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackAutoInject = require('webpack-auto-inject-version')
const VueLoader = require('vue-loader')

const env = process.env.NODE_ENV
const platform = process.env.platform

const copiedFiles = [{
  context: 'src/icons',
  from: '**',
  to: 'icons'
}, {
  context: 'src/manifest',
  from: '**',
  to: ''
}]

if (platform === 'electron') {
  copiedFiles.push({
    from: 'src/icons/android-icon-512x512.png',
    to: 'icon.png'
  }, {
    context: 'src/icons/appx',
    from: '**',
    to: 'appx'
  })
}

const config = {
  entry: {
    app: [path.resolve(__dirname, 'src/main.js')],
    phaser: ['phaser']
  },
  mode: env,
  output: {
    publicPath: '',
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000
  },
  devtool: env === 'development' ? 'inline-source-map' : undefined,
  devServer: {
    contentBase: 'dist',
    port: 3000,
    historyApiFallback: {
      index: 'index.html',
      rewrites: [{
        from: /./,
        to: '/'
      }]
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [
          path.join(__dirname, 'static', 'assets'),
          path.join(__dirname, 'src')
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.worker\.js$/,
        loader: 'worker-loader',
        options: {
          name: 'workers/[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|fnt)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images',
        }
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/fonts',
        }
      },
      {
        test: /\.(wav|mp3)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/audio',
        }
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(env),
      SHOW_STATS: JSON.stringify(env === 'development'),
      SERVER_DOMAIN: JSON.stringify(process.env.SERVER_DOMAIN),
      SERVER_PROTOCOL: JSON.stringify(process.env.SERVER_PROTOCOL),
      FB_APP_ID: JSON.stringify(process.env.FB_APP_ID),
    }),
    new CopyWebpackPlugin(copiedFiles),
    new WebpackAutoInject({
      components: {
        InjectAsComment: false
      }
    }),
    new MiniCssExtractPlugin(),
    new VueLoader.VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.ejs'),
      filename: path.join(__dirname, 'dist', 'index.html'),
      minify: false,
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'allAssets',
      fileWhitelist: [/\.woff2/]
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json', ]
  },
}

if (platform !== 'electron') {
  config.plugins.push(new BaseHrefWebpackPlugin({
    baseHref: '/',
  }))
}

if (env === 'production') {
  config.optimization.minimizer = [
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
        output: {
          comments: false,
        },
      },
    })
  ]
}

module.exports = config