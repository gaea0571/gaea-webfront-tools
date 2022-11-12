const path=require("path");

module.exports={
  presets: [ 
    require.resolve("@babel/preset-env")
  ],
  plugins:[
    [require.resolve("@babel/plugin-transform-runtime")],
    [require.resolve("babel-plugin-module-resolver"), {
      root: ["./src/"],
      alias: {
        "@": "./src/",
        "@@": "./"
      }
    }]
  ]
}
