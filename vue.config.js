const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/wallet/' : '/',
  chainWebpack: (config) => {
    config.resolve.alias
          .set('app_images', path.resolve(__dirname, './src/assets/images'))
          .set('app_scss', path.resolve(__dirname, './src/assets/scss'));
    
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
        .use('babel-loader')
        .loader('babel-loader')
        .end()
        .use('vue-svg-loader')
        .options({
          svgo: {
            plugins: [
              { removeDimensions: true },
              { removeViewBox: false },
            ],
          },
        })
        .loader('vue-svg-loader');
  },
};
