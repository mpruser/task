const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new HotModuleReplacementPlugin()],
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    inline: true,
    hot: true,
    port: 3000,
    quiet: true,
    open: true,
    overlay: true,
  },
};
