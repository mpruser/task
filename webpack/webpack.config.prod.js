const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            comparisons: false,
            inline: 2,
            pure_funcs: ['window.console.log', 'console.log'], // console.log()만 제거
          },
          parse: { ecma: 2020 },
          mangle: { safari10: true },
          output: {
            ecma: 6,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
  },
};
