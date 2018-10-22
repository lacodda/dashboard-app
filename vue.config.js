const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        components: path.resolve(__dirname, 'src/components'),
      },
    },
  },
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },
};
