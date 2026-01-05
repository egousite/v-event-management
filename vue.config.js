const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/v1_0': {
        target: 'https://geek.itheima.net',
        changeOrigin: true,
      }
    }
  },
  // 所有环境都开启 sourceMap
  // productionSourceMap: true,  // 生产环境开启 source map
  // css: {
  //   sourceMap: true          // CSS 也开启 source map
  // },
})
