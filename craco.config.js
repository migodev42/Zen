/* craco.config.js */
// const CracoLessPlugin = require('craco-less');
const CracoAntDesignPlugin = require("craco-antd");
const path = require('path');

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
            // strictMath: true,
            noIeCompat: true,
          },
        },
        cssLoaderOptions: {
          // modules: { localIdentName: "[local]_[hash:base64:5]" }
          // modules: true,
        },
        babelPluginImportOptions: {
          libraryDirectory: "es",
        },
      },
    },
  ],
  webpack: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
    },
  }
};