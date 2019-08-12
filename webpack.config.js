const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let plugins = [];

plugins.push(
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src", "template.html"),
    filename: "index.html",
    hash: true,
    minify: {
      html5: true,
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      removeComments: true
    }
  })
);

plugins.push(
  new MiniCssExtractPlugin({
    filename: "[name].[hash].css",
    chunkFilename: '[id].css'
  })
);

let SERVICE_URL = JSON.stringify("http://localhost:8080");

if (process.env.NODE_ENV === "production") {
  SERVICE_URL = JSON.stringify("http://enderecoproducao.com.br");

  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

  plugins.push(
    new OptimizeCssAssetsPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    })
  );
}

plugins.push(
  new webpack.DefinePlugin({
    SERVICE_URL
  })
);

module.exports = {

  entry: path.resolve(__dirname, "src", "index.jsx"),

  output: {
    path: path.resolve(__dirname, "build-production"),
    filename: "[name].[hash].bundle.js"
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "libs-terceiros",
          chunks: "all"
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(css|scss)$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: "file-loader"
      },
      {
        test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
        use: "file-loader"
      }
    ]
  },

  plugins
};
