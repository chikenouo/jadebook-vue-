module.exports = {
  devServer: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: 'all',
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    }
  },
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map'
  }
}