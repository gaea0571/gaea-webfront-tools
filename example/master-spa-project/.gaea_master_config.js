
module.exports = {
  devServer: {
    port: 18500
  },
  slave_application_list: {
    "development": {
      "slave": "http://localhost:18600/manifest.json"
    },
    "test": {
      "slave": "http://localhost:18600/manifest.json"
    },
    "production": {
      "slave": "http://localhost:18600/manifest.json"
    }
  }[process.env.NODE_ENV]
};