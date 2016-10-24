var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  hash: true,
  filename: 'index.html',
  inject: 'body'
});
var HotReloader = new webpack.HotModuleReplacementPlugin();

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './app/App.js'
  ],
  output: {
    path: 'dist',
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      {test: /\.js$/,  loader: 'react-hot!babel', include: __dirname + '/app'},
      { test: /\.css$/, loader: 'style!css?sourceMap' },
      { test: /\.less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]' },
      { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]' },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    }
    ]
  },
  plugins: [HTMLWebpackPluginConfig, HotReloader],
  devServer: {
    contentBase: __dirname + '/dist',
    hot: true,
  }
};
