module.exports = {
  baseURL: 'http://10.10.18.12:8082/',
  configureWebpack: config => {
    require('vux-loader').merge(config, {
      options: {},
      plugins: ['vux-ui']
    })
  },
}
