
module.exports = {
  devServer: {
    port: 18500
  },
  proxy: {},
  bundle_analyzer: false,
  slave_application_list: {
    "development": {
      "slave1": "http://localhost:18700/v1/manifest.json",
      "slave2": "http://localhost:18800/v1/manifest.json"
    },
    "test": {
      "slave": "http://localhost:18500/slave/v1/manifest.json"
    },
    "production": {
      "slave": "http://localhost:18500/slave/v1/manifest.json"
    }
  }[process.env.NODE_ENV]
};