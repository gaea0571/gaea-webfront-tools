
module.exports = {
  devServer: {
    port: 18500
  },
  slave_application_list: {
    "development": {
      "slave": "http://localhost:18600/application.js"
    },
    "test": {
      "slave": "http://localhost:18600/application.v1.js"
    },
    "production": {
      "slave": "http://localhost:18600/application.v1.js"
    }
  }[process.env.NODE_ENV]
};