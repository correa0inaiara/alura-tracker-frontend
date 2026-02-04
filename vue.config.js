const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/alura-tracker/',
  devServer: {
    allowedHosts: [
      'meu_portfolio.teste',
    ],
    client: {
      webSocketURL: 'ws://meu_portfolio.teste/alura-tracker/ws',
    },
  }
})
