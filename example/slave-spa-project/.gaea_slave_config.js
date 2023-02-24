

module.exports = {
  version: "v1",
  namespace: "slave",
  devServer: {
    port: 18600
  },
  proxy: {
    "/api": {
      target: "http://localhost:9000/",
      changeOrigin: true
    }
  },
  bundle_analyzer: false,
  master_provider: "http://localhost:18500/"
};